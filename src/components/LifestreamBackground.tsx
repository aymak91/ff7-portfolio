import { useEffect, useRef, useState } from "react";

export default function LifestreamBackground({ particleCount = 300 }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });

    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!dimensions.width || !dimensions.height) return;

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    // === PARTICLES ===
    type Particle = { x: number; y: number; r: number; dx: number; dy: number; opacity: number };
    const particles: Particle[] = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 3 + 1,
      dx: (Math.random() - 0.5) * 0.5,
      dy: -Math.random() * 1 - 0.3,
      opacity: Math.random() * 0.5 + 0.3,
    }));

    // === WAVES ===
    const waveCount = 10;
    const waves = Array.from({ length: waveCount }).map((_, i) => ({
      amplitude: 20 + i * 10, // foreground bigger
      wavelength: 150 + Math.random() * 100,
      speed: 0.01 + i * 0.005,
      phase: Math.random() * Math.PI * 2,
      yOffset: dimensions.height / 2 + (i - 2) * 40, // stagger waves vertically
      opacity: 0.05 + i * 0.05,
    }));

    let time = 0;

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // === DRAW WAVES ===
      waves.forEach((w, index) => {
        ctx.beginPath();
        for (let x = 0; x <= canvas.width; x++) {
          const y =
            w.yOffset +
            Math.sin(x / w.wavelength + w.phase + time * w.speed) * w.amplitude;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(0, 255, 0, ${w.opacity})`;
        ctx.lineWidth = 2 + index * 0.5; // foreground waves thicker
        ctx.shadowColor = "limegreen";
        ctx.shadowBlur = 6 + index * 2;
        ctx.stroke();
      });

      // === DRAW PARTICLES ===
      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;

        if (p.y < 0) p.y = canvas.height;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;

        // subtle flicker effect
        const flicker = Math.random() * 0.3;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 0, ${Math.min(p.opacity + flicker, 1)})`;
        ctx.shadowColor = "limegreen";
        ctx.shadowBlur = 4 + Math.random() * 4;
        ctx.fill();
      });

      time++;
      requestAnimationFrame(animate);
    }

    animate();
  }, [dimensions, particleCount]);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />;
}
