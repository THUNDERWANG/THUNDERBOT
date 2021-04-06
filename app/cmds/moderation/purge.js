const Commando = require('discord.js-commando');
const logger = require('@logger/logger.js');

// Best to implement hasPermission() because user who can post in announcement channels can bypass userPermissions[]
module.exports = class PurgeCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'purge',
      group: 'moderation',
      memberName: 'purge',
      description: 'purge up to 20 messages that are less than 14 days old',
      examples: ['.purge 10'],
      userPermissions: ['MANAGE_MESSAGES'],
      throttling: { usages: 1, duration: 3 },
      args: [
        {
          key: 'amount',
          prompt: 'Choose an int between 1 - 20',
          type: 'integer',
        },
      ],
    });
  }

  hasPermission(message) {
    const permissions = message.channel.guild.members.cache.get(message.author.id).permissions.toArray();
    return permissions.includes('MANAGE_MESSAGES');
  }

  async run(message, { amount }) {
    try {
      if (amount <= 0 || amount > 20) return message.reply('int must be between 1 - 20');
      await message.channel.bulkDelete(amount + 1);
    } catch (error) {
      message.say(error.message);
      if (error.message === 'Missing Permissions') logger.error(message.author.tag);
      if (!error.message.match(/14 days old/i)) logger.error(error.message);
    }
  }
};
