// components/LoadingScreen.tsx
export default function LoadingScreen() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center font-[var(--font-ff7)]">
      <div className="text-white text-center">
        {/* Title */}
        <p className="mb-6 tracking-widest text-lg">Alexander Mak</p>

        {/* Panel */}
        <div className="w-[320px] border border-ff7-border p-4 bg-gradient-to-b from-ff7-panel to-ff7-blue">
          <p className="text-sm mb-2 animate-pulse">Now Loading...</p>

          {/* Progress bar */}
          <div className="w-full h-3 border border-ff7-border">
            <div className="h-full bg-[#dfb3be] animate-loading-bar" />
          </div>
        </div>
      </div>
    </div>
  );
}
