const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
const { SPREADSHEET_ID, RANGE } = process.env
const { getRows } = require('./getRows')
const { displayRows } = require('./displayRows')

getRows({ spreadsheetId: SPREADSHEET_ID, range: RANGE })
  .then(displayRows)
  .catch(console.log)

