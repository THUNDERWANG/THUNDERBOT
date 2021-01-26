const Discord = require('discord.js');
const { onlineCubeDraftsServerId, mtgaDailyDealChannelId, botId } = require('config').Discord;

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
			.setColor(message.guild.members.cache.get(botId).roles.highest.color)
			.setTitle(':trumpet: MTGA Daily Deal :trumpet:')
			.setDescription(comment)
			.setThumbnail('https://pbs.twimg.com/profile_images/1338516635661918208/N2oDUhgY_400x400.jpg')
			.setURL(tweetURL)
			.setImage(dealImage);

		const onlineCubeDrafts = await message.client.guilds.fetch(onlineCubeDraftsServerId);
		const mtgaDailyDealChannel = onlineCubeDrafts.channels.cache.get(mtgaDailyDealChannelId);
		const firstEmbed = await mtgaDailyDealChannel.send(messageEmbed);
		await firstEmbed.crosspost();

		// attach more deal images if necessary
		const extraDeals = images.map(deal => {
			return new Discord.MessageEmbed()
				.setColor(message.guild.members.cache.get(botId).roles.highest.color)
				.setImage(deal);
		});

		for (let i = 0;i < extraDeals.length;i++) {
			const extraEmbeds = await mtgaDailyDealChannel.send(extraDeals[i]);
			await extraEmbeds.crosspost();
		}

	} catch (error) {
		console.error(error);
	}
};
