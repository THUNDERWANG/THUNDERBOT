const Discord = require('discord.js');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file=>file.endsWith('.js'))
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
};

const prefix = '.';

client.once('ready', () => console.log('I am ready!'));

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.toLowerCase().slice(prefix.length).split(/ +/);
    const command = args.shift()
    
    switch (command) {
        case 'ping':
            client.commands.get('ping').execute(message, args, client);
            break;
        
        case 'call':
            client.commands.get('call').execute(message, args);
            break;      
    };
});

client.login(process.env.THUNDERBOT_TOKEN);