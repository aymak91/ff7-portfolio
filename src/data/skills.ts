export type Skill = {
  title: string;
  materia: "green" | "yellow" | "blue" | "red" | "purple";
  stars: number;
  description: string;
};

const skillList: Skill[] = [
  {
    title: "Javascript",
    materia: "green",
    stars: 5,
    description: "Popular language for web development.",
  },
  {
    title: "Typescript",
    materia: "green",
    stars: 4,
    description: "Typed superset of JavaScript.",
  },
  {
    title: "Python",
    materia: "green",
    stars: 4,
    description: "Versatile language for scripting and data.",
  },
  {
    title: "Ruby",
    materia: "green",
    stars: 3,
    description: "Dynamic language focused on simplicity.",
  },
  {
    title: "C++",
    materia: "green",
    stars: 2,
    description: "High-performance systems programming language.",
  },
  {
    title: "React",
    materia: "yellow",
    stars: 5,
    description: "Library for building UI components.",
  },
  {
    title: "Next.js",
    materia: "blue",
    stars: 3,
    description: "React framework for server-rendered and optimized web apps."
  },
  {
    title: "Redux",
    materia: "blue",
    stars: 3,
    description: "State management library for JS apps.",
  },
  {
    title: "HTML5",
    materia: "yellow",
    stars: 5,
    description: "Markup language for web pages.",
  },
  {
    title: "CSS",
    materia: "yellow",
    stars: 5,
    description: "Styles web pages with layout and design.",
  },
  {
    title: "Tailwind CSS",
    materia: "blue",
    stars: 5,
    description: "Utility-first CSS framework.",
  },
  {
    title: "Node.js",
    materia: "blue",
    stars: 4,
    description: "JavaScript runtime for server-side apps.",
  },
  {
    title: "Rails",
    materia: "blue",
    stars: 3,
    description: "Web framework written in Ruby.",
  },
  {
    title: "PostgreSQL",
    materia: "red",
    stars: 3,
    description: "Powerful open-source relational database.",
  },
  {
    title: "MongoDB",
    materia: "red",
    stars: 3,
    description: "NoSQL database for JSON-like documents.",
  },
  {
    title: "Firebase",
    materia: "red",
    stars: 5,
    description: "Platform for app development and hosting.",
  },
  {
    title: "AWS",
    materia: "red",
    stars: 3,
    description: "Cloud services platform by Amazon.",
  },
  {
    title: "Postman",
    materia: "red",
    stars: 5,
    description: "API development and testing tool.",
  },
  {
    title: "Git",
    materia: "purple",
    stars: 5,
    description: "Version control system for code.",
  },
  {
    title: "Jira",
    materia: "purple",
    stars: 5,
    description: "Project management and issue tracking.",
  },
  {
    title: "Linux",
    materia: "purple",
    stars: 4,
    description: "Open-source operating system.",
  },
  {
    title: "Ubuntu",
    materia: "purple",
    stars: 5,
    description: "User-friendly Linux distribution.",
  },
];

export default skillList;