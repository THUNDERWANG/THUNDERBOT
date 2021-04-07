const setStatus = require('@features/status/setStatus.js');
const setDailyDeal = require('@features/webhooks/setDailyDeal.js');
const setGerm = require('@features/welcome/setGerm.js');

module.exports = (client) => {
  setDailyDeal(client);
  setStatus(client);
  setGerm(client);
};
