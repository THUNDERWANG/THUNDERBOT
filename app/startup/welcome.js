module.exports.welcome = async member => {
	const m1 = 'may you topdeck the timely wrath :beers:';
	const m2 = 'may your P1P1s always be bombs :beers:';
	const m3 = 'may you topdeck the lethal bolt :beers:';
	const m4 = 'may you never mana flood :beers:';
	const m5 = 'may you never be mindsculpted :beers:';

	const messages = [m1, m2, m3, m4, m5];
	const welcomeId = '659117988405837832';
	const germId = '585662276212621333';

	try {
		const index = Math.floor(Math.random() * messages.length);
		const welcomeMessage = `Welcome <@${member.id}>, ` + messages[index];
		const channel = member.guild.channels.cache.get(welcomeId);
		await channel.send(welcomeMessage);
		await member.roles.add(germId);
	} catch(error) {
		console.error(error);
	}
};