const Discord = require('discord.js');
const db = require('../../../database/index.js');

module.exports = {
	name: 'cube',
	args: true,
	cooldown: 2,
	usage: ['[add], [delete], [me], [<@tag>]'],
	description: 'add/remove a cube link',
	async execute(message, args) {

		try {
			const arg = args[0];
			const domains = ['https://www.cubetutor.com', 'https://cubecobra.com'];
			const maxSlots = 5;

			if (arg === 'me') {
				const response = await db.cubes.findAll({ where: { discordTag: message.author.tag } });
				const cubes = JSON.parse(JSON.stringify(response));
				if (cubes.length === 0) return message.channel.send(`<@${message.author.id}> has not set any cubes!`, { allowedMentions: { repliedUser: false } });
				const reply = new Discord.MessageEmbed()
					.setColor(message.member.roles.highest.color)
					.setTitle(`${message.author.tag}'s Cubes`);
				cubes.forEach((cube, index) => {
					if (cube) reply.addFields({ name: `${index + 1}. ${cube.name}`, value:cube.link });
				});
				message.channel.send(reply);

			} else if (arg === 'add') {
				const response = await db.users.findOrCreate({
					where: { discordTag: message.author.tag },
					include: db.cubes,
				});
				const user = response[0].toJSON();
				if (user.cubes && user.cubes.length >= maxSlots) return message.reply(' has no more open slots!');
				await message.channel.send('**Enter cube name or *cancel* **');
				const filterName = input => input.author.id === message.author.id;
				const collectorName = await message.channel.awaitMessages(filterName, { max: 1, time: 20000, errors: ['time'] });
				if (collectorName.first().content.toLowerCase() === 'cancel') {
					return await message.channel.send(`<@${message.author.id}> has cancelled`, { allowedMentions: { parse: [] } });
				}
				await message.channel.send('**Enter cube URL or *cancel* **');
				const filterURL = input => {
					if (input.author.id !== message.author.id) return false;
					if (input.content.toLowerCase() === 'cancel') return true;
					if (domains.some(domain => input.content.toLowerCase().startsWith(domain))) return true;
					message.channel.send('**URL must be from Cube Cobra/Tutor domain**');
				};
				const collectorURL = await message.channel.awaitMessages(filterURL, { max: 1, maxProcessed: 6, time: 20000, dispose: true, errors: ['time'] });
				if (collectorURL.first().content.toLowerCase() === 'cancel') {
					return await message.channel.send(`<@${message.author.id}> has cancelled`, { allowedMentions: { parse: [] } });
				}
				await db.cubes.create({ name:collectorName.first().content, link: collectorURL.first().content, discordTag: user.discordTag, userId: user.id });
				await message.channel.send(`<@${message.author.id}> has added **${collectorName.first().content}**`, { allowedMentions: { parse: [] } });

			} else if (args[0] === 'delete' || args[0] === 'remove') {
				const response = await db.cubes.findAll({ where: { discordTag: message.author.tag } });
				const cubes = JSON.parse(JSON.stringify(response));
				if (cubes.length === 0) return message.channel.send(`<@${message.author.id}> has not set any cubes!`, { allowedMentions: { parse: [] } });
				await message.channel.send('**Enter number or *cancel* **');
				const reply = new Discord.MessageEmbed()
					.setColor(message.member.roles.highest.color)
					.setTitle(`${message.author.tag}'s Cubes`);
				cubes.forEach((cube, index) => {
					if (cube) reply.addFields({ name: `${index + 1}. ${cube.name}`, value:cube.link });
				});
				message.reply(reply);
				const filterChoice = input => {
					if (input.author.id !== message.author.id) {
						return false;
					} else if (input.content.toLowerCase() === 'cancel') {
						return true;
					} else {
						const int = parseInt(input.content);
						if (int && int > 0 && int <= cubes.length) {
							return true;
						}
						message.channel.send(`<@${message.author.id}> did not select a valid choice`, { allowedMentions: { parse: [] } });
					}
				};
				const collectorChoice = await message.channel.awaitMessages(filterChoice, { max: 1, time: 10000, dispose: true, errors: ['time'] });
				if (collectorChoice.first().content.toLowerCase() === 'cancel') {
					return message.channel.send(`<@${message.author.id}> has cancelled`);
				}
				const deleteIndex = collectorChoice.first().content - 1;
				const selectedCube = response[deleteIndex];
				await selectedCube.destroy();
				await message.channel.send(`<@${message.author.id}> has deleted **${cubes[deleteIndex].name}**`, { allowedMentions: { parse: [] } });

			} else if (arg.startsWith('<@') && arg.endsWith('>')) {
				let discordTag = null;
				let id = arg.slice(2, -1);
				if (id.startsWith('!')) {
					id = id.slice(1);
					discordTag = message.guild.members.cache.get(id).user.tag;
				}
				if (discordTag) {
					const response = await db.cubes.findAll({ where: { discordTag: discordTag } });
					const cubes = JSON.parse(JSON.stringify(response));
					if (cubes.length === 0) return message.channel.send(`${arg} has not set any cubes!`, { users: [] });
					const reply = new Discord.MessageEmbed()
						.setColor(message.guild.members.cache.get(id).roles.highest.color)
						.setTitle(`${discordTag}'s Cubes`);
					cubes.forEach((cube, index) => {
						if (cube) reply.addFields({ name: `${index + 1}. ${cube.name}`, value:cube.link });
					});
					message.channel.send(reply);
				}
			}
		} catch (error) {
			let reply = `<@${message.author.id}>, something went wrong`;
			if (error.name === 'SequelizeUniqueConstraintError') {
				reply = `<@${message.author.id}>'s tag already exists`;
			} else if (!error.size) {
				reply = `<@${message.author.id}> has timed out.`;
			}
			console.error(error.toString());
			message.channel.send(reply, { allowedMentions: { parse: [] } });
		}

	},
};