module.exports = {
    // returns previous, current, and next role
	findCurrentNextRoles(tiersMap, points) {
		const thresholds = Array.from(tiersMap.keys());
		const roleInfo = {
			currentRoleId: tiersMap.get(thresholds[thresholds.length - 1]).id,
			nextRoleId: null,
			toNext: 0,
		};
		const indexOfNext = thresholds.findIndex(threshold => threshold > points);
		if (indexOfNext !== -1) {
			roleInfo.nextRoleId = tiersMap.get(thresholds[indexOfNext]).id;
			roleInfo.currentRoleId = tiersMap.get(thresholds[indexOfNext - 1]).id;
			roleInfo.toNext = thresholds[indexOfNext] - points;
		}
		return roleInfo;
	},
};