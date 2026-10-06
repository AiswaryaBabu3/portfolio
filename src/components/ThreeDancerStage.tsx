import { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {
  Play,
  Pause,
  RotateCw,
  Camera,
  Palette,
  Move3d,
  Gauge
} from 'lucide-react';
import './ThreeDancerStage.css';

interface ThreeDancerStageProps {
  onStageClick?: () => void;
  className?: string;
}

export type LightTheme = 'diva' | 'gold' | 'cyber' | 'aurora';

interface ThemeConfig {
  name: string;
  leftColor: number;
  rightColor: number;
  coneColor: number;
  particleColor: number;
  accentHex: string;
}

const THEMES: Record<LightTheme, ThemeConfig> = {
  diva: {
    name: 'Diva Rose',
    leftColor: 0xec4899,
    rightColor: 0xfbbf24,
    coneColor: 0xec4899,
    particleColor: 0xf472b6,
    accentHex: '#ec4899',
  },
  gold: {
    name: 'Temple Gold',
    leftColor: 0xf59e0b,
    rightColor: 0xfbbf24,
    coneColor: 0xfbbf24,
    particleColor: 0xfef08a,
    accentHex: '#fbbf24',
  },
  cyber: {
    name: 'Cyber Violet',
    leftColor: 0x06b6d4,
    rightColor: 0xa855f7,
    coneColor: 0x8b5cf6,
    particleColor: 0x38bdf8,
    accentHex: '#a855f7',
  },
  aurora: {
    name: 'Aurora Mystic',
    leftColor: 0x10b981,
    rightColor: 0xec4899,
    coneColor: 0x10b981,
    particleColor: 0x6ee7b7,
    accentHex: '#10b981',
  },
};

export default function ThreeDancerStage({ onStageClick, className = '' }: ThreeDancerStageProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [danceSpeed, setDanceSpeed] = useState<number>(1.0);
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const [lightTheme, setLightTheme] = useState<LightTheme>('diva');

  // References
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const actionRef = useRef<THREE.AnimationAction | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const spotLightLeftRef = useRef<THREE.SpotLight | null>(null);
  const spotLightRightRef = useRef<THREE.SpotLight | null>(null);
  const lightConeRef = useRef<THREE.Mesh | null>(null);
  const particleSystemRef = useRef<THREE.Points | null>(null);
  const targetMouseRef = useRef({ x: 0, y: 0.8 });
  const currentSpotTargetRef = useRef({ x: 0, y: 0.8 });

  // Update theme colors across 3D lights and volumetric effects
  const applyTheme = useCallback((themeKey: LightTheme) => {
    const config = THEMES[themeKey];
    if (spotLightLeftRef.current) {
      spotLightLeftRef.current.color.setHex(config.leftColor);
    }
    if (spotLightRightRef.current) {
      spotLightRightRef.current.color.setHex(config.rightColor);
    }
    if (lightConeRef.current) {
      (lightConeRef.current.material as THREE.MeshBasicMaterial).color.setHex(config.coneColor);
    }
    if (particleSystemRef.current) {
      (particleSystemRef.current.material as THREE.PointsMaterial).color.setHex(config.particleColor);
    }
  }, []);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 1.35, 3.8);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // 2. OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enablePan = false;
    controls.minDistance = 2.0;
    controls.maxDistance = 5.2;
    controls.minPolarAngle = Math.PI / 4.2;
    controls.maxPolarAngle = Math.PI / 2 - 0.03;
    controls.target.set(0, 0.95, 0);
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.1;
    controlsRef.current = controls;

    // 3. Stage Lighting (Theatrical & Holographic Illusion)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    const initialTheme = THEMES['diva'];

    // Left Spotlight
    const spotLightLeft = new THREE.SpotLight(initialTheme.leftColor, 4.8);
    spotLightLeft.position.set(-2.6, 4.6, 2.6);
    spotLightLeft.angle = Math.PI / 4.8;
    spotLightLeft.penumbra = 0.85;
    spotLightLeft.castShadow = true;
    spotLightLeft.target.position.set(0, 0.8, 0);
    scene.add(spotLightLeft);
    scene.add(spotLightLeft.target);
    spotLightLeftRef.current = spotLightLeft;

    // Right Spotlight
    const spotLightRight = new THREE.SpotLight(initialTheme.rightColor, 4.2);
    spotLightRight.position.set(2.6, 4.6, 2.6);
    spotLightRight.angle = Math.PI / 4.8;
    spotLightRight.penumbra = 0.85;
    spotLightRight.castShadow = true;
    spotLightRight.target.position.set(0, 0.8, 0);
    scene.add(spotLightRight);
    scene.add(spotLightRight.target);
    spotLightRightRef.current = spotLightRight;

    // Back Rim Silhouette Light
    const backRimLight = new THREE.DirectionalLight(0xd946ef, 2.8);
    backRimLight.position.set(0, 3.2, -3.2);
    scene.add(backRimLight);

    // Soft Stage Underglow Light
    const underGlow = new THREE.PointLight(0xec4899, 1.8, 3.5);
    underGlow.position.set(0, 0.1, 0);
    scene.add(underGlow);

    // 4. Volumetric Hologram Light Cone Projection
    const coneGeo = new THREE.CylinderGeometry(0.35, 1.75, 4.2, 32, 1, true);
    const coneMat = new THREE.MeshBasicMaterial({
      color: initialTheme.coneColor,
      transparent: true,
      opacity: 0.08,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const lightCone = new THREE.Mesh(coneGeo, coneMat);
    lightCone.position.set(0, 2.05, 0);
    scene.add(lightCone);
    lightConeRef.current = lightCone;

    // 5. Circular 3D Stage Floor Podium & Concentric Glow Rings
    const stageFloorGeo = new THREE.CylinderGeometry(1.65, 1.72, 0.07, 64);
    const stageFloorMat = new THREE.MeshStandardMaterial({
      color: 0x110619,
      roughness: 0.22,
      metalness: 0.72,
    });
    const stageFloorMesh = new THREE.Mesh(stageFloorGeo, stageFloorMat);
    stageFloorMesh.position.y = -0.035;
    stageFloorMesh.receiveShadow = true;
    scene.add(stageFloorMesh);

    // Outer Golden Ring
    const ringGeo1 = new THREE.RingGeometry(1.5, 1.57, 64);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0xfbbf24,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const ringMesh1 = new THREE.Mesh(ringGeo1, ringMat1);
    ringMesh1.rotation.x = Math.PI / 2;
    ringMesh1.position.y = 0.005;
    scene.add(ringMesh1);

    // Inner Glowing Magenta Ring
    const ringGeo2 = new THREE.RingGeometry(1.18, 1.23, 64);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0xec4899,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
    ringMesh2.rotation.x = Math.PI / 2;
    ringMesh2.position.y = 0.006;
    scene.add(ringMesh2);

    // Hologram Ripple Ring (Animates expanding)
    const ringRippleGeo = new THREE.RingGeometry(0.8, 0.84, 64);
    const ringRippleMat = new THREE.MeshBasicMaterial({
      color: 0xf472b6,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });
    const ringRippleMesh = new THREE.Mesh(ringRippleGeo, ringRippleMat);
    ringRippleMesh.rotation.x = Math.PI / 2;
    ringRippleMesh.position.y = 0.007;
    scene.add(ringRippleMesh);

    // 6. Hologram Floating Stardust Particles Vortex
    const particleCount = 140;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSpeeds: { y: number; angle: number; radius: number; rotSpeed: number }[] = [];

    for (let i = 0; i < particleCount; i++) {
      const radius = 0.35 + Math.random() * 1.35;
      const angle = Math.random() * Math.PI * 2;
      const y = Math.random() * 3.2;
      particlePositions[i * 3] = Math.cos(angle) * radius;
      particlePositions[i * 3 + 1] = y;
      particlePositions[i * 3 + 2] = Math.sin(angle) * radius;

      particleSpeeds.push({
        y: 0.003 + Math.random() * 0.005,
        angle: angle,
        radius: radius,
        rotSpeed: 0.002 + Math.random() * 0.004,
      });
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.038,
      color: initialTheme.particleColor,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);
    particleSystemRef.current = particleSystem;

    // 7. Load 3D Dancer Model (Michelle.glb)
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

        if (gltf.animations && gltf.animations.length > 0) {
          mixer = new THREE.AnimationMixer(model);
          mixerRef.current = mixer;

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

    // 8. Mouse move listener for interactive spotlight follower illusion
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetMouseRef.current.x = normX * 0.7;
      targetMouseRef.current.y = 0.8 + normY * 0.3;
    };
    container.addEventListener('mousemove', handleMouseMove);

    // 9. Animation Render Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();
    let rippleScale = 1.0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (mixer) {
        mixer.update(delta);
      }

      // Rotate stage decorative rings
      ringMesh1.rotation.z += delta * 0.22;
      ringMesh2.rotation.z -= delta * 0.32;

      // Expand ripple ring
      rippleScale += delta * 0.45;
      if (rippleScale > 1.9) {
        rippleScale = 0.8;
      }
      ringRippleMesh.scale.set(rippleScale, rippleScale, 1);
      (ringRippleMesh.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 0.65 - (rippleScale - 0.8) * 0.55);

      // Animate Stardust Vortex Particles
      const pArr = particleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const sp = particleSpeeds[i];
        sp.angle += sp.rotSpeed;
        pArr[i * 3] = Math.cos(sp.angle) * sp.radius;
        pArr[i * 3 + 1] += sp.y;
        pArr[i * 3 + 2] = Math.sin(sp.angle) * sp.radius;

        if (pArr[i * 3 + 1] > 3.2) {
          pArr[i * 3 + 1] = 0.05;
        }
      }
      particleGeo.attributes.position.needsUpdate = true;

      // Smooth spotlight follower tracking
      const cur = currentSpotTargetRef.current;
      const tgt = targetMouseRef.current;
      cur.x += (tgt.x - cur.x) * 0.04;
      cur.y += (tgt.y - cur.y) * 0.04;

      if (spotLightLeftRef.current && spotLightRightRef.current) {
        spotLightLeftRef.current.target.position.set(cur.x * 0.6, cur.y, 0);
        spotLightRightRef.current.target.position.set(cur.x * 0.6, cur.y, 0);
      }

      // Rotate cone subtly for optical shimmer
      if (lightConeRef.current) {
        lightConeRef.current.rotation.y += delta * 0.15;
      }

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // 10. Resize handling
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
      container.removeEventListener('mousemove', handleMouseMove);
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
      ringRippleGeo.dispose();
      ringRippleMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      coneGeo.dispose();
      coneMat.dispose();
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
      cameraRef.current.position.set(0, 1.35, 3.8);
      controlsRef.current.target.set(0, 0.95, 0);
      controlsRef.current.update();
    }
  };

  // Cycle Stage Spotlight Mood
  const handleCycleLighting = () => {
    const themeKeys: LightTheme[] = ['diva', 'gold', 'cyber', 'aurora'];
    const nextIdx = (themeKeys.indexOf(lightTheme) + 1) % themeKeys.length;
    const nextTheme = themeKeys[nextIdx];
    setLightTheme(nextTheme);
    applyTheme(nextTheme);
  };

  const currentThemeConfig = THEMES[lightTheme];

  return (
    <div className={`three-dancer-stage-container ${className}`} onClick={onStageClick}>
      {/* 3D WebGL Canvas */}
      <div ref={mountRef} className="three-dancer-canvas" />

      {/* Loading Overlay */}
      {isLoading && (
        <div className="dancer-loading-overlay">
          <div className="dancer-spinner" />
          <div className="dancer-loading-text">Manifesting 3D Holographic Stage...</div>
        </div>
      )}

      {/* ===================================================
          INTEGRATED HOLOGRAPHIC HUD CONSOLE (SLIM, NON-INVASIVE)
          =================================================== */}
      {!isLoading && (
        <div
          className="holo-hud-console"
          onClick={(e) => e.stopPropagation()}
          aria-label="Stage Director HUD"
        >
          {/* 1. Dance Play / Pause with Live Pulse */}
          <button
            className={`hud-action-btn ${isPlaying ? 'hud-btn-active' : ''}`}
            onClick={handleTogglePlay}
            title={isPlaying ? 'Pause Choreography' : 'Resume Choreography'}
            aria-label={isPlaying ? 'Pause Dance' : 'Play Dance'}
          >
            {isPlaying ? <Pause size={15} /> : <Play size={15} />}
            <span className="hud-btn-label">{isPlaying ? 'Playing' : 'Paused'}</span>
            {isPlaying && (
              <span className="hud-rhythm-wave">
                <span className="wave-bar bar-1"></span>
                <span className="wave-bar bar-2"></span>
                <span className="wave-bar bar-3"></span>
              </span>
            )}
          </button>

          <div className="hud-divider" />

          {/* 2. Tempo Selector (0.75x, 1.0x, 1.25x) */}
          <div className="hud-tempo-group" title="Dance Cadence">
            <Gauge size={13} className="hud-tempo-icon" />
            <div className="hud-tempo-pills">
              {[0.75, 1.0, 1.25].map((speed) => (
                <button
                  key={speed}
                  className={`hud-tempo-pill ${danceSpeed === speed ? 'active' : ''}`}
                  onClick={() => handleSetSpeed(speed)}
                  title={`${speed}x tempo`}
                >
                  {speed}x
                </button>
              ))}
            </div>
          </div>

          <div className="hud-divider" />

          {/* 3. Stage Lighting Theme Cycler */}
          <button
            className="hud-action-btn hud-theme-btn"
            onClick={handleCycleLighting}
            title={`Lighting: ${currentThemeConfig.name} (Click to cycle)`}
          >
            <Palette size={14} style={{ color: currentThemeConfig.accentHex }} />
            <span className="hud-theme-text">{currentThemeConfig.name}</span>
            <span
              className="hud-theme-dot"
              style={{ backgroundColor: currentThemeConfig.accentHex, boxShadow: `0 0 8px ${currentThemeConfig.accentHex}` }}
            />
          </button>

          <div className="hud-divider" />

          {/* 4. 360° Auto-Orbit & Camera Reset */}
          <div className="hud-camera-controls">
            <button
              className={`hud-icon-only-btn ${isAutoRotate ? 'active' : ''}`}
              onClick={handleToggleAutoRotate}
              title={isAutoRotate ? 'Pause 360° Orbit' : 'Enable 360° Orbit'}
              aria-label="Toggle 360 Orbit"
            >
              <RotateCw size={14} />
            </button>
            <button
              className="hud-icon-only-btn"
              onClick={handleResetCamera}
              title="Reset Front Camera View"
              aria-label="Reset Camera"
            >
              <Camera size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Subtle Drag Helper Badge in Corner */}
      {!isLoading && (
        <div className="holo-drag-guide" onClick={(e) => e.stopPropagation()}>
          <Move3d size={12} />
          <span>Drag to Orbit 3D</span>
        </div>
      )}
    </div>
  );
}
