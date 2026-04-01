export type Project = {
  id: number;
  year: string;
  title: string;
  status?: number;
  description: string;
  imageUrl: string;
  alt: string;
  link: string;
  github: string;
  demoUrl?: string;
  tech?: string[];
};

export const projects: Project[] = [
  {
    id: 1,
    year: "2024",
    title: "NBA Prop Line",
    status: 2,
    description:
      "A website with an AI engineering model to predict over/unders in the NBA. \
      Holds all NBA player data and webscrapes gamelogs to build a comprehensive database \
      of player statistics for prop line analysis.",
    imageUrl: "/treasure-room/nba-prop-site.webp",
    alt: "NBA Prop Line website with AI model for predicting over/under prop lines.",
    link: "/projects/nba-player-prop-analaysis",
    github: "https://github.com/ThatcherMcc/NBA-Player-Prop-Analysis",
    tech: ["Python", "Flask", "SQL", "scikit-learn", "BeautifulSoup"],
  },
  {
    id: 2,
    year: "2025",
    title: "Customer Segmentation Analysis",
    status: 2,
    description:
      "Uses K-Means Data Clustering on real-world, uncleaned, transactional data from \
      from a service-based business in order to identify distinct customer segments.",
    imageUrl: "/treasure-room/data-clustering-plot.webp",
    alt: "Data Clustering analysis final graph with an RFM Model analysis.",
    link: "/projects/data-clustering",
    github: "https://github.com/ThatcherMcc/Customer-Segmentation-Analysis",
    tech: ["Python", "pandas", "scikit-learn", "Matplotlib", "Jupyter"],
  },
  {
    id: 3,
    year: "2023",
    title: "Off World Video Game",
    status: 1,
    description:
      "Action RPG game with the unique concept of taking and applying other creatures anatomy and powers.\
      It allows for creative and fun anatomy combinations for fighting bosses.",
    imageUrl: "/treasure-room/off-world.webp",
    alt: "Off World video game cover image with astronaut holding a frog on mountains.",
    link: "/projects/off-world",
    github: "https://github.com/ThatcherMcc/Off-World",
    demoUrl: "https://youtube.com/watch?v=I9-k-yx-beE",
    tech: ["Godot", "GDScript", "Blender"],
  },
];
