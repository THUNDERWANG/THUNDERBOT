module.exports = {
	name: 'roll',
	aliases: ['die', 'rng'],
	args: true,
	usage: ['[some number]'],
	description: 'generate a number from 1-X',
	async execute(message, args) {
		try {
			if (parseInt(args[0])) {
				const number = Math.floor(Math.random() * args[0]) + 1;
				message.channel.send(`<@${message.author.id}> rolled a ${number}`, { allowedMentions: { parse: [] } });
			}
		} catch (error) {
			console.error(error);
		}
	},
};