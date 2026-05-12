import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import MagneticButton from './MagneticButton';
import styles from './LandingHeader.module.css';

export default function LandingHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  const handleNavClick = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <div className={styles.logo} onClick={() => navigate('/')}>
          LINKUP<span>.</span>
        </div>

        <nav className={styles.desktopNav}>
          <a href="#product" className={styles.navLink} onClick={(e) => handleNavClick(e, 'product')}>Product</a>
          <a href="#features" className={styles.navLink} onClick={(e) => handleNavClick(e, 'features')}>Features</a>
          <a href="#pricing" className={styles.navLink} onClick={(e) => handleNavClick(e, 'pricing')}>Pricing</a>
          <a href="#about" className={styles.navLink} onClick={(e) => handleNavClick(e, 'about')}>About</a>
        </nav>

        <div className={styles.authActions}>
          <button 
            className={styles.themeToggle} 
            onClick={toggleTheme}
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <button className={styles.signInBtn} onClick={() => navigate('/login')}>
            Sign In
          </button>
          <MagneticButton onClick={() => navigate('/register')} className={styles.getStartedBtn}>
            <span style={{ padding: '0 24px', height: '100%', display: 'flex', alignItems: 'center' }}>Get Started</span>
          </MagneticButton>
          
          <button 
            className={styles.mobileMenuToggle} 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.open : ''}`}>
        <nav className={styles.mobileNav}>
          <a href="#product" onClick={(e) => handleNavClick(e, 'product')}>Product</a>
          <a href="#features" onClick={(e) => handleNavClick(e, 'features')}>Features</a>
          <a href="#pricing" onClick={(e) => handleNavClick(e, 'pricing')}>Pricing</a>
          <a href="#about" onClick={(e) => handleNavClick(e, 'about')}>About</a>
          <div className={styles.mobileAuth}>
            <button onClick={() => navigate('/login')}>Sign In</button>
            <button onClick={() => navigate('/register')}>Get Started</button>
          </div>
        </nav>
      </div>
    </header>
  );
}
