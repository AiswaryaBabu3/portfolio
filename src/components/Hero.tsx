import { motion, type Variants } from 'framer-motion';
import {
  Sparkles,
  Layers,
  Briefcase,
  Eye,
  Send,
  Download,
  ArrowRight,
  Move
} from 'lucide-react';
import avatarImg from '../assets/profile.jpg';
import './Hero.css';

interface SocialIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

const LinkedinIcon = (props: SocialIconProps) => (
  <svg viewBox="0 0 24 24" width={props.size || 24} height={props.size || 24} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GithubIcon = (props: SocialIconProps) => (
  <svg viewBox="0 0 24 24" width={props.size || 24} height={props.size || 24} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const PhoneIcon = (props: SocialIconProps) => (
  <svg viewBox="0 0 24 24" width={props.size || 24} height={props.size || 24} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const MailIcon = (props: SocialIconProps) => (
  <svg viewBox="0 0 24 24" width={props.size || 24} height={props.size || 24} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

interface HeroProps {
  onOpenResume?: () => void;
}

export default function Hero({ onOpenResume }: HeroProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 90,
        damping: 14,
      },
    },
  };

  const floatVariants1: Variants = {
    animate: {
      y: [0, -8, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut' as const,
      },
    },
  };

  const floatVariants2: Variants = {
    animate: {
      y: [0, 8, 0],
      transition: {
        duration: 4.5,
        repeat: Infinity,
        ease: 'easeInOut' as const,
      },
    },
  };

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero-section">
      <div className="stage-theater-container">
        {/* TOP THEATRICAL HEADLINE */}
        <motion.div
          className="stage-headline-group"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="stage-performer-badge" variants={itemVariants}>
            <span className="stage-badge-pulse"></span>
            <Sparkles size={14} style={{ color: '#fbbf24' }} />
            Choreographing Scalable Architecture • Senior Software Developer & Classical Dancer
          </motion.div>

          <motion.h1 className="stage-main-title text-gradient" variants={itemVariants}>
            Hi, I'm <span className="text-gradient-accent">Aiswarya Babu</span>
          </motion.h1>

          <motion.h2 className="stage-subtitle" variants={itemVariants}>
            Scalable Backends, Distributed Microservices & AI Platforms
          </motion.h2>

          <motion.p className="stage-description" variants={itemVariants}>
            Specialized in architecting high-throughput backend services, multi-tenant SaaS ecosystems, and GenAI-powered applications using Python, FastAPI, TypeScript, React, and Next.js.
          </motion.p>
        </motion.div>

        {/* THE GRAND DANCE STAGE ARENA */}
        <motion.div
          className="grand-dance-stage"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, type: 'spring', stiffness: 60 }}
        >
          {/* 3D Illuminated Stage Floor Podium */}
          <div className="stage-floor-podium-wide">
            <div className="stage-podium-concentric-1"></div>
            <div className="stage-podium-concentric-2"></div>
          </div>

          {/* CENTER DANCER PERFORMER */}
          <div
            className="stage-center-performer"
            onClick={() => handleScrollTo('about')}
            title="Click to explore About Aiswarya"
          >
            <div className="performer-avatar-frame-large">
              <img
                src={avatarImg}
                alt="Aiswarya Babu - Classical Dancer & Software Engineer"
                className="performer-avatar-img"
              />
            </div>
            <div className="stage-performer-caption">
              Aiswarya Babu <Sparkles size={14} color="#ec4899" />
            </div>
          </div>

          {/* ===================================================
              CLICKABLE STAGE PERFORMANCE PORTALS
              =================================================== */}

          {/* 1. The Spotlight (About) */}
          <motion.div
            className="stage-portal-btn portal-pos-about"
            whileHover={{ scale: 1.1, translateY: -4 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleScrollTo('about')}
            title="Step into The Spotlight: About Me & Philosophy"
          >
            <div className="portal-icon-wrap">
              <Sparkles size={16} />
            </div>
            <div className="portal-title-text">
              <span className="portal-name">About Me</span>
              <span className="portal-hint">The Spotlight</span>
            </div>
          </motion.div>

          {/* 2. The Choreography (Projects) */}
          <motion.div
            className="stage-portal-btn portal-pos-projects"
            whileHover={{ scale: 1.1, translateY: -4 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleScrollTo('projects')}
            title="Explore The Choreography: Featured Projects"
          >
            <div className="portal-icon-wrap">
              <Layers size={16} />
            </div>
            <div className="portal-title-text">
              <span className="portal-name">Featured Projects</span>
              <span className="portal-hint">The Choreography</span>
            </div>
          </motion.div>

          {/* 3. The Repertoire (Experience) */}
          <motion.div
            className="stage-portal-btn portal-pos-experience"
            whileHover={{ scale: 1.1, translateY: -4 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleScrollTo('experience')}
            title="View The Repertoire: Career Chronicles"
          >
            <div className="portal-icon-wrap">
              <Briefcase size={16} />
            </div>
            <div className="portal-title-text">
              <span className="portal-name">Experience</span>
              <span className="portal-hint">The Repertoire</span>
            </div>
          </motion.div>

          {/* 4. Backstage Pass (Preview Resume) */}
          <motion.div
            className="stage-portal-btn portal-pos-resume"
            whileHover={{ scale: 1.1, translateY: -4 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenResume}
            title="Backstage Pass: Preview Full Verified Resume"
          >
            <div className="portal-icon-wrap">
              <Eye size={16} />
            </div>
            <div className="portal-title-text">
              <span className="portal-name">Preview Resume</span>
              <span className="portal-hint">Backstage Pass</span>
            </div>
          </motion.div>

          {/* 5. Curtain Call (Contact) */}
          <motion.div
            className="stage-portal-btn portal-pos-contact"
            whileHover={{ scale: 1.1, translateY: -4 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleScrollTo('contact')}
            title="Curtain Call: Audition & Get in Touch"
          >
            <div className="portal-icon-wrap">
              <Send size={16} />
            </div>
            <div className="portal-title-text">
              <span className="portal-name">Contact Me</span>
              <span className="portal-hint">Curtain Call</span>
            </div>
          </motion.div>

          {/* ===================================================
              DRAGGABLE STAGE BADGES (PHYSICS PLAYGROUND)
              =================================================== */}

          <motion.div
            drag
            dragConstraints={{ top: -180, bottom: 180, left: -260, right: 260 }}
            dragElastic={0.2}
            whileDrag={{ scale: 1.18, zIndex: 60, cursor: 'grabbing' }}
            whileHover={{ scale: 1.1, cursor: 'grab' }}
            className="draggable-stage-badge badge-dance"
            variants={floatVariants1}
            animate="animate"
            title="Click & Drag me across the stage!"
          >
            💃 Classical Dance & Art
          </motion.div>

          <motion.div
            drag
            dragConstraints={{ top: -180, bottom: 180, left: -260, right: 260 }}
            dragElastic={0.2}
            whileDrag={{ scale: 1.18, zIndex: 60, cursor: 'grabbing' }}
            whileHover={{ scale: 1.1, cursor: 'grab' }}
            className="draggable-stage-badge badge-ghungroo"
            variants={floatVariants2}
            animate="animate"
            title="Click & Drag me across the stage!"
          >
            🔔 Ghungroo Rhythm & Beats
          </motion.div>

          <motion.div
            drag
            dragConstraints={{ top: -180, bottom: 180, left: -260, right: 260 }}
            dragElastic={0.2}
            whileDrag={{ scale: 1.18, zIndex: 60, cursor: 'grabbing' }}
            whileHover={{ scale: 1.1, cursor: 'grab' }}
            className="draggable-stage-badge badge-python"
            variants={floatVariants1}
            animate="animate"
            title="Click & Drag me across the stage!"
          >
            🐍 Python & FastAPI
          </motion.div>

          <motion.div
            drag
            dragConstraints={{ top: -180, bottom: 180, left: -260, right: 260 }}
            dragElastic={0.2}
            whileDrag={{ scale: 1.18, zIndex: 60, cursor: 'grabbing' }}
            whileHover={{ scale: 1.1, cursor: 'grab' }}
            className="draggable-stage-badge badge-ai"
            variants={floatVariants2}
            animate="animate"
            title="Click & Drag me across the stage!"
          >
            🤖 GenAI & GPT-4o
          </motion.div>

          <motion.div
            drag
            dragConstraints={{ top: -180, bottom: 180, left: -260, right: 260 }}
            dragElastic={0.2}
            whileDrag={{ scale: 1.18, zIndex: 60, cursor: 'grabbing' }}
            whileHover={{ scale: 1.1, cursor: 'grab' }}
            className="draggable-stage-badge badge-react"
            variants={floatVariants1}
            animate="animate"
            title="Click & Drag me across the stage!"
          >
            ⚛️ React 19 & Next.js
          </motion.div>

          <motion.div
            drag
            dragConstraints={{ top: -180, bottom: 180, left: -260, right: 260 }}
            dragElastic={0.2}
            whileDrag={{ scale: 1.18, zIndex: 60, cursor: 'grabbing' }}
            whileHover={{ scale: 1.1, cursor: 'grab' }}
            className="draggable-stage-badge badge-trading"
            variants={floatVariants2}
            animate="animate"
            title="Click & Drag me across the stage!"
          >
            📈 Fyers Trading OMS
          </motion.div>

          {/* STAGE DRAG HINT PILL */}
          <div className="stage-interactive-hint">
            <Move size={12} /> Click stage portals to enter • Drag badges across stage
          </div>
        </motion.div>

        {/* BOTTOM STAGE ACTIONS & SOCIALS */}
        <div className="stage-footlight-actions">
          <div className="stage-btn-row">
            <button
              onClick={() => handleScrollTo('projects')}
              className="btn btn-primary"
            >
              Explore Projects <ArrowRight size={17} />
            </button>

            {onOpenResume && (
              <button
                onClick={onOpenResume}
                className="btn stage-preview-resume-btn"
                title="Preview Verified Resume"
              >
                <Eye size={17} /> Preview Resume
              </button>
            )}

            <a
              href="/Resume_Aiswaryababu.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              download="Resume_Aiswarya_Babu.pdf"
              title="Download Resume PDF"
            >
              <Download size={16} /> Download CV
            </a>

            <button
              onClick={() => handleScrollTo('contact')}
              className="btn btn-secondary"
            >
              Contact Me
            </button>
          </div>

          <div className="hero-socials">
            <a
              href="https://linkedin.com/in/aiswarya-babu-ab49b0278"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="LinkedIn Profile"
              title="LinkedIn: aiswarya-babu-ab49b0278"
            >
              <LinkedinIcon size={20} />
            </a>
            <a
              href="https://github.com/Aiswaryababu3"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="GitHub Profile"
              title="GitHub: Aiswaryababu3"
            >
              <GithubIcon size={20} />
            </a>
            <a
              href="mailto:aiswaryababu544@gmail.com"
              className="social-icon"
              aria-label="Email"
              title="aiswaryababu544@gmail.com"
            >
              <MailIcon size={20} />
            </a>
            <a
              href="tel:+916369632313"
              className="social-icon"
              aria-label="Phone"
              title="+91 6369632313"
            >
              <PhoneIcon size={20} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
