import { useState } from "react";
import Image from "next/image";
import { useHoverSound } from "@/hooks/useHoverSound";
import FF7Panel from "./FF7Panel";

export type MenuMode = "home" | "skills" | "experience" | "projects";

type Props = {
  onSelect: (mode: MenuMode) => void;
  activeMode: MenuMode;
  muted: boolean; // <-- add muted prop
};

const menuItems: (
  | { title: string; mode: MenuMode }
  | { title: string; link: string }
)[] = [
  { title: "Skills", mode: "skills" },
  { title: "Work History", mode: "experience" },
  { title: "Projects", mode: "projects" },
  { title: "LinkedIn", link: "https://www.linkedin.com/in/alexanderyumak/" },
  { title: "GitHub", link: "https://github.com/aymak91" },
  { title: "Contact", link: "mailto:alexanderyumak@gmail.com" },
];

const ROW_HEIGHT = 20;
const ROW_GAP = 4;

export default function MenuPanel({ onSelect, activeMode, muted }: Props) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Pass muted state to useHoverSound
  const playHover = useHoverSound("/audio/menu_blip.mp3", { muted });

  const isCollapsed = activeMode !== "home";

  const visibleItems = !isCollapsed
    ? menuItems
    : menuItems.filter((item) => "mode" in item && item.mode === activeMode);

  const menuHeight =
    visibleItems.length * ROW_HEIGHT + (visibleItems.length - 1) * ROW_GAP;

  return (
    <div className="relative overflow-visible">
      <div
        className="transition-[height] duration-300 ease-out"
        style={{ height: menuHeight }}
      >
        {!isCollapsed && (
          <ul className="flex flex-col gap-1 text-xs relative">
            {menuItems.map((item, index) => {
              const isHovered = hoveredIndex === index;
              return (
                <li
                  key={`${item.title}-${index}`}
                  onMouseEnter={() => {
                    if (!muted && hoveredIndex !== index) { // Only play if not muted
                      setHoveredIndex(index);
                      playHover();
                    }
                  }}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => {
                    setHoveredIndex(null);
                    if ("mode" in item) onSelect(item.mode);
                    else window.open(item.link, "_blank");
                  }}
                  className="relative py-[2px] cursor-pointer"
                >
                  {isHovered && (
                    <Image
                      src="/cursor.png"
                      alt="FF7 Cursor"
                      width={20}
                      height={20}
                      className="absolute left-[-20px] top-1/2 -translate-y-1/2"
                    />
                  )}
                  {item.title}
                </li>
              );
            })}
          </ul>
        )}

        {isCollapsed && visibleItems.length > 0 && (
          <div className="relative">
            <div className="relative flex items-center text-xs h-[20px]">
              <span className="font-bold">{visibleItems[0].title}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
