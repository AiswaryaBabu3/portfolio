import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {
  Play,
  Pause,
  RotateCw,
  Move3d,
  Sparkles,
  Camera,
  SunMedium
} from 'lucide-react';
import './ThreeDancerStage.css';

interface ThreeDancerStageProps {
  onStageClick?: () => void;
}

type LightTheme = 'diva' | 'gold' | 'cyber';

export default function ThreeDancerStage({ onStageClick }: ThreeDancerStageProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [danceSpeed, setDanceSpeed] = useState<number>(1.0);
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const [lightTheme, setLightTheme] = useState<LightTheme>('diva');

  // References for animation & scene manipulation outside effect
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const actionRef = useRef<THREE.AnimationAction | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const spotLightLeftRef = useRef<THREE.SpotLight | null>(null);
  const spotLightRightRef = useRef<THREE.SpotLight | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 1.35, 3.6);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // 2. OrbitControls (Click & Drag to rotate 3D camera around dancer)
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enablePan = false;
    controls.minDistance = 2.0;
    controls.maxDistance = 5.0;
    controls.minPolarAngle = Math.PI / 4;
    controls.maxPolarAngle = Math.PI / 2 - 0.05; // Do not go beneath stage floor
    controls.target.set(0, 0.95, 0); // Focus on dancer's torso
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.2;
    controlsRef.current = controls;

    // 3. Theatrical Stage Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    // Overhead Left Spotlight (Magenta by default)
    const spotLightLeft = new THREE.SpotLight(0xec4899, 4.5);
    spotLightLeft.position.set(-2.5, 4.5, 2.5);
    spotLightLeft.angle = Math.PI / 5;
    spotLightLeft.penumbra = 0.8;
    spotLightLeft.castShadow = true;
    spotLightLeft.target.position.set(0, 0.8, 0);
    scene.add(spotLightLeft);
    scene.add(spotLightLeft.target);
    spotLightLeftRef.current = spotLightLeft;

    // Overhead Right Spotlight (Gold by default)
    const spotLightRight = new THREE.SpotLight(0xfbbf24, 4.0);
    spotLightRight.position.set(2.5, 4.5, 2.5);
    spotLightRight.angle = Math.PI / 5;
    spotLightRight.penumbra = 0.8;
    spotLightRight.castShadow = true;
    spotLightRight.target.position.set(0, 0.8, 0);
    scene.add(spotLightRight);
    scene.add(spotLightRight.target);
    spotLightRightRef.current = spotLightRight;

    // Rim/Back Spotlight for halo silhouette
    const backRimLight = new THREE.DirectionalLight(0xd946ef, 2.2);
    backRimLight.position.set(0, 2.5, -3);
    scene.add(backRimLight);

    // 4. Circular 3D Stage Floor Podium & Concentric Glow Rings
    const stageFloorGeo = new THREE.CylinderGeometry(1.6, 1.68, 0.08, 64);
    const stageFloorMat = new THREE.MeshStandardMaterial({
      color: 0x14081c,
      roughness: 0.25,
      metalness: 0.65,
    });
    const stageFloorMesh = new THREE.Mesh(stageFloorGeo, stageFloorMat);
    stageFloorMesh.position.y = -0.04;
    stageFloorMesh.receiveShadow = true;
    scene.add(stageFloorMesh);

    // Outer Glowing Golden Dance Ring
    const ringGeo1 = new THREE.RingGeometry(1.48, 1.55, 64);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0xfbbf24,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.75,
    });
    const ringMesh1 = new THREE.Mesh(ringGeo1, ringMat1);
    ringMesh1.rotation.x = Math.PI / 2;
    ringMesh1.position.y = 0.005;
    scene.add(ringMesh1);

    // Inner Glowing Magenta Ring
    const ringGeo2 = new THREE.RingGeometry(1.15, 1.2, 64);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0xec4899,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.65,
    });
    const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
    ringMesh2.rotation.x = Math.PI / 2;
    ringMesh2.position.y = 0.006;
    scene.add(ringMesh2);

    // 5. Load 3D Dancer Model (Michelle.glb)
    const loader = new GLTFLoader();
    let mixer: THREE.AnimationMixer | null = null;

    loader.load(
      '/models/Michelle.glb',
      (gltf) => {
        const model = gltf.scene;
        model.scale.setScalar(1.08);
        model.position.set(0, 0, 0);

        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        scene.add(model);

        // Setup Dance Animation
        if (gltf.animations && gltf.animations.length > 0) {
          mixer = new THREE.AnimationMixer(model);
          mixerRef.current = mixer;

          // Play the main dance animation
          const danceClip = gltf.animations[0];
          const action = mixer.clipAction(danceClip);
          action.setEffectiveTimeScale(1.0);
          action.play();
          actionRef.current = action;
        }

        setIsLoading(false);
      },
      undefined,
      (error) => {
        console.error('Error loading 3D dancer model:', error);
        setIsLoading(false);
      }
    );

    // 6. Animation Render Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Update animation mixer
      if (mixer) {
        mixer.update(delta);
      }

      // Rotate decorative stage rings
      ringMesh1.rotation.z += delta * 0.25;
      ringMesh2.rotation.z -= delta * 0.35;

      // Update orbit controls
      controls.update();

      renderer.render(scene, camera);
    };

    animate();

    // 7. Resize handling
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      stageFloorGeo.dispose();
      stageFloorMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
    };
  }, []);

  // Update dance speed
  const handleSetSpeed = (speed: number) => {
    setDanceSpeed(speed);
    if (actionRef.current) {
      actionRef.current.setEffectiveTimeScale(speed);
    }
  };

  // Toggle play/pause
  const handleTogglePlay = () => {
    if (!actionRef.current) return;
    if (isPlaying) {
      actionRef.current.paused = true;
      setIsPlaying(false);
    } else {
      actionRef.current.paused = false;
      setIsPlaying(true);
    }
  };

  // Toggle Auto-Rotate Camera
  const handleToggleAutoRotate = () => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = !isAutoRotate;
      setIsAutoRotate(!isAutoRotate);
    }
  };

  // Reset Camera View to Front
  const handleResetCamera = () => {
    if (cameraRef.current && controlsRef.current) {
      cameraRef.current.position.set(0, 1.35, 3.6);
      controlsRef.current.target.set(0, 0.95, 0);
      controlsRef.current.update();
    }
  };

  // Cycle Stage Spotlight Mood
  const handleCycleLighting = () => {
    const nextTheme: LightTheme =
      lightTheme === 'diva' ? 'gold' : lightTheme === 'gold' ? 'cyber' : 'diva';
    setLightTheme(nextTheme);

    if (spotLightLeftRef.current && spotLightRightRef.current) {
      if (nextTheme === 'gold') {
        spotLightLeftRef.current.color.setHex(0xf59e0b);
        spotLightRightRef.current.color.setHex(0xfbbf24);
      } else if (nextTheme === 'cyber') {
        spotLightLeftRef.current.color.setHex(0x38bdf8);
        spotLightRightRef.current.color.setHex(0xa855f7);
      } else {
        spotLightLeftRef.current.color.setHex(0xec4899);
        spotLightRightRef.current.color.setHex(0xfbbf24);
      }
    }
  };

  return (
    <div className="three-dancer-stage-container" onClick={onStageClick}>
      {/* 3D WebGL Canvas Container */}
      <div ref={mountRef} className="three-dancer-canvas" />

      {/* Loading Overlay */}
      {isLoading && (
        <div className="dancer-loading-overlay">
          <div className="dancer-spinner" />
          <div className="dancer-loading-text">Preparing 3D Dance Stage...</div>
        </div>
      )}

      {/* ===================================================
          LEFT-SIDE THEATRICAL STAGE DOCK (REACT / MAC DOCK)
          =================================================== */}
      {!isLoading && (
        <div
          className="theatrical-stage-dock"
          onClick={(e) => e.stopPropagation()}
          title="Theatrical Stage Director Dock"
        >
          {/* Dock Header Icon */}
          <div className="dock-header-icon" title="Stage Director">
            <Sparkles size={16} />
          </div>

          <div className="dock-divider-horizontal" />

          {/* 1. Play / Pause Button */}
          <button
            className={`dock-item-btn ${isPlaying ? 'active' : ''}`}
            onClick={handleTogglePlay}
            aria-label={isPlaying ? 'Pause Dance' : 'Play Dance'}
          >
            {isPlaying ? <Pause size={17} /> : <Play size={17} />}
            <span className="dock-tooltip">
              {isPlaying ? 'Pause Dance' : 'Play Dance'}
            </span>
          </button>

          <div className="dock-divider-horizontal" />

          {/* 2. Dance Tempo Speeds (0.75x, 1.0x, 1.25x) */}
          <button
            className={`dock-item-btn ${danceSpeed === 0.75 ? 'active' : ''}`}
            onClick={() => handleSetSpeed(0.75)}
            aria-label="0.75x Graceful Tempo"
          >
            <span className="dock-speed-text">0.75x</span>
            <span className="dock-tooltip">Graceful Tempo (0.75x)</span>
          </button>

          <button
            className={`dock-item-btn ${danceSpeed === 1.0 ? 'active' : ''}`}
            onClick={() => handleSetSpeed(1.0)}
            aria-label="1.0x Allegro Tempo"
          >
            <span className="dock-speed-text">1.0x</span>
            <span className="dock-tooltip">Allegro Tempo (1.0x)</span>
          </button>

          <button
            className={`dock-item-btn ${danceSpeed === 1.25 ? 'active' : ''}`}
            onClick={() => handleSetSpeed(1.25)}
            aria-label="1.25x Rhythmic Tempo"
          >
            <span className="dock-speed-text">1.25x</span>
            <span className="dock-tooltip">Rhythmic Tempo (1.25x)</span>
          </button>

          <div className="dock-divider-horizontal" />

          {/* 3. 360° Auto-Orbit Camera */}
          <button
            className={`dock-item-btn ${isAutoRotate ? 'active' : ''}`}
            onClick={handleToggleAutoRotate}
            aria-label="360° Auto Orbit"
          >
            <RotateCw size={17} />
            <span className="dock-tooltip">
              {isAutoRotate ? 'Pause 360° Orbit' : 'Resume 360° Orbit'}
            </span>
          </button>

          {/* 4. Reset Camera Angle */}
          <button
            className="dock-item-btn"
            onClick={handleResetCamera}
            aria-label="Reset Camera View"
          >
            <Camera size={17} />
            <span className="dock-tooltip">Reset Front View</span>
          </button>

          {/* 5. Stage Spotlights Mood */}
          <button
            className="dock-item-btn"
            onClick={handleCycleLighting}
            aria-label="Change Stage Spotlights"
          >
            <SunMedium size={17} />
            <span className="dock-tooltip">
              Mood: {lightTheme === 'diva' ? 'Diva Rose' : lightTheme === 'gold' ? 'Temple Gold' : 'Cyber Violet'}
            </span>
          </button>
        </div>
      )}

      {/* Drag Helper Pill (Clean subtle hint at bottom left) */}
      {!isLoading && (
        <div className="dock-drag-hint-pill" onClick={(e) => e.stopPropagation()}>
          <Move3d size={13} />
          <span>Click & Drag to Orbit 3D</span>
        </div>
      )}
    </div>
  );
}
