import { Briefcase, ClipboardCheck } from 'lucide-react';
import styles from './SavedAppliedToggle.module.css';

export default function SavedAppliedToggle({ active, onToggle }) {
  return (
    <div className={styles.toggle} id="saved-applied-toggle">
      <button
        className={`${styles.btn} ${active === 'saved' ? styles.active : ''}`}
        onClick={() => onToggle('saved')}
      >
        <Briefcase size={14} /> Saved
      </button>
      <button
        className={`${styles.btn} ${active === 'applied' ? styles.active : ''}`}
        onClick={() => onToggle('applied')}
      >
        <ClipboardCheck size={14} /> Applied
      </button>
    </div>
  );
}
