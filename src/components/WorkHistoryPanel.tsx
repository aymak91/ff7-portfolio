// components/WorkHistoryPanel.tsx
import WorkHistoryRow from "./WorkHistoryRow";
import FF7Panel from "./FF7Panel";

const workHistory = [
  {
    company: "Letter AI",
    logo: "/logos/letter_ai_logo.jpeg",
    role: "Founding Product Manager",
    years: "2026–present",
    level: 33,
  },
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
    <FF7Panel>
      {/* Save-game style header row */}
      <div className="flex gap-1 mb-1 flex-shrink-0">
        <div className="w-[400px] flex-none min-w-0 border-2 border-double border-ff7-border bg-gradient-to-b from-ff7-panel to-ff7-blue px-3 py-2 text-white text-sm items-center">
          Select a save.
        </div>
        <div className="flex-none w-[72px] border-2 border-double border-ff7-border bg-gradient-to-b from-ff7-panel to-ff7-blue px-3 py-2  font-bold text-sm items-center whitespace-nowrap">
          <span className="text-amber-300">EXP</span> 01
        </div>
      </div>

      {/* Scroll container */}
      <div
        className="
          flex flex-col gap-3
          h-[30vh]
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
