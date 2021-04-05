const Commando = require('discord.js-commando');
const logger = require('@logger/logger.js');
const { triceRole, xmageRole, draftPlanningChannel } = require('config').discord;

module.exports = class DrafterCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'assemble',
      group: 'members',
      patterns: [/^<@&/],
      guildOnly: true,
      memberName: 'assemble',
      description: 'Just use @xmage or @cockatrice.',
      throttling: { usages: 1, duration: 600 },
    });
  }

  async run(message) {
    try {
      if (message.channel.id === draftPlanningChannel) {
        if (message.content === `<@&${xmageRole}>`) {
          const mention = await message.say(`<@&${xmageRole}>`);
          mention.delete();
        } else if (message.content === `<@&${triceRole}>`) {
          const mention = await message.say(`<@&${triceRole}>`);
          mention.delete();
        }
      }
    } catch (error) {
      message.say('Something went wrong!');
      logger.error(error);
    }
  }
};
