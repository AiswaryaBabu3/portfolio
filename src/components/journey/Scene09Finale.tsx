import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Mail, Download, Phone, RotateCcw, Send, CheckCircle2, X } from 'lucide-react';
import './scenes.css';

const LinkedinIcon = ({ size = 18 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GithubIcon = ({ size = 18 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

interface Scene09Props {
  onRestart: () => void;
  onOpenResume?: () => void;
}

export default function Scene09Finale({ onRestart, onOpenResume }: Scene09Props) {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setIsContactOpen(false);
      setFormData({ name: '', email: '', message: '' });
    }, 2400);
  };

  return (
    <div className="journey-scene-container scene-finale">
      {/* Top Scene Marker */}
      <div className="scene-top-headline">
        <span className="scene-eyebrow gold-eyebrow">
          <Sparkles size={12} style={{ color: '#fbbf24' }} /> SCENE 09 • CURTAIN CALL & FINALE
        </span>
      </div>

      {/* Grand Finale Theatrical Card */}
      <motion.div
        className="finale-stage-manifesto-card"
        initial={{ opacity: 0, scale: 0.92, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="finale-quotes-block">
          <p className="finale-poetic-line line-1">"Every line of code is a step."</p>
          <p className="finale-poetic-line line-2">"Every project is a performance."</p>
          <p className="finale-poetic-line line-3">"Every problem is a new rhythm."</p>
        </div>

        <div className="finale-divider-glow" />

        <h2 className="finale-call-heading">LET'S CREATE SOMETHING.</h2>
        <p className="finale-call-sub">
          Open for architectural opportunities, senior engineering roles, and high-impact distributed collaborations.
        </p>

        {/* Action Buttons */}
        <div className="finale-action-buttons-row">
          <button
            className="finale-btn btn-contact-glow"
            onClick={() => setIsContactOpen(true)}
          >
            <Mail size={16} />
            <span>CONTACT ME</span>
          </button>

          {onOpenResume ? (
            <button className="finale-btn btn-resume-glass" onClick={onOpenResume}>
              <Download size={16} />
              <span>PREVIEW & DOWNLOAD RESUME</span>
            </button>
          ) : (
            <a
              href="/Resume_Aiswaryababu.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download="Resume_Aiswarya_Babu.pdf"
              className="finale-btn btn-resume-glass"
            >
              <Download size={16} />
              <span>DOWNLOAD RESUME</span>
            </a>
          )}
        </div>

        {/* Social Connect Links */}
        <div className="finale-social-strip">
          <a
            href="https://linkedin.com/in/aiswarya-babu-ab49b0278"
            target="_blank"
            rel="noopener noreferrer"
            className="finale-social-link"
            title="LinkedIn Profile"
          >
            <LinkedinIcon size={18} />
            <span>LinkedIn</span>
          </a>

          <a
            href="https://github.com/Aiswaryababu3"
            target="_blank"
            rel="noopener noreferrer"
            className="finale-social-link"
            title="GitHub Profile"
          >
            <GithubIcon size={18} />
            <span>GitHub</span>
          </a>

          <a
            href="mailto:aiswaryababu544@gmail.com"
            className="finale-social-link"
            title="Direct Email"
          >
            <Mail size={18} />
            <span>Email</span>
          </a>

          <a
            href="tel:+916369632313"
            className="finale-social-link"
            title="Direct Phone"
          >
            <Phone size={18} />
            <span>Phone</span>
          </a>
        </div>

        <button className="finale-restart-btn" onClick={onRestart}>
          <RotateCcw size={14} /> Replay Dance Journey (Scene 01)
        </button>
      </motion.div>

      {/* Direct Contact Modal */}
      <AnimatePresence>
        {isContactOpen && (
          <motion.div
            className="contact-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsContactOpen(false)}
          >
            <motion.div
              className="contact-modal-content"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              <button
                className="modal-close-btn"
                onClick={() => setIsContactOpen(false)}
                aria-label="Close"
              >
                <X size={18} />
              </button>

              <div className="contact-modal-header">
                <span className="contact-eyebrow">
                  <Sparkles size={13} style={{ color: '#fbbf24' }} /> CURTAIN CALL
                </span>
                <h3 className="contact-heading">Send a Message to Aishwarya</h3>
                <p className="contact-sub">
                  Direct message dispatch or reach out via aiswaryababu544@gmail.com
                </p>
              </div>

              {formSubmitted ? (
                <div className="contact-success-state">
                  <CheckCircle2 size={42} style={{ color: '#10b981' }} />
                  <h4>Message Dispatched Gracefully</h4>
                  <p>Thank you. Aishwarya will respond promptly to your invitation.</p>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleContactSubmit}>
                  <div className="form-field">
                    <label>Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe / Tech Recruiter"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="form-field">
                    <label>Your Email</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. contact@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="form-field">
                    <label>Message / Project Scope</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Let's build scalable architecture together..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <button type="submit" className="form-submit-btn">
                    <Send size={15} /> Send Message
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
