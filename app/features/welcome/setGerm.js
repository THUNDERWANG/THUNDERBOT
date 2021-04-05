const { welcomeChannel } = require('config').discord;
const logger = require('@logger/logger.js');
const levels = require('@features/levels/levels.js');

module.exports = (client) => {
  client.on('guildMemberAdd', async (member) => {
    try {
      const m1 = 'come for the cube drafts, stay for the bad beats stories.';
      const m2 = 'may your P1P1s always be windmill slams!';
      const m3 = 'may you always topdeck that lethal bolt.';
      const m4 = 'remember to bolt the bird!';
      const m5 = 'got cube?';
      const m6 = 'don\'t let your cube dreams be cube memes!';
      const m7 = 'it looks like our next topdeck hero has arrived!';

      const messages = [m1, m2, m3, m4, m5, m6, m7];
      const index = Math.floor(Math.random() * messages.length);
      const welcomeMessage = `Welcome <@!${member.id}>; ${messages[index]}`;
      const channel = member.guild.channels.cache.get(welcomeChannel);
      await channel.send(welcomeMessage);
      await member.roles.add(levels.id);
    } catch (error) {
      logger.error(error);
    }
  });
};
