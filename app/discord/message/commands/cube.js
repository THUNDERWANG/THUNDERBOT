const Discord = require('discord.js');
const db = require('../../../database/index.js');

module.exports = {
	name: 'cube',
	args: true,
	cooldown: 2,
	usage: ['[add], [delete], [me], [@tag]'],
	description: 'add/remove a cube link',
	async execute(message, args) {
		try {
			if (args.length > 1) return; // prevents people from using .cube add <cube name>--will turn into a onMessage check in the future
			const maxSlots = 5;
			const domains = ['cubetutor.com', 'cubecobra.com'];
			const arg = args[0];
			if (arg === 'me') {
				const response = await db.cubes.findAll({ where: { discordTag: message.author.tag } });
				const cubes = JSON.parse(JSON.stringify(response));
				if (cubes.length === 0) return message.channel.send(`<@${message.author.id}> has not set any cubes!`, { allowedMentions: { repliedUser: false } });
				const reply = new Discord.MessageEmbed()
					.setColor(message.member.roles.highest.color)
					.setTitle(`${message.author.tag}'s Cubes`)
					.setThumbnail(message.author.avatarURL());
				cubes.forEach((cube, index) => {
					if (cube) reply.addFields({ name: `${index + 1}. ${cube.name}`, value: cube.link });
				});
				message.channel.send(reply);

			} else if (arg === 'add') {
				const response = await db.users.findOrCreate({
					where: { discordTag: message.author.tag },
					include: db.cubes,
				});
				const user = response[0].toJSON();
				if (user.cubes && user.cubes.length >= maxSlots) return await message.channel.send(`<@${message.author.id}> has no more open slots!`, { allowedMentions: { parse: [] } });
				await message.channel.send('**Enter __cube name__ or *cancel* **');
				const filterName = input => input.author.id === message.author.id;
				const collectorName = await message.channel.awaitMessages(filterName, { max: 1, time: 45000, errors: ['time'] });
				const inputName = collectorName.first().content.toLowerCase();
				if (inputName === 'cancel' || inputName.startsWith('.cube')) {
					return await message.channel.send(`<@${message.author.id}> has cancelled`, { allowedMentions: { parse: [] } });
				}
				await message.channel.send('**Enter __cube URL__ or *cancel* **');
				const filterURL = input => {
					try {
						const inputURL = input.content.toLowerCase();
						if (input.author.id !== message.author.id) return false;
						if (inputURL === 'cancel' || inputURL.startsWith('.cube')) return true;
						if (!domains.includes(new URL(inputURL).hostname)) throw new Error('Wrong domain');
						// new URL() will throw an error if the url isn't valid
						return true;
					} catch (error) {
						let reply = '**URL not valid. Try again.**';
						if (error.message === 'Wrong domain') reply = '**Domain must be Cube Cobra/Tutor. Try again.**';
						message.channel.send(reply);
						return false;
					}
				};
				const collectorURL = await message.channel.awaitMessages(filterURL, { max: 1, maxProcessed: 6, time: 45000, dispose: true, errors: ['time'] });
				const inputURL = collectorURL.first().content.toLowerCase();
				if (inputURL === 'cancel' || inputURL.startsWith('.cube')) {
					return await message.channel.send(`<@${message.author.id}> has cancelled`, { allowedMentions: { parse: [] } });
				}
				await db.cubes.create({ name: collectorName.first().content, link: collectorURL.first().content, discordTag: user.discordTag, userId: user.id });
				await message.channel.send(`<@${message.author.id}> has added **${collectorName.first().content}**`, { allowedMentions: { parse: [] } });

			} else if (args[0] === 'delete' || args[0] === 'remove') {
				const response = await db.cubes.findAll({ where: { discordTag: message.author.tag } });
				const cubes = JSON.parse(JSON.stringify(response));
				if (cubes.length === 0) return message.channel.send(`<@${message.author.id}> has not set any cubes!`, { allowedMentions: { parse: [] } });
				await message.channel.send('**Enter __number__ or *cancel* **');
				const reply = new Discord.MessageEmbed()
					.setColor(message.member.roles.highest.color)
					.setTitle(`${message.author.tag}'s Cubes`)
					.setThumbnail(message.author.avatarURL());
				cubes.forEach((cube, index) => {
					if (cube) reply.addFields({ name: `${index + 1}. ${cube.name}`, value: cube.link });
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
						message.channel.send(`<@${message.author.id}> did not select a valid choice. Try another number.`, { allowedMentions: { parse: [] } });
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
				// mentioning users on mobile uses a different syntax than mentioning on a computer, it seems
				// mobile ex. <@801556487038173214>
				// computer ex. <@!801556487038173214> (notice the !)
				let userId = null;
				if (arg.startsWith('<@!')) {
					userId = arg.slice(3, -1);
				} else {
					userId = arg.slice(2, -1);
				}
				const member = message.guild.members.cache.get(userId);
				if (!member) return await message.channel.send('Member not found');
				const response = await db.cubes.findAll({ where: { discordTag: member.user.tag } });
				const cubes = JSON.parse(JSON.stringify(response));
				if (cubes.length === 0) return message.channel.send(`${arg} has not set any cubes!`, { users: [] });
				const reply = new Discord.MessageEmbed()
					.setColor(message.guild.members.cache.get(userId).roles.highest.color)
					.setTitle(`${member.user.tag}'s Cubes`)
					.setThumbnail(message.guild.members.cache.get(userId).user.avatarURL());
				cubes.forEach((cube, index) => {
					if (cube) reply.addFields({ name: `${index + 1}. ${cube.name}`, value: cube.link });
				});
				await message.channel.send(reply);
			}

		} catch (error) {
			let reply = `<@${message.author.id}>, something went wrong`;
			if (error.name === 'SequelizeUniqueConstraintError') {
				reply = `<@${message.author.id}>'s tag already exists`;
				console.error(error.toString());
			} else if (error.size === 0) { // when the collector times out, it throws a Discord collection that extends Map
				reply = `<@${message.author.id}>'s connection has timed out. Please start over.`;
			}
			message.channel.send(reply, { allowedMentions: { parse: [] } });
		}
	},
};