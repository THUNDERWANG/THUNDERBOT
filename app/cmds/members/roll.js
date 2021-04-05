const Commando = require('discord.js-commando');
const logger = require('@logger/logger.js');
const { rollDie } = require('@helpers/helpers.js');
const { defaultCooldown, botPrefix } = require('config').discord;

module.exports = class RollCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'roll',
      group: 'members',
      memberName: 'roll',
      description: 'roll up to 10 dice from numbers 1 - 100',
      argsCount: 1,
      examples: [`${botPrefix}roll d100`, `${botPrefix}roll 3d100`, `${botPrefix} roll 100`],
      throttling: { usages: 1, duration: defaultCooldown },
      args: [
        {
          key: 'die',
          prompt: 'choose a die size (1d1 - 10d100)',
          error: 'Die sizes range from 1d1 - 10d100',
          type: 'string',
          wait: 10,
          parse: (die) => die.toString(),
          validate: (die) => die.match(/^([1-9]\d{0,1}|100)$/) || die.match(/^(([1-9]|10){0,1}d([1-9]\d{0,1}|100))$/),
        },
      ],
    });
  }

  async run(message, { die }) {
    try {
      await message.say(`:game_die: ${message.author} rolled ${rollDie(die)} :game_die:`);
    } catch (error) {
      message.say('Something went wrong!');
      logger.error(error);
    }
  }
};
