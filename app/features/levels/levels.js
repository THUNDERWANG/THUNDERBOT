// for use on development server

const germImage = 'https://lh3.googleusercontent.com/pw/ACtC-3euY0c6kPEtaEjZGWO79EBThWgDYWdz9ichfIAN00o5c49ERH8GPbfPW5Qb0VCiTGBKpv9WYjt_Pq41Eih0xKyQIZNJ-HpD2I98dKY9qD6TXB9e4UI3zFIPuVciPTv6tu-GhmjvoVMNykD900sWR-c=s450-no';

const goblinImage = 'https://lh3.googleusercontent.com/pw/ACtC-3cLpak_UgHaczHEXWwA4QtZ0o0yJ79lnTWumnOmRNlolgXFvOAdHtBb_utrkAv9TuaT25ct5idaSRLDh5fUpLRz6le-N80goOqW08mLXvaCN6-AILzo0MSPsBstANUpalTy8JHUSSiVlNm78d_f8go=s450-no';

const zombieImage = 'https://lh3.googleusercontent.com/pw/ACtC-3fZxooqrabrSFcCdlWCgwkDFE7nTOITv--lpz3AjL--hgazEFa4sCZKYNplkkaUBI_aMNOyfdABkPqGl_xU5pU7ZtRwliU2xwQItgVglvjHdMNJ2NkhH4czl3dtbZZYvl4HoTgsMwPXknGPm57D50g=s450-no';

const beastImage = 'https://lh3.googleusercontent.com/pw/ACtC-3cr5YOKMP-01ik3pM4DfaRdmpf-jW7mg-qpuxM_-Dv8oE5Lkj_5BEo1J-F5nytkQCADYArx42CK-iJ3XbVUx9QZsiem4_LW218vgvy7a8PYaXLMaJgq1M47HUTuRI5oFNuN97nVD8IsfIIg_QauS-E=s450-no';

const angelImage = 'https://lh3.googleusercontent.com/pw/ACtC-3dY239BwL2T2BvFUJH7n3w_tMLTSWGmCgkIveaZSnW9KSZK-2RD9jdQavoKkNBXnmuJqQ0Rgog8fIb9KhQEVjmBsPs4VU1xkwBPDSopQ5zzPVAV19vuIwkLR6WOcmM3F79sMesKd7gvZIa09uYQvTs=s450-no';

const demonImage = 'https://lh3.googleusercontent.com/pw/ACtC-3dDXj9-8l2XUX-7fZitvLF2Sw6d7-z0MB76b-JaB5pw-PyytEK82N2hIIsvwCJrSA9JEpCV1BO-N1JOtdxlTtHKsWzQhZ4S9A5zopiOEg80le29GWw4GE-3hG3sRSzksjKwNolraq6ovoCpMsyD3Tk=s450-no';

const uroImage = 'https://lh3.googleusercontent.com/pw/ACtC-3duFaTlly9I66vteCoNDaO-PCD5cGnMgq562kVDe85duG5JeLoFOEs8smxgb0ohqiJawxR_Yj0v0MEDWBChaA-EgH1GDBAcrV0WkqbAvcfuFcbiQCaSGmgqIzMgOnZi9xPjdlSzcr73HP_h_e4JEAU=s450-no';

const muscleImage = 'https://lh3.googleusercontent.com/pw/ACtC-3fR_oxrYBB45oQjl1OUEkAlVWottJWrVBRuyd0rHJMV0LQNFKHoFn8KUTV1gxG9P0rYSkYL7122lvTPSUzJx4QOLRsOv4RPMC6-VmXmEf3soJYDaN_pnb3GouvO-rGM6z66UQ0La1tm0UpTDkUvbmw=s450-no';

const levelsDevelopment = [
  {
    name: '0/0 Germ',
    id: '795222366342217739',
    image: germImage,
    points: 0,
    footer: '"Germ" by Igor Kieryluk',
  },
  {
    name: '1/1 Goblin',
    id: '794698510582022154',
    image: goblinImage,
    points: 1,
    footer: '"Goblin" by Dave Allsop',
  },
  {
    name: '2/2 Zombie',
    id: '795222316614418462',
    image: zombieImage,
    points: 5,
    footer: '"Zombie" by Tomasz Jedruszek',
  },
  {
    name: '3/3 Beast',
    id: '795222402387935232',
    image: beastImage,
    points: 10,
    footer: '"Beast" by Jason Felix',
  },
  {
    name: '4/4 Angel',
    id: '795443197126901810',
    image: angelImage,
    points: 15,
    footer: '"Angel" by Magali Villeneuve',
  },
  {
    name: '5/5 Demon',
    id: '795443224932122665',
    image: demonImage,
    points: 20,
    footer: '"Demon" by Kev Walker',
  },
  {
    name: '6/6 Titan',
    id: '795443242967629864',
    image: uroImage,
    points: 25,
    footer: '"Uro, Titan of Nature\'s Wrath" by Vincent Proce',
  },
];

// for use on Online Cube Drafts discord
const levelsProduction = [
  {
    name: '0/0 Germ',
    id: '585662276212621333',
    image: germImage,
    points: 0,
    footer: '"Germ" by Igor Kieryluk',
  },
  {
    name: '1/1 Goblin',
    id: '585564770078556164',
    image: goblinImage,
    points: 1,
    footer: '"Goblin" by Dave Allsop',
  },
  {
    name: '2/2 Zombie',
    id: '585564507670052933', // 2/2 Zombie
    image: zombieImage,
    points: 5,
    footer: '"Zombie" by Tomasz Jedruszek',

  },
  {
    name: '3/3 Beast',
    id: '585554548756840475',
    image: beastImage,
    points: 10,
    footer: '"Beast" by Jason Felix',
  },
  {
    name: '4/4 Angel',
    id: '585564850235768844',
    image: angelImage,
    points: 15,
    footer: '"Angel" by Magali Villeneuve',
  },
  {
    name: '5/5 Demon',
    id: '585564899061792781',
    image: demonImage,
    points: 20,
    footer: '"Demon" by Kev Walker',
  },
  {
    name: '6/6 Titan',
    id: '585691691181146122',
    image: uroImage,
    points: 25,
    footer: '"Uro, Titan of Nature\'s Wrath" by Vincent Proce',
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
      footer: level.footer,
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
module.exports.muscleImage = muscleImage;
