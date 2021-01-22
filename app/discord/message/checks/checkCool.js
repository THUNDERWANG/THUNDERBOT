const Discord = require('discord.js');

const cooldowns = new Discord.Collection();

module.exports = checkParams => {
	const { command, message } = checkParams;
	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}
	const timestamps = cooldowns.get(command.name);
	if (!timestamps.has(message.author.id)) {
		const cooldown = (command.cooldown || 1) * 1000;
		timestamps.set(message.author.id, Date.now() + cooldown);
		setTimeout(() => { timestamps.delete(message.author.id); }, cooldown);
	} else {
		const expirationTime = timestamps.get(message.author.id);
		const time = Date.now();
		if (expirationTime > Date.now()) {
			message.channel.send(`<@${message.author.id}>, please wait ${Math.ceil((expirationTime - time) / 1000)} seconds`);
			throw new Error('checkCool');
		}
	}
};
