require('dotenv').config();

module.exports = {
  discord: {
    ownerId: '132761947975188480',
    embedColor: '#0099ff',
    embedThumbnail: 'https://cdn.discordapp.com/avatars/801556487038173214/d6e13480f5540fb44ced81b981c66c10.webp?size=256',
    botPrefix: '.',
    defaultCooldown: 3, // in seconds
    zapier: '802369375432736788',
  },
  sheets: {
    email: process.env.GOOGLE_CLIENT_EMAIL,
    keyFile: null,
    privateKey: process.env.GOOGLE_PRIVATE_KEY,
    scopes: 'https://www.googleapis.com/auth/spreadsheets',
    version: 'v4',
    spreadsheetId: process.env.SPREADSHEET_ID,
    sheetName: process.env.SHEET_NAME,
  },
};
