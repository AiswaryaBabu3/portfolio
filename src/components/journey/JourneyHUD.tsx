import { useState, useEffect } from 'react';
import { Volume2, VolumeX, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { SCENES } from '../../types/journey';
import type { SceneNumber } from '../../types/journey';
import { soundscape } from '../../utils/soundscape';
import './scenes.css';

interface JourneyHUDProps {
  currentScene: SceneNumber;
  onSelectScene: (scene: SceneNumber) => void;
  onOpenResume?: () => void;
}

export default function JourneyHUD({
  currentScene,
  onSelectScene,
  onOpenResume,
}: JourneyHUDProps) {
  const [isAudioActive, setIsAudioActive] = useState(false);

  const handleToggleAudio = () => {
    const active = soundscape.toggle();
    setIsAudioActive(active);
  };

  const handlePrev = () => {
    if (currentScene > 1) {
      onSelectScene((currentScene - 1) as SceneNumber);
    }
  };

  const handleNext = () => {
    if (currentScene < 9) {
      onSelectScene((currentScene + 1) as SceneNumber);
    }
  };

  // Keyboard navigation (Arrow keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['input', 'textarea'].includes((e.target as HTMLElement).tagName.toLowerCase())) {
        return;
      }
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === 'PageDown') {
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'PageUp') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentScene]);

  const activeMeta = SCENES.find((s) => s.number === currentScene) || SCENES[0];

  return (
    <aside className="journey-hud-overlay" aria-label="Journey Director Controls">
      {/* Top Header Bar */}
      <header className="hud-top-bar">
        <div className="hud-brand-block">
          <span className="hud-brand-name">AISHWARYA BABU</span>
          <span className="hud-brand-divider">/</span>
          <span className="hud-brand-tagline">MY CAREER IS A DANCE</span>
        </div>

        <div className="hud-top-actions">
          {/* Audio Synthesizer Toggle */}
          <button
            className={`hud-audio-btn ${isAudioActive ? 'audio-active' : ''}`}
            onClick={handleToggleAudio}
            title={isAudioActive ? 'Mute Atmospheric Soundscape' : 'Enable Atmospheric Soundscape'}
          >
            {isAudioActive ? <Volume2 size={16} /> : <VolumeX size={16} />}
            <span className="audio-label">{isAudioActive ? 'Sound On' : 'Sound Off'}</span>
            {isAudioActive && (
              <span className="hud-sound-wave">
                <span className="sw-bar bar-1" />
                <span className="sw-bar bar-2" />
                <span className="sw-bar bar-3" />
              </span>
            )}
          </button>

          {/* Resume Pass */}
          {onOpenResume && (
            <button
              className="hud-resume-btn"
              onClick={onOpenResume}
              title="Preview Verified Resume"
            >
              <Download size={14} />
              <span>Resume</span>
            </button>
          )}
        </div>
      </header>

      {/* Side Quick Navigation Arrows */}
      <div className="hud-side-navs">
        <button
          className={`hud-nav-arrow-btn nav-prev ${currentScene === 1 ? 'disabled' : ''}`}
          onClick={handlePrev}
          disabled={currentScene === 1}
          aria-label="Previous Scene"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          className={`hud-nav-arrow-btn nav-next ${currentScene === 9 ? 'disabled' : ''}`}
          onClick={handleNext}
          disabled={currentScene === 9}
          aria-label="Next Scene"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Bottom Timeline Scrub Rail */}
      <nav className="hud-bottom-scrub-bar" aria-label="Scene Timeline Scrub">
        <div className="hud-active-scene-title">
          <span className="hud-scene-index">0{currentScene}</span>
          <span className="hud-scene-name">{activeMeta.name}</span>
          <span className="hud-scene-sub">• {activeMeta.subtitle}</span>
        </div>

        <div className="hud-timeline-track-rail">
          {SCENES.map((scene) => {
            const isActive = scene.number === currentScene;
            const isPassed = scene.number < currentScene;

            return (
              <button
                key={scene.number}
                className={`hud-timeline-node ${isActive ? 'node-active' : ''} ${isPassed ? 'node-passed' : ''}`}
                onClick={() => onSelectScene(scene.number)}
                title={`Scene 0${scene.number}: ${scene.name}`}
              >
                <span className="node-dot" />
                <span className="node-hover-label">0{scene.number} {scene.name}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}
