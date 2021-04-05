const setStatus = require('@features/status/setStatus.js');
const setDailyDeal = require('@features/webhooks/setDailyDeal.js');
const setGerm = require('@features/welcome/setGerm.js');
const logger = require('@logger/logger.js');

module.exports = (client) => {
  try {
    setDailyDeal(client);
    setStatus(client);
    setGerm(client);
  } catch (error) {
    logger.error(error);
  }
};
