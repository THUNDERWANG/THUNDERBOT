const Commando = require('discord.js-commando');
const Discord = require('discord.js');
const User = require('@db/models/user.model.js');
const logger = require('@logger/logger.js');
const { defaultCooldown, botPrefix, botColor } = require('config').discord;
const { findLevel, levels } = require('@features/levels/levels.js');
const { makeReplies } = require('@helpers/helpers.js');

/**
 * ***READ THIS FIRST***
 * IF YOU ARE GOING TO MESSAGE @ROLE, MAKE SURE TO USE THE HELPERS ATTACHED makeReplies
 * OTHERWISE, YOU ARE GOING TO PING EVERYONE IN THE ROLE AND FOLKS WILL GET ANGRY
 * ALTERNATIVELY, YOU CAN JUST SEND A MESSAGE BUT ATTACH THE NoMention OPTION TO PREVENT MENTIONS!
 * See makeReplies for the option.
 * Embedded messages are safe to use without the option though.
 */

module.exports = class LevelCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'level',
      group: 'members',
      memberName: 'level',
      description: 'Level up or find your current level!',
      argsType: 'single',
      guildOnly: true, // ensure this command is guild only!
      argsCount: 1,
      examples: [`${botPrefix}level me`, `${botPrefix}level up`, `${botPrefix}level down`, `${botPrefix}level all`],
      throttling: { usages: 1, duration: defaultCooldown },
      args: [
        {
          key: 'adverb',
          prompt: 'Choose **me**, **all**, **up**, **down**',
          error: `Try ${botPrefix}level **up** or **down** or **me** or **all**`,
          type: 'string',
          oneOf: ['me', 'up', 'down', 'all'],
          wait: 10,
        },
      ],
    });
  }

  // message.guild.members.cache.get(botId).roles.highest.color
  async run(message, { adverb }) {
    const { id: userId, tag: discordTag } = message.author;
    const { replyToAuth } = makeReplies(message);
    const messageEmbed = new Discord.MessageEmbed()
      .setFooter('The Grand Calcutron', 'https://cdn.discordapp.com/avatars/801556487038173214/d6e13480f5540fb44ced81b981c66c10.webp?size=256')
      .setTimestamp();

    try {
      if (adverb === 'me' || adverb === 'all') {
        const points = await User.findPoints(userId);
        const { id, next, image } = findLevel(points);
        const description = next ? `<@!${userId}> is a <@&${id}> with **${points}** points`
          : `<@!${userId} is a <@&${id}> at the **max level** with **${points}** points :triumph:`;
        messageEmbed
          .setColor(botColor)
          .setTitle(':ladder: **__Levels__** :ladder:')
          .setImage(image)
          .setDescription(description);
        levels.forEach((level) => {
          messageEmbed.addField(level.name, `${level.points} points`, true);
        });
        message.say(messageEmbed);

      } else if (adverb === 'up') {
        const points = await User.levelUp(userId, discordTag);
        const level = findLevel(points);
        await message.member.roles.add(level.id);
        // promote user if necessary
        if (points === level.points) {
          const nextColor = message.guild.roles.cache.get(level.id).color;
          messageEmbed
            .setColor(nextColor)
            .setTitle(':fire: **__LEVEL UP__** :fire:')
            .setImage(level.image)
            .setThumbnail(message.guild.members.cache.get(userId).user.avatarURL())
            .setDescription(`**<@!${message.author.id}> \n <@&${level.id}> \nPoints: __${points}__**`);
          return message.say(messageEmbed);
        }

        let description = `<@!${userId}> now has __${points}__ points!\n`;
        description = !level.next
          ? `**${description}:triumph: YOU ARE AT THE FINAL LEVEL :triumph:**`
          : `**${description}__${level.next.points - points}__ more until <@&${level.next.id}>**`;

        messageEmbed
          .setColor(message.guild.members.cache.get(userId).roles.highest.color) // set color
          .setTitle(':muscle: Experience Gain :muscle:')
          .setThumbnail(message.guild.members.cache.get(userId).user.avatarURL())
          .setDescription(description);
        message.say(messageEmbed);
        message.say('https://tenor.com/view/bugs-bunny-strong-boxing-showing-off-guns-gif-16048234');

      } else if (adverb === 'down') {
        const user = await User.findUser(userId);
        if (!user || !user.points) return replyToAuth('can not go below 0 points!');

        // remove previous level if needed
        const level = findLevel(user.points);
        if (user.points === level.points) message.member.roles.remove(level.id);
        user.points--;
        await user.save();

        return replyToAuth(`now has **${user.points}** points`);
      }
    } catch (error) {
      message.say('Something went wrong!');
      logger.error(error);
    }
  }
};
