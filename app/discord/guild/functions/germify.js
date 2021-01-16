const { tiers } = require('config').Levels;

module.exports = async member => {
	try {
		await member.roles.add(tiers[0].id);
	} catch(error) {
		console.error(error);
	}
};