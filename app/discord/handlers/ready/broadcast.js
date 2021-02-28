const { cubeChatChannel } = require('config').discord;
const winston = require('winston');

module.exports = (discordClient) => {
	setInterval(async () => {
		try {
			const channel = discordClient.channels.cache.get(cubeChatChannel);
			await channel.send('Please don\'t forget to post your Xmage gamelog files :pray:');
			winston.info('broadcast sent');
		} catch (error) {
			winston.error(error);
		}
	}, 86400000);
	winston.info('Broadcast set');
};
