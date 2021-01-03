module.exports = async member => {
	try {
		const germId = '585662276212621333';
		await member.roles.add(germId);
	} catch(error) {
		console.error(error);
	}
};