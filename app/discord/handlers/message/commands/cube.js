const Discord = require('discord.js');
const User = require('../../../../database/models/user.model.js');
const Joi = require('joi');
const maxSlots = require('config').database;
const winston = require('winston');

module.exports = {
	name: 'cube',
	args: true,
	cooldown: 2,
	guildOnly: true,
	usage: ['[add], [delete], [me], [@tag]'],
	description: 'add/remove a cube link',
	async execute(message, args) {

		const arg = args[0];
		const { reply, replyToAuth, replyEmbed, discordTag, userId } = message.helpers;

		try {
			// add cubes
			if (arg === 'add') {
				const user = await User.findUserAndUpdate(userId, { discordTag });
				const { cubes } = user;
				if (cubes && cubes.length >= maxSlots) return await replyToAuth('has no more open slots!');

				await reply(':pencil: **Enter __cube name__ or __"cancel"__ ** :pencil:');

				// input must be from same user
				const filterName = input => input.author.id === message.author.id;

				// create name collector
				const collectorName = await message.channel.awaitMessages(filterName, { max: 1, time: 45000, errors: ['time'] });

				// return on "cancel or ".cube" to prevent opening a second collector
				const inputName = collectorName.first().content.trim();
				if (inputName.toLowerCase() === 'cancel' || inputName.toLowerCase().startsWith('.cube')) return await replyToAuth('has cancelled');

				await reply(':link: **Enter __cube URL__ or __"cancel"__ ** :link:');

				const filterURL = input => {
					if (input.author.id !== message.author.id) return false;

					const inputURL = input.content.toLowerCase().trim();
					if (inputURL.startsWith('.cube') || inputURL.startsWith('cancel')) return true;
					// must be from a valid domain name
					const validation = Joi.validateCubeURL(inputURL);
					if (validation.error) {
						reply('Domain must be Cube Cobra/Tutor. Try again.');
						return false;
					}
					return true;
				};

				const collectorURL = await message.channel.awaitMessages(filterURL, { max: 1, maxProcessed: 6, time: 45000, dispose: true, errors: ['time'] });
				const inputURL = collectorURL.first().content.toLowerCase();
				if (inputURL === 'cancel' || inputURL.startsWith('.cube')) return await replyToAuth('has cancelled');

				cubes.push({ name: inputName, link: inputURL });

				await user.save();
				await replyToAuth(`has added **${inputName}**`);

			} else if (arg === 'delete' || arg === 'remove') {
				const user = await User.findUser(userId);
				if (!user || !user.cubes || !user.cubes.length) {
					return await reply(`<@!${userId}> has not set any cubes!`);
				}
				const { cubes } = user;

				const embed = new Discord.MessageEmbed()
					.setTitle(':1234: **Enter __number__ or __"cancel"__** :1234:')
					.setColor(message.guild.members.cache.get(userId).roles.highest.color)
					.setDescription(`**${discordTag}'s Cubes**`)
					.setThumbnail(message.author.avatarURL());
				user.cubes.forEach((cube, index) => { if (cube) embed.addFields({ name: `${index + 1}. ${cube.name}`, value: cube.link }); });
				await replyEmbed(embed);

				// input must be between 1 - cubes.length
				const filterChoice = input => {
					if (input.author.id !== userId) return false;
					const inputChoice = input.content.toLowerCase().trim();
					if (inputChoice === 'cancel' || inputChoice.startsWith('.cube')) return true;
					const validation = Joi.number().min(1).max(cubes.length).validate(inputChoice);
					if (validation.error) {
						replyToAuth('did not select a valid number. Try another number');
						return false;
					}
					return true;
				};

				const collectorChoice = await message.channel.awaitMessages(filterChoice, { max: 1, time: 10000, dispose: true, errors: ['time'] });
				let inputChoice = collectorChoice.first().content.toLowerCase();
				if (inputChoice === 'cancel') return replyToAuth('has cancelled');
				const selectedCube = cubes[--inputChoice];

				// delete cube from database
				const payload = { $pull: { cubes: selectedCube } };
				await User.findUserAndUpdate(userId, payload);
				await replyToAuth(`has deleted **${selectedCube.name}**`);


				// valid syntaxes:
				// .cube @THUNDERWANG#1234 (parsed as <@!986623452123> or <@986623452123>)
				// .cube `@THUNDERWANG#1234` (markdown)
			} else if (arg.startsWith('<@') && arg.endsWith('>')) {
				// <@! is for nicknames
				const targetId = (arg.startsWith('<@!')) ? arg.slice(3, -1) : arg.slice(2, -1);

				const member = message.guild.members.cache.get(targetId);
				if (!member) return await reply('The member could not be found in guild! :thinking:');

				const user = await User.findUser(targetId);
				if (!user || !user.cubes || !user.cubes.length) {
					await reply(`<@!${targetId}> has not set any cubes!`);
					return null;
				}

				const embed = new Discord.MessageEmbed()
					.setColor(member.roles.highest.color)
					.setTitle(`${member.user.tag}'s Cubes`)
					.setThumbnail(member.user.avatarURL());
				user.cubes.forEach((cube, index) => { if (cube) embed.addFields({ name: `${index + 1}. ${cube.name}`, value: cube.link }); });

				await replyEmbed(embed);

				// parse markdown `@THUNDERWANG#1234`
			} else if (arg.startsWith('`')) {
				let markDownText = args.join('').trim();
				if (markDownText.startsWith('`') && markDownText.endsWith('`')) {
					markDownText = markDownText.slice(1, -1).trim();
					if (markDownText.startsWith('@')) markDownText = markDownText.slice(1);
				}

				let memberId = '';
				const member = message.guild.members.cache.find(mem => (mem.user.tag.toLowerCase() === markDownText));
				if (member) memberId = member.id;
				this.execute(message, [`<@!${memberId}>`]);

			} else if (arg === 'me') {
				this.execute(message, [`<@!${userId}>`]);

			} else if (arg.match(/^\d+$/)) { // search by discord Id
				this.execute(message, [`<@!${arg}>`]);

			} else {
				// search by discord username
				const tag = args.join('').trim();
				if (!tag.includes('#')) return;
				this.execute(message, [`\`${tag}\``]);
			}


		} catch (error) {
			// when the collector times out, it throws a Discord collection that extends Map with size 0
			if (error.size === 0) return replyToAuth('\'s connection has timed out. Please start over.');
			winston.error(error.message);
			replyToAuth(', something went wrong :thinking:');
		}
	},
};