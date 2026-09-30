import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Layers,
  Briefcase,
  Eye,
  Send,
  X,
  Compass,
  Scroll,
  Move,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import DanceUniverseCanvas from './DanceUniverseCanvas';
import avatarImg from '../assets/profile.jpg';
import About from './About';
import Projects from './Projects';
import Experience from './Experience';
import Contact from './Contact';
import './UniverseStage.css';

type PortalType = 'about' | 'projects' | 'experience' | 'resume' | 'contact' | null;
type StageTheme = 'diva' | 'gold' | 'cyber' | 'space';

interface UniverseStageProps {
  onOpenResume: () => void;
  onToggleClassicView: () => void;
}

export default function UniverseStage({ onOpenResume, onToggleClassicView }: UniverseStageProps) {
  const [activePortal, setActivePortal] = useState<PortalType>(null);
  const [stageTheme, setStageTheme] = useState<StageTheme>('diva');
  const [isAutoOrbit, setIsAutoOrbit] = useState(true);

  // 3D stage rotation state
  const [rotation, setRotation] = useState({ x: 8, y: 0 });
  const isDraggingRef = useRef(false);
  const lastMousePosRef = useRef({ x: 0, y: 0 });

  // Auto orbit effect
  useEffect(() => {
    if (!isAutoOrbit || activePortal !== null) return;
    const interval = setInterval(() => {
      setRotation((prev) => ({
        x: prev.x,
        y: (prev.y + 0.18) % 360,
      }));
    }, 40);
    return () => clearInterval(interval);
  }, [isAutoOrbit, activePortal]);

  // Mouse drag handlers for 3D stage orbit
  const handleMouseDown = (e: React.MouseEvent) => {
    // If clicking on an interactive button or card, don't hijack orbit
    if ((e.target as HTMLElement).closest('.universe-portal-node, .draggable-cosmic-prop, .performer-avatar-frame, button, a')) {
      return;
    }
    isDraggingRef.current = true;
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - lastMousePosRef.current.x;
    const deltaY = e.clientY - lastMousePosRef.current.y;
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };

    setIsAutoOrbit(false);
    setRotation((prev) => ({
      x: Math.max(-25, Math.min(35, prev.x - deltaY * 0.25)),
      y: prev.y + deltaX * 0.35,
    }));
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  // Keyboard escape closes active portal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActivePortal(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // 5 Orbiting Portals data
  const portals = [
    {
      id: 'about' as const,
      title: 'The Spotlight',
      subtitle: 'About & Core Rhythm',
      angle: 0,
      radius: 360,
      icon: <Sparkles size={28} />,
      className: 'portal-node-about',
    },
    {
      id: 'projects' as const,
      title: 'The Choreography',
      subtitle: 'Live AI & Fintech Systems',
      angle: 72,
      radius: 380,
      icon: <Layers size={28} />,
      className: 'portal-node-projects',
    },
    {
      id: 'experience' as const,
      title: 'The Repertoire',
      subtitle: 'Work & Milestones',
      angle: 144,
      radius: 370,
      icon: <Briefcase size={28} />,
      className: 'portal-node-experience',
    },
    {
      id: 'resume' as const,
      title: 'Backstage Pass',
      subtitle: 'Preview Resume (Eye Icon)',
      angle: 216,
      radius: 380,
      icon: <Eye size={28} />,
      className: 'portal-node-resume',
    },
    {
      id: 'contact' as const,
      title: 'Curtain Call',
      subtitle: 'Audition & Connect',
      angle: 288,
      radius: 360,
      icon: <Send size={28} />,
      className: 'portal-node-contact',
    },
  ];

  // Draggable cosmic tokens floating in the universe
  const cosmicProps = [
    { label: '⚛️ React 19', x: -380, y: -180 },
    { label: '🐍 Python & FastAPI', x: 340, y: -200 },
    { label: '⚡ Fastify & Node', x: -420, y: 140 },
    { label: '☁️ AWS Cloud', x: 380, y: 120 },
    { label: '🐳 Docker Microservices', x: -280, y: 220 },
    { label: '🪷 Nataraja Mudra', x: 260, y: -260 },
    { label: '🔔 Ghungroo Beats', x: -220, y: -250 },
    { label: '✨ OpenAI GPT-4o', x: 320, y: 230 },
  ];

  const handlePortalClick = (portalId: PortalType) => {
    if (portalId === 'resume') {
      onOpenResume();
    } else {
      setActivePortal(portalId);
    }
  };

  const portalOrder: PortalType[] = ['about', 'projects', 'experience', 'contact'];

  const handleNextChamber = () => {
    if (!activePortal) return;
    const currIdx = portalOrder.indexOf(activePortal);
    if (currIdx !== -1) {
      const nextIdx = (currIdx + 1) % portalOrder.length;
      setActivePortal(portalOrder[nextIdx]);
    }
  };

  const handlePrevChamber = () => {
    if (!activePortal) return;
    const currIdx = portalOrder.indexOf(activePortal);
    if (currIdx !== -1) {
      const prevIdx = (currIdx - 1 + portalOrder.length) % portalOrder.length;
      setActivePortal(portalOrder[prevIdx]);
    }
  };

  return (
    <div
      className={`universe-viewport theme-${stageTheme}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* 1. Three.js Cosmic Starfield & Rotating Chakra Rings */}
      <DanceUniverseCanvas
        theme={stageTheme}
        mouseRotation={{ x: rotation.x / 40, y: rotation.y / 80 }}
      />

      {/* 2. Classical Dance Silhouette Overlay */}
      <div className="universe-bg-dancer" />

      {/* 3. Theatrical Stage Spotlights */}
      <div className="universe-spotlight-left" />
      <div className="universe-spotlight-right" />

      {/* 4. TOP UNIVERSE HUD BAR */}
      <header className="universe-hud-bar">
        <div className="universe-brand">
          <div className="brand-icon-pulse">
            <Sparkles size={20} />
          </div>
          <div>
            <div className="brand-title">Aiswarya Babu</div>
            <div className="brand-subtitle">Universe of Dance & Code</div>
          </div>
        </div>

        {/* Quick Direct Realm Jump Links */}
        <nav className="universe-quick-nav">
          <button
            className={`hud-nav-btn ${activePortal === 'about' ? 'active' : ''}`}
            onClick={() => handlePortalClick('about')}
          >
            <Sparkles size={14} /> Spotlight
          </button>
          <button
            className={`hud-nav-btn ${activePortal === 'projects' ? 'active' : ''}`}
            onClick={() => handlePortalClick('projects')}
          >
            <Layers size={14} /> Choreography
          </button>
          <button
            className={`hud-nav-btn ${activePortal === 'experience' ? 'active' : ''}`}
            onClick={() => handlePortalClick('experience')}
          >
            <Briefcase size={14} /> Repertoire
          </button>
          <button
            className="hud-nav-btn"
            onClick={onOpenResume}
          >
            <Eye size={14} /> Preview Resume
          </button>
          <button
            className={`hud-nav-btn ${activePortal === 'contact' ? 'active' : ''}`}
            onClick={() => handlePortalClick('contact')}
          >
            <Send size={14} /> Curtain Call
          </button>
        </nav>

        {/* HUD Controls */}
        <div className="universe-hud-controls">
          {/* Stage Lighting Theme Switcher */}
          <div className="hud-theme-picker" title="Change Stage Mood Lighting">
            <button
              className={`theme-dot-btn theme-dot-diva ${stageTheme === 'diva' ? 'active' : ''}`}
              onClick={() => setStageTheme('diva')}
              title="Diva Magenta"
            />
            <button
              className={`theme-dot-btn theme-dot-gold ${stageTheme === 'gold' ? 'active' : ''}`}
              onClick={() => setStageTheme('gold')}
              title="Temple Gold"
            />
            <button
              className={`theme-dot-btn theme-dot-cyber ${stageTheme === 'cyber' ? 'active' : ''}`}
              onClick={() => setStageTheme('cyber')}
              title="Cyber Lotus"
            />
            <button
              className={`theme-dot-btn theme-dot-space ${stageTheme === 'space' ? 'active' : ''}`}
              onClick={() => setStageTheme('space')}
              title="Cosmic Void"
            />
          </div>

          {/* Switch to Traditional Portfolio View */}
          <button
            className="hud-switch-view-btn"
            onClick={onToggleClassicView}
            title="Switch to Linear Scroll Portfolio"
          >
            <Scroll size={16} /> Classical View
          </button>
        </div>
      </header>

      {/* 5. 3D INTERACTIVE STAGE REALM */}
      <div className="universe-stage-canvas-space">
        <div
          className="stage-3d-rotator"
          style={{
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          }}
        >
          {/* THE 3D CENTER STAGE PODIUM */}
          <div className="universe-center-podium">
            {/* 3D Concentric Stage Floor Plates */}
            <div className="stage-floor-rings-3d">
              <div className="stage-ring-disc stage-ring-1" />
              <div className="stage-ring-disc stage-ring-2" />
              <div className="stage-ring-disc stage-ring-3" />
              <div className="stage-ring-disc stage-center-plate" />
            </div>

            {/* Performer Hologram Disk */}
            <div className="stage-performer-hologram">
              <div
                className="performer-avatar-frame"
                onClick={() => handlePortalClick('about')}
                title="Click to view About Spotlight"
              >
                <img
                  src={avatarImg}
                  alt="Aiswarya Babu"
                  className="performer-img"
                />
              </div>

              {/* Performer Nameplate */}
              <div className="stage-performer-badge">
                <div className="performer-name">
                  Aiswarya Babu <Sparkles size={14} color="#ec4899" />
                </div>
                <div className="performer-role">
                  Full-Stack Software Engineer & Classical Dancer
                </div>
              </div>
            </div>
          </div>

          {/* 5 ORBITING CELESTIAL PORTALS */}
          <div className="universe-portals-orbit-ring">
            {portals.map((portal) => {
              // Calculate 3D ellipse position around the stage
              const rad = (portal.angle * Math.PI) / 180;
              const xPos = Math.cos(rad) * portal.radius;
              const zPos = Math.sin(rad) * (portal.radius * 0.7);

              return (
                <div
                  key={portal.id}
                  className={`universe-portal-node ${portal.className}`}
                  style={{
                    transform: `translate3d(${xPos}px, 0px, ${zPos}px) rotateY(${-rotation.y}deg) rotateX(${-rotation.x}deg)`,
                  }}
                  onClick={() => handlePortalClick(portal.id)}
                >
                  <div className="portal-orb-core">
                    <div className="portal-pulse-ring" />
                    {portal.icon}
                  </div>
                  <div className="portal-node-label">
                    <div className="portal-label-title">{portal.title}</div>
                    <div className="portal-label-hint">{portal.subtitle}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* DRAGGABLE COSMIC PROPS (PHYSICS-DRAGGABLE WITH MOUSE) */}
          {cosmicProps.map((prop, idx) => (
            <motion.div
              key={idx}
              className="draggable-cosmic-prop"
              drag
              dragConstraints={{ left: -600, right: 600, top: -400, bottom: 400 }}
              dragElastic={0.2}
              whileDrag={{ scale: 1.15, cursor: 'grabbing', zIndex: 60 }}
              whileHover={{ scale: 1.08 }}
              style={{
                x: prop.x,
                y: prop.y,
                transform: `rotateY(${-rotation.y}deg) rotateX(${-rotation.x}deg)`,
              }}
              title="Click and drag me anywhere!"
            >
              <Move size={12} opacity={0.6} /> {prop.label}
            </motion.div>
          ))}
        </div>
      </div>

      {/* 6. BOTTOM HUD FOOTER CONTROLS */}
      <footer className="universe-hud-bottom">
        <div className="universe-instructions-pill">
          <div className="pill-glow-dot" />
          <span>Click & Drag to Orbit 3D Universe • Click Any Realm to Step Inside</span>
        </div>

        <div className="universe-quick-actions">
          {/* Quick Auto-Orbit Toggle */}
          <button
            className="action-orbit-toggle-btn"
            onClick={() => setIsAutoOrbit(!isAutoOrbit)}
            title="Toggle Automatic Stage Orbit"
          >
            <Compass size={16} /> {isAutoOrbit ? 'Pause Orbit' : 'Auto Orbit'}
          </button>

          {/* Resume Eye Modal Launcher */}
          <button
            className="action-resume-eye-btn"
            onClick={onOpenResume}
            title="View Full Verified Resume PDF"
          >
            <Eye size={17} /> Preview Resume
          </button>
        </div>
      </footer>

      {/* 7. 3D THEATRICAL STAGE CHAMBER MODAL (Opened upon clicking any portal) */}
      <AnimatePresence>
        {activePortal && (
          <motion.div
            className="stage-chamber-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivePortal(null)}
          >
            <motion.div
              className="stage-chamber-container"
              initial={{ scale: 0.85, y: 40, rotateX: 12, opacity: 0 }}
              animate={{ scale: 1, y: 0, rotateX: 0, opacity: 1 }}
              exit={{ scale: 0.88, y: 30, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Chamber Header */}
              <div className="chamber-header">
                <div className="chamber-title-wrap">
                  <div className="chamber-badge-icon">
                    {activePortal === 'about' && <Sparkles size={22} />}
                    {activePortal === 'projects' && <Layers size={22} />}
                    {activePortal === 'experience' && <Briefcase size={22} />}
                    {activePortal === 'contact' && <Send size={22} />}
                  </div>
                  <div>
                    <h2 className="chamber-title">
                      {activePortal === 'about' && 'The Spotlight: About Aiswarya'}
                      {activePortal === 'projects' && 'The Choreography: Featured Masterpieces'}
                      {activePortal === 'experience' && 'The Repertoire: Career Chronicles'}
                      {activePortal === 'contact' && 'Curtain Call: Audition & Connect'}
                    </h2>
                    <p className="chamber-subtitle">
                      {activePortal === 'about' && 'Philosophy • Core Tech Stacks • Classical Artistry'}
                      {activePortal === 'projects' && 'Interactive 3D Stage Carousel & Live Applications'}
                      {activePortal === 'experience' && 'Everest Software • Quest Solutions • Education'}
                      {activePortal === 'contact' && 'Direct Message • Professional Socials • Inquiries'}
                    </p>
                  </div>
                </div>

                <div className="chamber-header-actions">
                  <button
                    className="chamber-nav-pill-btn"
                    onClick={handlePrevChamber}
                    title="Previous Realm"
                  >
                    <ChevronLeft size={16} /> Prev Realm
                  </button>
                  <button
                    className="chamber-nav-pill-btn"
                    onClick={handleNextChamber}
                    title="Next Realm"
                  >
                    Next Realm <ChevronRight size={16} />
                  </button>

                  <button
                    className="chamber-close-btn"
                    onClick={() => setActivePortal(null)}
                    title="Back to Dance Universe (Esc)"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Chamber Content Body */}
              <div className="chamber-body">
                {activePortal === 'about' && <About />}
                {activePortal === 'projects' && <Projects />}
                {activePortal === 'experience' && <Experience />}
                {activePortal === 'contact' && <Contact />}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
