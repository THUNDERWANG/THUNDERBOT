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
		try {
			const arg = parseInt(args[0]);
			if (!arg) {
				return message.channel.send('Not a valid number');
			}
			if (arg > 20) {
				return message.channel.send('20 messages is the limit per command');
			}
			await message.channel.bulkDelete(arg + 1);
		} catch (error) {
			if (error.message.match(/14 days/)) return message.channel.send('you can only delete messages less than 14 days old');
			winston.error(error);
		}
	},
};