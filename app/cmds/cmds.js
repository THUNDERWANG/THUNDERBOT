const path = require('path');

module.exports = (client) => {
  client.registry
    .registerDefaults()
    .registerGroups([
      ['members', 'Member commands'],
      ['moderation', 'Moderation commands'],
    ])
    .registerCommandsIn(path.join(__dirname));
};
