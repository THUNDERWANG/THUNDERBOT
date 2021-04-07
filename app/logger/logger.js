const { createLogger, format, transports } = require('winston');

const dateString = new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' });
const printFormat = ({ message, timestamp, stack }) => (stack ? `${timestamp} - ${message} \n ${stack}` : `${timestamp} - ${message}`);
const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: dateString }),
    format.errors({ stack: true }),
    format.printf(printFormat),
  ),
  defaultMeta: { service: 'The Grand Calcutron' },
  transports: [
    new transports.File({ filename: 'errors.log', handleExceptions: true, handleRejections: true }),
    new transports.Console({
      handleExceptions: true,
      handleRejections: true,
      format: format.combine(
        format.colorize({ all: true }),
        format.printf(printFormat),
      ),
    }),
  ],
});

module.exports = logger;
