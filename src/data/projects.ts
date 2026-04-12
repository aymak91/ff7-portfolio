export interface Project {
  id: string;
  title: string;
  description: string;
  liveUrl?: string;
  githubUrl?: string;
}

export const projects: Project[] = [
  {
    id: "1",
    title: "FF7 Portfolio",
    description: "Portfolio site built with Next.js and Tailwind, inspired by FF7 menus.",
    liveUrl: "https://alexandermak.dev",
    githubUrl: "https://github.com/aymak91/ff7-portfolio",
  },
  {
    id: "2",
    title: "1337Code",
    description: "Leetcode clone built with Next.js and Tailwind. Features a question bank and progress tracking.",
    liveUrl: "https://1337-code.vercel.app",
    githubUrl: "https://github.com/aymak91/1337code",
  },
  {
    id: "3",
    title: "PokeCord",
    description: "Discord clone built with React and Firebase. Features a chat interface and real-time messaging.",
    liveUrl: "https://pokecord-ruby.vercel.app",
    githubUrl: "https://github.com/aymak91/pokecord",
  },
  {
    id: "4",
    title: "Woofblr",
    description: "Tumblr clone with emphasis on dogs built with React and Ruby on Rails.",
    githubUrl: "https://github.com/aymak91/woofblr",
  },
  {
    id: "5",
    title: "BoneMeetsKibble",
    description: "Dog-matching app built with React, Node.js, and MongoDB. Features a chat interface.",
    githubUrl: "https://github.com/aymak91/bone-meats-kibble",
  },
  {
    id: "6",
    title: "Pathfinding Visualizer",
    description: "Pathfinding algorithm visualizer built with vanilla JavaScript.",
    liveUrl: "https://aymak91.github.io/pathfinding_visualizer/",
    githubUrl: "https://github.com/aymak91/pathfinding_visualizer",
  },
  {
    id: "7",
    title: "Hungry Wolf",
    description: "Tile based game built with vanilla JavaScript.",
    liveUrl: "https://aymak91.github.io/hungry-wolf/",
    githubUrl: "https://github.com/aymak91/hungry-wolf",
  },
];
