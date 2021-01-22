const Discord = require('discord.js');
const { cubeMtgaWebhookId, cubeMtgaWebhookToken, syndicateMTGAWebhookId, syndicateMTGAWebhookToken } = require('config').get('Discord');

module.exports = async (message) => {
	try {
		if (message.author.username !== 'MTGA Arena Daily Deal' && !message.webHookID) return;
		// message.content === Here are the #MTGArena Daily Deals for today! #MTG #MTGA https://t.co/Tb6arU7O7z@@@@@https://pbs.twimg.com/media/EsM6mCLWMAgggmj.jpg
		let [tweet, media] = message.content.split('@@@@@');
		if (!tweet) tweet = 'Here are the #MTGArena Daily Deals for today!';
		const comment = tweet.slice(0, tweet.lastIndexOf('https://'));
		const url = tweet.slice(tweet.lastIndexOf('https://'));
		const images = media.split(',');
		const embed = images.map((image, index) => {
			if (index === 0) {
				return {
					title: ':trumpet: MTGA Arena Daily Deal :trumpet:',
					url: url,
					description: `${comment}`,
					thumbnail: {
						url:
							'https://pbs.twimg.com/profile_images/1338516635661918208/N2oDUhgY_400x400.jpg',
					},
					color: 1127128,
					image: { url: images[0] },
				};
			} else {
				return {
					url: image,
					image: { url: image },
					color: 1127128,
				};
			}
		});

		const cubeMTGAWebhook = new Discord.WebhookClient(cubeMtgaWebhookId, cubeMtgaWebhookToken);
		const syndicateMTGAWebhook = new Discord.WebhookClient(syndicateMTGAWebhookId, syndicateMTGAWebhookToken);

		const reply = {
			username: 'The Grand Calcutron',
			avatarURL: 'https://i.imgur.com/IxuDER2.jpeg',
			embeds: embed,
		};
		await cubeMTGAWebhook.send(reply);
		await syndicateMTGAWebhook.send(reply);
	} catch (error) {
		console.error(error);
	}
};
