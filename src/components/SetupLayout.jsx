import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import styles from '../pages/setup/Setup.module.css';

const SetupLayout = ({ children, image, step, totalSteps, title, subtitle, sidebarTitle, sidebarSubtitle }) => {
  const progress = (step / totalSteps) * 100;

  return (
    <div className={styles.setupPageWrapper}>
      {/* Background Grain */}
      <div className={styles.grainOverlay} />

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={styles.setupContentGrid}
      >
        {/* Left Visual Panel */}
        <div className={styles.visualPanel}>
          <AnimatePresence mode='wait'>
            <motion.div 
              key={image}
              initial={{ opacity: 0, filter: 'grayscale(100%) contrast(120%) brightness(50%)' }}
              animate={{ opacity: 0.95, filter: 'grayscale(100%) contrast(110%) brightness(90%)' }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className={styles.panelImage}
              style={{ backgroundImage: `url(${image})` }}
            />
          </AnimatePresence>
          
          <div className={styles.panelOverlay} />

          <div className={styles.panelContent}>
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <span className={styles.stepIndicator}>Stage 0{step}</span>
              <h2 className={styles.panelTitle}>{sidebarTitle}</h2>
              <p className={styles.panelSubtitle}>{sidebarSubtitle}</p>
            </motion.div>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className={styles.formPanel}>
          <div className={styles.setupProgressBar}>
            <motion.div 
              className={styles.setupProgressFill}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: "circOut" }}
            />
          </div>

          <div className={styles.formInner}>
            <header className={styles.formHeader}>
              <span className={styles.monoStep}>Step 0{step} of 0{totalSteps}</span>
              <h1 className={styles.formTitle}>{title}</h1>
              <p className={styles.formSubtitle}>{subtitle}</p>
            </header>

            <div className={styles.formBody}>
              {children}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SetupLayout;
