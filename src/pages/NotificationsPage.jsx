import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, Briefcase, MessageCircle, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import PageTransition from '../components/PageTransition';

const typeIcons = { application: '📋', job_match: '🎯', message: '💬', reminder: '⏰', system: '🔔' };

export default function NotificationsPage() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="page-content" style={{ padding: 'var(--page-padding)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}><ArrowLeft size={22} /></button>
            <h1 style={{ fontSize: 20, fontWeight: 700 }}>Notifications</h1>
          </div>
          <button className="btn-secondary" style={{ fontSize: 11 }} onClick={() => dispatch({ type: 'MARK_ALL_NOTIFICATIONS_READ' })}>Mark all read</button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {state.notifications.map((n, i) => (
            <div key={n.id} className="card stagger-enter" style={{ animationDelay: `${i * 40}ms`, display: 'flex', alignItems: 'flex-start', gap: 12, padding: 14, opacity: n.read ? 0.7 : 1, cursor: 'pointer' }} onClick={() => dispatch({ type: 'MARK_NOTIFICATION_READ', payload: n.id })}>
              <span style={{ fontSize: 24, flexShrink: 0 }}>{typeIcons[n.type] || '🔔'}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: n.read ? 400 : 600, lineHeight: 1.4 }}>{n.title}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{n.message}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>{n.time}</div>
              </div>
              {!n.read && <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--primary)', flexShrink: 0, marginTop: 4 }} />}
            </div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
