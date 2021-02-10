const winston = require('winston');
const fs = require('fs');

// load all handlers into an array
const handlerFiles = fs.readdirSync('app/discord/handlers/guild/').filter(file=>file.endsWith('.js'));
const handlers = handlerFiles.map(file => require(`./guild/${file}`));

module.exports = handlers;

module.exports = discordClient => {
	discordClient.on('guildMemberAdd', member => {
		try{
			handlers.forEach(handler => handler(member));
		} catch(error) {
			winston.error(error);
		}
	});
};
