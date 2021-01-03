module.exports = async member => {
	const welcomeChannelId = '659117988405837832';

	const m1 = 'may you topdeck the timely wrath :beers:';
	const m2 = 'may your P1P1s always be bombs :beers:';
	const m3 = 'may you topdeck the lethal bolt :beers:';
	const m4 = 'may you never mana flood :beers:';
	const m5 = 'may you never be mindsculpted :beers:';
	const messages = [m1, m2, m3, m4, m5];

	try {
		const index = Math.floor(Math.random() * messages.length);
		const welcomeMessage = `Welcome <@${member.id}>, ` + messages[index];
		const channel = member.guild.channels.cache.get(welcomeChannelId);
		await channel.send(welcomeMessage);
	} catch(error) {
		console.error(error);
	}
};