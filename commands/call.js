module.exports = {
    name: 'call',
    description: 'clears a temp role, adds online-only users to a temp role, pings role',
    async execute(message, args, client) {
       // Maybe check to see if folks are in the temp pingable role and remove them first?

        function findRoleID(name, rolesCache) {
            let roleID;
            for (let [key, value] of rolesCache) {
                if (value.name.toLowerCase() === name.toLowerCase()) {
                    roleID = key;
                };
            };
            return roleID;
        };

        try {
            const rolesCache = await message.guild.roles.cache;

            const roleID = findRoleID(args[0], rolesCache); 
            const tempRoleID = findRoleID('Xmage Online', rolesCache);

            const roleMembers = await rolesCache.get(roleID).members;
            roleMembers.forEach(async member => { 
                if (member.presence.status === 'online') await member.roles.add(tempRoleID) 
            });
            await message.channel.send(`${rolesCache.get(tempRoleID)}`);
            roleMembers.forEach(async member => member.roles.remove(tempRoleID)); 
            
        } catch (error) {
            console.log(error)
        }
    }
}
