const { xmageId, triceId } = require('config').Discord;

module.exports = {
	name: 'role',
	args: true,
	cooldown: 1,
	usage: ['[add <role>], [remove <role>]'],
	description: 'adds xmage/cockatrice role',
	async execute(message, args) {
		try {
			if (args[0] === 'add') {
				if (args[1] === 'xmage') {
					await message.member.roles.add(xmageId);
					await message.channel.send(`<@${message.author.id}> added <@&${xmageId}>`, { allowedMentions: { parse: [] } });
				} else if (args[1] === 'trice' || args[1] === 'cockatrice') {
					await message.member.roles.add(triceId);
					await message.channel.send(`<@${message.author.id}> added <@&${triceId}>`, { allowedMentions: { parse: [] } });
				}
			} else if (args[0] === 'remove') {
				if (args[1] === 'xmage') {
					await message.member.roles.remove(xmageId);
					await message.channel.send(`<@${message.author.id}> removed <@&${xmageId}>`, { allowedMentions: { parse: [] } });
				} else if (args[1] === 'trice' || args[1] === 'cockatrice') {
					await message.member.roles.remove(triceId);
					await message.channel.send(`<@${message.author.id}> removed <@&${triceId}>`, { allowedMentions: { parse: [] } });
				}
			}
		} catch (error) {
			console.error(error);
		}
	},
};
