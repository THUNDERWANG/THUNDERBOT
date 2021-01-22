module.exports = checkParams => {
	const { command, args, message, prefix } = checkParams;
	if (command.args && !args.length) {
		message.channel.send(`Did you mean ${prefix}${command.name} ${command.usage}?`);
		throw new Error('checkArgs');
	}
};