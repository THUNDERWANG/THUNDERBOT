const Discord = require('discord.js');
const db = require('../modules/database/index.js');
const levels = require('../modules/levels/index.js');
const configs = require('../../config/configs.js');

// IF YOU ARE GOING TO message.reply() or message.channel.send() AN @ROLES MAKE SURE TO INCLUDE THE OPTION { allowedMentions: { parse: ['users'] } }
// OTHERWISE YOU ARE GOING TO PING EVERYONE IN THE ROLE!!! EMBEDDED MESSAGES ARE SAFE THOUGH.
// EXAMPLE await message.channel.send(`<@${message.author.id}> is a <@&${role.id}>`, { allowedMentions: { parse: [] } });

module.exports = {
	name: 'level',
	description: 'level up/down/next',
	args: true,
	usage: '[all], [me], [up], [down]',
	guildOnly: true,
	cooldown: 0,
	async execute(message, args) {
		try {
			const arg = args[0];

			if (arg === 'all') {
				const description = Array.from(levels.tiersMap.keys()).reduce((descrip, threshold) => (
					descrip + `<@&${levels.tiersMap.get(threshold).id}> | ${threshold}+ wins \n\n`
				), '');
				const messageEmbed = new Discord.MessageEmbed()
					.setColor(message.guild.roles.cache.get(configs.Discord.botId).color)
					.setTitle('Tiers')
					.setDescription(description);
				await message.channel.send(messageEmbed);

			} else if (arg === 'me') {
				const [user] = await db.users.findOrCreate({
					where: { discordTag: message.author.tag },
				});
				const { currentRoleId, nextRoleId, toNext } = levels.controllers.findCurrentNextRoles(levels.tiersMap, user.points);
				const reply = nextRoleId === null ?
					`is a <@&${currentRoleId}> at the **max level** with **${user.points}** points :triumph:`
					: `is a <@&${currentRoleId}> with **${user.points}** points; **${toNext}** more to <@&${nextRoleId}>!`;
				await message.channel.send(`<@${message.author.id}> ${reply}`, { allowedMentions: { parse: [] } });

			} else if (arg === 'up') {
				const [user, created] = await db.users.findOrCreate({
					where: { discordTag: message.author.tag },
					defaults: { points: 1 },
				});
				let points = user.points;
				if (!created) {
					await user.increment('points');
					points++;
				}
				if (levels.tiersMap.has(points)) {
					const roleId = levels.tiersMap.get(points).id;
					await message.member.roles.add(roleId);
					const roleColor = message.guild.roles.cache.get(roleId).color;
					const messageEmbed = new Discord.MessageEmbed()
						.setColor(roleColor)
						.setTitle(':fire: LEVEL UP :fire:')
						.setImage(levels.tiersMap.get(points).image)
						.setDescription(`<@${message.author.id}> has reached <@&${roleId}> with **${points}** points!`);
					return await message.channel.send(messageEmbed);
				}
				await message.channel.send(`<@${message.author.id}> now has **${points}** points. :confetti_ball:`, { allowedMentions: { parse: [] } });

			} else if (arg === 'down') {
				const [user] = await db.users.findOrCreate({
					where: { discordTag: message.author.tag },
				});
				let points = user.points;
				if (points > 0) {
					await user.decrement('points');
					if (levels.tiersMap.has(points)) {
						const roleId = levels.tiersMap.get(points).id;
						await message.member.roles.remove(roleId);
						return await message.channel.send(`<@${message.author.id}> now has **${--points}** points`, { allowedMentions: { parse: [] } });
					}
					return await message.channel.send(`<@${message.author.id}> now has **${--points}** points.`, { allowedMentions: { parse: [] } });
				}
				message.channel.send(`<@${message.author.id}> can not go below 0 points!`, { allowedMentions: { parse: [] } });
			}
		} catch (error) {
			const reply = error.name === 'SequelizeUniqueConstraintError' ? 'That tag already exists.' : error.message;
			message.reply(reply);
			console.error(error);
		}
	},
};