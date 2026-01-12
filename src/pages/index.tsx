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
import WorkHistoryPanel from "@/components/WorkHistoryPanel";
import Head from "next/head";
import { useHoverSound } from "@/hooks/useHoverSound";
import { useClickSound } from "@/hooks/useClickSound";

const DESIGN_WIDTH = 720;
const DESIGN_HEIGHT = 420;

export default function Home() {
  const [scale, setScale] = useState(1);
  const [mode, setMode] = useState<MenuMode>("welcome");
  const [muted, setMuted] = useState(false); // Global mute state

  const playHover = useHoverSound("/audio/menu_blip.mp3", { muted });
  const playHeal = useClickSound("/audio/heal.mp3", { muted });

  const handleStart = () => {
    playHeal();
    setMode("home");
  };

  useEffect(() => {
    const MIN_SCALE = 0.5;
    const MAX_SCALE = 2.5;

    const updateScale = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const newScale = Math.min(vw / DESIGN_WIDTH, vh / DESIGN_HEIGHT);
      setScale(Math.max(MIN_SCALE, Math.min(MAX_SCALE, newScale)));
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <main className="min-h-screen bg-black flex items-center justify-center overflow-hidden font-[var(--font-ff7)]">
      <Head>
        <title>Alexander Mak - Portfolio</title>
        <meta name="description" content="Portfolio site inspired by FF7" />
      </Head>
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
        {/* ───── Global Mute Button ───── */}
        <button
          className="cursor-pointer absolute top-2 left-2 z-50 w-6 h-6 text-xs text-white flex items-center justify-center bg-gradient-to-b from-ff7-panel to-ff7-blue border border-ff7-border rounded hover:bg-gray-800"
          onClick={() => setMuted((prev) => !prev)}
          title={muted ? "Unmute" : "Mute"}
        >
          {muted ? "🔇" : "🔊"}
        </button>

        {/* ───── Back Button ───── */}
        {mode !== "home" && (
          <button
            className="cursor-pointer absolute top-2 left-10 z-50 w-6 h-6 text-xs text-white flex items-center justify-center bg-gradient-to-b from-ff7-panel to-ff7-blue border border-ff7-border rounded hover:bg-gray-800"
            onClick={() => setMode("home")}
          >
            <svg
              fill="#ffffff"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              transform="matrix(-1, 0, 0, 1, 0, 0)"
              stroke="#ffffff"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path d="M22.706,15.708l-5,5a1,1,0,0,1-1.414-1.414L19.586,16H2a1,1,0,0,1-1-1V4A1,1,0,0,1,2,3H12a1,1,0,0,1,0,2H3v9H19.586l-3.293-3.293a1,1,0,0,1,1.414-1.414l5,5A1,1,0,0,1,22.706,15.708Z"></path>
              </g>
            </svg>
          </button>
        )}

        {/* ===== WELCOME SCREEN ===== */}
        {mode === "welcome" && (
          <SlideIn from="bottom">
            <div className="absolute left-10 top-10 z-10 w-[600px] h-[340px]">
              <FF7Panel className="flex flex-col items-center justify-center gap-4 p-6 text-center relative">
                <p className="text-lg font-bold">Welcome!</p>
                <p>Thanks for visiting my page!</p>
                <p>
                  I built this site so that you can get to know me in an
                  interactive and fun way!
                </p>
                <p>
                  This layout is inspired by the menus from the classic game
                  Final Fantasy VII. I hope you have fun getting to know me this
                  way!
                </p>
                <p>-Alex</p>

                <button
                  className="cursor-pointer px-6 py-2 text-sm font-bold text-white 
                     bg-gradient-to-b from-ff7-panel to-ff7-blue 
                     border border-ff7-border rounded-lg 
                     hover:from-ff7-blue hover:to-ff7-panel 
                     transition-all duration-200 shadow-md"
                  onMouseEnter={playHover}
                  onClick={handleStart}
                >
                  START
                </button>
              </FF7Panel>
            </div>
          </SlideIn>
        )}

        {/* ===== HOME SCREEN ===== */}
        {mode === "home" && (
          <>
            <SlideIn from="right">
              <div className="absolute left-10 top-10 z-10 w-[600px] h-[340px]">
                <FF7Panel>
                  <CharacterPanel />
                </FF7Panel>
              </div>
            </SlideIn>

            <SlideIn from="right">
              <div className="absolute left-20 top-60 z-11 w-[450px] h-[130px]">
                <FF7Panel>
                  <AboutMePanel />
                </FF7Panel>
              </div>
            </SlideIn>

            <SlideIn from="left">
              <div className="absolute left-137 top-[265px] z-20 w-[150px]">
                <FF7Panel>
                  <TimeGilPanel />
                </FF7Panel>
              </div>
            </SlideIn>

            <SlideIn from="bottom">
              <div className="absolute left-130 top-[340px] z-15 w-[180px]">
                <FF7Panel>
                  <LocationPanel />
                </FF7Panel>
              </div>
            </SlideIn>
          </>
        )}

        {/* ===== SKILLS SCREEN (Materia Menu) ===== */}
        {mode === "skills" && (
          <SlideIn from="bottom">
            <div className="absolute left-10 top-10 z-10 w-[600px] h-[340px]">
              <SkillsMateriaPanel muted={muted} /> {/* Pass down mute state */}
            </div>
          </SlideIn>
        )}

        {/* ===== EXPERIENCE SCREEN ===== */}
        {mode === "experience" && (
          <SlideIn from="bottom">
            <div className="absolute left-10 top-10 z-10 w-[600px] h-[340px]">
              <WorkHistoryPanel />
            </div>
          </SlideIn>
        )}

        {/* ===== PROJECTS SCREEN ===== */}
        {mode === "projects" && (
          <SlideIn from="bottom">
            <div className="absolute left-10 top-10 z-10 w-[600px] h-[340px]">
              <FF7Panel>This page is a work in progress</FF7Panel>
            </div>
          </SlideIn>
        )}

        {/* ===== MENU (always visible) ===== */}
        <SlideIn from="bottom">
          <div className="absolute left-137 top-5 z-30 w-[150px]">
            <FF7Panel>
              <MenuPanel onSelect={setMode} activeMode={mode} muted={muted} />
            </FF7Panel>
          </div>
        </SlideIn>
      </div>
    </main>
  );
}
