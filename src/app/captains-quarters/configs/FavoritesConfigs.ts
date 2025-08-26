export type Favorite = {
  imageSrc: string;
  altText: string | undefined;
  category: string;
  title: string;
  description: string;
};

export type FavoritesSectionProps = {
  items: Favorite[];
};

export const FavoritesList: Favorite[] = [
  {
    imageSrc: "/favorites/whiplash.jpg",
    altText:
      "Myles Teller drumming on movie cover of whiplash released in 2014",
    category: "Movie",
    title: "Whiplash",
    description:
      "What happens when that line between ambition and obsession is crossed? \
      The question is answered through two incredible performanced, paired with an unforgettable jazz soundtrack.",
  },
  {
    imageSrc: "/favorites/transformers.jpg",
    altText:
      "Optimus Prime opening the all-spark on the movie cover of transformers the movie released in 1986 20th anniversary special edition",
    category: "Movie Series",
    title: "Transformers",
    description:
      "Always loved the transformers as a kid and still do.\
      It's huge robots that can transform into cars fighting each other. \
      What more can I say?",
  },
  {
    imageSrc: "/favorites/kung-fu-panda.jpg",
    altText: "Po on the Kung Fu panda movie cover kicking",
    category: "Movie Trilogy",
    title: "Kung Fu Panda",
    description:
      "A perfect trilogy that follows Po's complete journey of growth. \
      I especially love three antagonists, each offering a unique challenge for Po to overcome: Physical, Mental/Emotional, and Spiritual",
  },
  {
    imageSrc: "/favorites/mr-fox.jpg",
    altText: "Mr. Fox from Fantastic Mr. Fox with spiral eyes",
    category: "Movie Character",
    title: "Mr. Fox",
    description:
      "Mr. Fox perfectly captures the struggle of trying to live up to an impossible standard. \
      The weight of needing to be perceived as perfect was something I deeply related to when I watched this.",
  },
  {
    imageSrc: "/favorites/dark-souls.jpg",
    altText: "dark souls 3 video game cover with unkindled knight on front",
    category: "All-Time Video Game",
    title: "Dark Souls 3",
    description:
      "I could go on for hours about the beauty in the game, \
      it's story, and characters, but I'll keep it short.\
      This game forced me to be a more complete person",
  },
  {
    imageSrc: "/favorites/hearthstone-bg.jpg",
    altText:
      "Hearthstone Battlegrounds wallpaper with a dwarf and elf looking at the camera",
    category: "Current Video Game",
    title: "Hearthstone Battlegrounds",
    description:
      " I'm a huge fan of games that require you to plan, think, and create on the fly (any rogue-like game).\
      No game is the same and the game rewards you for not forcing a comp.",
  },

  {
    imageSrc: "/favorites/silver-surfer.jpg",
    altText: "Silver Surfer alone in space squating on surfboard",
    category: "Superhero",
    title: "Silver Surfer",
    description:
      "He has everything and nothing at the same time.\
    Weilding god-like power, that is the source of both his greatest strength and immense sorrow.\
    He's a tragic hero whose greatest burden is the constant choice\
    to choose the greater good of the universe over his own happiness.",
  },
  {
    imageSrc: "/favorites/magneto.jpg",
    altText: "Magneto from X-men using his powers",
    category: "Supervillian",
    title: "Magneto",
    description:
      "A compelling character whose ideology stems from the trauma of surviving the Holocaust. \
      He's willing to do what's necessary to make the world habitable for mutants,\
      driven by a conviction to prevent them from suffering the same fate he did.",
  },
  {
    imageSrc: "/favorites/jojos.jpg",
    altText:
      "Five Jojo's characters together, jonathan, joseph, jotaro, josuke, and giorno",
    category: "Anime",
    title: "Jojo's Bizarre Adventure",
    description:
      "Huge fan of each part having it's own unique protagonist, while still building on the same world.\
    It doesn't take itself too seriously, delivering an interesting power system with a fun cast of characters",
  },
  {
    imageSrc: "/favorites/vinland-saga.jpg",
    altText: "Thorfinn sitting on a rock saying I want to be a stronger person",
    category: "Manga",
    title: "Vinland Saga",
    description:
      "Vinland Saga is a masterpiece of storytelling that features what I consider the best represention of growth in all of media.\
      Thorfinn's journey from a boy consumed by hatred and revenge to a man who wishes to atone for his past through creating a free world for others is beautiful.",
  },
  {
    imageSrc: "/favorites/jordan-ward.jpg",
    altText: "Jordan Ward smiling on his album cover",
    category: "All-Time Artist",
    title: "Jordan Ward",
    description:
      "Creates upbeat R&B sounds that leaves me feeling happy.\
      Great vocalist as well. Can't wait for his next album.",
  },
  {
    imageSrc: "/favorites/girlfriends.jpg",
    altText: "Jerry Joiner performing on the drums",
    category: "Current Artist",
    title: "Girlfriends",
    description:
      "The main reason I started learning guitar was because of this guy.\
    He's almost a mystery of sorts but I think he was well ahead of his time being a one man band.",
  },
  {
    imageSrc: "/favorites/sushi.jpg",
    altText: "Sushi roll on plate",
    category: "Food",
    title: "Sushi",
    description:
      "Specifically fried sushi rolls but I like most rolls, just not a wasabi or ginger type of guy.",
  },
  {
    imageSrc: "/favorites/green.jpg",
    altText: "The Color Green",
    category: "Color",
    title: "Green",
    description:
      "Mostly because it's the color of nature, but it's such a nice color. Like CMONNN",
  },
];
