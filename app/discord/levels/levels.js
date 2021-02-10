const { levels } = require('config');


// levels now all in a linked list
const linkedLevels = linkLevels(levels);

// creates double-linked levels from an array
function linkLevels(levelArray) {

	let head = null;
	let tail = null;

	levelArray.forEach(level=>{
		const current = {
			id: level.id,
			image: level.image,
			points: level.points,
			previous: null,
			next: null,
		};
		if (!head) {
			head = current;
		} else {
			current.previous = tail;
			tail.next = current;
		}
		tail = current;
	});
	return head;
}


// searches for the current level with any given amount of points
function findLevel(points) {
	let current = linkedLevels;
	while (current !== null) {
		if (current.points === points || !current.next) return current;
		if (current.points > points) return current.previous;
		current = current.next;
	}
}

function getDescrip() {
// traverse linked list of levels and create description string
	let current = linkedLevels;
	let description = '';
	while (current) {
		const { id, points } = current;
		description += `<@&${id}> | ${points}+ wins \n\n`;
		current = current.next;
	}
	return description;
}


module.exports.levels = linkedLevels;
module.exports.findLevel = findLevel;
module.exports.getDescrip = getDescrip;
