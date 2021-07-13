const path = require('path');

module.exports = (client) => {
  client.registry
    .registerDefaultTypes()
    .registerDefaultGroups()
    .registerGroups([
      ['members', 'Member commands'],
      ['moderation', 'Moderation commands'],
    ])
    .registerDefaultCommands({ unknownCommand: false })
    .registerCommandsIn(path.join(__dirname));
};
