const Discord = require('discord.js');
const { botPrefix, modRole } = require('config').discord;
const winston = require('winston');

module.exports = {
	name: 'help',
	description: 'get list of commands',
	aliases: ['commands'],
	args: false,
	execute(message) {
		try {
			const { replyEmbed } = message.helpers;
			const messageEmbed = new Discord.MessageEmbed()
				.setColor('f1c40f')
				.setTitle('__Commands__')
				.setDescription('Feel free to ping a mod for more help!')
				.setThumbnail('https://i.imgur.com/IxuDER2.jpeg');

			if (message.channel.type === 'GUILD_TEXT') {
				message.checks.commands.forEach(command => {
					if (!message.member.roles.cache.has(modRole) && command.modOnly) return;
					let name = `${botPrefix}${command.name}`;
					if (command.usage) name += ` ${command.usage}`;
					const value = `${command.description}`;
					messageEmbed.addFields({ name, value });
				});
			} else {
				message.checks.commands.forEach(command => {
					if (command.modOnly) return;
					let name = `${botPrefix}${command.name}`;
					if (command.usage) name += ` ${command.usage}`;
					const value = `${command.description}`;
					messageEmbed.addFields({ name, value });
				});
			}
			return replyEmbed(messageEmbed);
		} catch (error) {
			winston.error(error);
		}

	},
};