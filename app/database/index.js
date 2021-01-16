const dbURL = require ('config').Database.url;
const { Sequelize, DataTypes } = require('sequelize');
const User = require('./models/user.model.js');
const Cube = require('./models/cube.model.js');

const sequelize = new Sequelize(dbURL, { logging: false });

const users = User(sequelize, DataTypes);
const cubes = Cube(sequelize, DataTypes);
users.hasMany(cubes, { foreignKey: { allowNull: false } });
cubes.belongsTo(users);

module.exports = {
	sequelize,
	users,
	cubes,
};