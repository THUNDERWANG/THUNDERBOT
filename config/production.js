require('dotenv').config();

module.exports = {
	discord: {
		botId: process.env.DISCORD_BOT_ID,
		botToken: process.env.DISCORD_BOT_TOKEN,
		botPrefix: process.env.DISCORD_BOT_PREFIX,
		defaultCooldown: 3, // in seconds
		modRole: '313744722654920708',
		xmageRole: '585313738169778177',
		triceRole: '585314755976364043',
		cubeChatChannel: '306902973706141708',
		welcomeChannel: '659117988405837832',
		serverId: '306902973706141708', // Online Cube Drafts Server
		tgcChannel: '802301350510592020', // production tgc channel
	},
	database: {
		url: process.env.MONGO_URL,
		maxSlots: 5,
	},
	levels: [
		{
			id:'585662276212621333', // 0/0 Germ
			image:'https://c1.scryfall.com/file/scryfall-cards/art_crop/front/9/e/9ecc467e-b345-446c-b9b7-5f164e6651a4.jpg?1598311624',
			points: 0,
		},
		{
			id:'585564770078556164', // 1/1 Goblin
			image:'https://c1.scryfall.com/file/scryfall-cards/art_crop/front/6/0/60f874f9-7ac2-4d1a-97e3-722db719cd1c.jpg?1584752869',
			points: 1,
		},
		{
			id: '585564507670052933', // 2/2 Zombie
			image: 'https://c1.scryfall.com/file/scryfall-cards/art_crop/front/8/e/8e214f84-01ee-49c1-8801-4e550b5ade5d.jpg?1572370688',
			points: 5,

		},
		{
			id: '585554548756840475', // 3/3 Elk
			image: 'https://c1.scryfall.com/file/scryfall-cards/art_crop/front/d/2/d270aeed-b15f-46f9-97ba-ccce562caefa.jpg?1598311679',
			points: 10,
		},
		{
			id: '585564850235768844', // 4/4 Angel
			image: 'https://c1.scryfall.com/file/scryfall-cards/art_crop/front/6/a/6ac609aa-49d1-4330-b718-a90b0560da52.jpg?1592709988',
			points: 15,
		},
		{
			id: '585564899061792781', // 5/5 Demon
			image: 'https://c1.scryfall.com/file/scryfall-cards/art_crop/front/5/4/545639fc-e521-41f2-81b2-a671007321eb.jpg?1562229670',
			points: 20,
		},
		{
			id: '585691691181146122', // 6/6 Titan
			image: 'https://c1.scryfall.com/file/scryfall-cards/art_crop/front/a/0/a0b6a71e-56cb-4d25-8f2b-7a4f1b60900d.jpg?1606762217',
			points: 25,
		},
	],

};