import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
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
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import styles from './DashboardLayout.module.css';
import { motion, AnimatePresence } from 'framer-motion';

const DashboardLayout = ({ children }) => {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

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

  return (
    <div className={styles.layoutWrapper}>
      {/* Editorial Sidebar (Desktop) */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h1 className={styles.brand} onClick={() => navigate('/home')}>LinkUp</h1>
          <p className={styles.edition}>Edition No. 124</p>
        </div>

        <nav className={styles.nav}>
          {navItems.map((item) => (
            <NavLink 
              key={item.path} 
              to={item.path} 
              className={({ isActive }) => isActive ? `${styles.navItem} ${styles.active}` : styles.navItem}
            >
              <item.icon size={20} strokeWidth={1.5} />
              <span>{item.label}</span>
            </NavLink>
          ))}
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
        <div className={styles.contentGrid}>
          {/* Top Utilities (Search/Notifications) */}
          <div className={styles.topUtilities}>
            <div className={styles.searchBar}>
              <Search size={18} className={styles.searchIcon} />
              <input type="text" placeholder="Search the archives..." className={styles.searchInput} />
            </div>
            <div className={styles.utilityActions}>
              <button className={styles.notifBtn}>
                <Bell size={20} strokeWidth={1.5} />
                <span className={styles.notifBadge} />
              </button>
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
      </main>
    </div>
  );
};

export default DashboardLayout;
