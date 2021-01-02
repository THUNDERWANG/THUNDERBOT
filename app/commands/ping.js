module.exports = {
	name: 'ping',
	aliases: ['lag'],
	description: 'get bot/api latency',
	async execute(message) {
		try {
			const userSent = message.createdTimestamp;
			const reply = await message.channel.send('Calculating...');
			const ping = reply.createdTimestamp - userSent;
			reply.edit(`🏓 Bot latency: ${ping} ms 🏓`);
		} catch (error) {
			console.error(error);
		}
	},
};