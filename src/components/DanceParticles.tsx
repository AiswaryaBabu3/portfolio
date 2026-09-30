import { useEffect, useState } from 'react';
import './DanceParticles.css';

interface Particle {
  id: number;
  size: number;
  x: number;
  y: number;
  duration: number;
  delay: number;
  opacity: number;
  color: string;
}

export default function DanceParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const colors = [
      'rgba(236, 72, 153, 0.75)', // pink
      'rgba(217, 70, 239, 0.7)',  // magenta
      'rgba(192, 132, 252, 0.65)', // purple
      'rgba(251, 191, 36, 0.8)',  // gold sparkle
      'rgba(255, 255, 255, 0.85)', // starlight white
    ];

    const generated: Particle[] = Array.from({ length: 28 }, (_, i) => ({
      id: i,
      size: Math.random() * 4 + 2,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 14 + 10,
      delay: Math.random() * 8,
      opacity: Math.random() * 0.6 + 0.3,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    setParticles(generated);
  }, []);

  return (
    <div className="dance-particles-container" aria-hidden="true">
      {/* Ethereal Glow Streams */}
      <div className="dance-stream stream-1"></div>
      <div className="dance-stream stream-2"></div>

      {/* Floating Sparkles & Stardust */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="dance-particle"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.x}%`,
            top: `${p.y}%`,
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
}
