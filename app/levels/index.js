const tiers = require('config').Levels.tiers;

module.exports.findRoles = points => {
	const thresholds = Object.keys(tiers).reverse();
	const levels = {};
	// fix here
	const index = thresholds.findIndex(threshold => points >= threshold);

	if (index === 0) {
		levels.current = tiers.get(thresholds[index]).id;
		levels.previous = tiers.get(thresholds[index + 1]).id;
	} else if (index === thresholds.length - 1) {
		levels.current = tiers.get(thresholds[index]).id;
		levels.next = tiers.get(thresholds[index - 1]).id;
		levels.toNext = thresholds[index - 1] - points;
	} else {
		levels.current = tiers.get(thresholds[index]).id;
		levels.next = tiers.get(thresholds[index - 1]).id;
		levels.toNext = thresholds[index - 1] - points;
		levels.previous = tiers.get(thresholds[index + 1]).id;
	}

	return levels;
};