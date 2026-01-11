import { useEffect, useRef } from "react";

export function useHoverSound(src: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(src);
    audioRef.current.volume = 0.4;
  }, [src]);

  const play = () => {
    if (!audioRef.current) return;

    audioRef.current.currentTime = 0;
    audioRef.current
      .play()
      .catch(() => {
        // silently fail if browser blocks it
      });
  };

  return play;
}
