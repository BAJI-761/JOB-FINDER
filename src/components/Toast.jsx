import { CheckCircle, XCircle, Info } from 'lucide-react';
import { useApp } from '../context/AppContext';
import styles from './Toast.module.css';

export default function Toast() {
  const { state } = useApp();

  if (state.toasts.length === 0) return null;

  const icons = {
    success: <CheckCircle size={18} color="var(--trusted-green)" />,
    error: <XCircle size={18} color="var(--accent)" />,
    info: <Info size={18} color="var(--primary)" />
  };

  return (
    <div className={styles.toastContainer}>
      {state.toasts.map(t => (
        <div key={t.id} className={`${styles.toast} ${styles[t.type] || styles.info}`}>
          <span className={styles.toastIcon}>{icons[t.type] || icons.info}</span>
          <span className={styles.toastText}>{t.message}</span>
        </div>
      ))}
    </div>
  );
}
