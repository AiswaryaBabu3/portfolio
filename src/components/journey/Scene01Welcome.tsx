import { motion } from 'framer-motion';
import { Sparkles, ArrowDown } from 'lucide-react';
import './scenes.css';

interface Scene01Props {
  onEnter: () => void;
}

export default function Scene01Welcome({ onEnter }: Scene01Props) {
  return (
    <div className="journey-scene-container scene-welcome">
      <motion.div
        className="welcome-center-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -40 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="welcome-stage-tag"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <span className="welcome-pulse-dot" />
          <Sparkles size={13} style={{ color: '#fbbf24' }} />
          <span>AN INTERACTIVE CHOREOGRAPHY</span>
        </motion.div>

        <motion.h1
          className="welcome-hero-name"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.8 }}
        >
          AISHWARYA BABU
        </motion.h1>

        <motion.h2
          className="welcome-hero-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Senior Software Developer
        </motion.h2>

        <motion.p
          className="welcome-hero-quote"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65, duration: 0.8 }}
        >
          "My career is a dance. Every line of code is a step; every architecture, a performance."
        </motion.p>

        <motion.p
          className="welcome-invite-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          Welcome to my world.
        </motion.p>

        <motion.button
          className="welcome-enter-btn"
          onClick={onEnter}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          transition={{ delay: 0.95, duration: 0.5 }}
        >
          <span>PRESS / SCROLL TO ENTER</span>
          <ArrowDown size={15} className="enter-btn-arrow" />
        </motion.button>
      </motion.div>
    </div>
  );
}
