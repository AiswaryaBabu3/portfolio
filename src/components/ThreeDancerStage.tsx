import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Play, Pause, RotateCw, Move3d } from 'lucide-react';
import './ThreeDancerStage.css';

interface ThreeDancerStageProps {
  onStageClick?: () => void;
}

export default function ThreeDancerStage({ onStageClick }: ThreeDancerStageProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [danceSpeed, setDanceSpeed] = useState<number>(1.0);
  const [isAutoRotate, setIsAutoRotate] = useState(true);

  // References for animation manipulation outside effect
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const actionRef = useRef<THREE.AnimationAction | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);

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

    // Overhead Magenta Spotlight
    const spotLightMagenta = new THREE.SpotLight(0xec4899, 4.5);
    spotLightMagenta.position.set(-2.5, 4.5, 2.5);
    spotLightMagenta.angle = Math.PI / 5;
    spotLightMagenta.penumbra = 0.8;
    spotLightMagenta.castShadow = true;
    spotLightMagenta.target.position.set(0, 0.8, 0);
    scene.add(spotLightMagenta);
    scene.add(spotLightMagenta.target);

    // Overhead Golden Theatrical Spotlight
    const spotLightGold = new THREE.SpotLight(0xfbbf24, 4.0);
    spotLightGold.position.set(2.5, 4.5, 2.5);
    spotLightGold.angle = Math.PI / 5;
    spotLightGold.penumbra = 0.8;
    spotLightGold.castShadow = true;
    spotLightGold.target.position.set(0, 0.8, 0);
    scene.add(spotLightGold);
    scene.add(spotLightGold.target);

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

      {/* 3D Stage Footlight Controls Bar */}
      {!isLoading && (
        <div className="dancer-stage-controls-bar" onClick={(e) => e.stopPropagation()}>
          <div className="drag-camera-hint">
            <Move3d size={15} /> <span>Drag to Orbit in 3D</span>
          </div>

          <div className="controls-divider" />

          {/* Play / Pause Toggle */}
          <button
            className="control-pill-btn"
            onClick={handleTogglePlay}
            title={isPlaying ? 'Pause Dance' : 'Play Dance'}
          >
            {isPlaying ? <Pause size={13} /> : <Play size={13} />}
            <span>{isPlaying ? 'Pause' : 'Dance'}</span>
          </button>

          {/* Dance Tempo Speeds */}
          <button
            className={`control-pill-btn ${danceSpeed === 0.75 ? 'active' : ''}`}
            onClick={() => handleSetSpeed(0.75)}
            title="Graceful Classical Tempo"
          >
            0.75x
          </button>
          <button
            className={`control-pill-btn ${danceSpeed === 1.0 ? 'active' : ''}`}
            onClick={() => handleSetSpeed(1.0)}
            title="Standard Allegro Tempo"
          >
            1.0x
          </button>
          <button
            className={`control-pill-btn ${danceSpeed === 1.25 ? 'active' : ''}`}
            onClick={() => handleSetSpeed(1.25)}
            title="Fast Rhythmic Tempo"
          >
            1.25x
          </button>

          <div className="controls-divider" />

          {/* Auto Rotate Camera Toggle */}
          <button
            className={`control-pill-btn ${isAutoRotate ? 'active' : ''}`}
            onClick={handleToggleAutoRotate}
            title="Toggle 360° Camera Auto-Orbit"
          >
            <RotateCw size={13} />
            <span>{isAutoRotate ? 'Orbit On' : 'Orbit Off'}</span>
          </button>
        </div>
      )}
    </div>
  );
}
