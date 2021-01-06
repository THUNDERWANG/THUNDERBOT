const { cubeChatId } = require('config').Discord;

module.exports = client => {
	setInterval(async () => {
		try {
			const channel = client.channels.cache.get(cubeChatId);
			await channel.send('Please don\'t forget to post your Xmage gamelog files :pray:');
		} catch (error) {
			console.error(error);
		}
	}, 345600000);
};
