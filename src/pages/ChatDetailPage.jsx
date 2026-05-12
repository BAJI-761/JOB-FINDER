import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Paperclip, Check, CheckCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import PageTransition from '../components/PageTransition';
import styles from './ChatDetailPage.module.css';

export default function ChatDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useApp();
  const [text, setText] = useState('');
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const chat = state.chats.find(c => c.id === id);

  useEffect(() => { 
    if (id) dispatch({ type: 'MARK_CHAT_READ', payload: id }); 
  }, [id, dispatch]);

  useEffect(() => { 
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); 
  }, [chat?.messages]);

  if (!chat) return <div className="empty-state"><div className="empty-state-title">Chat not found</div></div>;

  const handleSend = () => {
    if (!text.trim()) return;
    dispatch({ type: 'SEND_MESSAGE', payload: { chatId: id, text: text.trim() } });
    setText('');
    setTyping(true);
    const delay = 1000 + Math.random() * 2000;
    setTimeout(() => { 
      setTyping(false); 
      dispatch({ type: 'RECEIVE_BOT_MESSAGE', payload: { chatId: id } }); 
    }, delay);
  };

  const userId = state.currentUser?.id;

  return (
    <PageTransition>
      <div className={styles.chatContainer}>
        {/* Header */}
        <div className={styles.header}>
          <button className={styles.backBtn} onClick={() => navigate(-1)}>
            <ArrowLeft size={24} />
          </button>
          <div className={styles.avatar}>
            {chat.participantName?.[0]}
          </div>
          <div>
            <div className={styles.participantName}>{chat.participantName}</div>
            <div className={`${styles.status} ${chat.online ? styles.online : styles.offline}`}>
              {chat.online ? 'CONNECTED' : 'DISCONNECTED'}
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className={styles.messageList}>
          {chat.messages.map(msg => {
            const isMine = msg.senderId === userId;
            return (
              <div 
                key={msg.id} 
                className={`${styles.messageRow} ${isMine ? styles.mine : styles.theirs}`}
              >
                <div className={`${styles.bubble} ${isMine ? styles.bubbleMine : styles.bubbleTheirs}`}>
                  {msg.text}
                  <div className={styles.meta}>
                    <span>
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    {isMine && (
                      msg.read ? <CheckCheck size={12} /> : <Check size={12} />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          {typing && (
            <div className={`${styles.messageRow} ${styles.theirs}`}>
              <div className={styles.typingIndicator}>
                <div className={styles.typingDot} />
                <div className={styles.typingDot} />
                <div className={styles.typingDot} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className={styles.inputArea}>
          <button className={styles.attachBtn}>
            <Paperclip size={20} />
          </button>
          <div className={styles.inputWrapper}>
            <input 
              className={styles.messageInput}
              value={text} 
              onChange={e => setText(e.target.value)} 
              onKeyDown={e => e.key === 'Enter' && handleSend()} 
              placeholder="Draft your reply..." 
            />
          </div>
          <button 
            className={styles.sendBtn}
            onClick={handleSend} 
            disabled={!text.trim()}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </PageTransition>
  );
}
