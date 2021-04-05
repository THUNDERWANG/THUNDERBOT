// for use on development server
const levelsDevelopment = [
  {
    name: '0/0 Germ',
    id: '795222366342217739',
    image: 'https://c1.scryfall.com/file/scryfall-cards/art_crop/front/9/e/9ecc467e-b345-446c-b9b7-5f164e6651a4.jpg?1598311624',
    points: 0,
  },
  {
    name: '1/1 Goblin',
    id: '794698510582022154',
    image: 'https://c1.scryfall.com/file/scryfall-cards/art_crop/front/6/0/60f874f9-7ac2-4d1a-97e3-722db719cd1c.jpg?1584752869',
    points: 1,
  },
  {
    name: '2/2 Zombie',
    id: '795222316614418462',
    image: 'https://c1.scryfall.com/file/scryfall-cards/art_crop/front/8/e/8e214f84-01ee-49c1-8801-4e550b5ade5d.jpg?1572370688',
    points: 5,

  },
  {
    name: '3/3 Beast',
    id: '795222402387935232',
    image: 'https://c1.scryfall.com/file/scryfall-cards/art_crop/front/d/2/d270aeed-b15f-46f9-97ba-ccce562caefa.jpg?1598311679',
    points: 10,
  },
  {
    name: '4/4 Angel',
    id: '795443197126901810',
    image: 'https://c1.scryfall.com/file/scryfall-cards/art_crop/front/6/a/6ac609aa-49d1-4330-b718-a90b0560da52.jpg?1592709988',
    points: 15,
  },
  {
    name: '5/5 Demon',
    id: '795443224932122665',
    image: 'https://c1.scryfall.com/file/scryfall-cards/art_crop/front/5/4/545639fc-e521-41f2-81b2-a671007321eb.jpg?1562229670',
    points: 20,
  },
  {
    name: '6/6 Titan',
    id: '795443242967629864',
    image: 'https://c1.scryfall.com/file/scryfall-cards/art_crop/front/a/0/a0b6a71e-56cb-4d25-8f2b-7a4f1b60900d.jpg?1606762217',
    points: 25,
  },
];

// for use on Online Cube Drafts discord
const levelsProduction = [
  {
    name: '0/0 Germ',
    id: '585662276212621333',
    image: 'https://c1.scryfall.com/file/scryfall-cards/art_crop/front/9/e/9ecc467e-b345-446c-b9b7-5f164e6651a4.jpg?1598311624',
    points: 0,
  },
  {
    name: '1/1 Goblin',
    id: '585564770078556164',
    image: 'https://c1.scryfall.com/file/scryfall-cards/art_crop/front/6/0/60f874f9-7ac2-4d1a-97e3-722db719cd1c.jpg?1584752869',
    points: 1,
  },
  {
    name: '2/2 Zombie',
    id: '585564507670052933', // 2/2 Zombie
    image: 'https://c1.scryfall.com/file/scryfall-cards/art_crop/front/8/e/8e214f84-01ee-49c1-8801-4e550b5ade5d.jpg?1572370688',
    points: 5,

  },
  {
    name: '3/3 Beast',
    id: '585554548756840475',
    image: 'https://c1.scryfall.com/file/scryfall-cards/art_crop/front/d/2/d270aeed-b15f-46f9-97ba-ccce562caefa.jpg?1598311679',
    points: 10,
  },
  {
    name: '4/4 Angel',
    id: '585564850235768844',
    image: 'https://c1.scryfall.com/file/scryfall-cards/art_crop/front/6/a/6ac609aa-49d1-4330-b718-a90b0560da52.jpg?1592709988',
    points: 15,
  },
  {
    name: '5/5 Demon',
    id: '585564899061792781',
    image: 'https://c1.scryfall.com/file/scryfall-cards/art_crop/front/5/4/545639fc-e521-41f2-81b2-a671007321eb.jpg?1562229670',
    points: 20,
  },
  {
    name: '6/6 Titan',
    id: '585691691181146122',
    image: 'https://c1.scryfall.com/file/scryfall-cards/art_crop/front/a/0/a0b6a71e-56cb-4d25-8f2b-7a4f1b60900d.jpg?1606762217',
    points: 25,
  },
];
const levels = process.env.NODE_ENV === 'production' ? levelsProduction : levelsDevelopment;

// creates double-linked levels from an array
function createLinks(levelArray) {

  let head = null;
  let tail = null;

  levelArray.forEach((level) => {
    const current = {
      name: level.name,
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
  let current = createLinks(levels);
  while (current) {
    if (current.points === points) return current;
    if (current.points > points) return current.previous;
    if (!current.next) return current;
    current = current.next;
  }
}

module.exports.levels = levels;
module.exports.findLevel = findLevel;
