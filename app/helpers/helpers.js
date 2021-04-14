const Discord = require('discord.js');
const { JSDOM } = require('jsdom');
const Joi = require('joi');
const fetch = require('node-fetch');
const { embedColor, embedThumbnail } = require('config').discord;

// ALL MESSAGES SENT SHOULD NOT MENTION ROLES! Pass the no mention object to be sure!
function makeReplies(message) {
  return {
    noMention: { allowedMentions: { parse: [] } },
    replyToAuth(reply) { return message.say(`<@!${message.author.id}> ${reply}`, { allowedMentions: { parse: [] } }); },
    reply(reply) { return message.channel.send(reply, { allowedMentions: { parse: [] } }); },
  };
}

function validateCubeURL(url) {
  const { error } = Joi.string().regex(/^https?:\/\/(www.)?cube(cobra|tutor).com/i).validate(url);
  return !error;
}

function getFromHTML(dom, item) {
  const element = dom.window.document.querySelector(`meta[property="og:${item}"]`);
  return element ? element.getAttribute('content') : null;
}

async function fetchCubeMeta(url) {
  if (!validateCubeURL(url)) throw new Error('Not a valid cube domain');
  const { hostname } = new URL(url);
  const res = await fetch(url);
  const cube = {};
  if (hostname === 'cubecobra.com') {
    if (res.url !== url) return null;
    const html = await res.text();
    const dom = new JSDOM(html);
    const rawTitle = getFromHTML(dom, 'title');
    cube.title = rawTitle.slice(rawTitle.indexOf(':') + 1).trim();
    cube.id = url.endsWith('/') ? url.slice(0, -1) : url.slice(url.lastIndexOf('/') + 1);
    cube.url = getFromHTML(dom, 'url');
    cube.thumbnail = getFromHTML(dom, 'image');
    cube.description = getFromHTML(dom, 'description');
    cube.pack = `https://cubecobra.com/cube/samplepackimage/${cube.id}/${Math.floor(Math.random() * 999999)}.png`;
  } else {
    const html = await res.text();
    const dom = new JSDOM(html);
    const rawTitle = getFromHTML(dom, 'title');
    cube.title = rawTitle.slice(rawTitle.indexOf('-') + 1, rawTitle.lastIndexOf('-')).trim();
    cube.url = url;
  }
  return cube;
}

function rollDie(arg) {
  const less100 = /^([1-9]\d{0,1}|100)$/;
  const quantDSize = /^(([1-9]|10){0,1}d([1-9]\d{0,1}|100))$/;

  if (arg.match(less100)) return (Math.floor(Math.random() * arg)) + 1;
  if (arg.match(quantDSize)) {
    const [quantity, size] = arg.split('d');
    if (!quantity) return rollDie(size);
    let numbers = '';
    for (let i = 0; i < quantity; i++) { numbers += `${rollDie(size)}, `; }
    return numbers.slice(0, -2);
  }
  return new Error('die could not be rolled; not a valid argument');
}

function createEmbed() {
  return new Discord.MessageEmbed()
    .setColor(embedColor)
    .setFooter('The Grand Calcutron', embedThumbnail)
    .setThumbnail(embedThumbnail)
    .setTimestamp();
}

module.exports.makeReplies = makeReplies;
module.exports.validateCubeURL = validateCubeURL;
module.exports.getFromHTML = getFromHTML;
module.exports.fetchCubeMeta = fetchCubeMeta;
module.exports.rollDie = rollDie;
module.exports.createEmbed = createEmbed;
