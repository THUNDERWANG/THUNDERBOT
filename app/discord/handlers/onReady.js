const fs = require('fs');
const winston = require('winston');

// load all handlers into an array
const handlerFiles = fs.readdirSync('app/discord/handlers/ready').filter(file=>file.endsWith('.js'));
const handlers = handlerFiles.map(file => require(`./ready/${file}`));

module.exports = discordClient => {
	discordClient.once('ready', () => {
		try {
			handlers.forEach(handler=>handler(discordClient));
			winston.info('Bzz, THUNDERBOT is ready!');
		} catch(error) {
			winston.error(error);
		}
	});
};
