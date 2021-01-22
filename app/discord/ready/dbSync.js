module.exports = async db => {
	try {
		await db.sequelize.sync();
		console.log('DB ready!');
	} catch {
		console.error('DB could not be synced!');
	}
};
