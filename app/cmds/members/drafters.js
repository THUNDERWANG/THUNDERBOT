const Commando = require('discord.js-commando');
const logger = require('@logger/logger.js');
const { triceRole, xmageRole, draftPlanningChannel, ownerId } = require('config').discord;

module.exports = class DrafterCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'assemble the legion!',
      group: 'members',
      patterns: [/^(@xmage)|(\s+)@xmage/i, /^(@cockatrice)|(\s+)@cockatrice/i, /^(@trice)|(\s+)@trice/i],
      guildOnly: true,
      argsCount: 1,
      argsType: 'single',
      memberName: 'assemble',
      description: 'Type in @xmage or @cockatrice in the appropriate channel.',
      throttling: { usages: 1, duration: 600 },
    });
  }

  onBlock(message, reason, data) {
    if (reason === 'throttling') {
      const minutes = Math.floor(data.remaining / 60);
      const seconds = Math.floor(data.remaining % 60);
      message.say(`<@!${message.author.id}> must wait ${minutes} minutes and ${seconds} seconds to mention again!`);
    }
  }

  async run(message) {
    const content = message.content.toLowerCase();
    try {
      // admins will always be able to @roles still
      if (message.author.id === ownerId) return;
      if (message.channel.id === draftPlanningChannel) {
        if (content.includes('xmage')) return await message.say(`**<@&${xmageRole}> Assemble!**`);
        if (content.includes('trice') || content.includes('cockatrice')) return await message.say(`**<@&${triceRole}> Assemble!**`);
      }
    } catch (error) {
      message.say('Something went wrong!');
      logger.error(error);
    }
  }
};
