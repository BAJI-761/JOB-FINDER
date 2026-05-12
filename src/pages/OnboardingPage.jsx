import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spline from '@splinetool/react-spline';

const slides = [
  { title: 'Find Your Dream Job', desc: 'Browse thousands of opportunities from top companies worldwide.' },
  { title: 'Easy Application', desc: 'Apply with one tap and track your applications in real-time.' },
  { title: 'Grow Your Career', desc: 'Connect with employers, get interviews, and land your perfect role.' }
];

export default function OnboardingPage() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
      <div style={{ width: '100%', height: 300, marginBottom: 32, position: 'relative' }}>
        <Spline scene="https://prod.spline.design/q-9r8OIf46I4E6k5/scene.splinecode" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
      </div>
      <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12, textAlign: 'center', color: 'var(--text-primary)' }}>{slides[current].title}</h2>
      <p style={{ fontSize: 14, color: 'var(--text-secondary)', textAlign: 'center', maxWidth: 280, lineHeight: 1.6, marginBottom: 32 }}>{slides[current].desc}</p>
      <div style={{ display: 'flex', gap: 8, marginBottom: 40 }}>
        {slides.map((_, i) => (
          <div key={i} style={{ width: current === i ? 24 : 8, height: 8, borderRadius: 4, background: current === i ? 'var(--primary)' : 'var(--border)', transition: 'all 300ms ease' }} />
        ))}
      </div>
      {current < slides.length - 1 ? (
        <button className="btn-primary" onClick={() => setCurrent(c => c + 1)} style={{ maxWidth: 300 }}>Next</button>
      ) : (
        <button className="btn-primary" onClick={() => navigate('/login')} style={{ maxWidth: 300 }}>Get Started</button>
      )}
      <button onClick={() => navigate('/login')} style={{ marginTop: 16, fontSize: 13, color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}>Skip</button>
    </div>
  );
}
