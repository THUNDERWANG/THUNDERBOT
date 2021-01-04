require('dotenv').config();

module.exports = {
	Discord: {
		botId: process.env.DISCORD_BOT_ID_PRO,
		botToken: process.env.DISCORD_BOT_TOKEN_PRO,
		botPrefix: process.env.DISCORD_BOT_PREFIX,
		modId: '313744722654920708',
		welcomeId: '659117988405837832',
		xmageId: '585313738169778177',
		triceId: '585314755976364043',
	},
	Database: {
		url: process.env.CLEARDB_DATABASE_URL,
		dialect: 'mysql',
	},
	Levels: {
		tiers: {
			0:  {
				id:'585662276212621333',
				image:'https://c1.scryfall.com/file/scryfall-cards/art_crop/front/9/e/9ecc467e-b345-446c-b9b7-5f164e6651a4.jpg?1598311624' },
			1: {
				id: '585564770078556164',
				image: 'https://c1.scryfall.com/file/scryfall-cards/art_crop/front/6/0/60f874f9-7ac2-4d1a-97e3-722db719cd1c.jpg?1584752869' },
			5: {
				id: '585564507670052933',
				image: 'https://c1.scryfall.com/file/scryfall-cards/art_crop/front/8/e/8e214f84-01ee-49c1-8801-4e550b5ade5d.jpg?1572370688' },
			10: {
				id: '585554548756840475',
				image: 'https://c1.scryfall.com/file/scryfall-cards/art_crop/front/d/2/d270aeed-b15f-46f9-97ba-ccce562caefa.jpg?1598311679' },
			15: {
				id: '585564850235768844',
				image: 'https://c1.scryfall.com/file/scryfall-cards/art_crop/front/6/a/6ac609aa-49d1-4330-b718-a90b0560da52.jpg?1592709988' },
			20: {
				id: '585564899061792781',
				image: 'https://c1.scryfall.com/file/scryfall-cards/art_crop/front/5/4/545639fc-e521-41f2-81b2-a671007321eb.jpg?1562229670' },
			25: { id: '585691691181146122',
				image: 'https://c1.scryfall.com/file/scryfall-cards/art_crop/front/a/0/a0b6a71e-56cb-4d25-8f2b-7a4f1b60900d.jpg?1606762217' },
		},
	},

};