module.exports = {
    name: 'call',
    description: 'adds online-only users to a temp role, pings role, removes users from role',
    execute(message, args) {
        if (args[0] === 'xmage') this.mentionRole('585313738169778177', '790139800086118430', message);
        else if (args[0] === 'cock') this.mentionRole('585314755976364043', '790129809794531328', message);
    },
    async mentionRole(roleID, tempRoleID, message) {
        try {
            const Discord = require('discord.js');
            const calling = await message.channel.send('calling...')
            const role = await message.guild.roles.cache.get(roleID);
            const onlineMembers = role.members.filter(member => member.presence.status === 'online').map(member => member.roles.add(tempRoleID));
            const reply = new Discord.MessageEmbed()
                .setColor(message.member.roles.highest.color)
                .setTitle(`${role.name} Players Assemble!`)
                .setDescription('React or respond if you want to play!')
                .setThumbnail('https://i.imgur.com/mRsM7Nq.png')
                .addFields(
                    { name: 'Client:', value: role.name, inline: true },
                    { name: 'Next permitted call time:', value: '(10 minutes from now)' })
                .setTimestamp(Date.now() + 600000);
            await Promise.all(onlineMembers);
            await message.channel.send(`<@&${tempRoleID}>`);
            await message.channel.send(reply)
            calling.delete();
            const tempRole = await message.guild.roles.cache.get(tempRoleID);
            tempRole.members.each(member => member.roles.remove(tempRoleID));
        } catch (error) {
            console.error(error);
            message.channel.send('an error occured :slight_frown:')
        };
    }
};
