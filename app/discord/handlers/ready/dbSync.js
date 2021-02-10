const mongoose = require('mongoose');
const { url } = require('config').database;

module.exports = () => {
	mongoose.connect(url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
	});
	console.log('DB ready!');
};
