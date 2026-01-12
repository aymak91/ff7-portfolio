// hooks/useClickSound.ts
import { useEffect, useRef } from "react";

type Options = {
  muted?: boolean;
};

export function useClickSound(src: string, options?: Options) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(src);
  }, [src, options]);

  const play = () => {
    if (options?.muted) return; // skip playing if muted
    if (!audioRef.current) return;

    // Reset to start for rapid repeated clicks
    audioRef.current.currentTime = 0;

    audioRef.current
      .play()
      .catch(() => {
        // silently fail if browser blocks it
      });
  };

  return play;
}
