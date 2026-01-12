import Image from "next/image";
import { useState, useMemo, useEffect } from "react";
import { useHoverSound } from "@/hooks/useHoverSound";
import FF7Panel from "@/components/FF7Panel";
import MateriaSocket from "./MateriaSocket";
import StarRating from "./StarRating";

// ───── Types ─────
type Skill = {
  title: string;
  materia: "green" | "yellow" | "blue" | "red" | "purple";
  stars: number;
  description: string;
};

type MateriaSlot = {
  skill?: Skill;
  linked?: boolean;
};

type Character = {
  name: string;
  level: number;
  hp: string;
  mp: string;
  avatar: string;
};

// ───── Character Data ─────
const myCharacter: Character = {
  name: "Alexander Mak",
  level: 30,
  hp: "4578 / 4578",
  mp: "63 / 63",
  avatar: "/cloud.jpg",
};

// ───── Skill & Materia Data ─────
const skillList: Skill[] = [
  { title: "Javascript", materia: "green", stars: 5, description: "Popular language for web development." },
  { title: "Typescript", materia: "green", stars: 4, description: "Typed superset of JavaScript." },
  { title: "Python", materia: "green", stars: 4, description: "Versatile language for scripting and data." },
  { title: "Ruby", materia: "green", stars: 3, description: "Dynamic language focused on simplicity." },
  { title: "C++", materia: "green", stars: 2, description: "High-performance systems programming language." },
  { title: "React", materia: "yellow", stars: 5, description: "Library for building UI components." },
  { title: "Redux", materia: "blue", stars: 3, description: "State management library for JS apps." },
  { title: "HTML5", materia: "yellow", stars: 5, description: "Markup language for web pages." },
  { title: "CSS", materia: "yellow", stars: 5, description: "Styles web pages with layout and design." },
  { title: "Tailwind CSS", materia: "yellow", stars: 5, description: "Utility-first CSS framework." },
  { title: "Node.js", materia: "blue", stars: 4, description: "JavaScript runtime for server-side apps." },
  { title: "Rails", materia: "blue", stars: 3, description: "Web framework written in Ruby." },
  { title: "PostgreSQL", materia: "red", stars: 3, description: "Powerful open-source relational database." },
  { title: "MongoDB", materia: "red", stars: 3, description: "NoSQL database for JSON-like documents." },
  { title: "Firebase", materia: "red", stars: 5, description: "Platform for app development and hosting." },
  { title: "AWS", materia: "red", stars: 3, description: "Cloud services platform by Amazon." },
  { title: "Postman", materia: "red", stars: 5, description: "API development and testing tool." },
  { title: "Git", materia: "purple", stars: 5, description: "Version control system for code." },
  { title: "Jira", materia: "purple", stars: 5, description: "Project management and issue tracking." },
  { title: "Linux", materia: "purple", stars: 4, description: "Open-source operating system." },
  { title: "Ubuntu", materia: "purple", stars: 5, description: "User-friendly Linux distribution." },
];

const materiaIconMap: Record<string, string> = {
  green: "/materia-green.png",
  yellow: "/materia-yellow.png",
  blue: "/materia-blue.png",
  red: "/materia-red.png",
  purple: "/materia-purple.png",
};

// ───── Initial Equipment ─────
const initialEquipment: { weapon: MateriaSlot[]; armor: MateriaSlot[] } = {
  weapon: [
    { skill: skillList.find(s => s.title === "Firebase"), linked: true },
    { skill: skillList.find(s => s.title === "Javascript") },
    { linked: true },
    { skill: skillList.find(s => s.title === "React") },
    { linked: true },
    {},
    { skill: skillList.find(s => s.title === "Jira"), linked: true },
    { skill: skillList.find(s => s.title === "Python") },
  ],
  armor: [
    { linked: true },
    { skill: skillList.find(s => s.title === "Node.js") },
    { linked: true },
    {},
    { linked: true },
    { skill: skillList.find(s => s.title === "PostgreSQL") },
    { linked: true },
    {},
  ],
};

// ───── Main Component ─────
export default function SkillsMateriaPanel({ muted }: { muted: boolean }) {
  const SOCKET_SIZE = 20;
  const GAP = SOCKET_SIZE / 2;

  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [equipment, setEquipment] = useState(initialEquipment);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const materiaAudio = useMemo(() => {
    const audio = new Audio("/audio/materia.mp3");
    audio.muted = muted; // Initialize muted
    return audio;
  }, []);

  const playHover = useHoverSound("/audio/menu_blip.mp3", { muted });

  // Update muted when prop changes
  useEffect(() => {
    materiaAudio.muted = muted;
  }, [muted, materiaAudio]);

  const renderMateriaRow = (slots: MateriaSlot[], row: "weapon" | "armor") => (
    <div className="relative flex items-center" style={{ gap: `${GAP}px` }}>
      {slots.map((slot, i) => {
        let highlightClass = "";
        if (selectedSkill) {
          if (!slot.skill) highlightClass = "ring-1 ring-cyan-400";
          else if (slot.skill.title === selectedSkill.title) highlightClass = "ring-2 ring-yellow-400";
        }

        return (
          <div key={i} className="relative flex items-center"
            onMouseEnter={() => !muted ? playHover() : null}>
            <MateriaSocket
              materia={slot.skill?.materia}
              className={highlightClass}
              tooltip={slot.skill?.title}
              onClick={() => {
                setEquipment(prev => {
                  const updated = { ...prev };
                  const currentSkill = slot.skill;

                  if (!selectedSkill) {
                    if (!currentSkill) return prev;
                    setSelectedSkill(currentSkill);
                    return prev;
                  }

                  if (currentSkill?.title === selectedSkill.title) {
                    updated[row][i] = { ...updated[row][i], skill: undefined };
                    materiaAudio.play();
                    setSelectedSkill(null);
                    return updated;
                  }

                  (["weapon", "armor"] as const).forEach(r => {
                    updated[r] = updated[r].map(s =>
                      s.skill?.title === selectedSkill.title ? { ...s, skill: undefined } : s
                    );
                  });

                  updated[row][i] = { ...updated[row][i], skill: selectedSkill };
                  materiaAudio.play();
                  setSelectedSkill(null);
                  return updated;
                });
              }}
            />
            {slot.linked && i < slots.length - 1 && (
              <div
                className="absolute top-1/2 h-[2px] bg-cyan-300 rounded"
                style={{ left: "100%", width: `${GAP}px`, transform: "translateY(-50%)" }}
              />
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="flex h-full w-full flex-col gap-2 p-2">
      {/* ───── Top Panel: Character + Equipment ───── */}
      <FF7Panel className="h-[110px] p-2 flex gap-2">
        {/* Character Panel */}
        <div className="flex gap-2">
          <img src={myCharacter.avatar} alt={myCharacter.name} className="w-20 h-20 border border-ff7-border" />
          <div className="leading-tight space-y-0.5">
            <div className="text-ff7-accent font-bold">{myCharacter.name}</div>
            <div>LV {myCharacter.level}</div>
            <div>HP {myCharacter.hp}</div>
            <div>MP {myCharacter.mp}</div>
          </div>
        </div>

        {/* Equipment */}
        <div className="flex flex-col justify-center gap-2 flex-1">
          <div className="flex items-center gap-2">
            <div className="flex flex-col gap-1">
              <span className="font-bold text-sm text-blue-200">Weapon:</span>
              <span className="text-xs text-blue-200">Keyboard</span>
            </div>
            {renderMateriaRow(equipment.weapon, "weapon")}
          </div>
          <div className="flex items-center gap-2">
            <div className="flex flex-col gap-1">
              <span className="font-bold text-sm text-blue-200">Armor:</span>
              <span className="text-[10.5px] text-blue-200">Headphones</span>
            </div>
            {renderMateriaRow(equipment.armor, "armor")}
          </div>
        </div>

      </FF7Panel>

      {/* Description */}
      <FF7Panel className="h-[55px] p-2">
        <p className="text-xs text-blue-200">
          {selectedSkill ? selectedSkill.description : "Select a skill to see its description."}
        </p>
      </FF7Panel>

      {/* Bottom Panel: Selected Skill & Skill List */}
      <div className="flex h-[200px] gap-2">
        <FF7Panel className="w-[180px] p-2 flex flex-col items-center justify-center">
          <div className="text-sm font-bold text-yellow-200">{selectedSkill?.title || "Select a Skill"}</div>
          {selectedSkill && <StarRating value={selectedSkill.stars} max={5} size={14} />}
        </FF7Panel>
        <FF7Panel className="flex-1 p-2">
          <ul className="relative h-full overflow-y-auto space-y-1 text-xs text-white">
            {skillList.map(skill => {
              const isHovered = hoveredSkill === skill.title;
              return (
                <li
                  key={skill.title}
                  className={`cursor-pointer relative flex items-center gap-2 px-1 py-[2px] pl-8 ${
                    selectedSkill?.title === skill.title ? "bg-ff7-accent text-black" : ""
                  }`}
                  onMouseEnter={() => {
                    setHoveredSkill(skill.title);
                    if (!muted) playHover();
                  }}
                  onMouseLeave={() => setHoveredSkill(null)}
                  onClick={() => setSelectedSkill(skill)}
                >
                  {/* Cursor */}
                  {isHovered && (
                    <Image
                      src="/cursor.png"
                      alt="FF7 Cursor"
                      width={20}
                      height={20}
                      className="absolute left-0 top-1/2 -translate-y-1/2 z-10"
                    />
                  )}

                  {/* Materia Icon */}
                  <Image
                    src={materiaIconMap[skill.materia]}
                    alt={`${skill.materia} materia`}
                    width={14}
                    height={14}
                  />

                  {/* Skill Title */}
                  <span>{skill.title}</span>
                </li>
              );
            })}
          </ul>
        </FF7Panel>
      </div>
    </div>
  );
}
