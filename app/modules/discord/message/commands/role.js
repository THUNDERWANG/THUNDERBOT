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
					if (!message.member.roles.cache.has(xmageId)) {
						await message.member.roles.add(xmageId);
						await message.channel.send(`<@${message.author.id}> has added <@&${xmageId}>`, { allowedMentions: { parse: [] } });
					}
				} else if (args[1] === 'trice' || args[1] === 'cockatrice') {
					if (!message.member.roles.cache.has(triceId)) {
						await message.member.roles.add(triceId);
						await message.channel.send(`<@${message.author.id}> has added <@&${triceId}>`, { allowedMentions: { parse: [] } });
					}
				}
			} else if (args[0] === 'remove') {
				if (args[1] === 'xmage') {
					if (message.member.roles.cache.has(xmageId)) {
						await message.member.roles.remove(xmageId);
						await message.channel.send(`<@${message.author.id}> has removed <@&${xmageId}>`, { allowedMentions: { parse: [] } });
					}

				} else if (args[1] === 'trice' || args[1] === 'cockatrice') {
					if (message.member.roles.cache.has(triceId)) {
						await message.member.roles.remove(triceId);
						await message.channel.send(`<@${message.author.id}> has removed <@&${triceId}>`, { allowedMentions: { parse: [] } });
					}
				}
			}
		} catch (error) {
			console.error(error);
		}
	},
};
