import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const AuthLayout = ({ children, image, title, subtitle, sidebarTitle, sidebarSubtitle }) => {
  useEffect(() => {
    // Prevent scrolling only on auth pages
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <div className="auth-page-wrapper" style={{
      height: '100vh', // Fixed height to prevent any scroll
      display: 'flex',
      alignItems: 'center', // Reverted to center
      justifyContent: 'center',
      background: 'var(--bg-page)',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Mobile Responsive Overrides */}
      <style>{`
        @media (max-width: 768px) {
          .auth-page-wrapper {
            padding: 0 !important;
            align-items: stretch !important;
            height: 100vh !important;
          }
          .auth-content-box {
            max-width: 100% !important;
            height: 100% !important;
            flex-direction: column !important;
            border: none !important;
          }
          .auth-visual-panel {
            display: none !important;
          }
          .auth-form-panel {
            flex: 1 !important;
            padding: 32px 24px !important;
            overflow-y: auto !important;
            justify-content: flex-start !important;
            padding-top: 48px !important;
          }
          .auth-form-panel h1 {
            font-size: 26px !important;
          }
        }
        @media (max-width: 480px) {
          .auth-form-panel {
            padding: 24px 16px !important;
            padding-top: 40px !important;
          }
        }
      `}</style>

      {/* Background Grain Effect */}
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.03,
        pointerEvents: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }} />

      <motion.div
        className="auth-content-box"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: '100%',
          maxWidth: '960px', // Sweet spot between 900 and 1000
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          display: 'flex',
          flexDirection: 'row',
          height: '580px', 
          transform: 'translateY(0)', 
          position: 'relative',
          zIndex: 1
        }}
      >
        {/* Left Visual Panel */}
        <div className="auth-visual-panel" style={{
          flex: '1.2', // Restored flex
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '40px', // Restored from 30px
          background: '#000',
          color: 'white',
          borderRight: '1px solid var(--border)'
        }}>
          {/* Background Image with Sharp State Change Animation */}
          <AnimatePresence mode='wait'>
            <motion.div 
              key={image + sidebarTitle} // Trigger on role change
              initial={{ opacity: 0, filter: 'grayscale(100%) contrast(150%) brightness(50%)' }}
              animate={{ opacity: 0.9, filter: 'grayscale(100%) contrast(120%) brightness(80%)' }} // Increased opacity
              exit={{ opacity: 0, filter: 'grayscale(100%) contrast(200%) brightness(30%)' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                zIndex: 0
              }}
            />
          </AnimatePresence>

          {/* Flash Effect on Change */}
          <motion.div
            key={sidebarTitle + "flash"}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.2, 0] }}
            transition={{ duration: 0.4 }}
            style={{ position: 'absolute', inset: 0, background: 'white', zIndex: 1, pointerEvents: 'none' }}
          />

          <div style={{ position: 'relative', zIndex: 2 }}>
            <Link to="/" style={{
              color: 'white',
              textDecoration: 'none',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px', // Reduced from 12px
              textTransform: 'uppercase',
              letterSpacing: '1px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              ← Back to LinkUp
            </Link>
          </div>

          <div style={{ position: 'relative', zIndex: 2 }}>
            <AnimatePresence mode='wait'>
              <motion.div
                key={sidebarTitle}
                initial={{ x: -20, opacity: 0, filter: 'blur(4px)' }}
                animate={{ x: 0, opacity: 1, filter: 'blur(0px)' }}
                exit={{ x: 20, opacity: 0, filter: 'blur(4px)' }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <h2 style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '38px', // Increased from 32px
                  lineHeight: '1.1',
                  margin: '0 0 16px 0',
                  fontWeight: '400'
                }}>
                  {sidebarTitle}
                </h2>
                <p style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '15px', // Increased from 14px
                  opacity: 0.8,
                  maxWidth: '280px', // Restored from 240px
                  lineHeight: '1.5'
                }}>
                  {sidebarSubtitle}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="auth-form-panel" style={{
          flex: '1',
          padding: '24px 60px', 
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background: 'var(--bg-card)'
        }}>
          <AnimatePresence mode='wait'>
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div style={{ marginBottom: '16px' }}>
                <h1 style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '32px', // Restored from 28px
                  margin: '0 0 6px 0',
                  fontWeight: '400',
                  color: 'var(--text-primary)'
                }}>
                  {title}
                </h1>
                <p style={{
                  color: 'var(--text-secondary)',
                  fontSize: '15px', // Restored from 14px
                  fontFamily: 'var(--font-sans)'
                }}>
                  {subtitle}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {children}
        </div>
      </motion.div>
    </div>
  );
};

export default AuthLayout;
