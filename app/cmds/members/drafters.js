const Commando = require('discord.js-commando');
const logger = require('@logger/logger.js');
const { triceRole, xmageRole, draftPlanningChannel, ownerId, botPrefix } = require('config').discord;

module.exports = class DrafterCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'assemble',
      group: 'members',
      patterns: [/^(@xmage)|(\s+)@xmage/i, /^(@cockatrice)|(\s+)@cockatrice/i, /^(@trice)|(\s+)@trice/i],
      guildOnly: true,
      memberName: 'assemble',
      args: [
        {
          key: 'role',
          prompt: 'choose **xmage** or **cockatrice**',
          error: `Try ${botPrefix}assemble **xmage** or **cockatrice**`,
          type: 'string',
          required: true,
          wait: 10,
        },
      ],
      description: 'Type in @xmage or @cockatrice in the appropriate channel.',
      throttling: { usages: 1, duration: 600 },
    });
  }

  // ping only allowed in draftPlanningChannel
  hasPermission(message) {
    return message.channel.id === draftPlanningChannel;
  }

  onBlock(message, reason, data) {
    if (reason === 'throttling') {
      const minutes = Math.floor(data.remaining / 60);
      const seconds = Math.round(data.remaining % 60);
      message.say(`<@!${message.author.id}> must wait ${minutes} minutes and ${seconds} seconds to mention again!`);
    }
  }

  async run(message, { role }) {
    const content = message.content.toLowerCase();
    try {
      // admins will always be able to @roles
      if (message.author.id === ownerId) return;
      if (content.includes('xmage') || role === 'xmage') return await message.say(`**<@&${xmageRole}> Assemble!**`);
      if (content.includes('trice') || content.includes('cockatrice') || role === 'cockatrice') await message.say(`**<@&${triceRole}> Assemble!**`);
    } catch (error) {
      message.say('Something went wrong!');
      logger.error(error);
    }
  }
};
