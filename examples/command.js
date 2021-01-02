module.exports = {
	name: 'example',
	description: 'command example',
	aliases: ['commands'],
	args: true,
	usage: '<up>, <down>, <next>',
	cooldown: 10,
	guildOnly: true,
	execute(message, args) {
		// Body
	},
};