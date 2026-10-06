import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Briefcase, GraduationCap, Heart, X, Sparkles } from 'lucide-react';
import './scenes.css';

interface Scene03Props {
  onNext: () => void;
}

type CardKey = 'profile' | 'experience' | 'education' | 'personality' | null;

interface CardData {
  key: CardKey;
  title: string;
  subtitle: string;
  icon: typeof User;
  summary: string;
  bullets: string[];
}

const CARDS: CardData[] = [
  {
    key: 'profile',
    title: 'PROFILE',
    subtitle: 'The Craft & Ethos',
    icon: User,
    summary:
      'Senior Software Developer architecting resilient backend microservices, real-time trading engines, and GenAI applications. Blends computer science rigor with classical artistic discipline.',
    bullets: [
      'Core focus: High-throughput Python & FastAPI backends',
      'Architectural mindset: Event-driven concurrency & distributed locks',
      'Passionate about sub-50ms latency and zero-downtime deployments',
    ],
  },
  {
    key: 'experience',
    title: 'EXPERIENCE',
    subtitle: 'Production Pedigree',
    icon: Briefcase,
    summary:
      'Over 2.5 years of production development leading SaaS microservices, order execution systems, and full-stack enterprise portals.',
    bullets: [
      'Senior Software Developer @ Full Stack Technology (2025–Present)',
      'Software Developer @ Aagnia Technologies (2024–2025)',
      'Engineered multi-tenant platforms processing tens of thousands of requests/min',
    ],
  },
  {
    key: 'education',
    title: 'EDUCATION',
    subtitle: 'Academic Foundations',
    icon: GraduationCap,
    summary:
      'Grounded in Computer Science principles, algorithms, distributed systems theory, and database management systems.',
    bullets: [
      'Bachelor\'s in Computer Science & Engineering',
      'Strong foundations in Operating Systems, Networks, and Relational Database Design',
      'Continuous self-directed mastery in GenAI, LangChain, and advanced concurrency',
    ],
  },
  {
    key: 'personality',
    title: 'PERSONALITY',
    subtitle: 'Cadence & Soul',
    icon: Heart,
    summary:
      'Classical Bharatanatyam dancer with a deep love for rhythm, music, and chess. Believes discipline in movement reflects directly in elegant, well-tested code.',
    bullets: [
      '10+ years practicing classical Indian dance',
      'Calm, analytical problem solver who thrives under production deadlines',
      'Empathetic teammate who champions clear documentation and clean APIs',
    ],
  },
];

export default function Scene03About({ onNext }: Scene03Props) {
  const [activeCard, setActiveCard] = useState<CardKey>(null);

  return (
    <div className="journey-scene-container scene-about">
      {/* Top Scene Marker */}
      <div className="scene-top-headline">
        <span className="scene-eyebrow">
          <Sparkles size={12} style={{ color: '#fbbf24' }} /> SCENE 03 • THE PORTAL SPACE
        </span>
        <h2 className="scene-main-heading">Explore My Dimensions</h2>
        <p className="scene-sub-heading">Click any floating portal card to bring it forward</p>
      </div>

      {/* 4 Floating Cards Grid around Stage Center */}
      <div className="portal-cards-orbit-grid">
        {CARDS.map((card, idx) => {
          const Icon = card.icon;
          const isSelected = activeCard === card.key;
          return (
            <motion.div
              key={card.key}
              className={`portal-floating-card ${isSelected ? 'active-card' : ''}`}
              onClick={() => setActiveCard(isSelected ? null : card.key)}
              whileHover={{ scale: 1.05, y: -6 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.12, duration: 0.7 }}
            >
              <div className="card-header-row">
                <div className="card-icon-bubble">
                  <Icon size={18} />
                </div>
                <div className="card-titles">
                  <h3 className="card-title-text">{card.title}</h3>
                  <span className="card-sub-text">{card.subtitle}</span>
                </div>
              </div>

              <p className="card-preview-text">{card.summary}</p>

              <div className="card-action-hint">
                <span>{isSelected ? 'Click to close' : 'Click to inspect'}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Expanded Modal View when a card is selected */}
      <AnimatePresence>
        {activeCard && (
          <motion.div
            className="portal-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveCard(null)}
          >
            {CARDS.filter((c) => c.key === activeCard).map((card) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.key}
                  className="portal-card-modal-content"
                  onClick={(e) => e.stopPropagation()}
                  initial={{ scale: 0.85, y: 30, opacity: 0 }}
                  animate={{ scale: 1, y: 0, opacity: 1 }}
                  exit={{ scale: 0.85, y: 20, opacity: 0 }}
                  transition={{ type: 'spring', damping: 20, stiffness: 120 }}
                >
                  <button
                    className="modal-close-btn"
                    onClick={() => setActiveCard(null)}
                    aria-label="Close"
                  >
                    <X size={18} />
                  </button>

                  <div className="modal-header-badge">
                    <Icon size={20} />
                    <span>{card.title}</span>
                  </div>

                  <h3 className="modal-heading">{card.subtitle}</h3>
                  <p className="modal-summary">{card.summary}</p>

                  <div className="modal-bullet-list">
                    {card.bullets.map((b, bIdx) => (
                      <div key={bIdx} className="modal-bullet-item">
                        <span className="bullet-dot" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <button className="scene-advance-hint-btn scene-bottom-center" onClick={onNext}>
        Continue Choreography: My Skills →
      </button>
    </div>
  );
}
