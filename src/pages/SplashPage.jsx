import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { animate, stagger } from 'animejs';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

function ParticleBackground(props) {
  const ref = useRef();
  const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.5 }));
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });
  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial transparent color="#ffffff" size={0.005} sizeAttenuation={true} depthWrite={false} />
      </Points>
    </group>
  );
}

export default function SplashPage() {
  const navigate = useNavigate();
  const { state } = useApp();
  const textRef = useRef(null);

  useEffect(() => {
    animate(textRef.current.querySelectorAll('.anime-el'), {
      translateY: [20, 0],
      opacity: [0, 1],
      delay: stagger(200),
      ease: 'outExpo',
      duration: 1.5
    });

    const timer = setTimeout(() => {
      navigate(state.auth.isAuthenticated ? '/home' : '/onboarding', { replace: true });
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #3B9EE8 0%, #2A7DC9 50%, #1D6AAF 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#FFFFFF',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
        <Canvas camera={{ position: [0, 0, 1] }}>
          <ParticleBackground />
        </Canvas>
      </div>
      
      <div ref={textRef} style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className="anime-el" style={{ width: 80, height: 80, borderRadius: 20, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, backdropFilter: 'blur(10px)' }}>
          <span style={{ fontSize: 36, fontWeight: 800 }}>JF</span>
        </div>
        <h1 className="anime-el" style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>JobFinder</h1>
        <p className="anime-el" style={{ fontSize: 14, opacity: 0.8 }}>Your Career Starts Here</p>
      </div>
    </div>
  );
}
