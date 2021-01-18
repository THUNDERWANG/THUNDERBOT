module.exports = {
	name: 'roll',
	aliases: ['die', 'rng'],
	args: true,
	usage: ['[d100 or 3d100]'],
	cooldown: 3,
	description: 'generate a number from 1-X',
	async execute(message, args) {
		try {
			if (args.length > 1) return;
			let reply = 'Invalid argument. The max number of rolls is 10 and the max die size is 100. Try .roll d100 or .roll 3d100';
			const basicPattern = /^([1-9]\d{0,1}|[1][0][0])$/;
			const dPattern = /^(([1-9]|[1][0]){0,1}d([1-9]\d{0,1}|[1][0][0]))$/;
			if (args[0].match(basicPattern)) {
				reply = `:game_die: <@${message.author.id}> rolled ${(Math.floor(Math.random() * args[0]) + 1)} :game_die:`;
			} else if (args[0].match(dPattern)) {
				const [quantity, size] = args[0].split('d');
				if (!quantity) return this.execute(message, [size]);
				reply = `:game_die: <@${message.author.id}> rolled `;
				for (let i = 0;i < quantity; i++) {
					reply += (Math.floor(Math.random() * size) + 1) + ', ';
				}
				reply = reply.slice(0, -2) + ' :game_die:';
			}
			await message.channel.send(reply, { allowedMentions: { parse: [] } });
		} catch (error) {
			message.channel.send('something went wrong!');
			console.error(error);
		}
	},
};