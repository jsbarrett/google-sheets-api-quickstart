const { google } = require('googleapis')
const { prompt, readFile, writeFile } = require('./utils')

// If modifying these scopes, delete token.json.
const SCOPES = process.env.SCOPES.split(',')

// The file token.json stores the user's access and refresh tokens,
// and is created automatically when the authorization flow completes
// for the first time.
const TOKEN_PATH = process.env.TOKEN_PATH

const getRows = ({ spreadsheetId, range }) => {
  return getAuth()
    .then(getSheetsClient({ version: 'v4' }))
    .then(getValuesFromSpreadsheet({ spreadsheetId, range }))
}

const getAuth = async () => {
  const content = await readFile('credentials.json')
  return authorize(JSON.parse(content))
}

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
async function authorize (credentials) {
  const { client_secret, client_id, redirect_uris } = credentials.installed
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  )

  try {
    // Check if we have previously stored a token.
    const token = await readFile(TOKEN_PATH)
    oAuth2Client.setCredentials(JSON.parse(token))
    return oAuth2Client
  } catch (err) {
    return getAndSaveNewToken(oAuth2Client)
  }
}

/**
 * Get and store new token after prompting for user authorization,
 * and then return with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 */
const getAndSaveNewToken = async (authClient) => {
  const authUrl = authClient.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  })
  console.log('Authorize this app by visiting this url:', authUrl)
  const code = await prompt('Enter the code from that page here: ')
  const token = await getToken(authClient, code)
  authClient.setCredentials(token)
  await saveToken(token)
  return authClient
}

const getSheetsClient = ({ version }) => auth => google.sheets({ version, auth })

const getValuesFromSpreadsheet = ({ spreadsheetId, range }) => sheets => {
  return new Promise((resolve, reject) => {
    sheets.spreadsheets.values.get({ spreadsheetId, range }, (err, res) => {
      if (err) return reject(err)
      if (res.data.values.length === 0) return reject(new Error('No data found.'))
      resolve(res.data.values)
    })
  })
}

const getToken = (authClient, code) => new Promise((resolve, reject) => {
  authClient.getToken(code, (err, token) => {
    if (err) {
      console.error('Error while trying to retrieve access token')
      return reject(err)
    }
    resolve(token)
  })
})

const saveToken = async token => {
  await writeFile({ path: TOKEN_PATH, content: JSON.stringify(token) })
  console.log('Token stored to', TOKEN_PATH)
}

module.exports = { getRows }

