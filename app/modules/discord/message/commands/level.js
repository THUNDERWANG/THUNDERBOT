const Discord = require('discord.js');
const { tierMap, findRoles } = require('../../../levels/index.js');
const db = require('../../../database/index.js');
const configs = require('../../../../config/configs.js');

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
				const description = Array.from(tierMap.keys()).reduce((descrip, threshold) => (
					descrip + `<@&${tierMap.get(threshold).id}> | ${threshold}+ wins \n\n`
				), '');
				const messageEmbed = new Discord.MessageEmbed()
					.setColor(message.guild.roles.cache.get(configs.Discord.botId).color)
					.setTitle('Tiers')
					.setDescription(description);
				await message.channel.send(messageEmbed);

			} else if (arg === 'me') {
				const [user] = await db.users.findOrCreate({ where: { discordTag: message.author.tag } });
				const { current, next, toNext } = findRoles(user.points);
				const reply = next ?
					`is a <@&${current}> with **${user.points}** points; **${toNext}** more to <@&${next}>!` :
					`is a <@&${current}> at the **max level** with **${user.points}** points :triumph:`;
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
				if (tierMap.has(points)) {
					const roleId = tierMap.get(points).id;
					await message.member.roles.add(roleId);
					const roleColor = message.guild.roles.cache.get(roleId).color;
					const messageEmbed = new Discord.MessageEmbed()
						.setColor(roleColor)
						.setTitle(':fire: LEVEL UP :fire:')
						.setImage(tierMap.get(points).image)
						.setDescription(`<@${message.author.id}> has reached <@&${roleId}> with **${points}** points!`);
					return await message.channel.send(messageEmbed);
				}
				const { current } = findRoles(user.points);
				await message.channel.send(`<@${message.author.id}> now has **${points}** points. :confetti_ball:`, { allowedMentions: { parse: [] } });
				await message.member.roles.add(current);

			} else if (arg === 'down') {
				const [user] = await db.users.findOrCreate({
					where: { discordTag: message.author.tag },
				});
				let points = user.points;
				if (points > 0) {
					await user.decrement('points');
					points--;
					if (tierMap.has(points)) {
						const roleId = tierMap.get(points).id;
						await message.member.roles.remove(roleId);
					}
					return await message.channel.send(`<@${message.author.id}> now has **${points}** points.`, { allowedMentions: { parse: [] } });
				}
				message.channel.send(`<@${message.author.id}> can not go below 0 points!`, { allowedMentions: { parse: [] } });
			}
		} catch (error) {
			let reply = 'Something went wrong!';
			if (error.name === 'SequelizeUniqueConstraintError') {
				reply = 'That tag already exists!';
			} else if (error.name === 'TypeError [INVALID_TYPE]') {
				reply = '\'s next level could not be found!';
			}
			console.error(error);
			message.channel.send(`<@${message.author.id}> ${reply}`, { allowedMentions: { parse: [] } });

		}
	},
};