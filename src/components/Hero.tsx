import { motion, type Variants } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import avatarImg from '../assets/profile.jpg';
import ThreeDancerStage from './ThreeDancerStage';
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

export default function Hero(_props: HeroProps = {}) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 22, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 85,
        damping: 15,
      },
    },
  };

  const floatVariants1: Variants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 4.2,
        repeat: Infinity,
        ease: 'easeInOut' as const,
      },
    },
  };

  const floatVariants2: Variants = {
    animate: {
      y: [0, 10, 0],
      transition: {
        duration: 4.8,
        repeat: Infinity,
        ease: 'easeInOut' as const,
      },
    },
  };

  return (
    <section id="home" className="hero-section">
      <div className="stage-theater-container">
        {/* ===================================================
            TOP THEATRICAL HEADLINE GROUP (CLEAN & AIRY)
            =================================================== */}
        <motion.div
          className="stage-headline-group"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="stage-performer-badge" variants={itemVariants}>
            <img src={avatarImg} alt="Aiswarya Babu" className="badge-profile-thumb" />
            <span className="stage-badge-pulse" />
            <Sparkles size={14} style={{ color: '#fbbf24' }} />
            <span>Senior Software Engineer • Classical Dancer</span>
          </motion.div>

          <motion.h1 className="stage-main-title" variants={itemVariants}>
            Hi, I'm <span className="text-gradient-accent stage-name-glint">Aiswarya Babu</span>
          </motion.h1>

          <motion.h2 className="stage-subtitle" variants={itemVariants}>
            Scalable Distributed Backends, Microservices & AI Platforms
          </motion.h2>

          <motion.p className="stage-description" variants={itemVariants}>
            Specialized in architecting high-throughput backend services, multi-tenant SaaS ecosystems, and GenAI-powered applications using Python, FastAPI, TypeScript, React, and Next.js.
          </motion.p>
        </motion.div>

        {/* ===================================================
            THE EXPANSIVE HOLOGRAPHIC ILLUSION STAGE ARENA
            (UNOBSTRUCTED, CINEMATIC & CENTRALLY FOCUSED)
            =================================================== */}
        <motion.div
          className="grand-illusion-stage"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: 'spring', stiffness: 55 }}
        >
          {/* 3D Illuminated Stage Floor Podium */}
          <div className="stage-floor-podium-wide">
            <div className="stage-podium-concentric-1" />
            <div className="stage-podium-concentric-2" />
            <div className="stage-podium-laser-grid" />
          </div>

          {/* 3D LIVE DANCING PERSON (THREE.JS with Volumetric Hologram & Slim HUD) */}
          <ThreeDancerStage />

          {/* ===================================================
              ORBITAL HOLOGRAPHIC SKILL CAPSULES (NON-OBSTRUCTIVE)
              =================================================== */}
          <motion.div
            drag
            dragConstraints={{ top: -140, bottom: 140, left: -220, right: 220 }}
            dragElastic={0.25}
            whileDrag={{ scale: 1.15, zIndex: 50, cursor: 'grabbing' }}
            whileHover={{ scale: 1.08, cursor: 'grab' }}
            className="holo-orbit-badge badge-orbit-top-left"
            variants={floatVariants1}
            animate="animate"
            title="Python & FastAPI Microservices"
          >
            <span className="badge-icon">🐍</span>
            <span className="badge-text">Python & FastAPI</span>
          </motion.div>

          <motion.div
            drag
            dragConstraints={{ top: -140, bottom: 140, left: -220, right: 220 }}
            dragElastic={0.25}
            whileDrag={{ scale: 1.15, zIndex: 50, cursor: 'grabbing' }}
            whileHover={{ scale: 1.08, cursor: 'grab' }}
            className="holo-orbit-badge badge-orbit-top-right"
            variants={floatVariants2}
            animate="animate"
            title="GenAI & LLM Orchestration"
          >
            <span className="badge-icon">🤖</span>
            <span className="badge-text">GenAI & GPT-4o</span>
          </motion.div>

          <motion.div
            drag
            dragConstraints={{ top: -140, bottom: 140, left: -220, right: 220 }}
            dragElastic={0.25}
            whileDrag={{ scale: 1.15, zIndex: 50, cursor: 'grabbing' }}
            whileHover={{ scale: 1.08, cursor: 'grab' }}
            className="holo-orbit-badge badge-orbit-mid-left"
            variants={floatVariants2}
            animate="animate"
            title="Fyers Trading OMS Engine"
          >
            <span className="badge-icon">📈</span>
            <span className="badge-text">Trading OMS</span>
          </motion.div>

          <motion.div
            drag
            dragConstraints={{ top: -140, bottom: 140, left: -220, right: 220 }}
            dragElastic={0.25}
            whileDrag={{ scale: 1.15, zIndex: 50, cursor: 'grabbing' }}
            whileHover={{ scale: 1.08, cursor: 'grab' }}
            className="holo-orbit-badge badge-orbit-mid-right"
            variants={floatVariants1}
            animate="animate"
            title="React 19 & Next.js"
          >
            <span className="badge-icon">⚛️</span>
            <span className="badge-text">React 19 & Next.js</span>
          </motion.div>

          <motion.div
            drag
            dragConstraints={{ top: -140, bottom: 140, left: -220, right: 220 }}
            dragElastic={0.25}
            whileDrag={{ scale: 1.15, zIndex: 50, cursor: 'grabbing' }}
            whileHover={{ scale: 1.08, cursor: 'grab' }}
            className="holo-orbit-badge badge-orbit-bottom"
            variants={floatVariants2}
            animate="animate"
            title="Classical Dance & Rhythmic Precision"
          >
            <span className="badge-icon">💃</span>
            <span className="badge-text">Classical Dance & Art</span>
          </motion.div>
        </motion.div>

        {/* ===================================================
            ELEGANT SOCIAL CONNECT FOOTLIGHTS
            =================================================== */}
        <div className="stage-footlight-actions">
          <div className="hero-socials">
            <a
              href="https://linkedin.com/in/aiswarya-babu-ab49b0278"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="LinkedIn Profile"
              title="LinkedIn: aiswarya-babu-ab49b0278"
            >
              <LinkedinIcon size={19} />
            </a>
            <a
              href="https://github.com/Aiswaryababu3"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="GitHub Profile"
              title="GitHub: Aiswaryababu3"
            >
              <GithubIcon size={19} />
            </a>
            <a
              href="mailto:aiswaryababu544@gmail.com"
              className="social-icon"
              aria-label="Email"
              title="aiswaryababu544@gmail.com"
            >
              <MailIcon size={19} />
            </a>
            <a
              href="tel:+916369632313"
              className="social-icon"
              aria-label="Phone"
              title="+91 6369632313"
            >
              <PhoneIcon size={19} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
