import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Zap, Code, Layers, Database, Radio, Box, FileCode, CheckCircle2 } from 'lucide-react';
import { SKILLS_DATA } from '../../data/journeyData';
import type { SkillNode } from '../../types/journey';
import './scenes.css';

interface Scene04Props {
  onNext: () => void;
  onTriggerDanceEffect: (skillName: string) => void;
}

const ICON_MAP: Record<string, typeof Code> = {
  Code,
  Zap,
  Layers,
  Database,
  Sparkles,
  Radio,
  FileCode,
  Box,
};

export default function Scene04Skills({ onNext, onTriggerDanceEffect }: Scene04Props) {
  const [selectedSkill, setSelectedSkill] = useState<SkillNode | null>(null);
  const [activeMovement, setActiveMovement] = useState<string | null>(null);

  const handleSkillClick = (skill: SkillNode) => {
    setSelectedSkill(skill);
    setActiveMovement(skill.movement);
    onTriggerDanceEffect(skill.name);
  };

  return (
    <div className="journey-scene-container scene-skills">
      {/* Top Scene Marker */}
      <div className="scene-top-headline">
        <span className="scene-eyebrow">
          <Sparkles size={12} style={{ color: '#fbbf24' }} /> SCENE 04 • CHOREOGRAPHED STACK
        </span>
        <h2 className="scene-main-heading">Every Movement Sparks Code</h2>
        <p className="scene-sub-heading">
          Click any skill to trigger dancer choreographic movement & inspect production architecture
        </p>
      </div>

      {/* Movement to Tech Mapping Ribbon (Choreography Legend) */}
      <div className="choreography-movement-bar">
        {[
          { move: 'Hand Movement', tech: 'Python' },
          { move: 'Foot Movement', tech: 'FastAPI' },
          { move: 'Spin', tech: 'React' },
          { move: 'Jump', tech: 'PostgreSQL' },
          { move: 'Movement Trail', tech: 'AI / LLMs' },
        ].map((item, idx) => (
          <div
            key={idx}
            className={`movement-step-pill ${activeMovement === item.move ? 'active-step' : ''}`}
          >
            <span className="movement-label">{item.move}</span>
            <span className="movement-arrow">→</span>
            <span className="movement-tech">{item.tech}</span>
          </div>
        ))}
      </div>

      {/* Skills Constellation Grid */}
      <div className="skills-constellation-grid">
        {SKILLS_DATA.map((skill, idx) => {
          const Icon = ICON_MAP[skill.iconName] || Code;
          const isSelected = selectedSkill?.name === skill.name;

          return (
            <motion.div
              key={skill.name}
              className={`skill-node-card ${isSelected ? 'skill-node-active' : ''}`}
              onClick={() => handleSkillClick(skill)}
              whileHover={{ scale: 1.06, y: -4 }}
              whileTap={{ scale: 0.96 }}
              initial={{ opacity: 0, scale: 0.8, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.15 + idx * 0.08, duration: 0.6 }}
            >
              <div className="skill-card-top">
                <div className="skill-icon-bubble">
                  <Icon size={16} />
                </div>
                <span className="skill-movement-tag">{skill.movement}</span>
              </div>

              <h3 className="skill-title-name">{skill.name}</h3>
              <span className="skill-badge-level">{skill.level}</span>

              <p className="skill-desc-summary">{skill.description}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Skill Detail Flyout Drawer if selected */}
      <AnimatePresence>
        {selectedSkill && (
          <motion.div
            className="skill-detail-toast"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
          >
            <div className="toast-left">
              <span className="toast-movement-badge">
                <Sparkles size={13} style={{ color: '#fbbf24' }} /> {selectedSkill.movement} Triggered
              </span>
              <h4 className="toast-skill-title">{selectedSkill.name}</h4>
              <p className="toast-skill-text">{selectedSkill.description}</p>
            </div>
            <button className="toast-dismiss-btn" onClick={() => setSelectedSkill(null)}>
              <CheckCircle2 size={16} /> Done
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <button className="scene-advance-hint-btn scene-bottom-center" onClick={onNext}>
        Enter Gallery: Featured Projects →
      </button>
    </div>
  );
}
