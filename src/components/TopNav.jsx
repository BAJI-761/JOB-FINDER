import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Briefcase, Search, MessageCircle, User, Bell, Plus, Menu, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import styles from './TopNav.module.css';

export default function TopNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { state, getUnreadChatCount, getUnreadNotificationCount } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const isEmployer = state.auth.role === 'employer';
  const unreadChats = getUnreadChatCount();
  const unreadNotifs = getUnreadNotificationCount();
  const path = location.pathname;

  const candidateItems = [
    { path: '/home', icon: Home, label: 'Home' },
    { path: '/jobs', icon: Briefcase, label: 'Jobs' },
    { path: '/chats', icon: MessageCircle, label: 'Messaging', badge: unreadChats },
    { path: '/notifications', icon: Bell, label: 'Notifications', badge: unreadNotifs },
  ];

  const employerItems = [
    { path: '/home', icon: Home, label: 'Home' },
    { path: '/my-postings', icon: Briefcase, label: 'My Postings' },
    { path: '/chats', icon: MessageCircle, label: 'Messaging', badge: unreadChats },
    { path: '/notifications', icon: Bell, label: 'Notifications', badge: unreadNotifs },
  ];

  const items = isEmployer ? employerItems : candidateItems;

  return (
    <nav className={styles.topNav}>
      <div className={styles.container}>
        {/* Logo */}
        <div className={styles.logoArea} onClick={() => navigate('/home')} style={{ cursor: 'pointer' }}>
          <div className={styles.logoIcon}>JF</div>
          <span className={styles.logoText}>JobFinder</span>
        </div>

        {/* Desktop Navigation */}
        <div className={styles.desktopNav}>
          <button 
            className={styles.searchBtn} 
            onClick={() => navigate(isEmployer ? '/my-postings' : '/search')}
          >
            <Search size={16} />
            <span>Search</span>
          </button>
          
          <div style={{ width: 24 }} /> {/* Spacer */}
          
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = path === item.path || (item.path === '/home' && path === '/');
            return (
              <button
                key={item.path}
                className={`${styles.navItem} ${isActive ? styles.active : ''}`}
                onClick={() => navigate(item.path)}
              >
                <Icon size={22} />
                <span className={styles.navLabel}>{item.label}</span>
                {item.badge > 0 && <span className={styles.badge}>{item.badge}</span>}
              </button>
            );
          })}
        </div>

        {/* User / Actions */}
        <div className={styles.userActions}>
          {isEmployer && (
            <button className="btn-secondary" style={{ display: 'none' }} onClick={() => navigate('/post-job')}>
              <Plus size={16} /> Post Job
            </button>
          )}
          
          <div 
            className={styles.avatar} 
            onClick={() => navigate('/profile')}
            style={{ display: 'none' }} // Hidden on mobile, shown on desktop (handled in CSS usually, but let's handle via media queries ideally. Will just make it flex below)
          >
            {state.currentUser?.name?.[0]?.toUpperCase() || 'U'}
          </div>

          <button className={styles.mobileMenuBtn} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div style={{
          position: 'absolute', top: 60, left: 0, right: 0, background: 'var(--bg-card)', 
          boxShadow: 'var(--shadow-nav)', padding: '16px', display: 'flex', flexDirection: 'column', gap: 12
        }}>
          {isEmployer && (
            <button className="btn-primary" onClick={() => { navigate('/post-job'); setMobileMenuOpen(false); }}>
              <Plus size={16} /> Post Job
            </button>
          )}
          <button className="btn-outline" onClick={() => { navigate(isEmployer ? '/my-postings' : '/search'); setMobileMenuOpen(false); }}>
            <Search size={16} /> Search
          </button>
          
          <div style={{ height: 1, background: 'var(--border)' }} />
          
          {items.map(item => (
            <button key={item.path} onClick={() => { navigate(item.path); setMobileMenuOpen(false); }}
              style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 8px', background: 'none', border: 'none', fontSize: 16, fontWeight: 500 }}>
              <item.icon size={20} />
              {item.label}
              {item.badge > 0 && <span style={{ background: 'var(--accent)', color: '#fff', fontSize: 11, padding: '2px 8px', borderRadius: 12 }}>{item.badge}</span>}
            </button>
          ))}
          
          <div style={{ height: 1, background: 'var(--border)' }} />
          
          <button onClick={() => { navigate('/profile'); setMobileMenuOpen(false); }}
            style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 8px', background: 'none', border: 'none', fontSize: 16, fontWeight: 500 }}>
            <User size={20} />
            Profile
          </button>
        </div>
      )}
      
      {/* Dynamic media queries via inline styles for simplicity on buttons that should toggle */}
      <style>{`
        @media (min-width: 768px) {
          .${styles.userActions} > .btn-secondary { display: flex !important; }
          .${styles.avatar} { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
