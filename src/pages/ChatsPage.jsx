import { useNavigate } from 'react-router-dom';
import { Search, MessageCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import PageTransition from '../components/PageTransition';

export default function ChatsPage() {
  const { state } = useApp();
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="page-content" style={{ padding: 'var(--page-padding)' }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>Messages</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#fff', borderRadius: 9999, padding: '0 16px', height: 44, boxShadow: 'var(--shadow-sm)', marginBottom: 16 }}>
          <Search size={16} color="var(--text-muted)" />
          <input placeholder="Search conversations..." style={{ flex: 1, border: 'none', outline: 'none', fontSize: 13, background: 'transparent' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {state.chats.length > 0 ? state.chats.map((chat, i) => (
            <div key={chat.id} className="stagger-enter" style={{ animationDelay: `${i * 50}ms`, display: 'flex', alignItems: 'center', gap: 12, padding: '14px 12px', borderRadius: 12, cursor: 'pointer', transition: 'background 150ms' }}
              onClick={() => navigate(`/chat/${chat.id}`)}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--border-light)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              <div style={{ position: 'relative' }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', fontWeight: 700, fontSize: 16 }}>{chat.participantName?.[0] || '?'}</div>
                {chat.online && <div style={{ position: 'absolute', bottom: 2, right: 2, width: 10, height: 10, borderRadius: '50%', background: 'var(--trusted-green)', border: '2px solid #fff' }} />}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 14, fontWeight: 600 }}>{chat.participantName}</span>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{chat.lastMessageTime ? new Date(chat.lastMessageTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 }}>
                  <span style={{ fontSize: 12, color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 200 }}>{chat.lastMessage}</span>
                  {chat.unreadCount > 0 && <span style={{ minWidth: 18, height: 18, borderRadius: 9, background: 'var(--primary)', color: '#fff', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 4px' }}>{chat.unreadCount}</span>}
                </div>
              </div>
            </div>
          )) : (
            <div className="empty-state"><div className="empty-state-icon"><MessageCircle size={32} /></div><div className="empty-state-title">No messages yet</div><div className="empty-state-text">Start a conversation with recruiters</div></div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
