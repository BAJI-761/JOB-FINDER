import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, X } from 'lucide-react';

export default function AIPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          style={{
            position: 'fixed',
            bottom: '40px',
            right: '40px',
            width: '320px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            boxShadow: '12px 12px 0px var(--primary)',
            zIndex: 1000,
            padding: '24px'
          }}
        >
          <button 
            onClick={() => setIsVisible(false)}
            style={{ 
              position: 'absolute', 
              top: '12px', 
              right: '12px', 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer',
              color: 'var(--text-muted)'
            }}
          >
            <X size={16} />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              background: 'var(--primary)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: 'var(--bg-page)'
            }}>
              <Sparkles size={20} />
            </div>
            <div>
              <div style={{ fontWeight: 900, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-primary)' }}>LinkUp Intelligence</div>
              <div style={{ fontSize: '10px', color: 'var(--accent)', fontWeight: 700, textTransform: 'uppercase' }}>Now Online</div>
            </div>
          </div>

          <p style={{ fontSize: '14px', lineHeight: 1.5, color: 'var(--text-primary)', marginBottom: '20px', fontFamily: 'var(--font-sans)' }}>
            "I've analyzed your industry trends. There are 12 high-priority matches currently seeking your specific skill set."
          </p>

          <button 
            onClick={() => navigate('/login')}
            style={{ 
              width: '100%', 
              height: '44px', 
              background: 'var(--primary)', 
              color: 'var(--bg-page)', 
              border: 'none', 
              fontWeight: 700, 
              fontSize: '12px', 
              textTransform: 'uppercase', 
              letterSpacing: '0.1em',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
            onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
          >
            Preview Matches
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
