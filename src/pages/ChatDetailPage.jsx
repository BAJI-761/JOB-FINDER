import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Paperclip, Check, CheckCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import PageTransition from '../components/PageTransition';

export default function ChatDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useApp();
  const [text, setText] = useState('');
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const chat = state.chats.find(c => c.id === id);

  useEffect(() => { dispatch({ type: 'MARK_CHAT_READ', payload: id }); }, [id]);
  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [chat?.messages]);

  if (!chat) return <div className="empty-state"><div className="empty-state-title">Chat not found</div></div>;

  const handleSend = () => {
    if (!text.trim()) return;
    dispatch({ type: 'SEND_MESSAGE', payload: { chatId: id, text: text.trim() } });
    setText('');
    setTyping(true);
    const delay = 1000 + Math.random() * 2000;
    setTimeout(() => { setTyping(false); dispatch({ type: 'RECEIVE_BOT_MESSAGE', payload: { chatId: id } }); }, delay);
  };

  const userId = state.currentUser?.id;

  return (
    <PageTransition>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: 'var(--bg-page)' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px var(--page-padding)', background: '#fff', boxShadow: 'var(--shadow-sm)' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}><ArrowLeft size={22} /></button>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', fontWeight: 700, fontSize: 14 }}>{chat.participantName?.[0]}</div>
          <div><div style={{ fontSize: 14, fontWeight: 600 }}>{chat.participantName}</div><div style={{ fontSize: 11, color: chat.online ? 'var(--trusted-green)' : 'var(--text-muted)' }}>{chat.online ? 'Online' : 'Offline'}</div></div>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 'var(--page-padding)', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {chat.messages.map(msg => {
            const isMine = msg.senderId === userId;
            return (
              <div key={msg.id} style={{ display: 'flex', justifyContent: isMine ? 'flex-end' : 'flex-start', animation: 'messageBubbleIn 200ms ease-out' }}>
                <div style={{ maxWidth: '75%', padding: '10px 14px', borderRadius: isMine ? '16px 16px 4px 16px' : '16px 16px 16px 4px', background: isMine ? 'var(--primary)' : '#fff', color: isMine ? '#fff' : 'var(--text-primary)', fontSize: 13, lineHeight: 1.5, boxShadow: 'var(--shadow-sm)' }}>
                  {msg.text}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 4, marginTop: 4 }}>
                    <span style={{ fontSize: 10, opacity: 0.6 }}>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    {isMine && (msg.read ? <CheckCheck size={12} style={{ opacity: 0.7 }} /> : <Check size={12} style={{ opacity: 0.5 }} />)}
                  </div>
                </div>
              </div>
            );
          })}
          {typing && (
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <div style={{ padding: '10px 18px', borderRadius: '16px 16px 16px 4px', background: '#fff', boxShadow: 'var(--shadow-sm)', display: 'flex', gap: 4 }}>
                <span className="typing-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--text-muted)' }} />
                <span className="typing-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--text-muted)' }} />
                <span className="typing-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--text-muted)' }} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px var(--page-padding)', background: '#fff', boxShadow: '0 -2px 8px rgba(0,0,0,0.05)' }}>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><Paperclip size={20} /></button>
          <input value={text} onChange={e => setText(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()} placeholder="Type a message..." style={{ flex: 1, height: 40, padding: '0 14px', borderRadius: 9999, background: 'var(--bg-page)', border: 'none', outline: 'none', fontSize: 13 }} />
          <button onClick={handleSend} disabled={!text.trim()} style={{ width: 40, height: 40, borderRadius: '50%', background: text.trim() ? 'var(--primary)' : 'var(--border)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: text.trim() ? 'pointer' : 'default', transition: 'background 200ms' }}><Send size={18} /></button>
        </div>
      </div>
    </PageTransition>
  );
}
