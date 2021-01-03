module.exports = {
	name: 'roll',
	aliases: ['die'],
	args: true,
	usage: ['[some number]'],
	description: 'roll a die',
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