const { modRole } = require('config').discord;

module.exports = message => {
	const { command } = message.checks;
	if (command.modOnly && !message.member.roles.cache.has(modRole)) {
		message.channel.send('Mod only command!');
		throw Error('checkMod failed');
	}
};
