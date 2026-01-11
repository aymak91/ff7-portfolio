import { useEffect, useState } from "react";
import FF7Panel from "@/components/FF7Panel";
import CharacterPanel from "@/components/CharacterPanel";
import MenuPanel from "@/components/MenuPanel";
import LocationPanel from "@/components/LocationPanel";
import TimeGilPanel from "@/components/TimeGilPanel";
import LifestreamBackground from "@/components/LifestreamBackground";
import AboutMePanel from "@/components/AboutMePanel";
import SlideIn from "@/components/SlideIn";
import type { MenuMode } from "@/components/MenuPanel";
import SkillsMateriaPanel from "@/components/SkillsMateriaPanel";

const DESIGN_WIDTH = 720;
const DESIGN_HEIGHT = 420;

export default function Home() {
  const [scale, setScale] = useState(1);
  const [mode, setMode] = useState<MenuMode>("home");

  useEffect(() => {
    const updateScale = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      setScale(Math.min(vw / DESIGN_WIDTH, vh / DESIGN_HEIGHT));
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <main className="min-h-screen bg-black flex items-center justify-center overflow-hidden font-[var(--font-ff7)]">
      <LifestreamBackground />

      <div
        className="relative"
        style={{
          width: DESIGN_WIDTH,
          height: DESIGN_HEIGHT,
          transform: `scale(${scale})`,
          transformOrigin: "center",
        }}
      >
        {/* ===== HOME SCREEN ===== */}
        {mode === "home" && (
          <>
            {/* Character Panel */}
            <SlideIn from="right">
              <div className="absolute left-10 top-10 z-10 w-[600px] h-[340px]">
                <FF7Panel>
                  <CharacterPanel />
                </FF7Panel>
              </div>
            </SlideIn>

            {/* About Me */}
            <SlideIn from="right">
              <div className="absolute left-20 top-60 z-11 w-[450px] h-[130px]">
                <FF7Panel>
                  <AboutMePanel />
                </FF7Panel>
              </div>
            </SlideIn>

            {/* Time + Gil */}
            <SlideIn from="left">
              <div className="absolute left-137 top-[265px] z-20 w-[150px]">
                <FF7Panel>
                  <TimeGilPanel />
                </FF7Panel>
              </div>
            </SlideIn>

            {/* Location */}
            <SlideIn from="bottom">
              <div className="absolute left-130 top-[340px] z-15 w-[180px]">
                <FF7Panel>
                  <LocationPanel />
                </FF7Panel>
              </div>
            </SlideIn>
          </>
        )}

        {/* ===== SKILLS SCREEN (Materia Menu later) ===== */}
        {mode === "skills" && (
          <SlideIn from="right">
            <div className="absolute left-10 top-10 z-10 w-[600px] h-[340px]">
              <FF7Panel>
                <div className="absolute z-10 w-[600px] h-[340px]">
                  <SkillsMateriaPanel />
                </div>
              </FF7Panel>
            </div>
          </SlideIn>
        )}

        {/* ===== MENU (always visible) ===== */}
        <SlideIn from="bottom">
          <div className="absolute left-137 top-5 z-30 w-[150px]">
            <FF7Panel>
              <MenuPanel onSelect={setMode} activeMode={mode} />
            </FF7Panel>
          </div>
        </SlideIn>
      </div>
    </main>
  );
}
