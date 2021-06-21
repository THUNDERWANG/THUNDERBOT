const { google } = require('googleapis');
const logger = require('@logger/logger.js');
const User = require('@db/models/user.model');
const { email, keyFile, privateKey, scopes, version, spreadsheetId, sheetName } = require('config').sheets;

const googleClient = new google.auth.JWT(email, keyFile, privateKey, scopes);

function clearAll({ sheetsAPI, spreadsheetId, sheetName }) {
  const options = { spreadsheetId, range: `${sheetName}!A2:Z` };
  return sheetsAPI.spreadsheets.values.clear(options);
}

// payload = 2D array [['thunder', 5, 10], ['appleboy', 1, 6]]
function updateAll(sheetsAPI, payload, spreadsheetId, sheetName) {
  const options = {
    spreadsheetId,
    range: `${sheetName}!A2:Z`,
    valueInputOption: 'USER_ENTERED',
    resource: {
      range: `${sheetName}!A2:Z`,
      majorDimension: 'ROWS',
      values: payload,
    },
  };
  return sheetsAPI.spreadsheets.values.update(options);
}

// gets user data from db and updates google sheets
// TODO: just search and update what needs to be updated in the future
async function setSheets() {
  logger.info('Sheets interval set!');
  setInterval(async () => {

    try {
      // load all users
      const users = await User.find({});
      const payload = users.map(({ discordTag, discordId, points, cubes }) => {
        const row = [discordTag, discordId, points];
        const cubeLists = cubes.reduce((acc, cube) => `${acc} ${cube.link}`, '');
        row.push(cubeLists);
        return row;
      });

      await googleClient.authorize(); // returns tokens if needed
      const sheetsAPI = google.sheets({ version, auth: googleClient });
      await clearAll({ sheetsAPI, spreadsheetId, sheetName });
      await updateAll(sheetsAPI, payload);
      logger.info('Sheets updated!');

    } catch (error) {
      logger.error(error);
    }
  }, 21600000);
}

module.exports.setSheets = setSheets;
