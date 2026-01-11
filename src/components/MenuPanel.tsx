import { useState } from "react";
import Image from "next/image";
import { useHoverSound } from "@/hooks/useHoverSound";
import FF7Panel from "./FF7Panel";

export type MenuMode = "home" | "skills" | "experience" | "projects";

type Props = {
  onSelect: (mode: MenuMode) => void;
  activeMode: MenuMode;
};

const menuItems: (
  | { title: string; mode: MenuMode }
  | { title: string; link: string }
)[] = [
  { title: "Home", mode: "home" },
  { title: "Skills", mode: "skills" },
  { title: "Experience", mode: "experience" },
  { title: "Projects", mode: "projects" },
  { title: "LinkedIn", link: "https://www.linkedin.com/in/alexanderyumak/" },
  { title: "GitHub", link: "https://github.com/aymak91" },
  { title: "Contact", link: "mailto:alexanderyumak@gmail.com" },
];

const ROW_HEIGHT = 20;
const ROW_GAP = 4;

export default function MenuPanel({ onSelect, activeMode }: Props) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const playHover = useHoverSound("/audio/menu_blip.mp3");

  const isCollapsed = activeMode !== "home";

  // only show the current page in collapsed mode
  const visibleItems = !isCollapsed
    ? menuItems
    : menuItems.filter((item) => "mode" in item && item.mode === activeMode);

  const menuHeight =
    visibleItems.length * ROW_HEIGHT + (visibleItems.length - 1) * ROW_GAP;

  return (
    <div className="relative overflow-visible">
      {/* Animated container for height */}
      <div
        className="transition-[height] duration-300 ease-out"
        style={{ height: menuHeight }}
      >
        {/* Expanded menu */}
        {!isCollapsed && (
          <ul className="flex flex-col gap-1 text-xs relative">
            {menuItems.map((item, index) => {
              const isHovered = hoveredIndex === index;
              return (
                <li
                  key={`${item.title}-${index}`}
                  onMouseEnter={() => {
                    if (hoveredIndex !== index) {
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
                  className={`relative py-[2px] cursor-pointer hover:bg-ff7-accent hover:text-black`}
                >
                  {/* Hover cursor peeks outside to the left */}
                  {isHovered && (
                    <Image
                      src="/cursor.png"
                      alt="FF7 Cursor"
                      width={20}
                      height={20}
                      className="absolute left-[-16px] top-1/2 -translate-y-1/2"
                    />
                  )}
                  {item.title}
                </li>
              );
            })}
          </ul>
        )}

        {/* Collapsed menu */}
        {isCollapsed && visibleItems.length > 0 && (
        <div className="relative">
            {/* Current page title */}
            <div className="relative flex items-center text-xs h-[20px]">
            <span className="font-bold">{visibleItems[0].title}</span>

            {/* X button positioned to upper right */}
            <FF7Panel
                className="w-5 h-5 p-[1px] flex items-center justify-center absolute -right-5 -top-5"
            >
                <button
                onClick={() => onSelect("home")}
                onMouseEnter={playHover}
                className="w-full h-full flex items-center justify-center text-xs font-bold"
                >
                X
                </button>
            </FF7Panel>
            </div>
        </div>
        )}

      </div>
    </div>
  );
}
