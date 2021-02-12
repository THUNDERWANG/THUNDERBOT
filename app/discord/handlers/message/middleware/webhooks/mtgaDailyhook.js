const Discord = require('discord.js');
const { serverId, mtgaChannelId } = require('config').discord;
const { loadImage } = require('canvas');
const winston = require('winston');
const { zapier } = require('config').discord;

/**
 * The message will be sent to a private discord channel with @@@@@ as delimiters. Parse from there.
 * Example message:
 * "Here are the #MTGArena Daily Deals for today! #MTG #MTGA https://t.co/Tb6arU7O7z
	@@@@@<profile pic>
	@@@@@<image1, image2...>"
 */

// would much prefer if zapier sent the message directly to the server, but the service costs money.

module.exports = async message => {
	try {
		if (message.author.id !== zapier && !message.content.toLowerCase().includes('here are')) return;
		const onlineCubeDrafts = await message.client.guilds.fetch(serverId);
		const mtgaDailyDealChannel = onlineCubeDrafts.channels.cache.get(mtgaChannelId);

		// parse message (see above for example)
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
			.setColor('#1DA1F2')
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
				.setColor('#1DA1F2')
				.setImage(extraImage.url);
			const extraEmbeds = await mtgaDailyDealChannel.send(discordEmbed);
			await extraEmbeds.crosspost();
		}

	} catch (error) {
		winston.error(error);
	}
};
