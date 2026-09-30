import { motion, type Variants } from 'framer-motion';
import { ArrowRight, Mail, Download, Eye } from 'lucide-react';
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

interface HeroProps {
  onOpenResume?: () => void;
}

export default function Hero({ onOpenResume }: HeroProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const floatVariants1: Variants = {
    animate: {
      y: [0, -12, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut' as const,
      },
    },
  };

  const floatVariants2: Variants = {
    animate: {
      y: [0, 12, 0],
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
    <section id="home" className="hero-section section">
      <div className="bg-blob blob-1"></div>
      <div className="bg-blob blob-2"></div>

      <div className="container hero-container">
        <motion.div
          className="hero-text"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="hero-badge glass-panel" variants={itemVariants}>
            <span className="badge-pulse"></span>
            Senior Software Developer • 2+ Years Experience
          </motion.div>

          <motion.h1 className="hero-title" variants={itemVariants}>
            Hi, I'm <span className="text-gradient-accent">Aiswarya Babu</span>
          </motion.h1>

          <motion.h2 className="hero-subtitle text-gradient" variants={itemVariants}>
            Scalable Backends, Distributed Microservices & AI Platforms
          </motion.h2>

          <motion.p className="hero-description" variants={itemVariants}>
            Specialized in architecting high-throughput backend services, multi-tenant SaaS ecosystems, and GenAI-powered applications using Python, FastAPI, TypeScript, React, and Next.js. Experienced in quantitative trading infrastructure, real-time WebSockets, exam proctoring, and Stripe payment systems.
          </motion.p>

          <motion.div className="hero-actions" variants={itemVariants}>
            <button onClick={() => handleScrollTo('projects')} className="btn btn-primary">
              Explore Projects <ArrowRight size={18} />
            </button>
            
            {onOpenResume && (
              <button
                onClick={onOpenResume}
                className="btn btn-secondary resume-preview-btn"
                title="Preview Resume in Modal"
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

            <button onClick={() => handleScrollTo('contact')} className="btn btn-secondary">
              Contact Me
            </button>
          </motion.div>

          <motion.div className="hero-socials" variants={itemVariants}>
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
              <Mail size={20} />
            </a>
            <a
              href="tel:+916369632313"
              className="social-icon"
              aria-label="Phone"
              title="+91 6369632313"
            >
              <PhoneIcon size={20} />
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: 'spring', stiffness: 50 }}
        >
          <div className="avatar-wrapper">
            <div className="avatar-glow"></div>
            <div className="avatar-ring"></div>
            <img src={avatarImg} alt="Aiswarya Babu" className="avatar-img" />

            {/* Orbiting Tech Badges */}
            <motion.div className="floating-tech tech-react glass-panel" variants={floatVariants1} animate="animate">
              🐍 Python & FastAPI
            </motion.div>
            <motion.div className="floating-tech tech-ts glass-panel" variants={floatVariants2} animate="animate">
              🤖 GenAI & LLMs (GPT-4o)
            </motion.div>
            <motion.div className="floating-tech tech-node glass-panel" variants={floatVariants1} animate="animate">
              ⚡ Redis & WebSockets
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
