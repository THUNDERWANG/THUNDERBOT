const fs = require('fs');
const Discord = require('discord.js');
const configs = require('config');
const checks = require('./checks/checks.js');
const parseWebHooks = require('./webhooks/parseWebhooks.js');

const prefix = configs.Discord.botPrefix;
const commands = new Discord.Collection();
const commandFiles = fs.readdirSync('app/discord/message/commands/').filter(file => file.endsWith('.js'));
commandFiles.forEach(file => {
	const command = require(`./commands/${file}`);
	commands.set(command.name, command);
});

module.exports = discordClient => {
	discordClient.on('message', async message => {
		try {
			parseWebHooks(message);
			if (!message.content.startsWith(prefix) || message.author.bot) return;
			const args = message.content.toLowerCase().slice(prefix.length).split(/ +/);
			const commandName = args.shift();
			const command = commands.get(commandName) || commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
			if (!command) return;
			const checkParams = { prefix, command, args, message };
			checks.forEach(check => check(checkParams));
			message.commands = commands;
			command.execute(message, args);
		} catch (error) {
			if (error.message.startsWith('check')) return;
			console.error(error);
		}
	});

};
