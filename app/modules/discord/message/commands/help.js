const Discord = require('discord.js');
const { botId, botPrefix } = require('config').Discord;

module.exports = {
	name: 'help',
	description: 'get list of commands',
	aliases: ['commands'],
	args: false,
	guildOnly: true,
	execute(message) {
		try {
			const messageEmbed = new Discord.MessageEmbed()
				.setColor(message.guild.roles.cache.get(botId).color)
				.setTitle('Commands');
			message.client.commands.forEach(command => {
				const name = `${botPrefix}${command.name}`;
				const value = command.modOnly ? `(mod only) ${command.description}` : `${command.description}`;
				messageEmbed.addFields(
					{ name: name, value: value });
			});
			return message.channel.send(messageEmbed);
		} catch (error) {
			console.error(error);
		}

	},
};