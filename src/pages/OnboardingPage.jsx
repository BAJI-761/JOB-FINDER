import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spline from '@splinetool/react-spline';
import { motion, AnimatePresence } from 'framer-motion';
import ErrorBoundary from '../components/ErrorBoundary';

const slides = [
  { 
    title: 'Find Your Dream Job', 
    desc: 'Browse thousands of opportunities from top companies worldwide.',
    icon: '🔍'
  },
  { 
    title: 'Easy Application', 
    desc: 'Apply with one tap and track your applications in real-time.',
    icon: '⚡'
  },
  { 
    title: 'Grow Your Career', 
    desc: 'Connect with employers, get interviews, and land your perfect role.',
    icon: '📈'
  }
];

export default function OnboardingPage() {
  const [current, setCurrent] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const handleNext = () => {
    if (current < slides.length - 1) {
      setCurrent(c => c + 1);
    } else {
      navigate('/login');
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'var(--bg-page)', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      padding: 'var(--spacing-xl)',
      textAlign: 'center'
    }}>
      <div style={{ 
        width: '100%', 
        maxWidth: 400,
        height: 300, 
        marginBottom: 'var(--spacing-xl)', 
        position: 'relative',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        background: 'var(--bg-card)',
        boxShadow: 'var(--shadow-card)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <ErrorBoundary fallback={<div style={{ fontSize: 80 }}>{slides[current].icon}</div>}>
          {!hasError ? (
            <Spline 
              scene="https://prod.spline.design/q-9r8OIf46I4E6k5/scene.splinecode" 
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              onLoad={() => setIsLoading(false)}
              onError={() => {
                setHasError(true);
                setIsLoading(false);
              }}
            />
          ) : (
            <div style={{ fontSize: 80 }}>{slides[current].icon}</div>
          )}
        </ErrorBoundary>
        
        {isLoading && !hasError && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-card)' }}>
             <div className="spinner" style={{ width: 40, height: 40, border: '4px solid var(--primary-light)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <h2 style={{ 
            fontSize: 'var(--font-display-size)', 
            fontWeight: 'var(--font-display-weight)', 
            marginBottom: 'var(--spacing-md)', 
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-display-family)'
          }}>
            {slides[current].title}
          </h2>
          <p style={{ 
            fontSize: 'var(--font-body-size)', 
            color: 'var(--text-secondary)', 
            maxWidth: 300, 
            lineHeight: 1.6, 
            marginBottom: 'var(--spacing-xl)',
            marginInline: 'auto'
          }}>
            {slides[current].desc}
          </p>
        </motion.div>
      </AnimatePresence>

      <div style={{ display: 'flex', gap: 8, marginBottom: 40 }}>
        {slides.map((_, i) => (
          <div 
            key={i} 
            style={{ 
              width: current === i ? 24 : 8, 
              height: 8, 
              borderRadius: 4, 
              background: current === i ? 'var(--primary)' : 'var(--border)', 
              transition: 'all 300ms ease' 
            }} 
          />
        ))}
      </div>

      <div style={{ width: '100%', maxWidth: 320, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <button 
          className="btn-primary" 
          onClick={handleNext}
          style={{ width: '100%' }}
        >
          {current === slides.length - 1 ? 'Get Started' : 'Next'}
        </button>
        
        <button 
          onClick={() => navigate('/login')} 
          style={{ 
            fontSize: 'var(--font-label-size)', 
            color: 'var(--text-muted)', 
            background: 'none', 
            border: 'none', 
            cursor: 'pointer',
            padding: '8px'
          }}
        >
          Skip
        </button>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
