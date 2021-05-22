const logger = require('@logger/logger.js');

// TODO: make an array of user ids and look up current username; cycle through array instead of random
const statuses = [];
statuses.push('THUNDERWANG');
statuses.push('The_Steve_Man');
statuses.push('MapcasterSnage');
statuses.push('ikzann');
statuses.push('domcosta');
statuses.push('tettsui the local drunk');
statuses.push('Lonestar4729');
statuses.push('Purplemurasaki');

module.exports = async function setStatus(client) {
  try {
    const randomStatus = statuses[Math.floor((Math.random() * statuses.length))];
    await client.user.setActivity(`vs ${randomStatus}`);
    logger.info(`Status set: ${randomStatus}`);
    setTimeout(() => {
      setStatus(client);
    }, (3600000));
  } catch (error) {
    logger.error(error);
  }
};
