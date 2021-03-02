const { cubeChatChannel } = require('config').discord;
const winston = require('winston');

// use chron job or similar in the future because uptime on heroku isn't stable
module.exports = (discordClient) => {
	setInterval(async () => {
		try {
			const channel = discordClient.channels.cache.get(cubeChatChannel);
			await channel.send('Please don\'t forget to post your Xmage gamelog files :pray:');
			winston.info('broadcast sent');
		} catch (error) {
			winston.error(error);
		}
	}, 172800000);
	winston.info('Broadcast set');
};
