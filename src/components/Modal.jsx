import { useEffect } from 'react';
import { CheckCircle, XCircle, AlertTriangle, X } from 'lucide-react';
import styles from './Modal.module.css';

export default function Modal({ isOpen, onClose, type = 'success', title, message, children, actions }) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const icons = {
    success: <CheckCircle size={32} />,
    error: <XCircle size={32} />,
    warning: <AlertTriangle size={32} />
  };

  return (
    <div className={styles.backdrop} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        {type && <div className={`${styles.icon} ${styles[type]}`}>{icons[type]}</div>}
        {title && <div className={styles.title}>{title}</div>}
        {message && <div className={styles.message}>{message}</div>}
        {children}
        {actions && <div className={styles.actions}>{actions}</div>}
        {!actions && (
          <button className="btn-primary" onClick={onClose} style={{ height: 44 }}>Got it!</button>
        )}
      </div>
    </div>
  );
}
