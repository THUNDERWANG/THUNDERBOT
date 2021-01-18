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

		const bonusQuestions = [];
		bonusQuestions.push(':thumbsdown: What\'s the last pick? :thumbsdown:');
		bonusQuestions.push(':hot_pepper: What\'s the spiciest pick? :hot_pepper:');
		bonusQuestions.push(':two: What\'s the next two picks? :two:');
		bonusQuestions.push(':boy: What\'s the Timmy pick? :boy:');
		bonusQuestions.push(':woman_scientist: What\'s the Johnny pick? :woman_scientist:');
		bonusQuestions.push(':smiling_imp: What\'s the Spike pick? :smiling_imp:');
		bonusQuestions.push(':paintbrush: Which card has the best art? :paintbrush:');
		const bonusQuestion = bonusQuestions[Math.floor(Math.random() * bonusQuestions.length)];

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
						.setTitle(`${arg2}@Cube Tutor`)
						.setURL(`https://www.cubetutor.com/viewcube/${arg2}`)
						.setDescription(`:thinking: What's the pick? :thinking:\n\n${bonusQuestion}`)
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
				const ccResp = await fetch(`https://cubecobra.com/cube/samplepack/${arg2}`);
				const html = await ccResp.text();
				const htmlObj = await parse(html);
				const elements = htmlObj.querySelectorAll('meta');
				const pack = elements.reduce((answer, element) => {
					const property = element.rawAttrs;
					if (property.startsWith('property="og:image"')) answer = property.slice(property.indexOf('http'), -1);
					return answer;
				}, '');
				messageEmbed
					.setTitle(`${arg2}@Cube Cobra`)
					.setURL(`https://cubecobra.com/cube/list/${arg2}`)
					.setDescription(`:thinking: What's the pick? :thinking:\n\n${bonusQuestion}`)
					.setThumbnail('http://cubecobra.com/content/sticker.png')
					.setImage(pack);
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