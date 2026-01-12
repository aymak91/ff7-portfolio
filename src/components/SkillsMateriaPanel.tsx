import Image from "next/image";
import { useState, useMemo, useEffect } from "react";
import { useHoverSound } from "@/hooks/useHoverSound";
import FF7Panel from "@/components/FF7Panel";
import MateriaSocket from "./MateriaSocket";
import StarRating from "./StarRating";
import skillList, { goodPairs, type Skill } from "../data/skills";

// ───── Types ─────
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

function getPairedSlot(slots: MateriaSlot[], index: number) {
  return index % 2 === 0 ? slots[index + 1] : slots[index - 1];
}

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
    { skill: skillList.find((s) => s.title === "Firebase"), linked: true },
    { skill: skillList.find((s) => s.title === "Javascript") },
    { linked: true },
    { skill: skillList.find((s) => s.title === "React") },
    { linked: true },
    {},
    { skill: skillList.find((s) => s.title === "Jira"), linked: true },
    { skill: skillList.find((s) => s.title === "Python") },
  ],
  armor: [
    { linked: true },
    { skill: skillList.find((s) => s.title === "Node.js") },
    { linked: true },
    {},
    { linked: true },
    { skill: skillList.find((s) => s.title === "PostgreSQL") },
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
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null); // for the skill list
  const [hoveredSlot, setHoveredSlot] = useState<{
    row: "weapon" | "armor";
    index: number;
  } | null>(null);

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

        const pairedSlot = getPairedSlot(slots, i);

        const isGoodPair =
          slot.skill &&
          pairedSlot?.skill &&
          goodPairs.some(
            ([a, b]) =>
              (a === slot.skill!.title && b === pairedSlot.skill!.title) ||
              (b === slot.skill!.title && a === pairedSlot.skill!.title)
          );

        if (isGoodPair)
          highlightClass = "ring-2 ring-cyan-400"; // glow for pair
        else if (selectedSkill) {
          if (!slot.skill) highlightClass = "ring-1 ring-yellow-400";
          else if (slot.skill.title === selectedSkill.title)
            highlightClass = "ring-2 ring-yellow-400";
        }

        if (selectedSkill) {
          if (!slot.skill) highlightClass = "ring-1 ring-cyan-400";
          else if (slot.skill.title === selectedSkill.title)
            highlightClass = "ring-2 ring-yellow-400";
        }

        return (
          <div
            key={i}
            className="relative flex items-center"
            onMouseEnter={() => {
              !muted && playHover();
              setHoveredSlot({ row, index: i });
            }}
            onMouseLeave={() => setHoveredSlot(null)}
          >
            {/* Cursor */}
            {hoveredSlot?.row === row && hoveredSlot?.index === i && (
              <Image
                src="/cursor.png"
                alt="FF7 Cursor"
                width={20}
                height={20}
                className="absolute -left-5 top-1/2 -translate-y-1/2 z-10"
              />
            )}
            <MateriaSocket
              materia={slot.skill?.materia}
              className={highlightClass}
              tooltip={slot.skill?.title}
              onClick={() => {
                setEquipment((prev) => {
                  const updated = { ...prev };
                  const currentSkill = slot.skill;

                  // No selected skill AND empty slot → play error
                  if (!selectedSkill && !currentSkill) {
                    const errorAudio = new Audio("/audio/error.mp3");
                    errorAudio.muted = muted;
                    errorAudio.volume = 0.2;
                    errorAudio.play();
                    return prev;
                  }

                  // No selected skill but clicking a filled slot → select it
                  if (!selectedSkill && currentSkill) {
                    setSelectedSkill(currentSkill);
                    return prev;
                  }

                  // If slot already has the selected skill → remove it
                  if (currentSkill?.title === selectedSkill?.title) {
                    updated[row][i] = { ...updated[row][i], skill: undefined };
                    materiaAudio.play();
                    setSelectedSkill(null);
                    return updated;
                  }

                  // Otherwise, place selected skill into slot
                  (["weapon", "armor"] as const).forEach((r) => {
                    updated[r] = updated[r].map((s) =>
                      s.skill?.title === selectedSkill?.title
                        ? { ...s, skill: undefined }
                        : s
                    );
                  });

                  updated[row][i] = {
                    ...updated[row][i],
                    skill: selectedSkill!,
                  };
                  materiaAudio.play();
                  setSelectedSkill(null);
                  return updated;
                });
              }}
            />
            {slot.linked && i < slots.length - 1 && (
              <div
                className="absolute top-1/2 h-[2px] bg-cyan-300 rounded"
                style={{
                  left: "100%",
                  width: `${GAP}px`,
                  transform: "translateY(-50%)",
                }}
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
          <img
            src={myCharacter.avatar}
            alt={myCharacter.name}
            className="w-20 h-20 border border-ff7-border"
          />
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
          {selectedSkill
            ? selectedSkill.description
            : "Select a skill to see its description."}
        </p>
      </FF7Panel>

      {/* Bottom Panel: Selected Skill & Skill List */}
      <div className="flex h-[160px] gap-2">
        <FF7Panel className="w-[180px] p-2 flex flex-col items-center justify-center">
          <div className="text-sm font-bold text-yellow-200">
            {selectedSkill?.title || "Select a Skill"}
          </div>
          <div className="text-xs font-bold text-yellow-200 text-center">
            {selectedSkill?.title ||
              "Try linking blue skills with certain other skills!"}
          </div>
          {selectedSkill && (
            <StarRating value={selectedSkill.stars} max={5} size={14} />
          )}
        </FF7Panel>
        <FF7Panel className="flex-1 p-2">
          <ul className="relative h-full overflow-y-auto space-y-1 text-xs text-white">
            {skillList.map((skill) => {
              const isHovered = hoveredSkill === skill.title;
              const isSelected = selectedSkill?.title === skill.title;

              return (
                <li
                  key={skill.title}
                  className={`relative flex items-center gap-2 px-1 py-[2px] pl-8 cursor-pointer ${
                    isSelected ? "bg-ff7-accent text-black" : ""
                  }`}
                  onMouseEnter={() => {
                    setHoveredSkill(skill.title); // <- keep this separate from hoveredSlot
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
