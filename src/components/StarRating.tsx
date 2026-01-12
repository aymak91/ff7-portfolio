import React from "react";

export default function StarRating({
  value,
  max = 5,
  size = 14, // px
}: {
  value: number; // current stars (filled)
  max?: number;  // total stars
  size?: number; // star size
}) {
  const stars = Array.from({ length: max }).map((_, i) => i < value);

  return (
    <div className="flex gap-1">
      {stars.map((filled, i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill={filled ? "#FFD700" : "none"} // gold for filled, empty for others
          stroke="#FFD700"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="12 2 15 9 22 9 17 14 19 21 12 17 5 21 7 14 2 9 9 9" />
        </svg>
      ))}
    </div>
  );
}
