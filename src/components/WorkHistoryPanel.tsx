// components/WorkHistoryPanel.tsx
import WorkHistoryRow from "./WorkHistoryRow";
import FF7Panel from "./FF7Panel";

const workHistory = [
  {
    company: "Dijkstra Tech",
    logo: "/logos/dijkstratech_logo.jpg",
    role: "Founder, Software Developer",
    years: "2023–present",
    level: 30,
  },
  {
    company: "App Academy",
    logo: "/logos/app_academy_logo.jpg",
    role: "Software Engineering Career Coach",
    years: "2021-2023",
    level: 29,
  },
  {
    company: "Minos Labs",
    logo: "/logos/minos_logo.jpg",
    role: "Full Stack Engineer",
    years: "2021-2021",
    level: 28,
  },
  {
    company: "Cruise Automation",
    logo: "/logos/cruise_logo.jpg",
    role: "Autonomous Vehicle Fleet Operations Lead, Project Manager",
    years: "2017–2020",
    level: 24,
  },
];

export default function WorkHistoryPanel() {
  return (
    <FF7Panel title="Select a file.">
      {/* Scroll container */}
      <div
        className="
          flex flex-col gap-3
          h-full
          overflow-y-auto
          pr-1
        "
      >
        {workHistory.map(job => (
          <WorkHistoryRow key={job.company} {...job} />
        ))}
      </div>
    </FF7Panel>
  );
}
