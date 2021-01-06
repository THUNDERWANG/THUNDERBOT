module.exports = {
	name: 'data',
	description: 'brings up the link to the 3-0 data',
	async execute(message) {
		try {
			await message.channel.send('http://data.cube.pizza');
		} catch (error) {
			console.error(error);
		}
	},
};