require('module-alias/register');
const Commando = require('discord.js-commando');
const mongoose = require('mongoose');
const logger = require('@logger/logger.js');
const { botToken, botPrefix, ownerId } = require('config').discord;
const { url } = require('config').database;
const setCommands = require('@cmds/cmds.js');
const setFeatures = require('@features/features.js');

const client = new Commando.Client({ owner: ownerId, commandPrefix: botPrefix });

client.on('ready', () => {
  logger.info('The Grand Calcutron is ready!');
  setCommands(client);
  setFeatures(client);
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
    .then(logger.info('Database is ready!'))
    .catch(logger.error);
});

client.login(botToken);
