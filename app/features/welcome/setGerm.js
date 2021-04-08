const { welcomeChannel, rulesChannel, botId } = require('config').discord;
const logger = require('@logger/logger.js');
const { levels } = require('@features/levels/levels.js');
const { createEmbed } = require('@helpers/helpers.js');

// Welcome Messages
//   const m1 = 'come for the cube drafts, stay for the bad beats stories.';
//   const m2 = 'may your P1P1s always be windmill slams!';
//   const m3 = 'may you always topdeck that lethal bolt.';
//   const m4 = 'remember to bolt the bird!';
//   const m5 = 'got cube?';
//   const m6 = 'don\'t let your cube dreams be cube memes!';
//   const m7 = 'it looks like our next topdeck hero has arrived!';
//   const messages = [m1, m2, m3, m4, m5, m6, m7];

// Welcome Titans
// const whiteTitan = {
//   url: 'https://c1.scryfall.com/file/scryfall-cards/art_crop/front/b/7/b7e857aa-955e-4afa-9afe-a572fe27765a.jpg?1611965099',
//   color: '#cac5c5',
// };
// const blueTitan = {
//   url: 'https://c1.scryfall.com/file/scryfall-cards/art_crop/front/b/b/bb9eec79-1926-46eb-b9e0-6ba12a441495.jpg?1561956629',
//   color: '#395ef1',
// };

// const blackTitan = {
//   url: 'https://c1.scryfall.com/file/scryfall-cards/art_crop/front/6/8/68ce4c64-9f82-4be1-aa3b-ba885b2d4307.jpg?1561945357',
//   color: '#1e1e1f',
// };

// const redTitan = {
//   url: 'https://c1.scryfall.com/file/scryfall-cards/art_crop/front/1/1/116eafca-668b-4864-bb7b-9d615c93c059.jpg?1562272422',
//   color: '#f82626',
// };

// const greenTitan = {
//   url: 'https://c1.scryfall.com/file/scryfall-cards/art_crop/front/6/d/6d5537da-112e-4679-a113-b5d7ce32a66b.jpg?1562850064',
//   color: '#5de258',
// };

// const kroxa = {
//   url: 'https://c1.scryfall.com/file/scryfall-cards/art_crop/front/c/e/cee0459b-9aac-4d2f-abe4-4d5fedde7eb8.jpg?1581481096',
//   color: '#ec731b',
// };

// const uro = {
//   url: 'https://c1.scryfall.com/file/scryfall-cards/art_crop/front/a/0/a0b6a71e-56cb-4d25-8f2b-7a4f1b60900d.jpg?1613386754',
//   color: '#52e7b2',
// };

// const titans = [whiteTitan, blueTitan, blackTitan, redTitan, greenTitan, kroxa, uro];
// const titan = titans[Math.floor(Math.random() * titans.length)];

module.exports = (client) => {
  client.on('guildMemberAdd', async (member) => {
    try {

      const germ = levels[0];
      await member.roles.add(germ.id);
      const embed = createEmbed()
        .setColor('#d6d611')
        .setTitle(`**Welcome, ${member.displayName}!**`)
        .setThumbnail('https://c1.scryfall.com/file/scryfall-cards/art_crop/front/e/3/e35b8c9b-40d0-4986-9457-ef1263fdfae1.jpg?1562823836')
        .setDescription(`**<@!${botId}> polymorphed ${member.user.tag} into a <@&${germ.id}> <:germ:585926679151771658>** Squirm your way to <#${rulesChannel}> to get started!`)
        .setFooter('"Polymorph" by Robert Bliss')
        .setTimestamp(null);
      const channel = member.guild.channels.cache.get(welcomeChannel);
      channel.send(embed);
    } catch (error) {
      logger.error(error);
    }
  });
};
