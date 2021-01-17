const Discord = require('discord.js');
const fetch = require('node-fetch');
const { parse } = require('node-html-parser');
const { createCanvas, loadImage } = require('canvas');

module.exports = {
	name: 'p1p1',
	description: 'generate random pack from Cube Cobra',
	aliases: ['pack'],
	usage: '[your Cube Cobra cube id]',
	args: true,
	cooldown: 0,
	guildOnly: true,
	async execute(message, args) {
		const [arg1, arg2] = args;

		const messageEmbed = new Discord.MessageEmbed()
			.setColor(message.member.roles.highest.color);

		if (arg1 === 'ct') {
			const fetching = await message.channel.send('generating pack...');
			try {
				const ctResp = await fetch(`https://www.cubetutor.com/draft/${arg2}`);
				const html = await ctResp.text();
				const htmlObj = parse(html);
				const elements = htmlObj.querySelectorAll('.card img');
				const images = elements.map(element => {
					const attributes = element.rawAttrs.split(' ');
					return loadImage(attributes[2].slice(5, -1));
				});
				const cards = await Promise.all(images);

				const cardWidth = 275;
				const cardHeight = 400;
				const canvas = createCanvas(cardWidth * 5, cardHeight * 3);
				const ctx = canvas.getContext('2d');

				let startX = 0;
				cards.forEach((card, index) => {
					if (index < 5) {
						ctx.drawImage(card, startX, 0, cardWidth, cardHeight);
						startX += cardWidth;
					} else if (index < 10) {
						if (index === 5) startX = 0;
						ctx.drawImage(card, startX, cardHeight, cardWidth, cardHeight);
						startX += cardWidth;
					} else if (index < 15) {
						if (index === 10) startX = 0;
						ctx.drawImage(card, startX, cardHeight * 2, cardWidth, cardHeight);
						startX += cardWidth;
					}
				});

				canvas.toBuffer(async (err, buff) => {
					if (err) throw new Error('could not buffer canvas');
					const pack = new Discord.MessageAttachment(buff).setName('pack.png');
					messageEmbed
						.setTitle(`${arg2}`)
						.setURL(`https://www.cubetutor.com/viewcube/${arg2}`)
						.setDescription(`https://www.cubetutor.com/viewcube/${arg2}\n\n :thinking: What's the pick? :thinking:`)
						.setThumbnail('https://www.cubetutor.com/assets/2.0.14-SNAPSHOT/app/pages/img/iconlogo.png')
						.attachFiles([pack])
						.setImage('attachment://pack.png');
					await message.channel.send(messageEmbed);
					await fetching.delete();
				});

			} catch (error) {
				message.channel.send('something went wrong!');
				console.error(error);
			}


		} else if (arg1 === 'cc') {
			try {
				const ranNo = Math.floor(Math.random() * 9999999) + 1;
				messageEmbed
					.setTitle(`${arg2}`)
					.setURL(`https://cubecobra.com/cube/list/${arg2}`)
					.setDescription(`https://cubecobra.com/cube/list/${arg2}\n\n :thinking: What's the pick? :thinking:`)
					.setThumbnail('http://cubecobra.com/content/sticker.png')
					.setImage(`https://cubecobra.com/cube/samplepackimage/${arg2}/161076${ranNo}`);
				await message.channel.send(messageEmbed);
			} catch (error) {
				await message.channel.send('something went wrong!');
				console.error(error);
			}

		} else {
			this.execute(message, ['cc', arg1]);
		}
	},
};


// const pack = new Discord.MessageAttachment(`https://cubecobra.com/cube/samplepackimage/${arg2}/161076${ranNo}`).setName('pack.png');
// messageEmbed
// 	.setTitle(`${arg2}`)
// 	.setURL(`https://www.cubetutor.com/viewcube/${arg2}`)
// 	.setDescription(`https://www.cubetutor.com/viewcube/${arg2}\n\n :thinking: What's the pick? :thinking:`)
// 	.setThumbnail('https://www.cubetutor.com/assets/2.0.14-SNAPSHOT/app/pages/img/iconlogo.png')
// 	.attachFiles([pack])
// 	.setImage('attachment://pack.png');
// await message.channel.send(messageEmbed);