import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, ExternalLink, Eye, FileText } from 'lucide-react';
import './ResumeModal.css';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="resume-modal-overlay" onClick={onClose}>
          <motion.div
            className="resume-modal-dialog glass-panel"
            initial={{ opacity: 0, scale: 0.92, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 25 }}
            transition={{ duration: 0.3, type: 'spring', damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="resume-modal-header">
              <div className="resume-header-title">
                <span className="resume-eye-pill">
                  <Eye size={16} />
                  <span>Resume Preview</span>
                </span>
                <h3 className="resume-person-name">Aiswarya Babu — Senior Software Developer</h3>
              </div>

              <div className="resume-header-actions">
                <a
                  href="/Resume_Aiswaryababu.pdf"
                  download="Resume_Aiswarya_Babu.pdf"
                  className="resume-btn resume-btn-download"
                  title="Download Resume PDF"
                >
                  <Download size={15} />
                  <span className="btn-label-desktop">Download</span>
                </a>

                <a
                  href="/Resume_Aiswaryababu.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="resume-btn resume-btn-external"
                  title="Open in New Tab"
                >
                  <ExternalLink size={15} />
                  <span className="btn-label-desktop">Full Tab</span>
                </a>

                <button
                  onClick={onClose}
                  className="resume-modal-close"
                  aria-label="Close resume preview"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Document Viewer Body */}
            <div className="resume-modal-body">
              <iframe
                src="/Resume_Aiswaryababu.pdf#view=FitH"
                title="Aiswarya Babu Resume PDF"
                className="resume-pdf-frame"
              />

              {/* Mobile / Fallback notice */}
              <div className="resume-mobile-fallback">
                <p>
                  <FileText size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} />
                  Viewing on a mobile device or browser without PDF preview?
                </p>
                <div style={{ marginTop: '8px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
                  <a
                    href="/Resume_Aiswaryababu.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                    style={{ padding: '8px 18px', fontSize: '13px' }}
                  >
                    Open PDF Directly <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
