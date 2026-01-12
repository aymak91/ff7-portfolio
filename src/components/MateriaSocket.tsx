import Image from "next/image";
import React from "react";

export default function MateriaSocket({
  materia,
  className = "",
  onClick,
  tooltip, // tooltip text for skill name
}: {
  materia?: "green" | "yellow" | "blue" | "red" | "purple";
  className?: string;
  onClick?: () => void;
  tooltip?: string;
}) {
  return (
    <div className="relative flex items-center justify-center group">
      {/* Socket */}
      <div
        onClick={onClick}
        className={`relative flex h-6 w-6 items-center justify-center rounded-full border border-cyan-300 bg-[#0b2a5a] cursor-pointer ${className}`}
      >
        {materia && (
          <Image
            src={`/materia-${materia}.png`}
            alt={`${materia} materia`}
            width={14}
            height={14}
          />
        )}
      </div>

      {/* Tooltip */}
      {tooltip && (
        <span
          className="absolute top-full mt-1 left-1/2 transform -translate-x-1/2
          w-max min-w-[40px] rounded bg-[#1e3a5c] px-2 py-1 text-xs text-white text-center
          opacity-0 scale-90 transition-all duration-150
          pointer-events-none group-hover:opacity-100 group-hover:scale-100"
        >
          {tooltip}
        </span>
      )}
    </div>
  );
}
