import { useEffect } from 'react';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import styles from './Modal.module.css';
import { motion, AnimatePresence } from 'framer-motion';

export default function Modal({ isOpen, onClose, type = 'success', title, message, children, actions }) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const icons = {
    success: <CheckCircle size={28} strokeWidth={2.5} />,
    error: <XCircle size={28} strokeWidth={2.5} />,
    warning: <AlertTriangle size={28} strokeWidth={2.5} />
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className={styles.backdrop} onClick={onClose} role="dialog" aria-modal="true">
          <motion.div 
            className={styles.modal} 
            onClick={e => e.stopPropagation()}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          >
            {type && <div className={`${styles.icon} ${styles[type]}`}>{icons[type]}</div>}
            {title && <div className={styles.title}>{title}</div>}
            {message && <div className={styles.message}>{message}</div>}
            {children}
            {actions && <div className={styles.actions}>{actions}</div>}
            {!actions && (
              <button className="btn-primary" onClick={onClose} style={{ borderRadius: 0 }}>GOT IT!</button>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
