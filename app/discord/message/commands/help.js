const Discord = require('discord.js');
const { botId, botPrefix, modId } = require('config').Discord;

module.exports = {
	name: 'help',
	description: 'get list of commands',
	aliases: ['commands'],
	args: false,
	guildOnly: true,
	execute(message) {
		try {
			const messageEmbed = new Discord.MessageEmbed()
				.setColor(message.guild.members.cache.get(botId).roles.highest.color)
				.setTitle('__Commands__')
				.setDescription('Feel free to ping a mod for more help!')
				.setThumbnail('https://i.imgur.com/IxuDER2.jpeg');
			message.commands.forEach(command => {
				if (!message.member.roles.cache.has(modId) && command.modOnly) return;
				let name = `${botPrefix}${command.name}`;
				if (command.usage) name += ` ${command.usage}`;
				const value = `${command.description}`;
				messageEmbed.addFields(
					{ name: name, value: value });
			});
			return message.channel.send(messageEmbed);
		} catch (error) {
			console.error(error);
		}

	},
};