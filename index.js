const Discord = require('discord.js');
const configs = require('config');
const onReady = require('./app/discord/ready/onReady.js');
const onGuild = require('./app/discord/guild/onGuild.js');
const onMessage = require('./app/discord/message/onMessage.js');

const discordClient = new Discord.Client();

onReady(discordClient);
onMessage(discordClient);
onGuild(discordClient);

discordClient.login(configs.Discord.botToken);