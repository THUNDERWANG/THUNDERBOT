module.exports = {
	name: 'purge',
	args: true,
	cooldown: 2,
	usage: ['[number'],
	modOnly: true,
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
			message.channel.bulkDelete(arg + 1);
		} catch (error) {
			console.error(error);
		}
	},
};