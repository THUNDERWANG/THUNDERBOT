module.exports = (command, message, args) => {
	if (command.args && !args.length) {
		message.channel.send(`Did you mean ${process.env.PREFIX}${command.name} ${command.usage}?`);
		// } else if (!command.arg && args.length) {
		//	return message.channel.send('This command does not require arguments.');
		throw new Error('checkArgs');
	}
};