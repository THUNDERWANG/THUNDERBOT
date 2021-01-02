const dotenv = require('dotenv');
dotenv.config();

module.exports = {
	Discord: {
		botId: process.env.BOT_ID,
		token: process.env.DISCORD_BOT_TOKEN,
		prefix: process.env.PREFIX,
	},
	Sheets: {
		email: process.env.GOOGLE_CLIENT_EMAIL,
		keyFile: null,
		key: process.env.GOOGLE_PRIVATE_KEY,
		scopes: process.env.SHEET_SCOPES,
		version: process.env.SHEET_API_VERSION,
		spreadsheetId: process.env.SPREADSHEET_ID,
		sheetName: process.env.SHEET_NAME,
	},
	Sequelize: {
		url: process.env.CLEARDB_DATABASE_URL,
		dialect: process.env.SQL_DIALECT,
	},

};