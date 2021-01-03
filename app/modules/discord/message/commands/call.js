const Discord = require('discord.js');

module.exports = {
	name: 'call',
	description: 'call pingable players',
	args: true,
	usage: '[xmage], [cockatrice]',
	async execute(message, args) {

		let roleID = null;
		let tempRoleID = null;

		if (args[0] === 'xmage') {
			roleID = '585313738169778177';
			tempRoleID = '790139800086118430';
		} else if (args[0] === 'trice') {
			roleID = '585314755976364043';
			tempRoleID = '790129809794531328';
		}

		try {
			const calling = await message.channel.send('calling...');
			const role = await message.guild.roles.cache.get(roleID);
			const onlineMembers = role.members.map(member => {
				if (member.presence.status === 'online') {
					return member.roles.add(tempRoleID);
				}
			});
			const reply = new Discord.MessageEmbed()
				.setColor(message.member.roles.highest.color)
				.setTitle(`${role.name} Players Assemble!`)
				.setDescription('Reply or react if you want to play!')
				.setThumbnail('https://i.imgur.com/mRsM7Nq.png')
				.addFields(
					{ name: 'Client:', value: role.name, inline: true },
					{ name: 'Next permitted call time:', value: '(10 minutes from now)' })
				.setTimestamp(Date.now() + 600000);
			await Promise.all(onlineMembers);
			await message.channel.send(`<@&${tempRoleID}>`);
			await message.channel.send(reply);
			calling.delete();
			const tempRole = await message.guild.roles.cache.get(tempRoleID);
			tempRole.members.each(member => member.roles.remove(tempRoleID));
		} catch (error) {
			console.error(error);
			message.channel.send(error.message);
		}
	},
};