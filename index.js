require('module-alias/register');
const Commando = require('discord.js-commando');
const mongoose = require('mongoose');
const winston = require('winston');
const logger = require('@logger/logger.js');
const { botToken, botPrefix, ownerId } = require('config').discord;
const { url } = require('config').database;
const setCommands = require('@cmds/cmds.js');
const setFeatures = require('@features/features.js');

const client = new Commando.Client({ owner: ownerId, commandPrefix: botPrefix });

client.on('ready', () => {
  setCommands(client);
  setFeatures(client);
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
    .then(logger.info('db is ready!'))
    .catch(winston.error);
  logger.info('bot is ready!');
});

client.login(botToken);
