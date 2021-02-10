const { xmageRole, triceRole } = require('config').discord;
const winston = require('winston');

module.exports = {
	name: 'role',
	args: true,
	cooldown: 2,
	guildOnly: true,
	usage: ['[add <role>], [remove <role>]'],
	description: 'add/remove xmage/cockatrice role',
	async execute(message, args) {
		try {
			if (args[0] === 'add') {
				if (args[1] === 'xmage') {
					await message.member.roles.add(xmageRole);
					await message.channel.send(`<@${message.author.id}> added <@&${xmageRole}>`, { allowedMentions: { parse: [] } });
				} else if (args[1] === 'trice' || args[1] === 'cockatrice') {
					await message.member.roles.add(triceRole);
					await message.channel.send(`<@${message.author.id}> added <@&${triceRole}>`, { allowedMentions: { parse: [] } });
				}
			} else if (args[0] === 'remove') {
				if (args[1] === 'xmage') {
					await message.member.roles.remove(xmageRole);
					await message.channel.send(`<@${message.author.id}> removed <@&${xmageRole}>`, { allowedMentions: { parse: [] } });
				} else if (args[1] === 'trice' || args[1] === 'cockatrice') {
					await message.member.roles.remove(triceRole);
					await message.channel.send(`<@${message.author.id}> removed <@&${triceRole}>`, { allowedMentions: { parse: [] } });
				}
			}
		} catch (error) {
			winston.error(error);
		}
	},
};
