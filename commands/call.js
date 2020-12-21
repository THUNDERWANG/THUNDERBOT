module.exports = {
    name: 'call',
    description: 'clears a temp role, adds online-only users to a temp role, pings role',
    async mentionRole(roleID, tempRoleID, message) {
        try {
            const roleMembers = await message.guild.roles.fetch(roleID);
            const rolePromises = roleMembers.members.map(member => {
                if (member.presence.status === 'online') member.roles.add(tempRoleID);
            });
            await Promise.all(rolePromises);
            message.channel.send(`<@&${tempRoleID}>`);
            const tempMembers = await message.guild.roles.fetch(tempRoleID);
            const tempPromises = tempMembers.members.map(member => member.roles.remove(tempRoleID));
            await Promise.all(tempPromises);
        } catch (error) {
            console.log(error)
        };
    },
    async execute(message, args) {
        if (args[0].toLowerCase() === 'xmage') await this.mentionRole('585313738169778177', '790139800086118430', message) 
        else if(args[0].toLowerCase() === 'cock') await this.mentionRole('585314755976364043', '790129809794531328', message)
    }
};
