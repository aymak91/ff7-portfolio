import FF7Panel from "@/components/FF7Panel";
import Image from "next/image";

export default function SkillsMateriaPanel() {
  // Placeholder data
  const character = {
    name: "Cloud",
    level: 50,
    materiaSlots: ["Fire", "Ice", null, "Cure"],
  };

  const selectedSkill = {
    name: "Fire",
    stars: 3,
  };

  const skillList = [
    "Fire",
    "Ice",
    "Lightning",
    "Cure",
    "Barrier",
    "Bio",
    "Earth",
  ];

  return (
    <div className="flex flex-col w-full h-full space-y-2 p-2">
      {/* ===== Top Panel: Character + Materia Slots ===== */}
      <FF7Panel className="w-full h-[100px] flex flex-col p-2">
        <div className="flex justify-between items-center w-full">
          <div>
            <div className="text-sm text-yellow-200 font-bold">
              {character.name} (Lv {character.level})
            </div>
          </div>

          <div className="flex space-x-2">
            {character.materiaSlots.map((slot, idx) => (
              <div
                key={idx}
                className="w-10 h-10 border border-gray-400 bg-gray-800 flex items-center justify-center text-xs text-white"
              >
                {slot || "-"}
              </div>
            ))}
          </div>
        </div>
      </FF7Panel>

      {/* ===== Middle Panel: Skill Description ===== */}
      <FF7Panel className="w-full h-[60px] p-2">
        <div className="text-xs text-blue-200">
          Description for the selected skill will appear here.
        </div>
      </FF7Panel>

      {/* ===== Bottom Panel: Left + Right ===== */}
      <div className="flex w-full h-[160px] space-x-2">
        {/* Left: Selected Skill + Stars */}
        <FF7Panel className="w-[180px] p-2 flex flex-col items-center justify-center">
          <div className="text-sm font-bold text-yellow-200">
            {selectedSkill.name}
          </div>
          <div className="flex mt-2 space-x-1">
            {Array.from({ length: selectedSkill.stars }).map((_, idx) => (
              <Image
                key={idx}
                src="/star.png"
                alt="Star"
                width={12}
                height={12}
              />
            ))}
          </div>
        </FF7Panel>

        {/* Right: Skill List */}
        <FF7Panel className="flex-1 p-2 overflow-y-auto">
          <ul className="text-xs text-white space-y-1">
            {skillList.map((skill, idx) => (
              <li
                key={idx}
                className="cursor-pointer hover:bg-ff7-accent hover:text-black px-1 py-[2px]"
              >
                {skill}
              </li>
            ))}
          </ul>
        </FF7Panel>
      </div>
    </div>
  );
}
