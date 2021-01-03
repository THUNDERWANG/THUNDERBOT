module.exports = async (db) => {
	await db.sequelize.sync();
	console.log('DB ready!');
};
