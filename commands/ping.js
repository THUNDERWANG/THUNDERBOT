module.exports = {
    name: 'ping',
    description: 'test',
    async execute(message, args, client) {
        try {
            const reply = await message.reply('Calculating ping...')
            const ping = await reply.createdTimeStamp - message.createdTimeStamp
            await message.reply(`Pong 🏓! Bot latency: ${ping}; API latency: ${client.ws.ping}`)
        } catch (error) {
            console.error(error)
        };
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