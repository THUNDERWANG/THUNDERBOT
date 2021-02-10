const mongoose = require('mongoose');
const { url } = require('config').database;
const winston = require('winston');

module.exports = () => {
	mongoose.connect(url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
	});
	winston.info('DB ready!');
};
