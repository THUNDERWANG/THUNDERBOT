// threshold | { id, image }
module.exports.tierMap = new Map()
	.set(0, { id:'585662276212621333',
		image:'https://c1.scryfall.com/file/scryfall-cards/art_crop/front/9/e/9ecc467e-b345-446c-b9b7-5f164e6651a4.jpg?1598311624' })
	.set(1, { id: '585564770078556164',
		image: 'https://c1.scryfall.com/file/scryfall-cards/art_crop/front/6/0/60f874f9-7ac2-4d1a-97e3-722db719cd1c.jpg?1584752869' })
	.set(5, { id: '585564507670052933',
		image: 'https://c1.scryfall.com/file/scryfall-cards/art_crop/front/8/e/8e214f84-01ee-49c1-8801-4e550b5ade5d.jpg?1572370688' })
	.set(10, { id: '585554548756840475',
		image: 'https://c1.scryfall.com/file/scryfall-cards/art_crop/front/d/2/d270aeed-b15f-46f9-97ba-ccce562caefa.jpg?1598311679' })
	.set(15, { id: '585564850235768844',
		image: 'https://c1.scryfall.com/file/scryfall-cards/art_crop/front/6/a/6ac609aa-49d1-4330-b718-a90b0560da52.jpg?1592709988' })
	.set(20, { id: '585564899061792781',
		image: 'https://c1.scryfall.com/file/scryfall-cards/art_crop/front/5/4/545639fc-e521-41f2-81b2-a671007321eb.jpg?1562229670' })
	.set(25, { id: '585691691181146122',
		image: 'https://c1.scryfall.com/file/scryfall-cards/art_crop/front/5/2/52df7443-9af7-4cab-a69a-2ffd04b48815.jpg?1572370785' });

module.exports.findRoles = points => {
	const thresholds = Array.from(this.tierMap.keys()).reverse();

	const levels = {};
	// fix here
	const index = thresholds.findIndex(threshold => points >= threshold);

	if (index === 0) {
		levels.current = this.tierMap.get(thresholds[index]).id;
		levels.previous = this.tierMap.get(thresholds[index + 1]).id;
	} else if (index === thresholds.length - 1) {
		levels.current = this.tierMap.get(thresholds[index]).id;
		levels.next = this.tierMap.get(thresholds[index - 1]).id;
		levels.toNext = thresholds[index - 1] - points;
	} else {
		levels.current = this.tierMap.get(thresholds[index]).id;
		levels.next = this.tierMap.get(thresholds[index - 1]).id;
		levels.toNext = thresholds[index - 1] - points;
		levels.previous = this.tierMap.get(thresholds[index + 1]).id;
	}

	return levels;
};