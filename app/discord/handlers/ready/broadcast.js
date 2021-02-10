const { cubeChatChannel } = require('config').discord;
const client = require('../../../../index.js');
const winston = require('winston');

module.exports = () => {
	setInterval(async () => {
		try {
			const channel = client.channels.cache.get(cubeChatChannel);
			await channel.send('Please don\'t forget to post your Xmage gamelog files :pray:');
			winston.info('broadcast sent');
		} catch (error) {
			winston.error(error);
		}
	}, 86400000);
	winston.info('Broadcast set');
};
