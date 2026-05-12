import { useNavigate } from 'react-router-dom';
import { Search, MessageCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import PageTransition from '../components/PageTransition';
import styles from './ChatsPage.module.css';

export default function ChatsPage() {
  const { state } = useApp();
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className={styles.chatsContainer}>
        <h1 className={styles.title}>Dispatch Center</h1>
        
        <div className={styles.searchBox}>
          <Search size={18} color="var(--text-muted)" />
          <input 
            className={styles.searchInput} 
            placeholder="Search recent dispatches..." 
          />
        </div>

        <div className={styles.chatList}>
          {state.chats.length > 0 ? state.chats.map((chat, i) => (
            <div 
              key={chat.id} 
              className={`${styles.chatItem} stagger-enter`}
              style={{ animationDelay: `${i * 50}ms` }}
              onClick={() => navigate(`/chat/${chat.id}`)}
            >
              <div className={styles.avatarWrapper}>
                <div className={styles.avatar}>
                  {chat.participantName?.[0] || '?'}
                </div>
                {chat.online && <div className={styles.onlineBadge} />}
              </div>
              
              <div className={styles.chatInfo}>
                <div className={styles.chatHeader}>
                  <span className={styles.participantName}>{chat.participantName}</span>
                  <span className={styles.time}>
                    {chat.lastMessageTime ? new Date(chat.lastMessageTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                  </span>
                </div>
                <div className={styles.lastMessageRow}>
                  <span className={styles.lastMessage}>{chat.lastMessage}</span>
                  {chat.unreadCount > 0 && (
                    <span className={styles.unreadBadge}>{chat.unreadCount}</span>
                  )}
                </div>
              </div>
            </div>
          )) : (
            <div className="empty-state">
              <div className="empty-state-icon"><MessageCircle size={32} /></div>
              <div className="empty-state-title">No dispatches found</div>
              <div className="empty-state-text">Your message history will appear here.</div>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
