module.exports = {
    name: 'ping',
    description: 'determine bot/api latency',
    async execute(message, args, client) {
        try {
            const reply = await message.channel.send('Calculating ping...')
            const ping = reply.createdTimestamp - message.createdTimestamp;
            await message.channel.send(`🏓 Bot latency: ${ping} ms; API latency: ${client.ws.ping} ms🏓 `)
        } catch (error) {
            console.error(error)
        };
    }
};