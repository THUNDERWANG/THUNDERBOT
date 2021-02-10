const Discord = require('discord.js');
const { defaultCooldown } = require('config').discord;

const cooldowns = new Discord.Collection();
/**	creates a discord collection/map called "cooldowns" with the following mapping:

cooldowns = {
	<commandName1>: {
		authorId1: cooldownExpiration: some time in ms,
		authorId2: cooldownExpiration: some time in ms,
	},
	<commandName2>: {
		authorId1: cooldownExpiration: some time in ms
	},
}
*/

module.exports = message => {
	const { command } = message.checks;
	const { replyToAuth } = message.helpers;

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}
	const authors = cooldowns.get(command.name);
	if (!authors.has(message.author.id)) {
		const cooldown = (command.cooldown || defaultCooldown) * 1000;
		authors.set(message.author.id, Date.now() + cooldown);
		setTimeout(() => { authors.delete(message.author.id); }, cooldown);
	} else {
		const expirationTime = authors.get(message.author.id);
		const time = Date.now();
		if (expirationTime > Date.now()) {
			replyToAuth(`must wait ${Math.ceil((expirationTime - time) / 1000)} seconds`);
			throw new Error('checkCool');
		}
	}
};
