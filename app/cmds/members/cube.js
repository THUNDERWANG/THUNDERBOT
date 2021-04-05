const Commando = require('discord.js-commando');
const Discord = require('discord.js');
const Joi = require('joi');
const User = require('@db/models/user.model.js');
const logger = require('@logger/logger.js');
const { defaultCooldown } = require('config').discord;
const { fetchCubeMeta } = require('@helpers/helpers.js');
const { maxSlots } = require('config').database;
const { makeReplies, validateCubeURL } = require('@helpers/helpers.js');

module.exports = class CubeCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'cube',
      group: 'members',
      memberName: 'cube',
      description: 'add, delete, or find cube lists',
      argsType: 'multiple',
      argsCount: 2,
      guildOnly: true,
      examples: ['.cube me', '.cube @user', '.cube add', '.cube delete'],
      throttling: { usages: 1, duration: defaultCooldown },
      args: [
        {
          key: 'verb',
          prompt: 'Choose **add**, **delete**, **me**, or **@user**',
          error: 'Try .cube **add** or **delete** or **me** or **@user**',
          type: 'string',
          parse: (value) => value.toString(),
          wait: 10,
        },
        {
          key: 'url',
          prompt: 'Enter your cube URL',
          error: 'URL must be of Cube Tutor or Cube Cobra domain',
          type: 'string',
          parse: (value) => value.toString(),
          wait: 10,
          default: '',
        },
      ],
    });
  }

  async run(message, { verb, url }) {

    const { id: userId, tag: discordTag } = message.author;
    const { replyToAuth } = makeReplies(message);

    try {
      if (verb === 'add' || verb === 'set') {

        const user = await User.findUserAndUpdate(userId, { discordTag });
        const { cubes } = user;
        if (cubes && cubes.length >= maxSlots) return await replyToAuth('has no more open slots!');

        // if no url or id provided, open up collector and listen for one
        let inputURL = '';
        if (!url) {
          const question = await message.say(':link: **Enter a __cube URL__ or __Cube Cobra ID__ or __cancel__ or to cancel** :link:');
          const filterURL = (input) => input.author.id === message.author.id;
          const collectorURL = await message.channel.awaitMessages(filterURL, { max: 1, dispose: true, time: 45000, errors: ['time'] });
          inputURL = collectorURL.last().content.toLowerCase();
          if (inputURL === 'cancel') return replyToAuth('has cancelled :x:');
          if (inputURL.startsWith('.cube')) return question.delete(); // user opens another menu on accident
          return this.run(message, { verb, url: inputURL });
        }

        // check if input is url or cube cobra id
        const validation = validateCubeURL(url);
        const cubeMeta = validation ? await fetchCubeMeta(url) : await fetchCubeMeta(`https://cubecobra.com/cube/overview/${url}`);

        cubes.push({ name: cubeMeta.title, link: cubeMeta.url });
        await user.save();
        return await replyToAuth(`has added **${cubeMeta.title}** :white_check_mark:`);

      } if (verb === 'delete' || verb === 'remove' || verb === 'unset') {

        const user = await User.findUser(userId);
        if (!user || !user.cubes || !user.cubes.length) return await message.say(`<@!${userId}> has not set any cubes!`);
        const { cubes } = user;

        const question = await message.say(':1234: **Enter a __number__ or __cancel__** :1234:');
        const embed = new Discord.MessageEmbed()
          .setTitle(`**${discordTag}'s Cubes**`)
          .setColor(message.guild.members.cache.get(userId).roles.highest.color)
          .setThumbnail(message.author.avatarURL());
        user.cubes.forEach((cube, index) => { if (cube) embed.addFields({ name: `${index + 1}. ${cube.name}`, value: cube.link }); });
        await message.say(embed);

        // input must be between 1 - cubes.length
        const filterNo = (input) => {
          const processedInput = input.content.toLowerCase().trim();
          if (input.author.id !== userId) return false;
          if (processedInput.startsWith('.cube') || processedInput === 'cancel') return true;
          const validation = Joi.number().min(1).max(cubes.length).validate(Number.parseInt(input, 10));
          if (validation.error) {
            replyToAuth('did not select a valid number. Try again.');
            return false;
          }
          return true;
        };

        const collectorNo = await message.channel.awaitMessages(filterNo, { max: 1, time: 10000, dispose: true, maxProcessed: 3, errors: ['time'] });
        let inputChoice = collectorNo.last().content.toLowerCase();
        if (inputChoice === 'cancel') return replyToAuth('has cancelled :x:');
        if (inputChoice.startsWith('.cube')) return question.delete(); // user opens another menu on accident

        // delete cube from database
        const selectedCube = cubes[--inputChoice];
        const payload = { $pull: { cubes: selectedCube } };
        await User.findUserAndUpdate(userId, payload);
        await replyToAuth(`has deleted **${selectedCube.name}** :put_litter_in_its_place:`);

      } else if (verb === 'refresh') {
        // TODO: implement refresh all lists

        // cube look up
        // search by mention (parsed as <@!986623452123> or <@986623452123>)
      } else if (verb.startsWith('<@') && verb.endsWith('>')) {
        // <@! is for nicknames; parse id number
        const targetId = (verb.startsWith('<@!')) ? verb.slice(3, -1) : verb.slice(2, -1);

        const member = message.guild.members.cache.get(targetId);
        if (!member) return message.say('The member could not be found in guild! :thinking:');

        const user = await User.findUser(targetId);
        if (!user || !user.cubes || !user.cubes.length) return message.say(`<@!${targetId}> has not set any cubes!`);

        const embed = new Discord.MessageEmbed()
          .setColor(member.roles.highest.color)
          .setTitle(`${member.user.tag}'s Cubes`)
          .setThumbnail(member.user.avatarURL());
        user.cubes.forEach((cube, index) => { if (cube) embed.addFields({ name: `${index + 1}. ${cube.name}`, value: cube.link }); });
        message.say(embed);

        // search by `@THUNDERWANG#1234`
      } else if (verb.startsWith('`')) {
        const { content } = message;
        let markDownText = content.slice(content.indexOf('`') + 1, content.lastIndexOf('`')).trim().toLowerCase();
        if (markDownText.startsWith('@')) markDownText = markDownText.slice(1);
        const member = message.guild.members.cache.find((mem) => (mem.user.tag.toLowerCase() === markDownText));
        return member ? this.run(message, { verb: `<@!${member.id}>` }) : message.say('Member could not be found!');

      } else if (verb === 'me') {
        this.run(message, { verb: `<@!${userId}>` });

        // search by discord username
      } else if (verb.includes('#')) {
        this.run(message, { verb: `\`${verb}\`` });
      }
    } catch (error) {
      // when the collector times out, it throws a Discord Collection that extends Map with size 0
      if (error.size === 0) return replyToAuth('\'s connection has timed out. Please start over.');
      if (error.message.contains('valid domain')) return message.say(error.message);
      message.say('Something went wrong!');
      logger.error(error);
    }
  }
};
