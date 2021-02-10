const Discord = require('discord.js');
const { botToken } = require('config').discord;

const discordClient = new Discord.Client();
require('./app/discord/handlers/onReady.js')(discordClient);
require('./app/discord/handlers/onGuild.js')(discordClient);
require('./app/discord/handlers/onMessage.js')(discordClient);

discordClient.login(botToken);
module.exports = discordClient;