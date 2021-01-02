const fs = require('fs');
const Discord = require('discord.js');
const configs = require('./config/configs.js');
const db = require('./app/modules/database/index.js');
const { welcome } = require('./app/startup/welcome.js');

const discordClient = new Discord.Client();
const prefix = configs.Discord.prefix;
discordClient.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./app/commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./app/commands/${file}`);
	discordClient.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();
db.sequelize.sync().then(()=>console.log('DB ready'));

discordClient.once('ready', () => {
	console.log('Bzz, THUNDERBOT is ready!');
});

welcome(discordClient);

discordClient.on('message', async message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	const args = message.content.toLowerCase().slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = discordClient.commands.get(commandName) || discordClient.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
	if (!command) return;
	if (command.args && !args.length) {
		return message.channel.send(`Did you mean ${process.env.PREFIX}${command.name} ${command.usage}?`);
		// } else if (!command.arg && args.length) {
		//	return message.channel.send('This command does not require arguments.');
	}
	if (command.guildOnly && message.channel.type === 'dm') {
		return message.channel.send('This command can only be used in the server!');
	}
	if (!cooldowns.has(commandName)) {
		cooldowns.set(commandName, new Discord.Collection());
	}
	const timestamps = cooldowns.get(commandName);
	if (!timestamps.has(message.author.id)) {
		const cooldown = (command.cooldown || 0) * 1000;
		timestamps.set(message.author.id, Date.now() + cooldown);
		setTimeout(() => { timestamps.delete(message.author.id); }, cooldown);
	} else {
		const expirationTime = timestamps.get(message.author.id);
		const time = Date.now();
		if (expirationTime > Date.now()) {
			return message.channel.send(`<@${message.author.id}>, please wait ${Math.ceil((expirationTime - time) / 1000)} seconds`);
		}
	}
	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('could not execute that command!');
	}
});

discordClient.login(configs.Discord.token);