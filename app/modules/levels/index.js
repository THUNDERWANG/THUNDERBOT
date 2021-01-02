const controllers = require('./controllers/controllers.js');
const tiersMap = require('./models/tiersMap.js');

const levels = {};
levels.tiersMap = tiersMap;
levels.controllers = controllers;
module.exports = levels;