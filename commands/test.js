module.exports = {
    name: 'test',
    description: 'used for testing commands',
    async execute(message, args) {
        try {
            const Discord = require('discord.js');
            let x = await message.channel.send('calling...')
            const exampleEmbed = new Discord.MessageEmbed()
                .setColor(message.member.roles.highest.color)
                .setTitle('Cubers Assemble!')
                .setDescription('React or respond if you want to play!')
                .setThumbnail('https://c1.scryfall.com/file/scryfall-cards/art_crop/front/9/a/9a0fd461-1a92-42b1-a031-b47d4690a4c0.jpg?1562430788')
                .addFields(
                    { name: 'Client:', value: 'Xmage', inline: true },
                    { name: 'Next permitted call time:', value: 'ljj '}
                )
                .setTimestamp(Date.now() + 600000);
            await message.channel.send(exampleEmbed);
            let z = await x.edit('<@&585313738169778177>')
            console.log(z);
            // <@&585313738169778177>
        } catch (error) {
            console.error(error)
        }    
    }
};