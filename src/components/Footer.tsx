import { ArrowUp } from 'lucide-react';
import './Footer.css';

export default function Footer() {
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
          <span className="footer-logo">Aishu<span className="logo-dot">.</span></span>
          <p className="footer-tagline">Building clean user interfaces & modern web systems.</p>
        </div>

        <div className="footer-links-group">
          <button onClick={() => handleScrollTo('home')} className="footer-link">Home</button>
          <button onClick={() => handleScrollTo('about')} className="footer-link">About</button>
          <button onClick={() => handleScrollTo('projects')} className="footer-link">Projects</button>
          <button onClick={() => handleScrollTo('experience')} className="footer-link">Experience</button>
          <button onClick={() => handleScrollTo('contact')} className="footer-link">Contact</button>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">© {new Date().getFullYear()} Aiswarya Babu. All rights reserved.</p>
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
