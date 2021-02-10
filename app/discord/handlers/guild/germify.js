const { levels } = require('../../levels/levels.js');

module.exports = async member => {
	try {
		// levels is the head of the levels linked list
		await member.roles.add(levels.id);
	} catch(error) {
		console.error(error);
	}
};