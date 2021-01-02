module.exports = (sequelize, DataTypes) => {
	const Cube = sequelize.define('cube',
		{
			discordTag: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			link: {
				type: DataTypes.STRING,
				allowNull: true,
				defaultValue: null,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: true,
				defaultValue: null,
			},
		},
		{
			timestamps: true,
		});
	return Cube;
};