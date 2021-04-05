const Commando = require('discord.js-commando');
const logger = require('@logger/logger.js');

module.exports = class AddCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'purge',
      group: 'moderation',
      memberName: 'purge',
      description: 'purge up to 20 messages that are less than 14 days old',
      examples: ['.purge 10'],
      throttling: { usages: 1, duration: 3 },
      userPermissions: ['MANAGE_MESSAGES'],
      args: [
        {
          key: 'amount',
          prompt: 'Choose an integer less than 20',
          type: 'integer',
        },
      ],
    });
  }

  async run(message, { amount }) {
    try {
      if (amount === 0) return;
      if (amount < 0) return message.reply('integer must be positive');
      await message.channel.bulkDelete(amount + 1);
    } catch (error) {
      message.say(error.message);
      if (error.message === 'Missing Permissions') logger.error(message.author.tag);
      if (!error.message.match(/14 days old/i)) logger.error(error.message);
    }
  }
};
