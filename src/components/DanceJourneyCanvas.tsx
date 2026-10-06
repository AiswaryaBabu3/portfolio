import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import type { SceneNumber } from '../types/journey';

interface DanceJourneyCanvasProps {
  currentScene: SceneNumber;
  onLoaded?: () => void;
  triggerDanceEffect?: string | null;
}

// Target Camera configurations per scene
interface CameraPose {
  pos: [number, number, number];
  target: [number, number, number];
  dancerPos: [number, number, number];
  dancerRotY: number;
  lightLeftColor: number;
  lightRightColor: number;
  coneColor: number;
  speed: number;
}

const SCENE_POSES: Record<SceneNumber, CameraPose> = {
  1: {
    // The Stage (Welcome)
    pos: [0, 1.35, 3.8],
    target: [0, 0.95, 0],
    dancerPos: [0, 0, 0],
    dancerRotY: 0,
    lightLeftColor: 0x8b5cf6,
    lightRightColor: 0xd946ef,
    coneColor: 0x8b5cf6,
    speed: 0.85,
  },
  2: {
    // Discover Me (Glides forward, floating words)
    pos: [-0.9, 1.4, 3.2],
    target: [0.2, 0.9, 0],
    dancerPos: [0.35, 0, 0.1],
    dancerRotY: -0.3,
    lightLeftColor: 0xd946ef,
    lightRightColor: 0xf472b6,
    coneColor: 0xd946ef,
    speed: 1.0,
  },
  3: {
    // About Me (Circular Portal Space)
    pos: [0, 1.25, 3.9],
    target: [0, 0.92, 0],
    dancerPos: [0, 0, -0.2],
    dancerRotY: 0,
    lightLeftColor: 0xf472b6,
    lightRightColor: 0xfbbf24,
    coneColor: 0xf472b6,
    speed: 0.9,
  },
  4: {
    // My Skills (Fast Choreography & Movement Trails)
    pos: [0, 1.15, 3.2],
    target: [0, 0.85, 0],
    dancerPos: [0, 0, 0.1],
    dancerRotY: 0.1,
    lightLeftColor: 0x06b6d4,
    lightRightColor: 0xa855f7,
    coneColor: 0x38bdf8,
    speed: 1.3,
  },
  5: {
    // Projects (Futuristic Gallery)
    pos: [1.1, 1.45, 3.6],
    target: [-0.2, 0.95, 0],
    dancerPos: [-0.6, 0, 0],
    dancerRotY: 0.45,
    lightLeftColor: 0x8b5cf6,
    lightRightColor: 0x06b6d4,
    coneColor: 0x8b5cf6,
    speed: 1.0,
  },
  6: {
    // Experience (Long Illuminated Path)
    pos: [-1.4, 1.3, 3.4],
    target: [0.2, 0.9, 0],
    dancerPos: [0, 0, 0.3],
    dancerRotY: -0.5,
    lightLeftColor: 0xf59e0b,
    lightRightColor: 0xfbbf24,
    coneColor: 0xf59e0b,
    speed: 0.95,
  },
  7: {
    // Beyond Code (Warm Champagne Gold)
    pos: [0, 1.38, 3.7],
    target: [0, 0.9, 0],
    dancerPos: [0, 0, 0],
    dancerRotY: 0.2,
    lightLeftColor: 0xfbbf24,
    lightRightColor: 0xf472b6,
    coneColor: 0xfbbf24,
    speed: 0.85,
  },
  8: {
    // AI Interaction (Floating Orb)
    pos: [1.2, 1.25, 3.1],
    target: [-0.25, 0.95, 0],
    dancerPos: [-0.5, 0, 0],
    dancerRotY: 0.6,
    lightLeftColor: 0x06b6d4,
    lightRightColor: 0xd946ef,
    coneColor: 0x06b6d4,
    speed: 1.0,
  },
  9: {
    // Contact / Finale (Grand Finale Stage)
    pos: [0, 1.35, 3.6],
    target: [0, 0.92, 0],
    dancerPos: [0, 0, 0],
    dancerRotY: 0,
    lightLeftColor: 0xf472b6,
    lightRightColor: 0xfbbf24,
    coneColor: 0xd946ef,
    speed: 1.15,
  },
};

export default function DanceJourneyCanvas({
  currentScene,
  onLoaded,
  triggerDanceEffect,
}: DanceJourneyCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const actionRef = useRef<THREE.AnimationAction | null>(null);
  const dancerModelRef = useRef<THREE.Group | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const spotLeftRef = useRef<THREE.SpotLight | null>(null);
  const spotRightRef = useRef<THREE.SpotLight | null>(null);
  const coneMeshRef = useRef<THREE.Mesh | null>(null);
  const portalRingRef = useRef<THREE.Mesh | null>(null);
  const illuminatedPathRef = useRef<THREE.Group | null>(null);
  const aiOrbRef = useRef<THREE.Group | null>(null);
  const targetCameraPos = useRef(new THREE.Vector3(0, 1.35, 3.8));
  const targetCameraLookAt = useRef(new THREE.Vector3(0, 0.95, 0));
  const currentCameraLookAt = useRef(new THREE.Vector3(0, 0.95, 0));
  const targetDancerPos = useRef(new THREE.Vector3(0, 0, 0));
  const targetDancerRotY = useRef(0);
  const mouseOffset = useRef({ x: 0, y: 0 });

  // Update target coordinates and lighting whenever currentScene updates
  useEffect(() => {
    const config = SCENE_POSES[currentScene];
    targetCameraPos.current.set(...config.pos);
    targetCameraLookAt.current.set(...config.target);
    targetDancerPos.current.set(...config.dancerPos);
    targetDancerRotY.current = config.dancerRotY;

    if (actionRef.current) {
      actionRef.current.setEffectiveTimeScale(config.speed);
    }

    if (spotLeftRef.current) {
      spotLeftRef.current.color.setHex(config.lightLeftColor);
    }
    if (spotRightRef.current) {
      spotRightRef.current.color.setHex(config.lightRightColor);
    }
    if (coneMeshRef.current) {
      (coneMeshRef.current.material as THREE.MeshBasicMaterial).color.setHex(config.coneColor);
    }

    // Toggle Portal visibility (Scene 3)
    if (portalRingRef.current) {
      portalRingRef.current.visible = currentScene === 3;
    }

    // Toggle Illuminated Path visibility (Scene 6)
    if (illuminatedPathRef.current) {
      illuminatedPathRef.current.visible = currentScene === 6;
    }

    // Toggle AI Orb visibility (Scene 8)
    if (aiOrbRef.current) {
      aiOrbRef.current.visible = currentScene === 8;
    }
  }, [currentScene]);

  // Handle trigger dance effects (e.g. from clicking a skill or interaction)
  useEffect(() => {
    if (!triggerDanceEffect || !actionRef.current) return;
    // Temporary speed burst
    actionRef.current.setEffectiveTimeScale(1.6);
    const timeout = setTimeout(() => {
      const config = SCENE_POSES[currentScene];
      if (actionRef.current) {
        actionRef.current.setEffectiveTimeScale(config.speed);
      }
    }, 1200);
    return () => clearTimeout(timeout);
  }, [triggerDanceEffect, currentScene]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene, Camera, WebGL Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050507, 0.075);

    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 1.35, 3.8);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // 2. Theatrical Atmospheric Spotlights
    const ambientLight = new THREE.AmbientLight(0x24102f, 2.2);
    scene.add(ambientLight);

    const initialPose = SCENE_POSES[1];

    const spotLeft = new THREE.SpotLight(initialPose.lightLeftColor, 5.2);
    spotLeft.position.set(-3.2, 4.8, 2.8);
    spotLeft.angle = Math.PI / 4.5;
    spotLeft.penumbra = 0.85;
    spotLeft.castShadow = true;
    spotLeft.target.position.set(0, 0.8, 0);
    scene.add(spotLeft);
    scene.add(spotLeft.target);
    spotLeftRef.current = spotLeft;

    const spotRight = new THREE.SpotLight(initialPose.lightRightColor, 4.8);
    spotRight.position.set(3.2, 4.8, 2.8);
    spotRight.angle = Math.PI / 4.5;
    spotRight.penumbra = 0.85;
    spotRight.castShadow = true;
    spotRight.target.position.set(0, 0.8, 0);
    scene.add(spotRight);
    scene.add(spotRight.target);
    spotRightRef.current = spotRight;

    // Rim silhouette light
    const backLight = new THREE.DirectionalLight(0xd946ef, 3.0);
    backLight.position.set(0, 3.5, -3.5);
    scene.add(backLight);

    // Stage ground ambient point light
    const floorPointLight = new THREE.PointLight(0x8b5cf6, 2.0, 4.0);
    floorPointLight.position.set(0, 0.1, 0);
    scene.add(floorPointLight);

    // 3. Volumetric Holographic Light Cone
    const coneGeo = new THREE.CylinderGeometry(0.35, 1.85, 4.4, 32, 1, true);
    const coneMat = new THREE.MeshBasicMaterial({
      color: initialPose.coneColor,
      transparent: true,
      opacity: 0.1,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const lightCone = new THREE.Mesh(coneGeo, coneMat);
    lightCone.position.set(0, 2.15, 0);
    scene.add(lightCone);
    coneMeshRef.current = lightCone;

    // 4. Circular Futuristic Stage Floor & Concentric Rings
    const stageFloorGeo = new THREE.CylinderGeometry(1.7, 1.76, 0.08, 64);
    const stageFloorMat = new THREE.MeshStandardMaterial({
      color: 0x0c0614,
      roughness: 0.2,
      metalness: 0.75,
    });
    const stageFloorMesh = new THREE.Mesh(stageFloorGeo, stageFloorMat);
    stageFloorMesh.position.y = -0.04;
    stageFloorMesh.receiveShadow = true;
    scene.add(stageFloorMesh);

    // Ring 1 (Gold)
    const ring1Geo = new THREE.RingGeometry(1.52, 1.58, 64);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0xfbbf24,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 2;
    ring1.position.y = 0.005;
    scene.add(ring1);

    // Ring 2 (Violet)
    const ring2Geo = new THREE.RingGeometry(1.22, 1.27, 64);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0xd946ef,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = Math.PI / 2;
    ring2.position.y = 0.006;
    scene.add(ring2);

    // Expanding Ripple Ring
    const rippleGeo = new THREE.RingGeometry(0.8, 0.85, 64);
    const rippleMat = new THREE.MeshBasicMaterial({
      color: 0xf472b6,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });
    const ripple = new THREE.Mesh(rippleGeo, rippleMat);
    ripple.rotation.x = Math.PI / 2;
    ripple.position.y = 0.007;
    scene.add(ripple);

    // 5. Scene 3 Portal Ring (Tilted behind dancer)
    const portalGeo = new THREE.TorusGeometry(1.4, 0.04, 16, 64);
    const portalMat = new THREE.MeshBasicMaterial({
      color: 0xf472b6,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    const portalMesh = new THREE.Mesh(portalGeo, portalMat);
    portalMesh.position.set(0, 1.2, -0.6);
    portalMesh.visible = false;
    scene.add(portalMesh);
    portalRingRef.current = portalMesh;

    // 6. Scene 6 Illuminated Path (Linear glowing runway markers)
    const pathGroup = new THREE.Group();
    for (let i = 0; i < 7; i++) {
      const stepGeo = new THREE.PlaneGeometry(1.2, 0.06);
      const stepMat = new THREE.MeshBasicMaterial({
        color: 0xfbbf24,
        transparent: true,
        opacity: 0.7 - i * 0.08,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
      });
      const stepMesh = new THREE.Mesh(stepGeo, stepMat);
      stepMesh.rotation.x = Math.PI / 2;
      stepMesh.position.set(0, 0.008, 1.2 - i * 0.6);
      pathGroup.add(stepMesh);
    }
    pathGroup.visible = false;
    scene.add(pathGroup);
    illuminatedPathRef.current = pathGroup;

    // 7. Scene 8 AI Orb (Glowing Floating Orb)
    const orbGroup = new THREE.Group();
    const coreOrbGeo = new THREE.SphereGeometry(0.24, 32, 32);
    const coreOrbMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      emissive: 0x06b6d4,
      emissiveIntensity: 1.2,
      roughness: 0.1,
      metalness: 0.9,
    });
    const coreOrb = new THREE.Mesh(coreOrbGeo, coreOrbMat);
    orbGroup.add(coreOrb);

    const haloOrbGeo = new THREE.SphereGeometry(0.32, 32, 32);
    const haloOrbMat = new THREE.MeshBasicMaterial({
      color: 0xd946ef,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });
    const haloOrb = new THREE.Mesh(haloOrbGeo, haloOrbMat);
    orbGroup.add(haloOrb);

    orbGroup.position.set(0.65, 1.35, 0.4);
    orbGroup.visible = false;
    scene.add(orbGroup);
    aiOrbRef.current = orbGroup;

    // 8. Stardust Floating Particles Vortex (160 particles)
    const particleCount = 160;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSpeeds: { y: number; angle: number; radius: number; rotSpeed: number }[] = [];

    for (let i = 0; i < particleCount; i++) {
      const radius = 0.35 + Math.random() * 1.5;
      const angle = Math.random() * Math.PI * 2;
      const y = Math.random() * 3.5;
      particlePositions[i * 3] = Math.cos(angle) * radius;
      particlePositions[i * 3 + 1] = y;
      particlePositions[i * 3 + 2] = Math.sin(angle) * radius;

      particleSpeeds.push({
        y: 0.003 + Math.random() * 0.006,
        angle: angle,
        radius: radius,
        rotSpeed: 0.002 + Math.random() * 0.004,
      });
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.038,
      color: 0xf472b6,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // 9. Load Michelle.glb 3D Dancer Model
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
        dancerModelRef.current = model;

        if (gltf.animations && gltf.animations.length > 0) {
          mixer = new THREE.AnimationMixer(model);
          mixerRef.current = mixer;

          const danceClip = gltf.animations[0];
          const action = mixer.clipAction(danceClip);
          action.setEffectiveTimeScale(SCENE_POSES[1].speed);
          action.play();
          actionRef.current = action;
        }

        if (onLoaded) {
          onLoaded();
        }
      },
      undefined,
      (err) => {
        console.error('Error loading dancer model:', err);
        if (onLoaded) onLoaded();
      }
    );

    // 10. Mouse Move for Subtle Parallax
    const handleMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseOffset.current.x = normX * 0.25;
      mouseOffset.current.y = normY * 0.15;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // 11. Render Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();
    let rippleScale = 1.0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (mixer) {
        mixer.update(delta);
      }

      // Smooth camera interpolation towards target pose + mouse parallax
      const tgtCam = targetCameraPos.current;
      camera.position.x += (tgtCam.x + mouseOffset.current.x - camera.position.x) * 0.05;
      camera.position.y += (tgtCam.y + mouseOffset.current.y - camera.position.y) * 0.05;
      camera.position.z += (tgtCam.z - camera.position.z) * 0.05;

      const tgtLook = targetCameraLookAt.current;
      currentCameraLookAt.current.x += (tgtLook.x - currentCameraLookAt.current.x) * 0.05;
      currentCameraLookAt.current.y += (tgtLook.y - currentCameraLookAt.current.y) * 0.05;
      currentCameraLookAt.current.z += (tgtLook.z - currentCameraLookAt.current.z) * 0.05;
      camera.lookAt(currentCameraLookAt.current);

      // Smooth dancer position & rotation transition
      if (dancerModelRef.current) {
        const dModel = dancerModelRef.current;
        const tgtDancer = targetDancerPos.current;
        dModel.position.x += (tgtDancer.x - dModel.position.x) * 0.04;
        dModel.position.y += (tgtDancer.y - dModel.position.y) * 0.04;
        dModel.position.z += (tgtDancer.z - dModel.position.z) * 0.04;
        dModel.rotation.y += (targetDancerRotY.current - dModel.rotation.y) * 0.04;
      }

      // Rotate stage rings
      ring1.rotation.z += delta * 0.2;
      ring2.rotation.z -= delta * 0.3;

      // Expand and fade floor ripple
      rippleScale += delta * 0.4;
      if (rippleScale > 1.9) rippleScale = 0.8;
      ripple.scale.set(rippleScale, rippleScale, 1);
      (ripple.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 0.55 - (rippleScale - 0.8) * 0.5);

      // Rotate portal ring if visible
      if (portalMesh.visible) {
        portalMesh.rotation.z += delta * 0.4;
      }

      // Animate AI Orb bob and pulse if visible
      if (orbGroup.visible) {
        orbGroup.position.y = 1.35 + Math.sin(clock.getElapsedTime() * 2.5) * 0.08;
        haloOrb.scale.setScalar(1.0 + Math.sin(clock.getElapsedTime() * 4) * 0.12);
      }

      // Rotate light cone subtly
      if (coneMeshRef.current) {
        coneMeshRef.current.rotation.y += delta * 0.15;
      }

      // Animate stardust particles
      const pArr = particleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const sp = particleSpeeds[i];
        sp.angle += sp.rotSpeed;
        pArr[i * 3] = Math.cos(sp.angle) * sp.radius;
        pArr[i * 3 + 1] += sp.y;
        pArr[i * 3 + 2] = Math.sin(sp.angle) * sp.radius;
        if (pArr[i * 3 + 1] > 3.5) pArr[i * 3 + 1] = 0.05;
      }
      particleGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // Resize listener
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
      window.removeEventListener('mousemove', handleMouseMove);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      stageFloorGeo.dispose();
      stageFloorMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      rippleGeo.dispose();
      rippleMat.dispose();
      coneGeo.dispose();
      coneMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="dance-journey-canvas-root"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
      }}
    />
  );
}
