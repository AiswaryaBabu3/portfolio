import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { BEYOND_CODE_DATA } from '../../data/journeyData';
import './scenes.css';

interface Scene07Props {
  onNext: () => void;
}

export default function Scene07Beyond({ onNext }: Scene07Props) {
  const [selectedPasssion, setSelectedPassion] = useState(0);

  const activePassion = BEYOND_CODE_DATA[selectedPasssion];

  return (
    <div className="journey-scene-container scene-beyond">
      {/* Top Scene Marker */}
      <div className="scene-top-headline">
        <span className="scene-eyebrow warm-eyebrow">
          <Sparkles size={12} style={{ color: '#fbbf24' }} /> SCENE 07 • BEYOND CODE
        </span>
        <h2 className="scene-main-heading">Artistry, Cadence & Passions</h2>
        <p className="scene-sub-heading">
          The discipline of classical dance and creative rhythm that informs every engineering decision
        </p>
      </div>

      {/* 5 Artistic Category Pills */}
      <div className="beyond-passions-selector">
        {BEYOND_CODE_DATA.map((item, idx) => {
          const isSelected = selectedPasssion === idx;
          return (
            <button
              key={item.id}
              className={`passion-nav-btn ${isSelected ? 'passion-active' : ''}`}
              onClick={() => setSelectedPassion(idx)}
            >
              <span className="passion-btn-icon">{item.icon}</span>
              <span className="passion-btn-title">{item.title}</span>
            </button>
          );
        })}
      </div>

      {/* Featured Passion Card */}
      <motion.div
        key={activePassion.id}
        className="beyond-feature-card"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="passion-card-header">
          <div className="passion-large-emoji">{activePassion.icon}</div>
          <div className="passion-title-block">
            <h3 className="passion-card-title">{activePassion.title}</h3>
            <span className="passion-card-subtitle">{activePassion.subtitle}</span>
          </div>
        </div>

        <blockquote className="passion-quote">"{activePassion.quote}"</blockquote>

        <p className="passion-details-paragraph">{activePassion.details}</p>
      </motion.div>

      <button className="scene-advance-hint-btn scene-bottom-center" onClick={onNext}>
        Awaken The Intelligent Orb (Aishu AI) →
      </button>
    </div>
  );
}
