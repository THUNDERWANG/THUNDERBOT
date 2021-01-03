module.exports = {
	name: 'purge',
	args: true,
	cooldown: 3,
	usage: ['[number'],
	description: 'remove messages (mod only)',
	async execute(message, args) {
		try {
			console.log(args);
			if (!message.member.roles.cache.has('313744722654920708')) {
				message.channel.send('Mod only command!');
				return;
			}
			const arg = parseInt(args[0]);
			if (!arg) {
				message.channel.send('Not a valid number');
				return;
			}
			if (arg > 19) {
				message.channel.send('20 messages is the limit per command');
				return;
			}
			const targetMessages = await message.channel.messages.fetch({ limit: arg + 1 });
			targetMessages.forEach(mess => mess.delete());
		} catch (error) {
			console.error(error);
		}
	},
};