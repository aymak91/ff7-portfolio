import { useState } from "react";

const characters = [
  {
    name: "Alexander Mak",
    level: 30,
    hp: "4578 / 4578",
    mp: "63 / 63",
    limit: 100,
    exp: 45,
    avatar: "/cloud.jpg",
  },
  {
    name: "Lotus",
    level: 6,
    hp: "341 / 341",
    mp: "48 / 48",
    limit: 20,
    exp: 70,
    avatar: "/barret.jpg",
  },
];

function FF7Bar({
  label,
  value,
  color,
  flash = false,
  onClick,
}: {
  label: string;
  value: number;
  color: string;
  flash?: boolean;
  onClick?: () => void;
}) {
  return (
    <div className="flex items-center gap-1 text-[10px]">
      <span className="w-7 text-right">{label}</span>

      <div
        className="w-24 h-2 border-[2px] border-ff7-border bg-black overflow-hidden cursor-pointer"
        onClick={onClick}
      >
        <div
          className={`h-full ${
            flash ? "animate-[ff7-limit-flash_1s_steps(2)_infinite]" : ""
          }`}
          style={{
            width: `${value}%`,
            backgroundColor: flash ? undefined : color,
          }}
        />
      </div>
    </div>
  );
}
export default function CharacterPanel({
  onOmnislash,
}: {
  onOmnislash?: () => void;
}) {
  return (
    <div className="space-y-3 text-sm">
      {characters.map((c) => (
        <div key={c.name} className="flex gap-3">
          {/* Avatar */}
          <img
            src={c.avatar}
            alt={c.name}
            className="w-20 h-20 border border-ff7-border"
          />

          {/* Info + Bars */}
          <div className="flex gap-3">
            {/* LEFT: Text */}
            <div className="leading-tight space-y-0.5 min-w-[110px]">
              <div className="text-ff7-accent font-bold">{c.name}</div>
              <div>LV {c.level}</div>
              <div>HP {c.hp}</div>
              <div>MP {c.mp}</div>
            </div>

            {/* RIGHT: Bars */}
            <div className="flex flex-col justify-center gap-1 pb-0.5">
              <FF7Bar label="EXP" value={c.exp} color="#dfb3be" />
              <FF7Bar
                label="LIMIT"
                value={c.limit}
                color="#dfb3be"
                flash={c.limit >= 100}
                onClick={onOmnislash} // trigger GIF here
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
