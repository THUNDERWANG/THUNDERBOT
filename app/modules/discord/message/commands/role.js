const { xmageId, triceId } = require('config').Discord;

module.exports = {
	name: 'role',
	args: true,
	cooldown: 2,
	usage: ['[add role], [remove role]'],
	description: 'adds xmage/cockatrice role',
	async execute(message, args) {
		try {
			if (args[0] === 'add') {
				if (args[1] === 'xmage') {
					await message.member.roles.add(xmageId);
				} else if (args[1] === 'trice') {
					await message.member.roles.add(triceId);
				}
			} else if (args[0] === 'remove') {
				if (args[1] === 'xmage') {
					await message.member.roles.remove(xmageId);
				} else if (args[1] === 'trice') {
					await message.member.roles.remove(triceId);
				}
			}
		} catch (error) {
			console.error(error);
		}
	},
};
