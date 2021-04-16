const logger = require('@logger/logger.js');
const { reactChannel: reactChannelId, xmageRole, triceRole, draftingRolesMessage } = require('config').discord;

const reactionMessages = {
  drafter: {
    message: draftingRolesMessage,
    '🧙‍♂️': xmageRole,
    '🐔': triceRole,
  },
};

module.exports = async (client) => {
  try {
    // cache react messages
    const reactChannel = await client.channels.fetch(reactChannelId);
    let cachedMessages = [];
    for (const group in reactionMessages) {
      cachedMessages.push(reactChannel.messages.fetch(reactionMessages[group].message));
    }
    cachedMessages = await Promise.all(cachedMessages);
    cachedMessages.forEach((message) => reactChannel.messages.cache.set(message.id, message));

    client.on('messageReactionAdd', async (reaction, user) => {
      for (const group in reactionMessages) {
        const roles = reactionMessages[group];
        if (roles.message === reaction.message.id && roles[reaction.emoji.name]) {
          await reaction.message.guild.members.cache.get(user.id).roles.add(roles[reaction.emoji.name]);
        }
      }
    });

    client.on('messageReactionRemove', async (reaction, user) => {
      for (const group in reactionMessages) {
        const roles = reactionMessages[group];
        if (roles.message === reaction.message.id && roles[reaction.emoji.name]) {
          await reaction.message.guild.members.cache.get(user.id).roles.remove(roles[reaction.emoji.name]);
        }
      }
    });

    logger.info('Reaction Messages Set');
  } catch (error) {
    logger.error(error);
  }
};
