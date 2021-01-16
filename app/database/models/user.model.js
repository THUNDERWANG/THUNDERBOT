module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define('user',
		{
			discordTag: {
				type: DataTypes.STRING,
				unique: true,
				allowNull: false,
				require: true,
			},
			points: {
				type: DataTypes.INTEGER,
				defaultValue: 0,
				allowNull: false,
			},
		},
		{
			timestamps: true,
		});
	return User;
};