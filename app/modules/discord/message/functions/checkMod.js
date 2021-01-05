const modId = require('config').Discord.modId;

module.exports = (command, message) => {
	if (command.modOnly && !message.member.roles.cache.has(modId)) {
		message.channel.send('Mod only command!');
		throw Error('checkMod');
	}

};
