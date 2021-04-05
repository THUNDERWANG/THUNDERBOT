const logger = require('@logger/logger.js');

const statuses = [];
statuses.push('Esper Control');
statuses.push('Mono Red');
statuses.push('UB Reanimator');
statuses.push('Bant Midrange');
statuses.push('Orzhov Aggro');

module.exports = (client) => {
  client.user.setActivity(statuses[Math.floor((Math.random() * statuses.length))]);
  setInterval(async () => {
    try {
      const randomStatus = statuses[Math.floor((Math.random() * statuses.length))];
      logger.info(`Status changed: ${randomStatus}`);
    } catch (error) {
      logger.error(error);
    }
  }, 10800000, client);
};
