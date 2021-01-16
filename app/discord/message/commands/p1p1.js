const Discord = require('discord.js');

module.exports = {
	name: 'p1p1',
	description: 'generate random pack from Cube Cobra',
	aliases: ['pack'],
	usage: '[your Cube Cobra cube id]',
	args: true,
	cooldown: 5,
	guildOnly: true,
	async execute(message, args) {
		const ranNo = Math.floor(Math.random() * 9999999) + 1;
		const ccURL = `https://cubecobra.com/cube/samplepackimage/${args[0]}/161076${ranNo}`;
		const messageEmbed = new Discord.MessageEmbed()
			.setTitle(`${args[0]} cube\nhttps://cubecobra.com/cube/list/${args[0]}`)
			.setDescription(':thinking: What\'s the pick? :thinking:')
			.setColor(message.member.roles.highest.color)
			.setImage(ccURL);
		await message.channel.send(messageEmbed);
	},
};