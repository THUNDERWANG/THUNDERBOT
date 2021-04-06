const Commando = require('discord.js-commando');
const logger = require('@logger/logger.js');
const { xmageRole, triceRole, defaultCooldown, botPrefix } = require('config').discord;
const { makeReplies } = require('@helpers/helpers.js');

module.exports = class RoleCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'role',
      group: 'members',
      memberName: 'role',
      guildOnly: true,
      description: 'Add/remove xmage/cockatrice role',
      examples: [`${botPrefix} role add xmage`, `${botPrefix} role remove cockatrice`],
      throttling: { usages: 1, duration: defaultCooldown },
      args: [
        {
          key: 'verb',
          prompt: 'Choose **add** or **remove**',
          error: 'Try **add** or **remove**',
          type: 'string',
          wait: 10,
          oneOf: ['add', 'remove'],
        },
        {
          key: 'role',
          prompt: 'Choose **xmage** or **cockatrice**',
          error: 'Try .role add/remove xmage or .role add/remove cockatrice',
          type: 'string',
          wait: 10,
          oneOf: ['xmage', 'cockatrice'],
        },
      ],
    });
  }

  async run(message, { verb, role }) {
    const { replyToAuth } = makeReplies(message);
    try {
      if (verb === 'add') {
        if (role === 'xmage') {
          await message.member.roles.add(xmageRole);
          await replyToAuth(`added <@&${xmageRole}>`);
        } else if (role === 'trice' || role === 'cockatrice') {
          await message.member.roles.add(triceRole);
          await replyToAuth(`added <@&${triceRole}>`);
        }
      } else if (verb === 'remove') {
        if (role === 'xmage') {
          await message.member.roles.remove(xmageRole);
          await replyToAuth(`removed <@&${xmageRole}>`);
        } else if (role === 'trice' || role === 'cockatrice') {
          await message.member.roles.remove(triceRole);
          await replyToAuth(`removed <@&${triceRole}>`);
        }
      }
    } catch (error) {
      message.say('Something went wrong!');
      logger.error(error);
    }
  }
};
