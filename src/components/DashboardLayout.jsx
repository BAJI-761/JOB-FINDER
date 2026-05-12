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
  Moon
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import styles from './DashboardLayout.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import SmoothScroll from './SmoothScroll';
import gsap from 'gsap';

const DashboardLayout = ({ children }) => {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const brandRef = useRef(null);

  useEffect(() => {
    // Magnetic effect for brand
    const brand = brandRef.current;
    if (!brand) return;

    const onMouseMove = (e) => {
      const { clientX, clientY } = e;
      
      // Update global CSS variables for ambient background
      document.documentElement.style.setProperty('--mouse-x', `${clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${clientY}px`);

      const { left, top, width, height } = brand.getBoundingClientRect();
      const x = (clientX - (left + width / 2)) * 0.2;
      const y = (clientY - (top + height / 2)) * 0.2;
      gsap.to(brand, { x, y, duration: 0.3, ease: 'power2.out' });
    };

    const onMouseLeave = () => {
      gsap.to(brand, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
    };

    window.addEventListener('mousemove', onMouseMove);
    brand.addEventListener('mouseleave', onMouseLeave);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      brand.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

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
      <div className="ambient-bg" />
      <div className="noise-overlay" />
      
      {/* Editorial Sidebar (Desktop) */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <div ref={brandRef} className={styles.brandContainer}>
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
        </SmoothScroll>
      </main>
    </div>
  );
};

export default DashboardLayout;

