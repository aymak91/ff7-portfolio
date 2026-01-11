import { useEffect, useState } from "react";

function formatTime(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  return `${h.toString().padStart(2, "0")}:${m
    .toString()
    .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

export default function TimeGilPanel() {
  const [seconds, setSeconds] = useState(9000);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-xs leading-tight space-y-1">
      <div className="flex justify-between">
        <span>TIME</span>
        <span className="tabular-nums">{formatTime(seconds)}</span>
      </div>

      <div className="flex justify-between">
        <span>GIL</span>
        <span className="tabular-nums">77,777</span>
      </div>
    </div>
  );
}
