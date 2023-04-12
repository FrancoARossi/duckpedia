type ScrapedHat = {
  name: string;
  imageUrl: string;
  note?: string;
  unlockable?: boolean;
};

const scrapedHats: ScrapedHat[] = [
  {
    name: "Agents",
    imageUrl:
      "https://static.wikia.nocookie.net/duckgame/images/0/01/Agents.png/revision/latest?cb=20170908082305",
  },
  {
    name: "Dapper",
    imageUrl:
      "https://static.wikia.nocookie.net/duckgame/images/5/5a/Dapper.png/revision/latest?cb=20170908082332",
  },
  {
    name: "Caps",
    imageUrl:
      "https://static.wikia.nocookie.net/duckgame/images/f/f8/Caps.png/revision/latest?cb=20170908082319",
  },
  {
    name: "Dicks",
    imageUrl:
      "https://static.wikia.nocookie.net/duckgame/images/2/29/Dicks.png/revision/latest?cb=20170908082337",
  },
  {
    name: "Dinos",
    imageUrl:
      "https://static.wikia.nocookie.net/duckgame/images/e/e9/Dinos.png/revision/latest?cb=20170908082339",
  },
  {
    name: "Drunks",
    imageUrl:
      "https://static.wikia.nocookie.net/duckgame/images/5/54/Drunks.png/revision/latest?cb=20170908082342",
  },
  {
    name: "Gents",
    imageUrl:
      "https://static.wikia.nocookie.net/duckgame/images/f/fc/Gents.png/revision/latest?cb=20170908082356",
  },
  {
    name: "Jazzducks",
    imageUrl:
      "https://static.wikia.nocookie.net/duckgame/images/f/fa/Jazzducks.png/revision/latest?cb=20170908082405",
  },
  {
    name: "Log",
    imageUrl:
      "https://static.wikia.nocookie.net/duckgame/images/e/e0/Log.png/revision/latest?cb=20170908082410",
  },
  {
    name: "Pilots",
    imageUrl:
      "https://static.wikia.nocookie.net/duckgame/images/4/47/Pilots.png/revision/latest?cb=20170908082423",
  },
  {
    name: "Pompadour",
    imageUrl:
      "https://static.wikia.nocookie.net/duckgame/images/5/54/Pompadour.png/revision/latest?cb=20170908082424",
  },
  {
    name: "Potheads",
    imageUrl:
      "https://static.wikia.nocookie.net/duckgame/images/2/27/Pots.png/revision/latest?cb=20170908082428",
  },
  {
    name: "Sombreros",
    imageUrl:
      "https://static.wikia.nocookie.net/duckgame/images/1/1c/Sombrero.png/revision/latest?cb=20170908082446",
  },
  {
    name: "Sailors",
    imageUrl:
      "https://static.wikia.nocookie.net/duckgame/images/8/8f/Sailors.png/revision/latest?cb=20170908082438",
  },
  {
    name: "Uglies",
    imageUrl:
      "https://static.wikia.nocookie.net/duckgame/images/2/22/Uglies.png/revision/latest?cb=20170908082458",
  },
  {
    name: "Valet",
    imageUrl:
      "https://static.wikia.nocookie.net/duckgame/images/3/34/Valet.png/revision/latest?cb=20170908082500",
  },
  {
    name: "Kerchief",
    imageUrl:
      "https://static.wikia.nocookie.net/duckgame/images/e/ef/Kerchief.png/revision/latest?cb=20201114041847",
  },
  {
    name: "Postals",
    imageUrl:
      "https://static.wikia.nocookie.net/duckgame/images/8/88/Mailbox.png/revision/latest?cb=20201114041848",
  },
  {
    name: "Burgers",
    imageUrl:
      "https://static.wikia.nocookie.net/duckgame/images/5/5a/Burgers.png/revision/latest?cb=20170908082317",
    note: "The player spits ketchup when quacking and a slapping noise is made if the mouth is closed after being opened for a short period of time.",
  },
  {
    name: "Divers",
    imageUrl:
      "https://static.wikia.nocookie.net/duckgame/images/d/de/Divers.png/revision/latest?cb=20170908082340",
    note: "Water comes out when the player quacks and a faint squeaking can be heard if the face plate is closed after being opened for more than one second.",
  },
  {
    name: "Fridges",
    imageUrl:
      "https://static.wikia.nocookie.net/duckgame/images/6/66/Fridge.png/revision/latest?cb=20170908082349",
    note: "Given out in the Halloween 2016 Hat Pack. Water comes out when the player quacks and a faint squeaking can be heard if the door is closed after being opened for more than one second.",
  },
  {
    name: "Pumpkins",
    imageUrl:
      "https://static.wikia.nocookie.net/duckgame/images/c/cc/Dumplin.png/revision/latest?cb=20170908082344",
    note: "Given out in the Halloween 2016 Hat Pack.",
  },
  {
    name: "Witchtime",
    imageUrl:
      "https://static.wikia.nocookie.net/duckgame/images/6/6e/Witchtime.png/revision/latest?cb=20170908082504",
    note: "Given out in the Halloween 2016 Hat Pack.",
  },
  {
    name: "Locked",
    imageUrl:
      "https://static.wikia.nocookie.net/duckgame/images/8/85/Locked.png/revision/latest?cb=20170908082408",
    note: "Shares the sprite of locked hats and can be found between the Hearts and Jazzduck hats.",
  },
  {
    name: "Senpai",
    imageUrl:
      "https://static.wikia.nocookie.net/duckgame/images/c/c0/Sensei.png/revision/latest?cb=20170908082441",
    note: "A sparkling effect rotates behind the hat when the player quacks.",
  },
  {
    name: "Tubes",
    imageUrl:
      "https://static.wikia.nocookie.net/duckgame/images/5/53/Tube.png/revision/latest?cb=20170908082453",
    note: "Bubbles come out of the tube when the player quacks.",
  },
  {
    name: "Cyborgs",
    imageUrl:
      "https://static.wikia.nocookie.net/duckgame/images/9/99/Cyborgs.png/revision/latest?cb=20170908082328",
    note: "References the Terminator franchise.",
  },
  {
    name: "Frogs?",
    imageUrl:
      "https://static.wikia.nocookie.net/duckgame/images/4/4e/Frogs.png/revision/latest?cb=20170908082351",
    note: "References the game Amazing Frog?.",
  },
  {
    name: "Super",
    imageUrl:
      "https://static.wikia.nocookie.net/duckgame/images/9/96/Super.png/revision/latest?cb=20170908082448",
    note: "References the anime Dragon Ball Z.",
  },
  {
    name: "Turing",
    imageUrl:
      "https://static.wikia.nocookie.net/duckgame/images/d/d1/Turing.png/revision/latest?cb=20170908082454",
    note: "References the game Read Only Memories.",
  },
  {
    name: "Retro",
    imageUrl:
      "https://static.wikia.nocookie.net/duckgame/images/9/95/Retros.png/revision/latest?cb=20170908082433",
    note: "References the player character Captain Viridian from VVVVVV.",
  },
  {
    name: "Wahhs",
    imageUrl:
      "https://static.wikia.nocookie.net/duckgame/images/f/fb/Wahhs.png/revision/latest?cb=20201114041852",
    note: "Reference to Waluigi",
  },
  {
    name: "Cyclops",
    imageUrl:
      "https://static.wikia.nocookie.net/duckgame/images/a/a9/Cyclops.png/revision/latest?cb=20170908082330",
  },
  {
    name: "Mothers",
    imageUrl:
      "https://static.wikia.nocookie.net/duckgame/images/4/48/Motherduck.png/revision/latest?cb=20170908082417",
  },
  {
    name: "Big Robo",
    imageUrl:
      "https://static.wikia.nocookie.net/duckgame/images/9/98/Newrobo.png/revision/latest?cb=20170908082419",
  },
  {
    name: "Tincan",
    imageUrl:
      "https://static.wikia.nocookie.net/duckgame/images/a/a7/Oldrobo.png/revision/latest?cb=20170908082422",
  },
  {
    name: "Pony Cap",
    imageUrl:
      "https://static.wikia.nocookie.net/duckgame/images/0/00/Ponycap.png/revision/latest?cb=20170908082426",
  },
  {
    name: "Skis/Poles",
    imageUrl:
      "https://static.wikia.nocookie.net/duckgame/images/4/4b/Ski.png/revision/latest?cb=20170908082444",
  },
  {
    name: "Tricorne",
    imageUrl:
      "https://static.wikia.nocookie.net/duckgame/images/7/79/Tricorne.png/revision/latest?cb=20170908082451",
  },
  {
    name: "Twintail",
    imageUrl:
      "https://static.wikia.nocookie.net/duckgame/images/b/ba/Twintail.png/revision/latest?cb=20170908082456",
  },
  {
    name: "Welder",
    imageUrl:
      "https://static.wikia.nocookie.net/duckgame/images/6/60/WELDER.png/revision/latest?cb=20170908082502",
  },
  {
    name: "Highfives",
    imageUrl:
      "https://static.wikia.nocookie.net/duckgame/images/2/2d/Highfives.png/revision/latest?cb=20201114041845",
  },
  {
    name: "Bawb",
    imageUrl:
      "https://static.wikia.nocookie.net/duckgame/images/f/f1/Bawb.png/revision/latest?cb=20170908082312",
    note: "Buy Hat Pack 1 from Chancy.",
    unlockable: true,
  },
  {
    name: "Frank",
    imageUrl:
      "https://static.wikia.nocookie.net/duckgame/images/2/2b/Frank.png/revision/latest?cb=20170908082347",
    note: "Buy Hat Pack 1 from Chancy.",
    unlockable: true,
  },
  {
    name: "Meeee",
    imageUrl:
      "https://static.wikia.nocookie.net/duckgame/images/c/c9/Toomany.png/revision/latest?cb=20170908082450",
    note: "Buy Hat Pack 1 from Chancy.",
    unlockable: true,
  },
  {
    name: "Cowboys",
    imageUrl:
      "https://static.wikia.nocookie.net/duckgame/images/d/d3/Cowboys.png/revision/latest?cb=20170908082326",
    note: "Buy Hat Pack 2 from Chancy.",
    unlockable: true,
  },
  {
    name: "Joey",
    imageUrl:
      "https://static.wikia.nocookie.net/duckgame/images/5/5e/Joey.png/revision/latest?cb=20170908082406",
    note: "Buy Hat Pack 2 from Chancy.",
    unlockable: true,
  },
  {
    name: "Pulpy",
    imageUrl:
      "https://static.wikia.nocookie.net/duckgame/images/b/ba/Pulpy.png/revision/latest?cb=20170908082429",
    note: "Buy Hat Pack 2 from Chancy.",
    unlockable: true,
  },
  {
    name: "Chancy",
    imageUrl:
      "https://static.wikia.nocookie.net/duckgame/images/0/00/Chancy.png/revision/latest?cb=20170908082322",
    note: "Buy the Ultimate Champion from Chancy, which requires obtaining every platinum medal to be able to afford.",
    unlockable: true,
  },
  {
    name: "Captain",
    imageUrl:
      "https://static.wikia.nocookie.net/duckgame/images/3/38/Devhat.png/revision/latest?cb=20170908082336",
    note: "Get all the dev medals in the Challenge Arcade.",
    unlockable: true,
  },
  {
    name: "Astropal",
    imageUrl:
      "https://static.wikia.nocookie.net/duckgame/images/4/45/Astrobud.png/revision/latest?cb=20170908082308",
    note: "Burn 200 gallons of fuel, either through the jet pack or igniting barrels.",
    unlockable: true,
  },
  {
    name: "Ballz",
    imageUrl:
      "https://static.wikia.nocookie.net/duckgame/images/6/63/Ballhead.png/revision/latest?cb=20170908082310",
    note: "Crush 50 ducks.",
    unlockable: true,
  },
  {
    name: "Brick",
    imageUrl:
      "https://static.wikia.nocookie.net/duckgame/images/5/58/Brick.png/revision/latest?cb=20170908082314",
    note: "Shoot 500 lasers.",
    unlockable: true,
  },
  {
    name: "Broduck",
    imageUrl:
      "https://static.wikia.nocookie.net/duckgame/images/5/5e/Broduck.png/revision/latest?cb=20170908082316",
    note: "Strafe 10 kilometers.",
    unlockable: true,
  },
  {
    name: "Eggpal",
    imageUrl:
      "https://static.wikia.nocookie.net/duckgame/images/a/ad/Eggy.png/revision/latest?cb=20170908082346",
    note: "Win 5 times while wearing the Swack hat.",
    unlockable: true,
  },
  {
    name: "Funnyman",
    imageUrl:
      "https://static.wikia.nocookie.net/duckgame/images/1/10/FunnyMan.png/revision/latest?cb=20170908082354",
    note: "Steal 100 hats.",
    unlockable: true,
  },
  {
    name: "Eyebob",
    imageUrl:
      "https://static.wikia.nocookie.net/duckgame/images/4/46/Gross.png/revision/latest?cb=20170908082358",
    note: "Get 25 kills with the Death Ray.",
    unlockable: true,
  },
  {
    name: "Swack",
    imageUrl:
      "https://static.wikia.nocookie.net/duckgame/images/8/86/Guac.png/revision/latest?cb=20170908082400",
    note: "Play one match. Reference to the game Burrito Galaxy",
    unlockable: true,
  },
  {
    name: "Brad",
    imageUrl:
      "https://static.wikia.nocookie.net/duckgame/images/5/55/Handy.png/revision/latest?cb=20170908082401",
    note: "Disarm 100 ducks.",
    unlockable: true,
  },
  {
    name: "Hearts",
    imageUrl:
      "https://static.wikia.nocookie.net/duckgame/images/2/26/Hearts.png/revision/latest?cb=20170908082403",
    note: "Participate in 50 games.",
    unlockable: true,
  },
  {
    name: "Moonwalker",
    imageUrl:
      "https://static.wikia.nocookie.net/duckgame/images/a/a0/Moonwalker.png/revision/latest?cb=20170908082415",
    note: "Raise eight little men.",
    unlockable: true,
  },
  {
    name: "Ducks",
    imageUrl:
      "https://static.wikia.nocookie.net/duckgame/images/2/29/Reallife.png/revision/latest?cb=20170908082431",
    note: "Quack 1000 times.",
    unlockable: true,
  },
  {
    name: "Majesty",
    imageUrl:
      "https://static.wikia.nocookie.net/duckgame/images/f/f1/Royalty.png/revision/latest?cb=20170908082436",
    note: "Level up to the maximum limit.",
    unlockable: true,
  },
  {
    name: "Skully",
    imageUrl:
      "https://static.wikia.nocookie.net/duckgame/images/4/4d/Skelly.png/revision/latest?cb=20170908082442",
    note: "Kill 1000 ducks.",
    unlockable: true,
  },
  {
    name: "Wizards",
    imageUrl:
      "https://static.wikia.nocookie.net/duckgame/images/c/cb/Wizbiz.png/revision/latest?cb=20170908082505",
    note: "Make 25 angle trick shots in the air.",
    unlockable: true,
  },
  {
    name: "B52s",
    imageUrl:
      "https://static.wikia.nocookie.net/duckgame/images/b/b5/B52s.png/revision/latest?cb=20201114041844",
    note: "Win 10 matches with hats that are hair (includes Cyclops, Frank, Pulpy, Pompadour, Super or Twintail); Reference to the music band The B-52s",
    unlockable: true,
  },
  {
    name: "Bigearls",
    imageUrl:
      "https://static.wikia.nocookie.net/duckgame/images/9/95/Bigearls.png/revision/latest?cb=20201114041844",
    note: "Open 100 presents; Reference to the game ToeJam & Earl",
    unlockable: true,
  },
  {
    name: "Clams",
    imageUrl:
      "https://static.wikia.nocookie.net/duckgame/images/5/52/Clams.png/revision/latest?cb=20201114041845",
    note: "Spend 10 minutes underwater",
    unlockable: true,
  },
  {
    name: "Johnnys",
    imageUrl:
      "https://static.wikia.nocookie.net/duckgame/images/2/24/Johnnys.png/revision/latest?cb=20201114041846",
    note: 'Type "johnnygrey" into the client "Johnny Grey"',
    unlockable: true,
  },
  {
    name: "Katana Zero",
    imageUrl:
      "https://static.wikia.nocookie.net/duckgame/images/c/c8/Katanaman.png/revision/latest?cb=20201114041846",
    note: "Get 25 sword kills; Reference to the game Katana Zero",
    unlockable: true,
  },
  {
    name: "Master",
    imageUrl:
      "https://static.wikia.nocookie.net/duckgame/images/6/6b/Master.png/revision/latest?cb=20201114041848",
    note: "Kill 25 netted ducks by throwing/tossing",
    unlockable: true,
  },
  {
    name: "Diplomats",
    imageUrl:
      "https://static.wikia.nocookie.net/duckgame/images/a/ab/Suit.png/revision/latest?cb=20201114041850",
    note: "Play 50 online games; This hat's cape is the flag you set in the game options",
    unlockable: true,
  },
  {
    name: "Toeboys",
    imageUrl:
      "https://static.wikia.nocookie.net/duckgame/images/4/40/Toeboys.png/revision/latest?cb=20201114041850",
    note: "Open 100 presents; Reference to the game ToeJam & Earl",
    unlockable: true,
  },
  {
    name: "UUfos",
    imageUrl:
      "https://static.wikia.nocookie.net/duckgame/images/3/3a/Ufos.png/revision/latest?cb=20201114041851",
    note: "Use the Jetpack while being ragdolled for 20 seconds",
    unlockable: true,
  },
  {
    name: "Waffles",
    imageUrl:
      "https://static.wikia.nocookie.net/duckgame/images/e/e8/Waffles.png/revision/latest?cb=20201114041851",
    note: "Unlocked by playing Duck Game between 9 and 10 am",
    unlockable: true,
  },
  {
    name: "Werewolves",
    imageUrl:
      "https://static.wikia.nocookie.net/duckgame/images/f/f7/Werewolves.png/revision/latest?cb=20201114041853",
    note: "Unlocked by playing Duck Game at full moon and at 12 am",
    unlockable: true,
  },
  {
    name: "Angrys",
    imageUrl:
      "https://static.wikia.nocookie.net/duckgame/images/0/0b/Angrys.png/revision/latest?cb=20170908082307",
    note: "Unused hat.",
  },
  {
    name: "Chancee",
    imageUrl:
      "https://static.wikia.nocookie.net/duckgame/images/f/f3/Chancee.png/revision/latest?cb=20170908082321",
  },
  {
    name: "Cluehat",
    imageUrl:
      "https://static.wikia.nocookie.net/duckgame/images/d/d2/Cluehat.png/revision/latest?cb=20170908082324",
    note: "The default icon for custom hats online.",
  },
  {
    name: "Default",
    imageUrl:
      "https://static.wikia.nocookie.net/duckgame/images/5/5e/Default.png/revision/latest?cb=20170908082334",
    note: "Used by fans in the audience during intermissions. The hat changes color to fit the color of the duck wearing it.",
  },
  {
    name: "Funhat",
    imageUrl:
      "https://static.wikia.nocookie.net/duckgame/images/b/b2/Funhat.png/revision/latest?cb=20170908082352",
  },
  {
    name: "Mobby",
    imageUrl:
      "https://static.wikia.nocookie.net/duckgame/images/6/64/Mobby.png/revision/latest?cb=20170908082411",
    note: "Unused hat.",
  },
  {
    name: "Officemen",
    imageUrl:
      "https://static.wikia.nocookie.net/duckgame/images/7/73/Officemen.png/revision/latest?cb=20201114041849",
    note: "Not usable",
  },
  {
    name: "Scurvies",
    imageUrl:
      "https://static.wikia.nocookie.net/duckgame/images/d/d1/Scurvies.png/revision/latest?cb=20201114041849",
    note: "Not usable",
  },
];

export default scrapedHats;