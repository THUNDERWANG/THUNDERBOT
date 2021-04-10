const { serverId, offTopicChannel } = require('config').discord;
const logger = require('@logger/logger.js');
const { zapier } = require('config').discord;

// TODO: Refactor so text is filtered by message.embeds
module.exports = async (client) => {
  logger.info('Listening for Weekly Winners...');
  client.on('message', async (message) => {
    try {
      if (message.author.id !== zapier) return;
      const onlineCubeDrafts = await message.client.guilds.fetch(serverId);
      const offTopic = onlineCubeDrafts.channels.cache.get(offTopicChannel);
      const target = message.embeds.find((embed) => embed.description.toLowerCase().includes('weekly winners'));
      if (target) {
        target.image = null;
        await offTopic.send(target);
      }

    } catch (error) {
      logger.error(error);
    }
  });
};
