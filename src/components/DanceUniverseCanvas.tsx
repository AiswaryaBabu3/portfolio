import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface DanceUniverseCanvasProps {
  theme?: 'diva' | 'gold' | 'cyber' | 'space';
  mouseRotation?: { x: number; y: number };
}

export default function DanceUniverseCanvas({ theme = 'diva', mouseRotation }: DanceUniverseCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 24;
    camera.position.y = 4;
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Color definitions based on theme
    const themeColors = {
      diva: {
        stars: 0xf472b6,
        starsSecondary: 0xc084fc,
        rings: 0xd946ef,
        glow: 0xdb2777,
      },
      gold: {
        stars: 0xfde047,
        starsSecondary: 0xf59e0b,
        rings: 0xd97706,
        glow: 0xb45309,
      },
      cyber: {
        stars: 0x38bdf8,
        starsSecondary: 0x818cf8,
        rings: 0x06b6d4,
        glow: 0x4f46e5,
      },
      space: {
        stars: 0xe0e7ff,
        starsSecondary: 0xa5b4fc,
        rings: 0x6366f1,
        glow: 0x312e81,
      },
    };

    const currentPalette = themeColors[theme] || themeColors.diva;

    // 2. Starfield (3D Cosmic Universe)
    const starCount = 2200;
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    const color1 = new THREE.Color(currentPalette.stars);
    const color2 = new THREE.Color(currentPalette.starsSecondary);
    const colorWhite = new THREE.Color(0xffffff);

    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      // Distribute stars in a cosmic dome / sphere
      const radius = 15 + Math.random() * 45;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      starPositions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      starPositions[i3 + 2] = radius * Math.cos(phi);

      // Star color variation
      const mix = Math.random();
      const chosenColor = mix < 0.4 ? color1 : mix < 0.8 ? color2 : colorWhite;
      starColors[i3] = chosenColor.r;
      starColors[i3 + 1] = chosenColor.g;
      starColors[i3 + 2] = chosenColor.b;
    }

    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    // Simple canvas circular texture for round stars
    const starCanvas = document.createElement('canvas');
    starCanvas.width = 16;
    starCanvas.height = 16;
    const ctx = starCanvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      grad.addColorStop(0, 'rgba(255,255,255,1)');
      grad.addColorStop(0.3, 'rgba(255,255,255,0.8)');
      grad.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 16, 16);
    }
    const starTexture = new THREE.CanvasTexture(starCanvas);

    const starMaterial = new THREE.PointsMaterial({
      size: 0.35,
      vertexColors: true,
      map: starTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);

    // 3. Swirling 3D Stage Orbital Rings (Celestial Dance Chakra)
    const ringGroup = new THREE.Group();
    ringGroup.position.set(0, -3.5, 0);
    ringGroup.rotation.x = Math.PI / 2.3;

    const ringRadii = [6, 9.5, 13.5, 17];
    const rings: THREE.LineLoop[] = [];

    ringRadii.forEach((r, idx) => {
      const points: THREE.Vector3[] = [];
      const segments = 120;
      for (let s = 0; s <= segments; s++) {
        const theta = (s / segments) * Math.PI * 2;
        points.push(new THREE.Vector3(Math.cos(theta) * r, Math.sin(theta) * r, 0));
      }
      const ringGeo = new THREE.BufferGeometry().setFromPoints(points);
      const ringMat = new THREE.LineBasicMaterial({
        color: idx % 2 === 0 ? currentPalette.rings : currentPalette.starsSecondary,
        transparent: true,
        opacity: 0.35 - idx * 0.06,
        linewidth: 1,
      });
      const ringLine = new THREE.LineLoop(ringGeo, ringMat);
      ringGroup.add(ringLine);
      rings.push(ringLine);
    });

    // 4. Floating 3D Sparkle Dust on Stage
    const dustCount = 350;
    const dustPositions = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      const i3 = i * 3;
      const angle = Math.random() * Math.PI * 2;
      const dist = 1 + Math.random() * 12;
      dustPositions[i3] = Math.cos(angle) * dist;
      dustPositions[i3 + 1] = (Math.random() - 0.5) * 6;
      dustPositions[i3 + 2] = Math.sin(angle) * dist;
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
    const dustMat = new THREE.PointsMaterial({
      size: 0.22,
      color: currentPalette.stars,
      map: starTexture,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const dustField = new THREE.Points(dustGeo, dustMat);
    scene.add(dustField);
    scene.add(ringGroup);

    // 5. Animation loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Slow cosmic rotation
      starField.rotation.y = elapsed * 0.02;
      starField.rotation.x = Math.sin(elapsed * 0.015) * 0.05;

      // Stage orbital ring rotation with varying speeds
      ringGroup.rotation.z = elapsed * 0.05;
      rings.forEach((r, idx) => {
        r.rotation.z = elapsed * (0.02 * (idx + 1));
      });

      // Dust vertical pulsation
      dustField.rotation.y = -elapsed * 0.04;

      // Parallax with mouse or manual drag rotation
      if (mouseRotation) {
        camera.position.x += (mouseRotation.y * 5 - camera.position.x) * 0.05;
        camera.position.y += (4 - mouseRotation.x * 4 - camera.position.y) * 0.05;
        camera.lookAt(0, -1, 0);
      }

      renderer.render(scene, camera);
    };

    animate();

    // 6. Resize handling
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
      starGeometry.dispose();
      starMaterial.dispose();
      dustGeo.dispose();
      dustMat.dispose();
    };
  }, [theme, mouseRotation]);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}
