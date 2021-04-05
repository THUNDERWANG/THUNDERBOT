const Joi = require('joi');
const fetch = require('node-fetch');
const { JSDOM } = require('jsdom');

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

async function fetchCubeMeta(id) {
  const cube = {};
  // determine if a url was given or a cube cobra id
  if (validateCubeURL(id)) {
    const { hostname, href } = new URL(id);
    const res = await fetch(href);
    const html = await res.text();
    const dom = new JSDOM(html);
    const rawTitle = getFromHTML(dom, 'title');
    if (!rawTitle || rawTitle === 'Cube Cobra Overview: Cube Not Found') throw new Error('Could not fetch cube data!');
    if (hostname === 'cubecobra.com') {
      // TODO: LOOK FOR SOME LIBRARY THAT CAN TAKE CARE OF PROCESSING URLS
      cube.id = href.endsWith('/') ? href.slice(0, -1) : href.slice(href.lastIndexOf('/') + 1);
      cube.title = rawTitle.slice(rawTitle.indexOf(':') + 1).trim();
      cube.url = getFromHTML(dom, 'url');
      cube.thumbnail = getFromHTML(dom, 'image');
      cube.description = getFromHTML(dom, 'description');
      cube.pack = `https://cubecobra.com/cube/samplepackimage/${cube.id}/161${Math.floor(Math.random() * 9999999999) + 1}.png`;
    } else if (hostname === 'www.cubetutor.com') {
      cube.title = rawTitle.slice(rawTitle.indexOf('-') + 1, rawTitle.lastIndexOf('-')).trim();
      cube.url = href;
    }
  } else { // assume the id is a cube cobra id
    return fetchCubeMeta(`https://cubecobra.com/cube/overview/${id}`);
  }

  if (Object.values(cube).includes(null)) throw Error('Could not fetch cube data!');
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

module.exports.makeReplies = makeReplies;
module.exports.validateCubeURL = validateCubeURL;
module.exports.getFromHTML = getFromHTML;
module.exports.fetchCubeMeta = fetchCubeMeta;
module.exports.rollDie = rollDie;
