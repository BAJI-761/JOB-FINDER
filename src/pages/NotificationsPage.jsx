import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell } from 'lucide-react';
import { useApp } from '../context/AppContext';
import PageTransition from '../components/PageTransition';
import styles from './NotificationsPage.module.css';

export default function NotificationsPage() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();

  return (
    <PageTransition variant="newsprint">
      <div className={styles.notifLayout}>
        <header className={styles.header}>
          <div className={styles.headerTop}>
            <button className={styles.backBtn} onClick={() => navigate(-1)}>
              <ArrowLeft size={16} />
              <span>RETURN</span>
            </button>
            <div className={styles.meta}>VOL. 24 / NETWORK UPDATES</div>
          </div>
          <div className={styles.titleRow}>
            <h1 className={styles.mainTitle}>Network Dispatches</h1>
            <button className={styles.markRead} onClick={() => dispatch({ type: 'MARK_ALL_NOTIFICATIONS_READ' })}>
              MARK ALL AS READ
            </button>
          </div>
        </header>

        <div className={styles.list}>
          {state.notifications.map((n, i) => (
            <div 
              key={n.id} 
              className={`${styles.notifItem} ${!n.read ? styles.unread : ''}`}
              onClick={() => dispatch({ type: 'MARK_NOTIFICATION_READ', payload: n.id })}
            >
              <div className={styles.itemHeader}>
                <span className={styles.typeLabel}>{n.type.toUpperCase()}</span>
                <span className={styles.time}>{n.time}</span>
              </div>
              <h3 className={styles.itemTitle}>{n.title}</h3>
              <p className={styles.itemMessage}>{n.message}</p>
              {!n.read && <div className={styles.unreadIndicator} />}
            </div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
