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

		const { replyToAuth } = message.helpers;
		const [ option, role ] = args;

		try {
			if (option === 'add') {
				if (role === 'xmage') {
					await message.member.roles.add(xmageRole);
					await replyToAuth(`added <@&${xmageRole}>`);
				} else if (role === 'trice' || role === 'cockatrice') {
					await message.member.roles.add(triceRole);
					await replyToAuth(`added <@&${triceRole}>`);
				}
			} else if (option === 'remove') {
				if (role === 'xmage') {
					await message.member.roles.remove(xmageRole);
					await replyToAuth(`removed <@&${xmageRole}>`);
				} else if (role === 'trice' || role === 'cockatrice') {
					await message.member.roles.remove(triceRole);
					await replyToAuth(`removed <@&${triceRole}>`);
				}
			}
		} catch (error) {
			winston.error(error);
		}
	},
};
