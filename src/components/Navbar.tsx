import { useState, useEffect } from 'react';
import { Menu, X, Home, User, Code, Briefcase, Mail } from 'lucide-react';
import './Navbar.css';

interface NavItem {
  label: string;
  id: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { label: 'Home', id: 'home', icon: <Home size={18} /> },
  { label: 'About', id: 'about', icon: <User size={18} /> },
  { label: 'Projects', id: 'projects', icon: <Code size={18} /> },
  { label: 'Experience', id: 'experience', icon: <Briefcase size={18} /> },
  { label: 'Contact', id: 'contact', icon: <Mail size={18} /> },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Simple active section detection
      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`navbar-container ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-content glass-panel">
        <a href="#home" className="navbar-logo" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>
          Aishu<span className="logo-dot">.</span>
        </a>

        {/* Desktop Menu */}
        <div className="navbar-links">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
            >
              {item.label}
            </button>
          ))}
          <a
            href="/Resume_Aiswaryababu.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link resume-nav-btn"
            download="Resume_Aiswarya_Babu.pdf"
          >
            Resume
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="navbar-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <div className={`mobile-menu glass-panel ${isOpen ? 'open' : ''}`}>
        <div className="mobile-menu-links">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`mobile-nav-link ${activeSection === item.id ? 'active' : ''}`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
          <a
            href="/Resume_Aiswaryababu.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-nav-link resume-nav-btn"
            download="Resume_Aiswarya_Babu.pdf"
            onClick={() => setIsOpen(false)}
          >
            <span>📄 Download Resume</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
