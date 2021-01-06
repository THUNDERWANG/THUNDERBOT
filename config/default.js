require('dotenv').config();

module.exports = {
	Discord: {
		botId: process.env.DISCORD_BOT_ID_DEV,
		botToken: process.env.DISCORD_BOT_TOKEN_DEV,
		botPrefix: process.env.DISCORD_BOT_PREFIX,
		modId: '795506335721717760',
		triceId: '796164469738831872',
		xmageId: '796164518115541012',
		cubeChatId: '794675408570023940',
	},
	Sheets: {
		email: process.env.GOOGLE_CLIENT_EMAIL,
		keyFile: null,
		key: process.env.GOOGLE_PRIVATE_KEY,
		scopes: 'https://www.googleapis.com/auth/spreadsheets',
		version:'v4',
		spreadsheetId: process.env.SPREADSHEET_ID,
		sheetName: process.env.SHEET_NAME,
	},
	Database: {
		url: 'sqlite::memory:',
		dialect: 'sqlite',
	},
	Levels: {
		tiers: {
			0:  {
				id:'795222366342217739',
				image:'https://c1.scryfall.com/file/scryfall-cards/art_crop/front/9/e/9ecc467e-b345-446c-b9b7-5f164e6651a4.jpg?1598311624' },
			1: {
				id: '794698510582022154',
				image: 'https://c1.scryfall.com/file/scryfall-cards/art_crop/front/6/0/60f874f9-7ac2-4d1a-97e3-722db719cd1c.jpg?1584752869' },
			5: {
				id: '795222316614418462',
				image: 'https://c1.scryfall.com/file/scryfall-cards/art_crop/front/8/e/8e214f84-01ee-49c1-8801-4e550b5ade5d.jpg?1572370688' },
			10: {
				id: '795222402387935232',
				image: 'https://c1.scryfall.com/file/scryfall-cards/art_crop/front/d/2/d270aeed-b15f-46f9-97ba-ccce562caefa.jpg?1598311679' },
			15: {
				id: '795443197126901810',
				image: 'https://c1.scryfall.com/file/scryfall-cards/art_crop/front/6/a/6ac609aa-49d1-4330-b718-a90b0560da52.jpg?1592709988' },
			20: {
				id: '795443224932122665',
				image: 'https://c1.scryfall.com/file/scryfall-cards/art_crop/front/5/4/545639fc-e521-41f2-81b2-a671007321eb.jpg?1562229670' },
			25: { id: '795443242967629864',
				image: 'https://c1.scryfall.com/file/scryfall-cards/art_crop/front/a/0/a0b6a71e-56cb-4d25-8f2b-7a4f1b60900d.jpg?1606762217' },
		},
	},

};