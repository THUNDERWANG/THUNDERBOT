module.exports = {
    name: 'call',
    description: 'adds online-only users to a temp role, pings role, removes users from role',
    async mentionRole(roleID, tempRoleID, message) {
        try {
            const role = await message.guild.roles.fetch(roleID);
            const onlineMembers = role.members.filter(member => member.presence.status === 'online');
            const promises = onlineMembers.map(member => member.roles.add(tempRoleID));
            await Promise.all(promises);
            await message.channel.send(`<@&${tempRoleID}>`);
            const tempRole = await message.guild.roles.fetch(tempRoleID);
            tempRole.members.each(member => member.roles.remove(tempRoleID));
        } catch (error) {
            console.error(error);
            message.channel.send('An error occured ☹️')
        };
    },
    execute(message, args) {
        if (args[0] === 'xmage') this.mentionRole('585313738169778177', '790139800086118430', message);
        else if (args[0] === 'cock') this.mentionRole('585314755976364043', '790129809794531328', message);
    }
};
