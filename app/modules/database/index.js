const configs = require('../../../config/configs');
const { Sequelize, DataTypes } = require('sequelize');
const User = require('./models/user.model.js');
const Cube = require('./models/cube.model.js');
const controllers = require('./controllers/controllers.js');

const sequelize = new Sequelize(configs.Sequelize.url, { logging: false });
// const sequelize = new Sequelize('database', 'username', 'password', {
// 	host: 'localhost',
// 	dialect: 'sqlite',
// 	storage: 'database.sqlite',
// 	logging: false,
// });

const db = {};
db.sequelize = sequelize;
db.users = User(sequelize, DataTypes);
db.cubes = Cube(sequelize, DataTypes);
db.controllers = controllers;

db.users.hasMany(db.cubes, { foreignKey: { allowNull: false } });
db.cubes.belongsTo(db.users);

module.exports = db;