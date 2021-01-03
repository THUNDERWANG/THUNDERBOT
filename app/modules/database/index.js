const configs = require('../../config/configs');
const { Sequelize, DataTypes } = require('sequelize');
const User = require('./models/user.model.js');
const Cube = require('./models/cube.model.js');

const sequelize = new Sequelize(configs.Sequelize.url, { logging: false });
// const sequelize = new Sequelize('database', 'username', 'password', {
// 	host: 'localhost',
// 	dialect: 'sqlite',
// 	storage: 'database.sqlite',
// 	logging: false,
// });

const users = User(sequelize, DataTypes);
const cubes = Cube(sequelize, DataTypes);
users.hasMany(cubes, { foreignKey: { allowNull: false } });
cubes.belongsTo(users);

module.exports = {
	sequelize,
	users,
	cubes,
};