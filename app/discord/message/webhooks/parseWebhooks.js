const Discord = require('discord.js');
const { onlineCubeDraftsServerId, mtgaDailyDealChannelId, botId } = require('config').Discord;

module.exports = async message => {
	try {
		if (message.author.username !== 'MTGA Daily Deal' && !message.webHookID) return;
		const onlineCubeDrafts = await message.client.guilds.fetch(onlineCubeDraftsServerId);
		const mtgaDailyDealChannel = onlineCubeDrafts.channels.cache.get(mtgaDailyDealChannelId);

		// message.content === Here are the #MTGArena Daily Deals for today! #MTG #MTGA https://t.co/Tb6arU7O7z@@@@@https://pbs.twimg.com/media/EsM6mCLWMAgggmj.jpg
		let [tweet, media] = message.content.split('@@@@@');

		if (!tweet) tweet = 'Here is the daily MTG Arena content!' + tweet;
		const comment = tweet.slice(0, tweet.lastIndexOf('https://'));
		const tweetURL = tweet.slice(tweet.lastIndexOf('https://'));

		const messageEmbed = new Discord.MessageEmbed()
			.setColor(message.guild.members.cache.get(botId).roles.highest.color)
			.setTitle(':mega: MTGA Daily Deal :mega:')
			.setDescription(comment)
			.setThumbnail('https://pbs.twimg.com/profile_images/1338516635661918208/N2oDUhgY_400x400.jpg')
			.setURL(tweetURL);

		// if no images, send message and return
		if (!media) {
			const messageResponse = await mtgaDailyDealChannel.send(messageEmbed);
			return await messageResponse.crosspost();
		}

		// for the first image, attach image and send embed message
		media = media.split(',');
		messageEmbed.setImage(media.shift());
		const messageResponse = await mtgaDailyDealChannel.send(messageEmbed);
		await messageResponse.crosspost();

		// send the rest of the images in separate new embed messages
		for (const extraImage of media) {
			const discordEmbed = new Discord.MessageEmbed()
				.setColor(message.guild.members.cache.get(botId).roles.highest.color)
				.setImage(extraImage);
			const extraEmbeds = await mtgaDailyDealChannel.send(discordEmbed);
			await extraEmbeds.crosspost();
		}

	} catch (error) {
		console.error(error);
	}
};
