const modId = require('config').Discord.modId;

module.exports = message => {
	if (!message.member.roles.cache.has(modId)) {
		message.channel.send('Mod only command!');
		throw Error('checkMod');
	}

};
