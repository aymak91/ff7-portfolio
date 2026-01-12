// pages/index.tsx
import { useEffect, useState } from "react";
import Head from "next/head";

import FF7Panel from "@/components/FF7Panel";
import CharacterPanel from "@/components/CharacterPanel";
import MenuPanel from "@/components/MenuPanel";
import LocationPanel from "@/components/LocationPanel";
import TimeGilPanel from "@/components/TimeGilPanel";
import LifestreamBackground from "@/components/LifestreamBackground";
import AboutMePanel from "@/components/AboutMePanel";
import SlideIn from "@/components/SlideIn";
import SkillsMateriaPanel from "@/components/SkillsMateriaPanel";
import WorkHistoryPanel from "@/components/WorkHistoryPanel";
import Footer from "@/components/Footer";

import { useHoverSound } from "@/hooks/useHoverSound";
import { useClickSound } from "@/hooks/useClickSound";

import type { MenuMode } from "@/components/MenuPanel";

const DESIGN_WIDTH = 720;
const DESIGN_HEIGHT = 420;

export default function Home() {
  // ───── State ─────
  const [scale, setScale] = useState(1);
  const [mode, setMode] = useState<MenuMode>("welcome");
  const [muted, setMuted] = useState(false);
  const [showRotatePrompt, setShowRotatePrompt] = useState(false);

  // ───── Orientation Check ─────
  useEffect(() => {
    const checkOrientation = () => {
      const isPortrait = window.innerHeight > window.innerWidth;
      const isMobile = window.innerWidth < 900;
      setShowRotatePrompt(isMobile && isPortrait);
    };

    checkOrientation();
    window.addEventListener("resize", checkOrientation);
    return () => window.removeEventListener("resize", checkOrientation);
  }, []);

  // Prevent scrolling when blocked
  useEffect(() => {
    document.body.style.overflow = showRotatePrompt ? "hidden" : "";
  }, [showRotatePrompt]);

  // ───── Sounds ─────
  const playHover = useHoverSound("/audio/menu_blip.mp3", { muted });
  const playClick = useClickSound("/audio/heal.mp3", { muted });
  const playBack = useClickSound("/audio/back.mp3", { muted });

  // ───── Handlers ─────
  const handleStart = () => {
    playClick();
    setMode("home");
  };

  const handleBack = () => {
    playBack();
    setMode("home");
  };

  // ───── Scale Logic ─────
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

  // ───── Portrait Block Screen ─────
  if (showRotatePrompt) {
    return (
      <>
        <Head>
          <title>Alexander Mak - Portfolio</title>
          <meta name="description" content="Portfolio site inspired by FF7" />
        </Head>

        <main className="flex flex-col min-h-screen bg-black font-[var(--font-ff7)]">
          <div className="flex-1 flex items-center justify-center overflow-hidden relative">
            <LifestreamBackground />
            <FF7Panel className="w-[90%] max-w-sm h-[220px] p-6 text-center flex flex-col justify-center">
              <p className="text-lg font-bold mb-2">Rotate Your Device ↻</p>
              <p className="text-sm opacity-80">
                I see you're on a mobile device!
              </p>
              <p className="text-sm opacity-80">
                This experience is best viewed in landscape mode.
              </p>

              <div className="mt-4 text-4xl animate-[rotate-phone_1.6s_ease-in-out_infinite]">
                📱
              </div>

              <p className="mt-4 text-xs opacity-60">
                Just like a classic console game
              </p>
            </FF7Panel>
          </div>
        </main>
        <div className="fixed bottom-0 left-0 right-0 z-10">
          <Footer />
        </div>
      </>
    );
  }

  // ───── Normal App Render (Landscape Only) ─────
  return (
    <>
      <Head>
        <title>Alexander Mak - Portfolio</title>
        <meta name="description" content="Portfolio site inspired by FF7" />
      </Head>

      <main className="flex flex-col min-h-screen bg-black font-[var(--font-ff7)]">
        <div className="flex-1 flex items-center justify-center overflow-hidden relative">
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
              className="absolute top-2 left-2 z-50 w-6 h-6 text-xs text-white flex items-center justify-center bg-gradient-to-b from-ff7-panel to-ff7-blue border border-ff7-border rounded"
              onClick={() => setMuted((p) => !p)}
            >
              {muted ? "🔇" : "🔊"}
            </button>

            {/* ───── Back Button ───── */}
            {mode !== "home" && mode !== "welcome" && (
              <button
                className="absolute top-2 left-10 z-50 w-6 h-6 text-xs text-white flex items-center justify-center bg-gradient-to-b from-ff7-panel to-ff7-blue border border-ff7-border rounded"
                onClick={handleBack}
              >
                ←
              </button>
            )}

            {/* ───── Welcome ───── */}
            {mode === "welcome" && (
              <SlideIn from="bottom">
                <div className="absolute left-10 top-10 w-[600px] h-[340px]">
                  <FF7Panel className="flex flex-col items-center justify-center gap-4 p-6 text-center">
                    <p className="text-lg font-bold">Welcome!</p>
                    <p>Thanks for visiting my page!</p>
                    <p>
                      I built this site with a layout inspired by the menus from
                      the classic game Final Fantasy VII so that you can get to
                      know me in a more interactive and fun way. I hope you
                      enjoy it!
                    </p>
                    <p>- Alex</p>

                    <button
                      className="px-6 py-2 text-sm font-bold bg-gradient-to-b from-ff7-panel to-ff7-blue border border-ff7-border rounded-lg"
                      onMouseEnter={playHover}
                      onClick={handleStart}
                    >
                      START
                    </button>
                  </FF7Panel>
                </div>
              </SlideIn>
            )}

            {/* ───── Home ───── */}
            {mode === "home" && (
              <>
                <SlideIn from="right">
                  <div className="absolute left-10 top-10 w-[600px] h-[340px]">
                    <FF7Panel>
                      <CharacterPanel />
                    </FF7Panel>
                  </div>
                </SlideIn>

                <SlideIn from="right">
                  <div className="absolute left-20 top-60 w-[450px] h-[130px]">
                    <FF7Panel>
                      <AboutMePanel />
                    </FF7Panel>
                  </div>
                </SlideIn>

                <SlideIn from="left">
                  <div className="absolute left-137 top-[265px] w-[150px]">
                    <FF7Panel>
                      <TimeGilPanel />
                    </FF7Panel>
                  </div>
                </SlideIn>

                <SlideIn from="bottom">
                  <div className="absolute left-130 top-[340px] w-[180px]">
                    <FF7Panel>
                      <LocationPanel />
                    </FF7Panel>
                  </div>
                </SlideIn>
              </>
            )}

            {/* ───── Skills / Experience / Projects ───── */}
            {mode === "skills" && (
              <SlideIn from="bottom">
                <div className="absolute left-10 top-10 w-[600px] h-[340px]">
                  <SkillsMateriaPanel muted={muted} />
                </div>
              </SlideIn>
            )}

            {mode === "experience" && (
              <SlideIn from="bottom">
                <div className="absolute left-10 top-10 w-[600px] h-[340px]">
                  <WorkHistoryPanel />
                </div>
              </SlideIn>
            )}

            {mode === "projects" && (
              <SlideIn from="bottom">
                <div className="absolute left-10 top-10 w-[600px] h-[340px]">
                  <FF7Panel>This page is a work in progress</FF7Panel>
                </div>
              </SlideIn>
            )}

            {/* ───── Menu ───── */}
            <SlideIn from="bottom">
              <div className="absolute left-137 top-5 w-[150px]">
                <FF7Panel>
                  <MenuPanel
                    onSelect={setMode}
                    activeMode={mode}
                    muted={muted}
                  />
                </FF7Panel>
              </div>
            </SlideIn>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}
