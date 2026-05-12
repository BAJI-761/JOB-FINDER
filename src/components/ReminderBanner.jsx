import { Clock } from 'lucide-react';
import { useCountdown } from '../hooks/useCountdown';
import styles from './ReminderBanner.module.css';

export default function ReminderBanner() {
  const { timeLeft, flipping } = useCountdown();
  const pad = (n) => String(n).padStart(2, '0');

  return (
    <div className={styles.banner} id="reminder-banner">
      <div className={styles.iconCircle}>
        <Clock size={20} color="var(--primary)" />
      </div>
      <div className={styles.textBlock}>
        <div className={styles.title}>Application Reminder!</div>
        <div className={styles.subtitle}>Don't forget to complete your pending applications</div>
      </div>
      <div className={styles.countdown}>
        <span className={`${styles.digitBox} ${flipping.hours ? styles.flipping : ''}`}>{pad(timeLeft.hours)}</span>
        <span className={styles.colon}>:</span>
        <span className={`${styles.digitBox} ${flipping.minutes ? styles.flipping : ''}`}>{pad(timeLeft.minutes)}</span>
        <span className={styles.colon}>:</span>
        <span className={`${styles.digitBox} ${flipping.seconds ? styles.flipping : ''}`}>{pad(timeLeft.seconds)}</span>
      </div>
    </div>
  );
}
