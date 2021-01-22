const germify = require('./germify.js');
const welcome = require('./welcome.js');

module.exports = discordClient =>
	discordClient.on('guildMemberAdd', member => {
		germify(member);
		welcome(member);
	});