import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spline from '@splinetool/react-spline';
import { motion, AnimatePresence } from 'framer-motion';
import ErrorBoundary from '../components/ErrorBoundary';
import { ArrowRight, Zap, TrendingUp, Globe } from 'lucide-react';

const slides = [
  { 
    title: 'Source Industry Authority', 
    desc: 'Access a curated network of professionals whose expertise is indexed for impact.',
    icon: <Globe size={48} />
  },
  { 
    title: 'Dispatch with Precision', 
    desc: 'Launch high-authority job postings directly to the network\'s elite talent pool.',
    icon: <Zap size={48} />
  },
  { 
    title: 'Archive Your Success', 
    desc: 'Track recruitment intelligence and career growth through our editorial dashboard.',
    icon: <TrendingUp size={48} />
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
      height: '100vh', 
      background: 'var(--bg-page)', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      padding: '24px',
      textAlign: 'center',
      overflow: 'hidden'
    }}>
      <div style={{ 
        width: '100%', 
        maxWidth: 500,
        height: 350, 
        marginBottom: '40px', 
        position: 'relative',
        borderRadius: 0,
        overflow: 'hidden',
        border: '1px solid var(--border)',
        background: 'var(--bg-card)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <ErrorBoundary fallback={<div style={{ color: 'var(--primary)' }}>{slides[current].icon}</div>}>
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
            <div style={{ color: 'var(--primary)' }}>{slides[current].icon}</div>
          )}
        </ErrorBoundary>
        
        {isLoading && !hasError && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-card)' }}>
             <div className="spinner" style={{ width: 40, height: 40, border: '1px solid var(--border)', borderTopColor: 'var(--primary)', borderRadius: 0, animation: 'spin 1s linear infinite' }} />
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: "circOut" }}
          style={{ maxWidth: 450 }}
        >
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--text-muted)', display: 'block', marginBottom: '12px' }}>
            Edition {current + 1}
          </span>
          <h2 style={{ 
            fontSize: '42px', 
            fontWeight: '900', 
            marginBottom: '16px', 
            color: 'var(--primary)',
            fontFamily: 'var(--font-display-family)',
            lineHeight: 1.1,
            textTransform: 'uppercase'
          }}>
            {slides[current].title}
          </h2>
          <p style={{ 
            fontSize: '15px', 
            color: 'var(--text-secondary)', 
            lineHeight: 1.6, 
            marginBottom: '40px',
            fontFamily: 'var(--font-family)',
            borderLeft: '2px solid var(--border)',
            paddingLeft: '20px',
            textAlign: 'left'
          }}>
            {slides[current].desc}
          </p>
        </motion.div>
      </AnimatePresence>

      <div style={{ display: 'flex', gap: 12, marginBottom: 40 }}>
        {slides.map((_, i) => (
          <div 
            key={i} 
            style={{ 
              width: current === i ? 40 : 12, 
              height: 2, 
              background: current === i ? 'var(--primary)' : 'var(--border)', 
              transition: 'all 400ms ease' 
            }} 
          />
        ))}
      </div>

      <div style={{ width: '100%', maxWidth: 360, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <button 
          className="btn-primary" 
          onClick={handleNext}
          style={{ 
            width: '100%', 
            height: '56px', 
            fontSize: '14px', 
            textTransform: 'uppercase', 
            letterSpacing: '2px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px'
          }}
        >
          {current === slides.length - 1 ? 'Establish Authority' : 'Next Issue'}
          <ArrowRight size={18} />
        </button>
        
        <button 
          onClick={() => navigate('/login')} 
          style={{ 
            fontSize: '12px', 
            color: 'var(--text-muted)', 
            background: 'none', 
            border: 'none', 
            cursor: 'pointer',
            padding: '12px',
            fontFamily: 'var(--font-mono)',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}
        >
          Skip Introduction
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
