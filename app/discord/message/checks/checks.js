const checkArgs = require('./checkArgs.js');
const checkGuild = require('./checkGuild.js');
const checkMod = require('./checkMod.js');
const checkCool = require('./checkCool.js');

// Order matters! Checking cooldown should be last!
module.exports = [
	checkArgs,
	checkGuild,
	checkMod,
	checkCool,
];