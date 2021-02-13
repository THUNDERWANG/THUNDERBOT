const winston = require('winston');

module.exports = {
	name: 'purge',
	args: true,
	cooldown: 2,
	usage: ['[number]'],
	modOnly: true,
	guildOnly: true,
	description: 'remove messages',
	async execute(message, args) {
		const { reply } = message.helpers;
		try {
			const arg = parseInt(args[0]);
			if (!arg) {
				return reply('Not a valid number');
			}
			if (arg > 20) {
				return reply('20 messages is the limit per command');
			}
			await message.channel.bulkDelete(arg + 1);
		} catch (error) {
			if (error.message.match(/14 days/)) reply('only messages less than 14 days old can be purged');
			winston.error(error);
		}
	},
};