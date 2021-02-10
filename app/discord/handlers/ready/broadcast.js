const { cubeChatChannel } = require('config').discord;
const client = require('../../../../index.js');

module.exports = () => {
	setInterval(async () => {
		try {
			const channel = client.channels.cache.get(cubeChatChannel);
			await channel.send('Please don\'t forget to post your Xmage gamelog files :pray:');
			console.log('broadcast sent');
		} catch (error) {
			console.error(error);
		}
	}, 86400000);
	console.log('broadcast set');
};
