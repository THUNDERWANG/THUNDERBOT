const Discord = require('discord.js');
const { botToken } = require('config').discord;

require('./app/logger/logger.js')();
const discordClient = new Discord.Client();
discordClient.login(botToken);
require('./app/discord/handlers/onReady.js')(discordClient);
require('./app/discord/handlers/onGuild.js')(discordClient);
require('./app/discord/handlers/onMessage.js')(discordClient);

module.exports = discordClient;