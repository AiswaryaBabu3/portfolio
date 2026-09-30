import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import DanceParticles from './components/DanceParticles';
import ResumeModal from './components/ResumeModal';
import StageLighting from './components/StageLighting';

export default function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const handleOpenResume = () => setIsResumeOpen(true);
  const handleCloseResume = () => setIsResumeOpen(false);

  return (
    <div className="app-wrapper">
      {/* Theatrical Stage Spotlights & Footlights */}
      <StageLighting />

      {/* Dynamic Background Blobs & Floating Dance Particles */}
      <div className="bg-blob blob-1"></div>
      <div className="bg-blob blob-2"></div>
      <div className="bg-blob blob-3"></div>
      <div className="dance-ribbon" style={{ top: '22%' }}></div>
      <div className="dance-ribbon" style={{ top: '65%', animationDelay: '-4s' }}></div>
      <DanceParticles />

      {/* Navigation Menu */}
      <Navbar onOpenResume={handleOpenResume} />

      {/* Main Contents */}
      <main>
        <Hero onOpenResume={handleOpenResume} />
        <About />
        <Projects />
        <Experience />
        <Contact />
      </main>

      {/* Footer Details */}
      <Footer onOpenResume={handleOpenResume} />

      {/* Resume Preview Modal */}
      <ResumeModal isOpen={isResumeOpen} onClose={handleCloseResume} />
    </div>
  );
}
