module.exports = {
	name: 'roll',
	aliases: ['die', 'rng'],
	args: true,
	usage: ['[d100 or 3d100]'],
	cooldown: 3,
	description: 'generate a number from 1-100',
	async execute(message, args) {

		function roll(arg) {
			const less100 = /^([1-9]\d{0,1}|100)$/;
			const quantDSize = /^(([1-9]|10){0,1}d([1-9]\d{0,1}|100))$/;

			if (arg.match(less100)) return (Math.floor(Math.random() * arg)) + 1;
			if (arg.match(quantDSize)) {
				const [quantity, size] = arg.split('d');
				if (!quantity) return roll(size);
				let numbers = '';
				for (let i = 0;i < quantity; i++) { numbers += roll(size) + ', '; }
				return numbers.slice(0, -2);
			}
		}

		try {
			if (args.length > 1) return;
			let reply = 'Invalid argument. The max number of rolls is 10 and the max die size is 100. Try .roll d100 or .roll 3d100';
			const numbers = roll(args[0]);
			if (numbers) reply = `:game_die: ${message.author} rolled ${numbers} :game_die: `;
			await message.channel.send(reply, { allowedMentions: { parse: [] } });
		} catch (error) {
			message.channel.send('something went wrong!');
			console.error(error);
		}
	},
};