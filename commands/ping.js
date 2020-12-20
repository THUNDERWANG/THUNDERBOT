module.exports = {
    name: 'ping',
    description: 'test',
    async execute(message, args) {
        message.channel.send('Pong');
        message.guild.members.cache.forEach(member => {
            if (!member.user.bot) console.log(member.user.username)   
        });
    }
};

// module.exports = {
//     name: 'xmage',
//     description: 'pings xmage users who are online',
//     execute(message, args) {
//         const xmageMembers = message.guild.roles.cache.get('789443609178800189').members;
//         xmageMembers.forEach(member => {
//             if (member.presence.status === 'online') message.channel.send(`<@${member.id}>`); 
//         });
//     }
// };