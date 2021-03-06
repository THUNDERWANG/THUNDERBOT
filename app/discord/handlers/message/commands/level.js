const Discord = require('discord.js');
const { findLevel, getDescrip } = require('../../../levels/levels.js');
const { botId } = require('config').discord;
const User = require('../../../../database/models/user.model');
const winston = require('winston');

/**
 * ***READ THIS FIRST***
 * IF YOU ARE GOING TO MESSAGE @ROLE, MAKE SURE TO USE THE HELPERS ATTACHED TO THE MESSAGE OBJECT
 * OTHERWISE, YOU ARE GOING TO PING EVERYONE IN THE ROLE AND SOME FOLKS WILL GET ANGRY
 * ALTERNATIVELY, YOU CAN JUST SEND A MESSAGE BUT ATTACH THE NoMention OPTION TO PREVENT MENTIONS!
 * Embedded messages are safe to use without the option though.
 */

const noMention = {
	allowedMentions: { parse: [] },
};

module.exports = {
	name: 'level',
	description: 'level up/down/next',
	args: true,
	usage: '[all], [me], [up], [down]',
	guildOnly: true,
	cooldown: 2,
	async execute(message, args) {

		const arg = args[0];
		const { reply, replyToAuth, replyEmbed, userId, discordTag } = message.helpers;

		try {
			if (arg === 'all') {
				const description = getDescrip();
				const messageEmbed = new Discord.MessageEmbed()
					.setColor(message.guild.members.cache.get(botId).roles.highest.color)
					.setTitle(':ladder: __Levels__ :ladder:')
					.setThumbnail('https://c1.scryfall.com/file/scryfall-cards/art_crop/front/3/4/3462a3d0-5552-49fa-9eb7-100960c55891.jpg?1610070177')
					.setDescription(description);
				await replyEmbed(messageEmbed);

			} else if (arg === 'me') {
				const user = await User.findUser(userId);
				if (!user) return await message.channel.send(`<@!${message.author.id}> has **0** points!`, noMention);
				const { points } = user;
				// find  current level
				const { id, next } = findLevel(points);
				const stats = next ?
					`is a <@&${id}> with **${points}** points; **${next.points - points}** more to <@&${next.id}>!` :
					`is a <@&${id}> at the **max level** with **${points}** points :triumph:`;
				await reply(`<@!${userId}> ${stats}`);

			} else if (arg === 'up') {
				const payload = { $set: { discordTag }, $inc: { points: 1 } };
				const user = await User.findUserAndUpdate(userId, payload); // upsert included
				const { points } = user;
				if (!Number.isInteger(points) || points < 0) throw new Error('points must be an int >= 0');
				const level = findLevel(points);
				await message.member.roles.add(level.id);
				// promote user if points is on the threshold of the next role
				if (points === level.points) {
					const roleColor = message.guild.roles.cache.get(level.id).color;
					const messageEmbed = new Discord.MessageEmbed()
						.setColor(roleColor)
						.setTitle(':fire: LEVEL UP :fire:')
						.setImage(level.image)
						.setDescription(`<@!${message.author.id}> has reached <@&${level.id}> with **${points}** points!`);
					return await replyEmbed(messageEmbed);
				}
				await reply(`:confetti_ball: <@!${userId}> now has **${points}** points! :confetti_ball:`);

			} else if (arg === 'down') {
				const user = await User.findUser(userId);
				if (!user || !user.points) return await replyToAuth('can not go below 0 points!');

				// remove previous level if needed
				const level = findLevel(user.points);
				if (user.points === level.points) message.member.roles.remove(level.id);
				user.points--;
				await user.save();

				return await replyToAuth(`now has **${user.points}** points`);
			}
		} catch (error) {
			winston.error(error);
			replyToAuth('Something went wrong!');
		}
	},
};