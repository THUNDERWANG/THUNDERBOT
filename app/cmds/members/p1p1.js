const Discord = require('discord.js');
const Commando = require('discord.js-commando');
const { JSDOM } = require('jsdom');
const logger = require('@logger/logger.js');
const fetch = require('node-fetch');
const { createCanvas, loadImage } = require('canvas');
const { fetchCubeMeta } = require('@helpers/helpers.js');
const { defaultCooldown, botPrefix, botColor } = require('config').discord;

const bonusQuestions = [];
bonusQuestions.push(':thumbsdown: What\'s the last pick? :thumbsdown:');
bonusQuestions.push(':hot_pepper: What\'s the spiciest pick? :hot_pepper:');
bonusQuestions.push(':two: What\'s the next two picks? :two:');
bonusQuestions.push(':boy: What\'s the Timmy pick? :boy:');
bonusQuestions.push(':woman_scientist: What\'s the Johnny pick? :woman_scientist:');
bonusQuestions.push(':smiling_imp: What\'s the Spike pick? :smiling_imp:');
bonusQuestions.push(':paintbrush: Which card has the best art? :paintbrush:');
const getBonus = () => bonusQuestions[Math.floor(Math.random() * bonusQuestions.length)];

module.exports = class P1P1Command extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'p1p1',
      group: 'members',
      memberName: 'p1p1',
      description: 'generate random pack from Cube Cobra/Tutor',
      argsType: 'multiple',
      argsCount: 2,
      examples: [`${botPrefix}p1p1 cc thunderwang`, `${botPrefix}p1p1 ct 123`],
      throttling: { usages: 1, duration: defaultCooldown },
      args: [
        {
          key: 'domain',
          prompt: 'Choose cc or ct',
          error: 'Try **.p1p1 cc [id]** or **.p1p1 cc [id]**',
          type: 'string',
          wait: 10,
        },
        {
          key: 'id',
          prompt: 'Enter your id',
          error: 'Try **.p1p1 cc [id]** or **.p1p1 cc [id]**',
          type: 'string',
          wait: 10,
          default: '', // used to check if only 1 argument is provided (.p1p1 THUNDERWANG)
        },
      ],
    });
  }

  async run(message, { domain, id }) {
    const color = message.type === 'dm' ? message.member.roles.highest.color : botColor;
    const messageEmbed = new Discord.MessageEmbed().setColor(color);
    let fetching = null;
    try {

      // I may remove the ct feature altogether
      if (domain === 'ct') {
        fetching = await message.say('**Generating pack**');

        const res = await fetch(`https://www.cubetutor.com/draft/${id}`);
        const html = await res.text();
        const elements = new JSDOM(html).window.document.querySelectorAll('.card img');
        const images = [];
        elements.forEach((element) => images.push(loadImage(element.getAttribute('src'))));
        const cards = await Promise.all(images);

        // create canvas to switch images together
        const cardWidth = 275;
        const cardHeight = 400;
        const canvas = createCanvas(cardWidth * 5, cardHeight * 3);
        const ctx = canvas.getContext('2d');

        let startX = 0;
        cards.forEach((card, index) => {
          if (index < 5) {
            ctx.drawImage(card, startX, 0, cardWidth, cardHeight);
            startX += cardWidth;
          } else if (index < 10) {
            if (index === 5) startX = 0;
            ctx.drawImage(card, startX, cardHeight, cardWidth, cardHeight);
            startX += cardWidth;
          } else if (index < 15) {
            if (index === 10) startX = 0;
            ctx.drawImage(card, startX, cardHeight * 2, cardWidth, cardHeight);
            startX += cardWidth;
          }
        });

        canvas.toBuffer(async (err, buff) => {
          if (err) throw new Error('could not buffer canvas');
          const pack = new Discord.MessageAttachment(buff).setName('pack.png');
          messageEmbed
            .setTitle(`${id}@Cube Tutor`)
            .setURL(`https://www.cubetutor.com/viewcube/${id}`)
            .setDescription(`:thinking: What's the pick? :thinking:\n\n${getBonus()}`)
            .setThumbnail('https://www.cubetutor.com/assets/2.0.14-SNAPSHOT/app/pages/img/iconlogo.png')
            .attachFiles([pack])
            .setImage('attachment://pack.png');
          await message.channel.send(messageEmbed);
          await fetching.delete();
        });
      } else if (domain === 'cc') {
        fetching = await message.say('**Generating pack...**');
        const meta = await fetchCubeMeta(id);
        const { title, url, description, thumbnail, pack } = meta;
        messageEmbed
          .setAuthor('Cube Cobra', 'http://cubecobra.com/content/sticker.png', url)
          .setColor(color)
          .setTitle(title)
          .setThumbnail(thumbnail)
          .setImage(pack)
          .setURL(url)
          .setDescription(`*${description}*`)
          .addFields(
            { name: 'P1P1:', value: ':thinking: What\'s your pick? :thinking:' },
            { name: 'Bonus:', value: getBonus() },
          )
          .setTimestamp()
          .setFooter('The Grand Calcutron', 'https://cdn.discordapp.com/avatars/801556487038173214/d6e13480f5540fb44ced81b981c66c10.webp?size=256');

        // Keep in case the bot needs to manually upload the resources
        // const pack = new Discord.MessageAttachment(`https://cubecobra.com/cube/samplepackimage/${id}/161${random}`).setName('pack.png');
        // .attachFiles([pack])
        // .setImage('attachment://pack.png');
        await message.embed(messageEmbed);
        await fetching.delete();
      } else if (!id) { // user types in .p1p1 THUNDERWANG, so domain should default to cc
        this.run(message, { domain: 'cc', id: domain });
      }
    } catch (error) {
      if (error.message === 'Could not fetch cube data!') return fetching.edit(error.message);
      message.say('Something went wrong!');
      logger.error(error);
    }
  }
};
