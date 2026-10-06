import { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import type { SceneNumber } from './types/journey';
import { soundscape } from './utils/soundscape';
import DanceJourneyCanvas from './components/DanceJourneyCanvas';
import JourneyHUD from './components/journey/JourneyHUD';
import Scene01Welcome from './components/journey/Scene01Welcome';
import Scene02Discover from './components/journey/Scene02Discover';
import Scene03About from './components/journey/Scene03About';
import Scene04Skills from './components/journey/Scene04Skills';
import Scene05Projects from './components/journey/Scene05Projects';
import Scene06Experience from './components/journey/Scene06Experience';
import Scene07Beyond from './components/journey/Scene07Beyond';
import Scene08AIOrb from './components/journey/Scene08AIOrb';
import Scene09Finale from './components/journey/Scene09Finale';
import ResumeModal from './components/ResumeModal';
import './index.css';

export default function App() {
  const [currentScene, setCurrentScene] = useState<SceneNumber>(1);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [danceEffect, setDanceEffect] = useState<string | null>(null);
  const lastScrollTime = useRef<number>(0);

  const handleSelectScene = (scene: SceneNumber) => {
    setCurrentScene(scene);
    soundscape.onSceneChange(scene);
  };

  const handleNextScene = () => {
    if (currentScene < 9) {
      handleSelectScene((currentScene + 1) as SceneNumber);
    }
  };

  const handlePrevScene = () => {
    if (currentScene > 1) {
      handleSelectScene((currentScene - 1) as SceneNumber);
    }
  };

  const handleRestartJourney = () => {
    handleSelectScene(1);
  };

  // Wheel scroll listener for continuous scene journey transitions
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Don't hijack if user is scrolling inside a modal or chat stream
      const target = e.target as HTMLElement;
      if (
        target.closest(
          '.ai-chat-stream, .modal-scroll-body, .portal-card-modal-content, .contact-modal-content'
        )
      ) {
        return;
      }

      const now = Date.now();
      if (now - lastScrollTime.current < 900) return;

      if (e.deltaY > 38) {
        lastScrollTime.current = now;
        handleNextScene();
      } else if (e.deltaY < -38) {
        lastScrollTime.current = now;
        handlePrevScene();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [currentScene]);

  // Touch swipe support on mobile
  useEffect(() => {
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest(
          '.ai-chat-stream, .modal-scroll-body, .portal-card-modal-content, .contact-modal-content'
        )
      ) {
        return;
      }

      const touchEndY = e.changedTouches[0].clientY;
      const diffY = touchStartY - touchEndY;
      const now = Date.now();
      if (now - lastScrollTime.current < 900) return;

      if (diffY > 60) {
        lastScrollTime.current = now;
        handleNextScene();
      } else if (diffY < -60) {
        lastScrollTime.current = now;
        handlePrevScene();
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentScene]);

  const handleTriggerDanceEffect = (skillName: string) => {
    setDanceEffect(skillName);
    soundscape.playChime(4);
    setTimeout(() => setDanceEffect(null), 1500);
  };

  return (
    <div className="dance-journey-app-root">
      {/* 3D WebGL Fullscreen Canvas with Michelle & Theatrical Atmosphere */}
      <DanceJourneyCanvas
        currentScene={currentScene}
        triggerDanceEffect={danceEffect}
      />

      {/* Atmospheric Stage Background Glow Blobs */}
      <div className="journey-bg-ambient blob-ambient-1" />
      <div className="journey-bg-ambient blob-ambient-2" />

      {/* Persistent Continuous Journey HUD */}
      <JourneyHUD
        currentScene={currentScene}
        onSelectScene={handleSelectScene}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* Main Interactive Scene Switcher */}
      <main className="journey-scene-viewport">
        <AnimatePresence mode="wait">
          {currentScene === 1 && (
            <Scene01Welcome key="scene-1" onEnter={() => handleSelectScene(2)} />
          )}
          {currentScene === 2 && (
            <Scene02Discover key="scene-2" onNext={() => handleSelectScene(3)} />
          )}
          {currentScene === 3 && (
            <Scene03About key="scene-3" onNext={() => handleSelectScene(4)} />
          )}
          {currentScene === 4 && (
            <Scene04Skills
              key="scene-4"
              onNext={() => handleSelectScene(5)}
              onTriggerDanceEffect={handleTriggerDanceEffect}
            />
          )}
          {currentScene === 5 && (
            <Scene05Projects key="scene-5" onNext={() => handleSelectScene(6)} />
          )}
          {currentScene === 6 && (
            <Scene06Experience key="scene-6" onNext={() => handleSelectScene(7)} />
          )}
          {currentScene === 7 && (
            <Scene07Beyond key="scene-7" onNext={() => handleSelectScene(8)} />
          )}
          {currentScene === 8 && (
            <Scene08AIOrb key="scene-8" onNext={() => handleSelectScene(9)} />
          )}
          {currentScene === 9 && (
            <Scene09Finale
              key="scene-9"
              onRestart={handleRestartJourney}
              onOpenResume={() => setIsResumeOpen(true)}
            />
          )}
        </AnimatePresence>
      </main>

      {/* Resume Modal */}
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </div>
  );
}
