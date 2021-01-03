const Discord = require('discord.js');

module.exports = {
	name: 'help',
	description: 'get list of commands',
	aliases: ['commands'],
	args: false,
	guildOnly: true,
	execute(message) {
		try {
			const messageEmbed = new Discord.MessageEmbed()
				.setColor(message.guild.roles.cache.get(process.env.BOT_ID).color)
				.setTitle('Commands');
			message.client.commands.forEach(command => {
				messageEmbed.addFields(
					{ name: `${process.env.PREFIX}${command.name}`, value: `${command.description}` });
			});
			return message.channel.send(messageEmbed);
		} catch (error) {
			console.error(error);
		}

	},
};