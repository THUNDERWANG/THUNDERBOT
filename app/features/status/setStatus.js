const logger = require('@logger/logger.js');

const statuses = [];
statuses.push('Esper Control');
statuses.push('Mono Red');
statuses.push('UB Reanimator');
statuses.push('Bant Midrange');
statuses.push('Orzhov Aggro');

module.exports = async function setStatus(client) {
  try {
    const randomStatus = statuses[Math.floor((Math.random() * statuses.length))];
    await client.user.setActivity(randomStatus);
    logger.info(`Status set: ${randomStatus}`);
    setTimeout(() => {
      setStatus(client);
    }, (10800000));
  } catch (error) {
    logger.error(error);
  }
};
