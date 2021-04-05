const Commando = require('discord.js-commando');
const logger = require('@logger/logger.js');
const { defaultCooldown } = require('config').discord;

module.exports = class FireCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'fire',
      aliases: ['fired'],
      group: 'members',
      guildOnly: true,
      memberName: 'fire',
      description: 'announce that a draft has fired',
      throttling: { usages: 1, duration: defaultCooldown },
    });
  }

  async run(message) {
    try {
      await message.say('The draft has fired! Good luck and please save your decklists :pray:');
    } catch (error) {
      message.say('Something went wrong!');
      logger.error(error);
    }
  }
};
