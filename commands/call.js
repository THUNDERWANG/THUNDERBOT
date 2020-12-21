module.exports = {
    name: 'call',
    description: 'clears a temp role, adds online-only users to a temp role, pings role',
    async mentionRole(roleID, tempRoleID, message) {
        try {
            const role = await message.guild.roles.fetch(roleID, false, true);
            role.members.forEach(async member => {
                if (member.presence.status === 'online') await member.roles.add(tempRoleID);
            });
            await message.channel.send(`<@&${tempRoleID}>`);
            const tempRole = await message.guild.roles.fetch(tempRoleID, false, true);
            tempRole.members.forEach(async member => member.roles.remove(tempRoleID));
        } catch (error) {
            console.log(error)
        };
    },
    execute(message, args) {
        if (args[0].toLowerCase() === 'xmage') this.mentionRole('789944500386529300', '789443609178800189', message) 
        else if(args[0].toLowerCase() === 'cock') this.mentionRole('585314755976364043', '790129809794531328', message)
    }
};
