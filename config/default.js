require('dotenv').config();

module.exports = {
	discord: {
		botId: process.env.DEV_DISCORD_BOT_ID,
		botToken: process.env.DEV_DISCORD_BOT_TOKEN,
		botPrefix: process.env.DISCORD_BOT_PREFIX,
		defaultCooldown: 1, // in seconds
		modRole: '795506335721717760',
		triceRole: '796164469738831872',
		xmageRole: '796164518115541012',
		cubeChatChannel: '802301626588201010',
		mtgaChannelId: '801910605656096838',
		welcomeChannel: '802301626588201010',
		serverId: '794675408570023937', // dev tgc server by default
		tgcChannel: '802301626588201010', // dev tcg channel
		zapier: '802369375432736788',
	},
	database: {
		url: 'mongodb://localhost/the-grand-calcutron',
		maxSlots: 5,
	},
	levels: [
		{
			id:'795222366342217739', // 0/0 Germ
			image:'https://c1.scryfall.com/file/scryfall-cards/art_crop/front/9/e/9ecc467e-b345-446c-b9b7-5f164e6651a4.jpg?1598311624',
			points: 0,
		},
		{
			id:'794698510582022154', // 1/1 Goblin
			image:'https://c1.scryfall.com/file/scryfall-cards/art_crop/front/6/0/60f874f9-7ac2-4d1a-97e3-722db719cd1c.jpg?1584752869',
			points: 1,
		},
		{
			id: '795222316614418462', // 2/2 Zombie
			image: 'https://c1.scryfall.com/file/scryfall-cards/art_crop/front/8/e/8e214f84-01ee-49c1-8801-4e550b5ade5d.jpg?1572370688',
			points: 5,

		},
		{
			id: '795222402387935232', // 3/3 Elk
			image: 'https://c1.scryfall.com/file/scryfall-cards/art_crop/front/d/2/d270aeed-b15f-46f9-97ba-ccce562caefa.jpg?1598311679',
			points: 10,
		},
		{
			id: '795443197126901810', // 4/4 Angel
			image: 'https://c1.scryfall.com/file/scryfall-cards/art_crop/front/6/a/6ac609aa-49d1-4330-b718-a90b0560da52.jpg?1592709988',
			points: 15,
		},
		{
			id: '795443224932122665', // 5/5 Demon
			image: 'https://c1.scryfall.com/file/scryfall-cards/art_crop/front/5/4/545639fc-e521-41f2-81b2-a671007321eb.jpg?1562229670',
			points: 20,
		},
		{
			id: '795443242967629864', // 6/6 Titan
			image: 'https://c1.scryfall.com/file/scryfall-cards/art_crop/front/a/0/a0b6a71e-56cb-4d25-8f2b-7a4f1b60900d.jpg?1606762217',
			points: 25,
		},
	],
};