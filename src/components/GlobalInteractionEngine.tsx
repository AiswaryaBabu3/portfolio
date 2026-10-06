import { useState, useEffect, useRef } from 'react';
import { soundscape } from '../utils/soundscape';
import './GlobalInteractionEngine.css';

interface ClickRipple {
  id: number;
  x: number;
  y: number;
  color: string;
  badge: string;
  particles: {
    dx: number;
    dy: number;
    char: string;
    color: string;
    size: number;
  }[];
}

interface CursorNode {
  x: number;
  y: number;
}

interface GlobalInteractionEngineProps {
  onCanvasTap?: (x: number, y: number) => void;
}

const REACTION_BADGES = [
  '✦ Rhythm!',
  '⚡ Concurrency!',
  '♪ Cadence!',
  '💃 Beat!',
  '✨ Step!',
  '🚀 Sub-50ms!',
  '🧠 GenAI in Motion!',
  '✦ Flow!',
  '🔔 Ghungroo Spark!',
  '⚛️ React 19 Pulse!',
];

const PARTICLE_SYMBOLS = ['✦', '♪', '♫', '⚡', '•', '★', 'λ', '🔔', '✨'];
const VIBRANT_COLORS = ['#f472b6', '#fbbf24', '#8b5cf6', '#d946ef', '#06b6d4', '#ec4899'];

export default function GlobalInteractionEngine({ onCanvasTap }: GlobalInteractionEngineProps) {
  const [ripples, setRipples] = useState<ClickRipple[]>([]);
  const trailRef = useRef<CursorNode[]>([]);
  const mousePosRef = useRef({ x: -100, y: -100 });
  const trailCanvasRef = useRef<HTMLCanvasElement>(null);
  const nextIdRef = useRef(1);

  // Global Click Listener
  useEffect(() => {
    const handleWindowClick = (e: MouseEvent) => {
      // Don't duplicate if clicking form inputs directly
      const target = e.target as HTMLElement;
      if (['input', 'textarea'].includes(target.tagName.toLowerCase())) {
        return;
      }

      const x = e.clientX;
      const y = e.clientY;

      // 1. Play Interactive Ghungroo Chime
      soundscape.playInteractiveTap(x, y);

      // 2. Notify 3D canvas for stage ripple & dancer choreographic reaction
      if (onCanvasTap) {
        onCanvasTap(x, y);
      }

      // 3. Create 2D explosive shockwave & particle burst
      const badge = REACTION_BADGES[Math.floor(Math.random() * REACTION_BADGES.length)];
      const color = VIBRANT_COLORS[Math.floor(Math.random() * VIBRANT_COLORS.length)];

      const particles = Array.from({ length: 14 }).map((_, i) => {
        const angle = (i / 14) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
        const speed = 40 + Math.random() * 65;
        return {
          dx: Math.cos(angle) * speed,
          dy: Math.sin(angle) * speed,
          char: PARTICLE_SYMBOLS[Math.floor(Math.random() * PARTICLE_SYMBOLS.length)],
          color: VIBRANT_COLORS[Math.floor(Math.random() * VIBRANT_COLORS.length)],
          size: 11 + Math.random() * 7,
        };
      });

      const newRipple: ClickRipple = {
        id: nextIdRef.current++,
        x,
        y,
        color,
        badge,
        particles,
      };

      setRipples((prev) => [...prev.slice(-12), newRipple]);

      // Remove after animation completes
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 1100);
    };

    window.addEventListener('pointerdown', handleWindowClick);
    return () => window.removeEventListener('pointerdown', handleWindowClick);
  }, [onCanvasTap]);

  // Mouse move listener for smooth ribbon trail
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Canvas trailing render loop
    const canvas = trailCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const trailPoints: CursorNode[] = Array.from({ length: 18 }, () => ({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    }));

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const renderTrail = () => {
      animId = requestAnimationFrame(renderTrail);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const target = mousePosRef.current;
      trailPoints[0].x += (target.x - trailPoints[0].x) * 0.45;
      trailPoints[0].y += (target.y - trailPoints[0].y) * 0.45;

      for (let i = 1; i < trailPoints.length; i++) {
        trailPoints[i].x += (trailPoints[i - 1].x - trailPoints[i].x) * 0.35;
        trailPoints[i].y += (trailPoints[i - 1].y - trailPoints[i].y) * 0.35;
      }

      // Draw smooth trailing ribbon
      for (let i = 0; i < trailPoints.length - 1; i++) {
        const pt = trailPoints[i];
        const nextPt = trailPoints[i + 1];
        const progress = 1 - i / trailPoints.length;

        ctx.beginPath();
        ctx.moveTo(pt.x, pt.y);
        ctx.lineTo(nextPt.x, nextPt.y);
        ctx.strokeStyle = `rgba(244, 114, 182, ${progress * 0.35})`;
        ctx.lineWidth = progress * 4;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Stardust sparkles along trail
        if (i % 3 === 0) {
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, progress * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = i % 2 === 0 ? 'rgba(251, 191, 36, 0.7)' : 'rgba(217, 70, 239, 0.7)';
          ctx.shadowColor = '#f472b6';
          ctx.shadowBlur = 8;
          ctx.fill();
        }
      }
    };

    renderTrail();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="global-interaction-overlay" aria-hidden="true">
      {/* 2D Canvas Fluid Ribbon Trail */}
      <canvas ref={trailCanvasRef} className="cursor-ribbon-canvas" />

      {/* Explosive Click Shockwaves & Sparks */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="click-shockwave-container"
          style={{ left: ripple.x, top: ripple.y }}
        >
          {/* Primary Optical Ripple Ring */}
          <span
            className="shockwave-ring ring-primary"
            style={{ borderColor: ripple.color, boxShadow: `0 0 25px ${ripple.color}` }}
          />
          <span
            className="shockwave-ring ring-secondary"
            style={{ borderColor: '#fbbf24' }}
          />

          {/* Floating Reaction Word */}
          <span
            className="click-floating-badge"
            style={{ color: ripple.color, textShadow: `0 0 12px ${ripple.color}` }}
          >
            {ripple.badge}
          </span>

          {/* Radial Particle Sparks */}
          {ripple.particles.map((p, pIdx) => (
            <span
              key={pIdx}
              className="click-spark-particle"
              style={
                {
                  '--p-dx': `${p.dx}px`,
                  '--p-dy': `${p.dy}px`,
                  color: p.color,
                  fontSize: `${p.size}px`,
                  textShadow: `0 0 8px ${p.color}`,
                } as React.CSSProperties
              }
            >
              {p.char}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
