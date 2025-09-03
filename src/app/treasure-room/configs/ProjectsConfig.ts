export type Project = {
  id: number;
  title: string;
  alt: string;
  description: string;
  src: string;
  link: string;
  year: string;
};

export const projects: Project[] = [
  {
    id: 1,
    title: "Whiplash Drumming App",
    alt: "Whiplash Drumming App cover image",
    description: "A metronome app for aspiring drummers.",
    src: "/projects/whiplash-app",
    link: "/projects/whiplash-app",
    year: "2023",
  },
  {
    id: 2,
    title: "Firelink Website",
    alt: "Firelink Website cover image",
    description: "A portfolio inspired by Dark Souls' aesthetic.",
    src: "/projects/firelink-website",
    link: "/projects/firelink-website",
    year: "2024",
  },
  {
    id: 3,
    title: "Treasure Planet Gallery",
    alt: "Treasure Planet Gallery cover image",
    description: "An animated gallery with smooth transitions.",
    src: "/projects/treasure-gallery",
    link: "/projects/treasure-gallery",
    year: "2024",
  },
  {
    id: 4,
    title: "Vinland Saga Project",
    alt: "Vinland Saga Project cover image",
    description:
      "A blog dedicated to character analysis and thematic breakdowns.",
    src: "/projects/vinland-saga-project",
    link: "/projects/vinland-saga-project",
    year: "2025",
  },
];
