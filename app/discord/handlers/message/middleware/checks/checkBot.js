const mtgaDailyhook = require('../webhooks/mtgaDailyhook.js');

module.exports = message => {
	if (!message.author.bot) return;
	if (message.webhookID) mtgaDailyhook(message);
	throw Error('checkBot failed');
};