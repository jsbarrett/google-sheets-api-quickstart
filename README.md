# google-sheets-api-quickstart

## Get Started
- Run `npm install` to get all dependencies
- Be sure to have your `credentials.json` file in the root of the project
  - You can retrieve your credentials from:
    https://console.developers.google.com/apis/api/sheets.googleapis.com/credentials
  - If you don't already have an Oauth credential setup then you will need to create one and download into this project with previously mentioned filename.
- Create `.env` file with four environment variables
  - RANGE
    - the sheet range to get data
    - example: Sheet1!A1:D20
  - SCOPES
    - The scopes needed for google api client
    - example: "https://www.googleapis.com/auth/spreadsheets.readonly"
  - SPREADSHEET_ID
    - The id of your spreadsheet found in the URL when editing
    - "https://docs.google.com/spreadsheets/d/{THE-PART-THAT-IS-RIGHT-HERE}/edit?usp=drive_web&ouid=113055466453161932543"
  - TOKEN_PATH
    - Where you want to store your token
    - Example: "token.json"
- Run `npm start`
  - The first time you will be prompted through a setup for retrieving your token but later times will run without the prompting
  - NOTE: You can change the spreadsheet id and range without needing to update the token

