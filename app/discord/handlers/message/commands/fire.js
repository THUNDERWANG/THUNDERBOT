const winston = require('winston');

module.exports = {
	name: 'fired',
	aliases: ['fire'],
	description: 'announce that the draft has fired',
	async execute(message) {
		try {
			await message.channel.send('The draft has fired! Good luck and please save your decklists :pray:');
		} catch (error) {
			winston.error(error);
		}
	},
};