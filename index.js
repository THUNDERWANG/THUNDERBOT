const Discord = require('discord.js');
const configs = require('config');
const onReady = require('./app/discord/ready/index.js');
const onGuild = require('./app/discord/guild/index.js');
const onMessage = require('./app/discord/message/index.js');

const discordClient = new Discord.Client();

onReady(discordClient);
onMessage(discordClient);
onGuild(discordClient);

discordClient.login(configs.Discord.botToken);