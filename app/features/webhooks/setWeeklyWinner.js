const { serverId, offTopicChannel } = require('config').discord;
const logger = require('@logger/logger.js');
const { zapier } = require('config').discord;

module.exports = async (client) => {
  logger.info('Listening for Weekly Winners...');
  client.on('message', async (message) => {
    try {
      if (message.author.id !== zapier && !message.content.toLowerCase().includes('weekly winners')) return;
      const onlineCubeDrafts = await message.client.guilds.fetch(serverId);
      const offTopic = onlineCubeDrafts.channels.cache.get(offTopicChannel);

      // parse message (see above for example)
      const url = message.content.split('@@@@@')[0];
      if (url) await offTopic.send(url);

    } catch (error) {
      logger.error(error);
    }
  });

};
