import React, { useEffect, useRef } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, 
  Briefcase, 
  MessageSquare, 
  User, 
  Settings, 
  LogOut, 
  Search, 
  Bell,
  Menu,
  X,
  Sun,
  Moon,
  Zap,
  Clock
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import styles from './DashboardLayout.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import SmoothScroll from './SmoothScroll';
import gsap from 'gsap';

const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [showNotifications, setShowNotifications] = React.useState(false);
  const { state, dispatch, getUnreadNotificationCount } = useApp();
  const unreadCount = getUnreadNotificationCount();
  const notifRef = useRef(null);
  const brandRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatTime = (dateStr) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);
    if (diff < 60) return 'Just Now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  const getNotifIcon = (type) => {
    switch(type) {
      case 'application_update': return <Briefcase size={14} />;
      case 'job_match': return <Zap size={14} />;
      case 'message': return <MessageSquare size={14} />;
      case 'reminder': return <Clock size={14} />;
      default: return <Bell size={14} />;
    }
  };

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  const navItems = [
    { icon: Home, label: 'Front Page', path: '/home' },
    { icon: Briefcase, label: 'The Feed', path: '/jobs' },
    { icon: MessageSquare, label: 'Dispatches', path: '/chats' },
    { icon: User, label: 'Dossier', path: '/profile' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  const NotificationPanel = () => (
    <motion.div 
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      className={styles.notifPanel}
    >
      <div className={styles.notifHeader}>
        <h3 className={styles.notifTitle}>Notifications</h3>
        {unreadCount > 0 && (
          <button 
            className={styles.markAllBtn}
            onClick={() => dispatch({ type: 'MARK_ALL_NOTIFICATIONS_READ' })}
          >
            Mark All Read
          </button>
        )}
      </div>
      <div className={styles.notifList}>
        {state.notifications.length > 0 ? (
          state.notifications.map(n => (
            <div 
              key={n.id} 
              className={`${styles.notifItem} ${!n.read ? styles.unread : ''}`}
              onClick={() => {
                dispatch({ type: 'MARK_NOTIFICATION_READ', payload: n.id });
                if (n.jobId) navigate(`/jobs/${n.jobId}`);
                if (n.chatId) navigate(`/chats`);
                setShowNotifications(false);
              }}
            >
              {!n.read && <div className={styles.unreadIndicator} />}
              <div className={styles.notifIcon}>
                {getNotifIcon(n.type)}
              </div>
              <div className={styles.notifContent}>
                <h4 className={styles.notifItemTitle}>{n.title}</h4>
                <p className={styles.notifMsg}>{n.message}</p>
                <span className={styles.notifTime}>{formatTime(n.timestamp)}</span>
              </div>
            </div>
          ))
        ) : (
          <div className={styles.emptyNotif}>
            <p>The archives are quiet today.</p>
          </div>
        )}
      </div>
      <div className={styles.notifFooter}>
        <button className={styles.viewAllNotif}>Clear History</button>
      </div>
    </motion.div>
  );

  return (
    <div className={styles.layoutWrapper}>
      <div className="ambient-bg" />
      <div className="noise-overlay" />
      
      {/* Editorial Sidebar (Desktop) */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <div className={styles.brandContainer}>
            <h1 className={styles.brand} onClick={() => navigate('/home')}>LinkUp</h1>
          </div>
          <p className={styles.edition}>Edition No. 124</p>
        </div>

        <nav className={styles.nav}>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <NavLink 
                key={item.path} 
                to={item.path} 
                className={({ isActive }) => isActive ? `${styles.navItem} ${styles.active}` : styles.navItem}
              >
                {isActive && (
                  <motion.div 
                    layoutId="activeTab"
                    className={styles.activeIndicator}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <item.icon size={20} strokeWidth={isActive ? 2 : 1.5} className={styles.navIcon} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className={styles.sidebarFooter}>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            <LogOut size={20} strokeWidth={1.5} />
            <span>Sign Off</span>
          </button>
        </div>
      </aside>

      {/* Mobile Top Header */}
      <header className={styles.mobileHeader}>
        <h1 className={styles.brand} onClick={() => navigate('/home')}>LinkUp</h1>
        <button onClick={() => setIsMobileMenuOpen(true)} className={styles.menuBtn}>
          <Menu size={24} />
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className={styles.mobileMenu}
          >
            <div className={styles.mobileMenuHeader}>
              <h1 className={styles.brand}>LinkUp</h1>
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X size={24} />
              </button>
            </div>
            <nav className={styles.mobileNav}>
              {navItems.map((item) => (
                <NavLink 
                  key={item.path} 
                  to={item.path} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) => isActive ? `${styles.navItem} ${styles.active}` : styles.navItem}
                >
                  <item.icon size={20} strokeWidth={1.5} />
                  <span>{item.label}</span>
                </NavLink>
              ))}
              <button onClick={handleLogout} className={styles.logoutBtn}>
                <LogOut size={20} strokeWidth={1.5} />
                <span>Sign Off</span>
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className={styles.mainContent}>
        <SmoothScroll>
          <div className={styles.contentGrid}>
            {/* Top Utilities (Search/Notifications) */}
            <div className={styles.topUtilities}>
              <div className={styles.searchBar}>
                <Search size={18} className={styles.searchIcon} />
                <input type="text" placeholder="Search the archives..." className={styles.searchInput} />
              </div>
              <div className={styles.utilityActions}>
                <button 
                  className={styles.themeToggle} 
                  onClick={() => dispatch({ type: 'TOGGLE_THEME' })}
                  title={`Switch to ${state.theme === 'light' ? 'Dark' : 'Light'} Mode`}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={state.theme}
                      initial={{ y: 10, opacity: 0, rotate: -90 }}
                      animate={{ y: 0, opacity: 1, rotate: 0 }}
                      exit={{ y: -10, opacity: 0, rotate: 90 }}
                      transition={{ duration: 0.2 }}
                    >
                      {state.theme === 'light' ? <Moon size={20} strokeWidth={1.5} /> : <Sun size={20} strokeWidth={1.5} />}
                    </motion.div>
                  </AnimatePresence>
                </button>
                <div className={styles.notifWrapper} ref={notifRef}>
                  <button 
                    className={styles.notifBtn} 
                    onClick={() => setShowNotifications(!showNotifications)}
                  >
                    <Bell size={20} strokeWidth={1.5} />
                    {unreadCount > 0 && <span className={styles.notifBadge}>{unreadCount}</span>}
                  </button>
                  <AnimatePresence>
                    {showNotifications && <NotificationPanel />}
                  </AnimatePresence>
                </div>
                <div className={styles.userProfile} onClick={() => navigate('/profile')}>
                  <div className={styles.avatar}>
                    {state.currentUser?.name?.[0]?.toUpperCase() || 'U'}
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.pageInner}>
              {children}
            </div>
          </div>
        </SmoothScroll>
      </main>
    </div>
  );
};

export default DashboardLayout;

