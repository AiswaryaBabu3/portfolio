import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, CheckCircle2 } from 'lucide-react';
import { EXPERIENCES_DATA } from '../../data/journeyData';
import './scenes.css';

interface Scene06Props {
  onNext: () => void;
}

export default function Scene06Experience({ onNext }: Scene06Props) {
  const [selectedMilestoneIndex, setSelectedMilestoneIndex] = useState(0);

  const activeExp = EXPERIENCES_DATA[selectedMilestoneIndex];

  return (
    <div className="journey-scene-container scene-experience">
      {/* Top Scene Marker */}
      <div className="scene-top-headline">
        <span className="scene-eyebrow">
          <Sparkles size={12} style={{ color: '#fbbf24' }} /> SCENE 06 • THE ILLUMINATED PATH
        </span>
        <h2 className="scene-main-heading">Career Milestones & Trajectory</h2>
        <p className="scene-sub-heading">Step through the illuminated timeline as the dancer progresses along the path</p>
      </div>

      {/* Illuminated Path Stepper Runway */}
      <div className="illuminated-timeline-track">
        {EXPERIENCES_DATA.map((exp, idx) => {
          const isSelected = selectedMilestoneIndex === idx;
          return (
            <button
              key={exp.year}
              className={`timeline-step-marker ${isSelected ? 'marker-active' : ''}`}
              onClick={() => setSelectedMilestoneIndex(idx)}
            >
              <div className="marker-dot-ring">
                <span className="marker-dot-core" />
              </div>
              <div className="marker-text-wrap">
                <span className="marker-year">{exp.year}</span>
                <span className="marker-role-snippet">{exp.role}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Milestone Card */}
      <motion.div
        key={activeExp.year}
        className="experience-milestone-card"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="milestone-header">
          <div className="milestone-badge-pill">
            <Calendar size={14} />
            <span>{activeExp.year}</span>
          </div>
          <span className="milestone-company-tag">{activeExp.company}</span>
        </div>

        <h3 className="milestone-role-title">{activeExp.role}</h3>
        <p className="milestone-summary-text">{activeExp.summary}</p>

        <div className="milestone-highlights-box">
          <h4 className="highlights-header">Key Architectural Achievements</h4>
          <ul className="highlights-list">
            {activeExp.highlights.map((item, hIdx) => (
              <li key={hIdx}>
                <CheckCircle2 size={15} className="highlight-check" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="milestone-tech-row">
          {activeExp.technologies.map((t) => (
            <span key={t} className="milestone-tech-pill">
              {t}
            </span>
          ))}
        </div>
      </motion.div>

      <button className="scene-advance-hint-btn scene-bottom-center" onClick={onNext}>
        Step Beyond Code: Artistry & Cadence →
      </button>
    </div>
  );
}
