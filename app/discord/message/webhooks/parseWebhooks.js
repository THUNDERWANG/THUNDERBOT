const Discord = require('discord.js');
const { onlineCubeDraftsServerId, mtgaDailyDealChannelId, botId } = require('config').Discord;
const { loadImage } = require('canvas');

module.exports = async message => {
	try {
		if (message.author.username !== 'MTGA Daily Deal' && !message.webHookID && message.content.toLowerCase().includes('here are')) return;
		const onlineCubeDrafts = await message.client.guilds.fetch(onlineCubeDraftsServerId);
		const mtgaDailyDealChannel = onlineCubeDrafts.channels.cache.get(mtgaDailyDealChannelId);

		// message.content === Here are the #MTGArena Daily Deals for today! #MTG #MTGA https://t.co/Tb6arU7O7z
		// @@@@@<profile pic>
		// @@@@@<image1, image2...>

		const [tweet, profilePic, imageStrings] = message.content.split('@@@@@');
		if (!imageStrings) return;
		const comment = tweet.slice(0, tweet.lastIndexOf('https://'));
		const tweetURL = tweet.slice(tweet.lastIndexOf('https://'));

		// create an array of objects with the following fields: url and width
		const imageUrls = imageStrings.split(',');
		let images = imageUrls.map(url=>(loadImage(url)));
		images = await Promise.all(images);
		images = images.map((image, index)=>({ url: imageUrls[index], width: image.width }));
		images.sort((a, b) => b.width - a.width);

		// send first image
		const messageEmbed = new Discord.MessageEmbed()
			.setColor(message.guild.members.cache.get(botId).roles.highest.color)
			.setTitle(':mega: Daily Deal :mega:')
			.setAuthor('@ArenaDailyDeal', profilePic, tweetURL)
			.setDescription(comment)
			.setThumbnail('https://i.imgur.com/7tVYAeF.png')
			.setURL(tweetURL)
			.setImage(images.shift().url);

		const messageResponse = await mtgaDailyDealChannel.send(messageEmbed);
		await messageResponse.crosspost();

		// send the rest of the images in separate new embed messages
		for (const extraImage of images) {
			const discordEmbed = new Discord.MessageEmbed()
				.setColor(message.guild.members.cache.get(botId).roles.highest.color)
				.setImage(extraImage.url);
			const extraEmbeds = await mtgaDailyDealChannel.send(discordEmbed);
			await extraEmbeds.crosspost();
		}

	} catch (error) {
		console.error(error);
	}
};
