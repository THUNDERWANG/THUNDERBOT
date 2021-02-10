const fs = require('fs');

// load all handlers into an array
const handlerFiles = fs.readdirSync('app/discord/handlers/ready').filter(file=>file.endsWith('.js'));
const handlers = handlerFiles.map(file => require(`./ready/${file}`));

module.exports = discordClient => {
	discordClient.once('ready', () => {
		try {
			handlers.forEach(handler=>handler());
			console.log('Bzz, THUNDERBOT is ready!');
		} catch(error) {
			console.error(error);
		}
	});
};
