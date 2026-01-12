import { useEffect, useRef } from "react";

type Options = {
  muted?: boolean;
};

export function useHoverSound(src: string, options?: Options) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(src);
    audioRef.current.volume = 0.4;
  }, [src]);

  const play = () => {
    if (options?.muted) return; // skip playing if muted
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
