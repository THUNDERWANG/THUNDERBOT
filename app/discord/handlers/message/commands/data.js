const winston = require('winston');

module.exports = {
	name: 'data',
	description: 'retrieve the 3-0 data',
	async execute(message) {
		try {
			await message.channel.send(':pizza: http://data.cube.pizza :pizza:');
		} catch (error) {
			winston.error(error);
		}
	},
};