export type Project = {
  id: number;
  year: string;
  title: string;
  status?: number;
  description: string;
  imageUrl: string;
  alt: string;
  link: string;
  github: string | "https://github.com/ThatcherMcc";
  demoUrl?: string;
};

export const projects: Project[] = [
  {
    id: 1,
    year: "2025",
    title: "Customer Segmentation Analysis",
    status: 2,
    description:
      "Uses K-Means Data Clustering on real-world, uncleaned, transactional data from \
      from a service-based business in order to identify distinct customer segments.",
    imageUrl: "/treasure-room/data-clustering-plot.jpg",
    alt: "Data Clustering analysis final graph with an RFM Model analysis.",
    link: "/projects/data-clustering",
    github: "https://github.com/ThatcherMcc/Customer-Segmentation-Analysis",
  },
  {
    id: 2,
    year: "2024",
    title: "NBA Player Prop Analysis",
    status: 1,
    description:
      "Webscrapes player gamelogs to create a single database that contains all relevant statistics. \
      Using this data I made a software that will build a graph based on player, stat, prop line to \
      show the history of any chosen player's performance",
    imageUrl: "/treasure-room/nba-player-prop.jpg",
    alt: "Player performance graph based on statistic, prop line, and player.",
    link: "/projects/nba-player-prop-analaysis",
    github: "https://github.com/ThatcherMcc/NBA-Player-Prop-Analysis",
  },
  {
    id: 3,
    year: "2023",
    title: "Off World Video Game",
    status: 1,
    description:
      "Action RPG game with the unique concept of taking and applying other creatures anatomy and powers.\
      It allows for creative and fun anatomy combinations for fighting bosses.",
    imageUrl: "/treasure-room/off-world.jpg",
    alt: "Off World video game cover image with astronaut holding a frog on mountains.",
    link: "/projects/off-world",
    github: "https://github.com/ThatcherMcc/Off-World",
    demoUrl: "https://youtube.com/watch?v=I9-k-yx-beE",
  },
];
