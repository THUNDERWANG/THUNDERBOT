const Discord = require('discord.js');
const { mtgaChannelId, botId } = require('config').Discord;

module.exports = async message => {
	try {
		if (message.author.username !== 'MTGA Daily Deal' && !message.webHookID) return;
		// message.content === Here are the #MTGArena Daily Deals for today! #MTG #MTGA https://t.co/Tb6arU7O7z@@@@@https://pbs.twimg.com/media/EsM6mCLWMAgggmj.jpg
		let [tweet, media] = message.content.split('@@@@@');
		if (!tweet) tweet = 'Here are the #MTGArena Daily Deals for today!';
		const comment = tweet.slice(0, tweet.lastIndexOf('https://'));
		const tweetURL = tweet.slice(tweet.lastIndexOf('https://'));
		const images = media.split(',');
		const dealImage = images.shift();
		const messageEmbed = new Discord.MessageEmbed()
			.setColor(message.guild.roles.cache.get(botId).color)
			.setTitle(':trumpet: MTGA Daily Deal :trumpet:')
			.setDescription(comment)
			.setThumbnail('https://pbs.twimg.com/profile_images/1338516635661918208/N2oDUhgY_400x400.jpg')
			.setURL(tweetURL)
			.setImage(dealImage);

		const mtgaChannel = message.guild.channels.cache.get(mtgaChannelId);
		const firstEmbed = await mtgaChannel.send(messageEmbed);
		await firstEmbed.crosspost();

		// attach more deal images if necessary
		const extraDeals = images.map(deal => {
			return new Discord.MessageEmbed()
				.setColor(message.guild.roles.cache.get(botId).color)
				.setImage(deal);
		});

		for (let i = 0;i < extraDeals.length;i++) {
			const extraMessage = await mtgaChannel.send(extraDeals[i]);
			await extraMessage.crosspost();
		}

	} catch (error) {
		console.error(error);
	}
};
