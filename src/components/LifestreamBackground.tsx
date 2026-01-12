import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  r: number;
  dx: number;
  dy: number;
  alphaPhase: number;
};

type Wave = {
  amplitude: number;
  wavelength: number;
  speed: number;
  phase: number;
  yOffset: number;
  opacity: number;
};

export default function LifestreamBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const wavesRef = useRef<Wave[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let width = window.innerWidth;
    let height = window.innerHeight;

    // full window canvas
    canvas.width = width;
    canvas.height = height;

    // ===== PARTICLES =====
    const particleCount = Math.min(250, (width * height) / 20000);
    particlesRef.current = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 2 + 1,
      dx: (Math.random() - 0.5) * 0.25,
      dy: -Math.random() * 0.5 - 0.15,
      alphaPhase: Math.random() * Math.PI * 2,
    }));

    // ===== WAVES =====
    const waveCount = 6;
    wavesRef.current = Array.from({ length: waveCount }).map((_, i) => ({
      amplitude: 12 + i * 5,
      wavelength: 120 + i * 25,
      speed: 0.006 + i * 0.002,
      phase: Math.random() * Math.PI * 2,
      yOffset: height / 2 + (i - 2) * 30,
      opacity: 0.04 + i * 0.04,
    }));

    let time = 0;
    let frameSkip = 0;

    function animate() {
      frameSkip++;
      if (frameSkip % 2 === 0) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      // trail effect instead of clearing
      ctx.globalCompositeOperation = "destination-in";
      ctx.fillStyle = "rgba(0,0,0,0.15)";
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = "source-over";

      const waveStep = Math.max(3, Math.floor(width / 720));

      // draw waves
      wavesRef.current.forEach((w, idx) => {
        ctx.beginPath();
        for (let x = 0; x <= width; x += waveStep) {
          const y =
            w.yOffset +
            Math.sin(x / w.wavelength + w.phase + time * w.speed) * w.amplitude;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(0,255,0,${w.opacity})`;
        ctx.lineWidth = 1 + idx * 0.3;
        ctx.stroke();
      });

      // draw particles
      particlesRef.current.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;

        if (p.y < 0) p.y = height;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        const alpha = 0.25 + 0.2 * Math.sin(p.alphaPhase + time * 0.04);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,255,0,${alpha})`;
        ctx.fill();
      });

      time++;
      animationRef.current = requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      // Recreate particles/waves to fill new dimensions
      particlesRef.current.forEach((p) => {
        p.x = Math.random() * width;
        p.y = Math.random() * height;
      });
      wavesRef.current.forEach((w, i) => {
        w.yOffset = height / 2 + (i - 2) * 30;
      });
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationRef.current!);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />;
}
