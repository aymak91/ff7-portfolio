import { useState } from "react";
import Image from "next/image";
import FF7Panel from "./FF7Panel";
import ProjectsItemRow from "./ProjectsItemRow";
import { projects } from "@/data/projects";

const NAV_TABS = ["Use", "Arrange Key Projects", "Projects"] as const;

function CharacterBlock({
  name,
  portrait,
  level,
  status,
  hp,
  mp,
}: {
  name: string;
  portrait: string;
  level: number;
  status: string;
  hp: string;
  mp: string;
}) {
  return (
    <div className="flex gap-2 p-1.5 border-b border-ff7-border/60 last:border-b-0">
      <div className="flex-none w-10 h-10 border border-ff7-border bg-black overflow-hidden">
        <Image src={portrait} alt={name} width={40} height={40} className="object-cover w-full h-full" />
      </div>
      <div className="min-w-0 flex-1 text-white text-[10px] leading-tight">
        <p className="font-bold truncate">{name}</p>
        <p>LV {level}</p>
        <p className="text-fuchsia-400">{status}</p>
        <p>
          HP <span className="border-b-2 border-green-500">{hp}</span>
        </p>
        <p>
          MP <span className="border-b-2 border-blue-400">{mp}</span>
        </p>
      </div>
    </div>
  );
}

export default function ProjectsPanel() {
  const [hoveredDescription, setHoveredDescription] = useState<string | null>(null);

  return (
    <div className="w-full h-full flex flex-col rounded-sm overflow-hidden shadow-ff7 shadow-[2px_2px_0_#00000080] border border-ff7-border">
      {/* Top nav bar */}
      <div className="flex flex-shrink-0 border-b border-ff7-border bg-gradient-to-b from-ff7-panel to-ff7-blue">
        {NAV_TABS.map((tab, i) => (
          <div
            key={tab}
            className={`flex-1 py-1.5 px-2 text-xs border-r border-ff7-border last:border-r-0 flex items-center ${
              i === 0 ? "text-white font-bold" : "text-ff7-text/80"
            }`}
          >
            {i === 0 && <span className="mr-1 text-white">▶</span>}
            {tab}
          </div>
        ))}
      </div>

      {/* Description bar (shows hovered project description) */}
      <div className="flex-shrink-0 border-b border-ff7-border bg-ff7-blue px-2 py-1 text-xs text-ff7-accent min-h-[24px] flex items-center">
        {hoveredDescription ?? "\u00A0"}
      </div>

      {/* Main: left characters + right project list */}
      <div className="flex flex-1 min-h-0">
        <FF7Panel className="flex-none w-[180px] p-1.5 flex flex-col rounded-none border-r border-ff7-border">
          <CharacterBlock
            name="Alexander Mak"
            portrait="/cloud.jpg"
            level={99}
            status="Ready"
            hp="9999/9999"
            mp="999/999"
          />
          <CharacterBlock
            name="Lotus"
            portrait="/barret.jpg"
            level={99}
            status="Good boy"
            hp="9999/9999"
            mp="999/999"
          />
        </FF7Panel>

        <div className="flex-1 min-w-0 bg-gradient-to-b from-ff7-panel to-ff7-blue p-1.5 overflow-y-auto">
          {projects.map((project) => (
            <ProjectsItemRow
              key={project.id}
              project={project}
              onHoverDescription={(desc) => setHoveredDescription(desc)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
