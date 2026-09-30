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
import TheatricalCurtains from './components/TheatricalCurtains';

export default function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const handleOpenResume = () => setIsResumeOpen(true);
  const handleCloseResume = () => setIsResumeOpen(false);

  return (
    <div className="app-wrapper">
      {/* Authentic Theatrical Stage Curtains & Pelmet */}
      <TheatricalCurtains />

      {/* Theatrical Overhead Spotlights & Stage Footlights */}
      <StageLighting />

      {/* Atmospheric Stage Glow Blobs & Floating Dance Particles */}
      <div className="bg-blob blob-1"></div>
      <div className="bg-blob blob-2"></div>
      <div className="bg-blob blob-3"></div>
      <div className="dance-ribbon" style={{ top: '22%' }}></div>
      <div className="dance-ribbon" style={{ top: '65%', animationDelay: '-4s' }}></div>
      <DanceParticles />

      {/* Navigation Menu */}
      <Navbar onOpenResume={handleOpenResume} />

      {/* Main Contents in Proper Order */}
      <main>
        {/* ACT 1: The Grand Dance Stage & Draggable Badges */}
        <Hero onOpenResume={handleOpenResume} />

        {/* ACT 2: The Rhythm & Philosophy of Code (About Me) */}
        <About />

        {/* ACT 3: The Stage Repertoire (Interactive 3D Drag Projects Carousel) */}
        <Projects />

        {/* ACT 4: Career Milestones & Acts (Experience) */}
        <Experience />

        {/* ACT 5: Curtain Call (Contact & Connect) */}
        <Contact />
      </main>

      {/* Footer / Encore Credits */}
      <Footer onOpenResume={handleOpenResume} />

      {/* Resume Preview Modal with Eye Icon */}
      <ResumeModal isOpen={isResumeOpen} onClose={handleCloseResume} />
    </div>
  );
}
