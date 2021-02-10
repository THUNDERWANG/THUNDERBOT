const attachHelpers = require('./message/middleware/helpers/message.helpers.js');
const checkArgs = require('./message/middleware/checks/checkArgs.js');
const checkGuild = require('./message/middleware/checks/checkGuild.js');
const checkMod = require('./message/middleware/checks/checkMod.js');
const checkCool = require('./message/middleware/checks/checkCool.js');
const checkBot = require('./message/middleware/checks/checkBot.js');

/**
 * check orders Matters!
 * 1. checkBot
 * 2. checkArgs
 * 3. checkCool
 * 4. checkGuild
 * 5. checkMod,
 */

const checks = [
	checkBot,
	checkArgs,
	checkCool,
	checkGuild,
	checkMod,
];

// on message event, attach the helpers and run through all checks
// on fail, check will throw an error with message "check* failed"
// if all checks pass, then execute command

// attachHelpers will add discord messaging methods;
// always use them because they have an option set to not parse mentions

// checkArgs will add additional properties to the message object

module.exports = discordClient => {
	discordClient.on('message', async message => {
		try {
			attachHelpers(message);
			// each check will throw an error with message "check* failed"
			checks.forEach(check => check(message));
			const { command, args } = message.checks;
			command.execute(message, args);
		} catch (error) {
			if (error.message.match(/^check/)) return;
			console.error(error);
		}
	});
};
