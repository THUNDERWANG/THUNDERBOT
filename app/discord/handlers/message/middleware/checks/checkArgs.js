const fs = require('fs');
const Discord = require('discord.js');
const prefix = require('config').discord.botPrefix;

// load all commands into a discord collection (map): name -> command file
const commands = new Discord.Collection();
const commandFiles = fs.readdirSync('app/discord/handlers/message/commands').filter(file => file.endsWith('.js'));
commandFiles.forEach(file => {
	const command = require(`../../commands/${file}`);
	commands.set(command.name, command);
});

// checks to see if message is a command and sets the following message properties if so:
// checks.prefix
// checks.args
// checks.command
// checks.commands

module.exports = message => {
	if (!message.content.startsWith(prefix)) throw Error('checkArgs failed');

	const args = message.content.toLowerCase().trim().slice(prefix.length).split(/ +/);
	const commandName = args.shift();

	// search commands collection for command or search via aliases
	const command = commands.get(commandName) || commands.find(cmd=>cmd.aliases && cmd.aliases.includes(commandName));
	if (!command) throw Error('checkArgs failed');

	if (command.args && !args.length) {
		message.channel.send(`Did you mean ${prefix}${command.name} ${command.usage}?`);
		throw Error('checkArgs failed');
	}

	message.checks = {
		prefix,
		args,
		command,
		commands,
	};
};
