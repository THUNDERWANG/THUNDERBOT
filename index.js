const fs = require('fs');
const Discord = require('discord.js');
const configs = require('config');
const db = require('./app/modules/database/index.js');
const ready = require('./app/modules/discord/ready/index.js');
const guild = require('./app/modules/discord/guild/index.js');
const mess = require('./app/modules/discord/message/index.js');

const discordClient = new Discord.Client();
const prefix = configs.Discord.botPrefix;
discordClient.commands = new Discord.Collection();
discordClient.startup = new Discord.Collection();
const cooldowns = new Discord.Collection();

const commandFiles = fs.readdirSync('./app/modules/discord/message/commands/').filter(file => file.endsWith('.js') && file !== 'example.js');
commandFiles.forEach(file => {
	const command = require(`./app/modules/discord/message/commands/${file}`);
	discordClient.commands.set(command.name, command);
});

discordClient.once('ready', () => {
	ready.dbSync(db);
	console.log('Bzz, THUNDERBOT is ready!');
});

discordClient.on('guildMemberAdd', member => {
	guild.germify(member);
	guild.welcome(member);
});

discordClient.on('message', message => {
	try {
		if (!message.content.startsWith(prefix) || message.author.bot) return;
		const args = message.content.toLowerCase().slice(prefix.length).split(/ +/);
		const commandName = args.shift().toLowerCase();
		const command = discordClient.commands.get(commandName) || discordClient.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
		if (!command) return;
		mess.checkArgs(command, message, args);
		mess.checkGuild(command, message);
		mess.checkCool(command, message, cooldowns);
		command.execute(message, args);
	} catch (error) {
		// TODO: FIX THIS
		if (error.message === 'checkArgs') return;
		if (error.message === 'checkGuild') return;
		if (error.message === 'checkCool') return;
		console.error(error);
	}
});

discordClient.login(configs.Discord.botToken);