import { ArrowUp, Mail, Phone, Eye } from 'lucide-react';
import './Footer.css';

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

interface FooterProps {
  onOpenResume?: () => void;
}

export default function Footer({ onOpenResume }: FooterProps) {
  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer-container">
      <div className="container footer-content">
        <div className="footer-brand">
          <span className="footer-logo">Aiswarya Babu<span className="logo-dot">.</span></span>
          <p className="footer-tagline">
            Senior Software Developer • Backend Architecture, Distributed Microservices & AI Platforms
          </p>
        </div>

        <div className="footer-links-group">
          <button onClick={() => handleScrollTo('home')} className="footer-link">Home</button>
          <button onClick={() => handleScrollTo('about')} className="footer-link">About</button>
          <button onClick={() => handleScrollTo('projects')} className="footer-link">Projects</button>
          <button onClick={() => handleScrollTo('experience')} className="footer-link">Journey</button>
          <button onClick={() => handleScrollTo('contact')} className="footer-link">Contact</button>
          
          {onOpenResume ? (
            <button onClick={onOpenResume} className="footer-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <Eye size={14} /> Resume
            </button>
          ) : (
            <a href="/Resume_Aiswaryababu.pdf" target="_blank" rel="noopener noreferrer" className="footer-link" download="Resume_Aiswarya_Babu.pdf">
              Resume
            </a>
          )}
        </div>

        <div className="footer-social-strip">
          <a href="https://linkedin.com/in/aiswarya-babu-ab49b0278" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <LinkedinIcon size={18} />
          </a>
          <a href="https://github.com/Aiswaryababu3" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <GithubIcon size={18} />
          </a>
          <a href="mailto:aiswaryababu544@gmail.com" aria-label="Email">
            <Mail size={18} />
          </a>
          <a href="tel:+916369632313" aria-label="Phone">
            <Phone size={18} />
          </a>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">© {new Date().getFullYear()} Aiswarya Babu. All rights reserved. • Coimbatore, Tamil Nadu</p>
          <button
            onClick={handleScrollTop}
            className="scroll-top-btn glass-panel"
            aria-label="Scroll to top"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
