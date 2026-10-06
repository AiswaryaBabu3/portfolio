import { motion } from 'framer-motion';
import { Terminal, Cpu, Database, Sparkles } from 'lucide-react';
import './scenes.css';

interface Scene02Props {
  onNext: () => void;
}

export default function Scene02Discover({ onNext }: Scene02Props) {
  const floatingWords = [
    { text: 'CODE', icon: Terminal, delay: 0.2, top: '22%', left: '12%' },
    { text: 'CREATE', icon: Sparkles, delay: 0.35, top: '18%', right: '14%' },
    { text: 'LEARN', icon: Cpu, delay: 0.5, bottom: '26%', left: '10%' },
    { text: 'BUILD', icon: Database, delay: 0.65, bottom: '24%', right: '12%' },
  ];

  return (
    <div className="journey-scene-container scene-discover">
      {/* Floating Spatial Typography */}
      {floatingWords.map((item, idx) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={idx}
            className="floating-kinetic-word"
            style={{
              position: 'absolute',
              top: item.top,
              bottom: item.bottom,
              left: item.left,
              right: item.right,
            }}
            initial={{ opacity: 0, scale: 0.7, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ delay: item.delay, duration: 0.8 }}
          >
            <Icon size={16} className="word-icon" />
            <span>{item.text}</span>
          </motion.div>
        );
      })}

      {/* Center Cinematic Profile Card */}
      <motion.div
        className="discover-profile-capsule"
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="discover-badge">SCENE 02 • DISCOVER</span>

        <h2 className="discover-title">Aishwarya Babu</h2>
        <h3 className="discover-role">Senior Software Developer</h3>

        <div className="discover-stats-row">
          <div className="stat-pill">
            <span className="stat-num">2.5+</span>
            <span className="stat-label">Years Experience</span>
          </div>
          <div className="stat-pill">
            <span className="stat-num">10+</span>
            <span className="stat-label">Production Apps</span>
          </div>
          <div className="stat-pill">
            <span className="stat-num">4+</span>
            <span className="stat-label">AI Pipelines</span>
          </div>
          <div className="stat-pill">
            <span className="stat-num">99.9%</span>
            <span className="stat-label">Uptime Architecture</span>
          </div>
        </div>

        <p className="discover-manifesto">
          "Architecture in software mirrors choreography in dance: both demand spatial rhythm,
          flawless timing, zero unnecessary friction, and effortless elegance under load."
        </p>

        <button className="scene-advance-hint-btn" onClick={onNext}>
          Step Into My Profile (Portal) →
        </button>
      </motion.div>
    </div>
  );
}
