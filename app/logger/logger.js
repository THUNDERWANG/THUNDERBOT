const winston = require('winston');

const dateString = new Date().toLocaleString('en-US', {
	timeZone: 'America/Los_Angeles',
});

const myFormat = winston.format.printf(({ message, timestamp }) => {
	return `${timestamp}\n${message}`;
});

module.exports = function() {
	winston.add(
		new winston.transports.File({
			filename: 'logs.log',
			handleExceptions: true,
			handleRejections: true,
			format: winston.format.combine(
				winston.format.timestamp({ format: dateString }),
				myFormat,
			),
		}),
	);

	winston.add(
		new winston.transports.Console({
			handleExceptions: true,
			handleRejections: true,
			format: winston.format.combine(
				winston.format.timestamp({ format: dateString }),
				winston.format.colorize({ all: true }),
				myFormat,
			),
		}),
	);
};