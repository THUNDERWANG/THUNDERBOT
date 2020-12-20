module.exports = {
    name: 'call',
    description: 'clears a temp role, adds online-only users to a temp role, pings role',
    async pingRole(roleID, onlineOnlyID, message) {
        try {
            const rolesCache = await message.guild.roles.cache;
            // Remove any existing members in the onlineOnly role
            const onlineMembers = await rolesCache.get(onlineOnlyID).members;
            onlineMembers.forEach(member => member.roles.remove(onlineOnlyID));
            // Add members to onlineOnly role, ping them, remove them from the role
            const roleMembers = await rolesCache.get(roleID).members;
            roleMembers.forEach(member => { if (member.presence.status === 'online') member.roles.add(onlineOnlyID); });
            await message.channel.send(`${rolesCache.get(onlineOnlyID)}`);
            await roleMembers.forEach(member => member.roles.remove(onlineOnlyID)); 
        } catch (error) {
            console.error(error);
        }
    },
    execute(message, args) {
        if (args[0] === 'xmage') this.pingRole('585313738169778177','790139800086118430', message) 
        else if (args[0] === 'cock') this.pingRole('585314755976364043', '790129809794531328',message);
    }
};
