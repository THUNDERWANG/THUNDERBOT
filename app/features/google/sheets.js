const { google } = require('googleapis');
const logger = require('@logger/logger.js');
const User = require('@db/models/user.model');
const { email, keyFile, privateKey, scopes, version, spreadsheetId, sheetName } = require('config').sheets;

const googleClient = new google.auth.JWT(email, keyFile, privateKey, scopes);

let sheetsAPI = '';

googleClient.authorize()
  .then((tokens) => {
    logger.info('Google client connected!');
    sheetsAPI = google.sheets({ version, auth: googleClient });
  })
  .catch((error) => logger.error(error));

function clearAll({ spreadsheetId, sheetName }) {
  if (!sheetsAPI) return logger.error('Sheets not connected!');
  const options = { spreadsheetId, range: `${sheetName}!A2:Z` };
  return sheetsAPI.spreadsheets.values.clear(options);
}

// payload = 2D array [['thunder', 5, 10], ['appleboy', 1, 6]]
function updateAll(payload) {
  if (!sheetsAPI) return logger.error('Sheets not connected!');
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
async function clearUpdate() {
  setInterval(async () => {
    try {
      await clearAll({ spreadsheetId, sheetName });
      const users = await User.find({});

      const payload = users.map(({ discordTag, discordId, points, cubes }) => {
        const row = [discordTag, discordId, points];
        const cubeLists = cubes.reduce((acc, cube) => `${acc} ${cube.link}`, '');
        row.push(cubeLists);
        return row;
      });

      await updateAll(payload);
      logger.info('Sheets updated!');
    } catch (error) {
      logger.error(error);
    }
  }, 43200000);
}

module.exports.setSheets = clearUpdate;
