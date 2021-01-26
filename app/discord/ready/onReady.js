const db = require('../../database/index.js');
const dbSync = require('./dbSync.js');
const broadcast = require('./broadcast.js');

module.exports = (discordClient) => {
	discordClient.once('ready', () => {
		dbSync(db);
		broadcast(discordClient);
		console.log('Bzz, THUNDERBOT is ready!');
	});
};
