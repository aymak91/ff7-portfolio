export const materiaSprites = {
  green: { x: 0, y: 0 },
  blue: { x: 20, y: 0 },
  purple: { x: 40, y: 0 },
};

export default function MateriaIcon({
  x,
  y,
}: {
  x: number;
  y: number;
}) {
  return (
    <div
      className="w-5 h-5"
      style={{
        backgroundImage: "url(/materia-sprites.png)",
        backgroundPosition: `-${x}px -${y}px`,
      }}
    />
  );
}
