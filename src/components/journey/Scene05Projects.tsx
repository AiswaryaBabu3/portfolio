import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ExternalLink, CheckCircle, RotateCcw } from 'lucide-react';
import { PROJECTS_DATA } from '../../data/journeyData';
import type { ProjectData } from '../../types/journey';
import './scenes.css';

const GithubIcon = ({ size = 15 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

interface Scene05Props {
  onNext: () => void;
}

export default function Scene05Projects({ onNext }: Scene05Props) {
  const [activeProject, setActiveProject] = useState<ProjectData | null>(null);

  return (
    <div className="journey-scene-container scene-projects">
      {/* Top Scene Marker */}
      <div className="scene-top-headline">
        <span className="scene-eyebrow">
          <Sparkles size={12} style={{ color: '#fbbf24' }} /> SCENE 05 • THE ARCHITECTURE GALLERY
        </span>
        <h2 className="scene-main-heading">Choreographed Systems & Portals</h2>
        <p className="scene-sub-heading">Click any floating project panel to zoom in and inspect architectural depth</p>
      </div>

      {/* Floating Glass Panels Gallery Grid */}
      <div className="projects-gallery-grid">
        {PROJECTS_DATA.map((proj, idx) => {
          return (
            <motion.div
              key={proj.id}
              className="gallery-glass-panel"
              onClick={() => setActiveProject(proj)}
              whileHover={{ scale: 1.04, y: -6 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, scale: 0.88, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.15 + idx * 0.1, duration: 0.7 }}
            >
              <div className="panel-thumb-wrap">
                <img src={proj.image} alt={proj.title} className="panel-thumb-img" />
                <div className="panel-thumb-overlay">
                  <span className="panel-act-label">PROJECT 0{idx + 1}</span>
                  <span className="panel-inspect-tag">Inspect Architecture →</span>
                </div>
              </div>

              <div className="panel-body">
                <span className="panel-category">{proj.category}</span>
                <h3 className="panel-title">{proj.title}</h3>
                <p className="panel-tagline">{proj.tagline}</p>

                <div className="panel-tech-tags">
                  {proj.technologies.slice(0, 4).map((tech) => (
                    <span key={tech} className="mini-tech-tag">
                      {tech}
                    </span>
                  ))}
                  {proj.technologies.length > 4 && (
                    <span className="mini-tech-tag more-tag">+{proj.technologies.length - 4}</span>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Deep-Dive Project Modal / Zoom View */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            className="project-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveProject(null)}
          >
            <motion.div
              className="project-modal-content"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 30, opacity: 0 }}
              transition={{ type: 'spring', damping: 22, stiffness: 130 }}
            >
              <div className="modal-top-bar">
                <div className="modal-title-group">
                  <span className="modal-project-badge">{activeProject.category}</span>
                  <h2 className="modal-project-title">{activeProject.title}</h2>
                  <p className="modal-project-subtitle">{activeProject.tagline}</p>
                </div>
                <button
                  className="modal-return-stage-btn"
                  onClick={() => setActiveProject(null)}
                >
                  <RotateCcw size={15} /> RETURN TO STAGE
                </button>
              </div>

              <div className="modal-scroll-body">
                {/* Image Banner */}
                <div className="modal-hero-banner">
                  <img src={activeProject.image} alt={activeProject.title} className="modal-hero-img" />
                </div>

                {/* Deep Architectural Breakdown */}
                <div className="modal-sections-grid">
                  <div className="modal-section-card">
                    <h4 className="section-label">THE PROBLEM</h4>
                    <p className="section-text">{activeProject.problem}</p>
                  </div>

                  <div className="modal-section-card highlight-card">
                    <h4 className="section-label">THE SOLUTION</h4>
                    <p className="section-text">{activeProject.solution}</p>
                  </div>

                  <div className="modal-section-card full-width">
                    <h4 className="section-label">ARCHITECTURE & DATA FLOW</h4>
                    <p className="section-text">{activeProject.architecture}</p>
                  </div>

                  <div className="modal-section-card">
                    <h4 className="section-label">KEY FEATURES</h4>
                    <ul className="modal-feature-list">
                      {activeProject.features.map((feat, fIdx) => (
                        <li key={fIdx}>
                          <CheckCircle size={14} className="feature-icon" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="modal-section-card">
                    <h4 className="section-label">MY CONTRIBUTION</h4>
                    <p className="section-text">{activeProject.contribution}</p>
                  </div>

                  <div className="modal-section-card full-width impact-card">
                    <h4 className="section-label">PRODUCTION RESULT & IMPACT</h4>
                    <p className="section-text impact-text">{activeProject.result}</p>
                  </div>
                </div>

                {/* Tech Pills & External Links */}
                <div className="modal-footer-row">
                  <div className="modal-tech-pills">
                    {activeProject.technologies.map((t) => (
                      <span key={t} className="tech-pill-badge">{t}</span>
                    ))}
                  </div>

                  <div className="modal-links-group">
                    {activeProject.githubUrl && (
                      <a
                        href={activeProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="modal-link-btn"
                      >
                        <GithubIcon size={15} /> Source Code
                      </a>
                    )}
                    {activeProject.liveUrl && (
                      <a
                        href={activeProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="modal-link-btn live-btn"
                      >
                        <ExternalLink size={15} /> Live Platform
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <button className="scene-advance-hint-btn scene-bottom-center" onClick={onNext}>
        Step Onto The Illuminated Path (Experience) →
      </button>
    </div>
  );
}
