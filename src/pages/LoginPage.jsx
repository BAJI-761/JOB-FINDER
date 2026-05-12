import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useApp } from '../context/AppContext';
import PageTransition from '../components/PageTransition';
import styles from './LoginPage.module.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const { dispatch, state } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) { setError('Please fill in all fields'); return; }
    const user = state.users.find(u => u.email === email && u.password === password);
    if (!user) { setError('Invalid email or password'); return; }
    dispatch({ type: 'LOGIN', payload: { email, password } });
    const from = location.state?.from?.pathname || '/home';
    navigate(from, { replace: true });
  };

  return (
    <PageTransition>
      <div className={styles.page}>
        <div className={styles.logo} style={{ fontFamily: 'var(--font-display-family)' }}>LU</div>
        <h1 className={styles.title}>Welcome back!</h1>
        <p className={styles.subtitle}>Sign in to your account</p>
        <div className={styles.card}>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label">Email</label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: 14, top: 16, color: 'var(--text-muted)' }} />
                <input className="form-input" style={{ paddingLeft: 40 }} type="email" placeholder="candidate@demo.com" value={email} onChange={e => { setEmail(e.target.value); setError(''); }} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', left: 14, top: 16, color: 'var(--text-muted)' }} />
                <input className="form-input" style={{ paddingLeft: 40, paddingRight: 40 }} type={showPw ? 'text' : 'password'} placeholder="password123" value={password} onChange={e => { setPassword(e.target.value); setError(''); }} />
                <button type="button" onClick={() => setShowPw(!showPw)} style={{ position: 'absolute', right: 12, top: 12, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                  {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            {error && <p className="form-error" style={{ marginBottom: 12 }}>{error}</p>}
            <div className={styles.row}>
              <label className={styles.checkbox}><input type="checkbox" /> Remember me</label>
              <button type="button" className={styles.forgotLink} onClick={() => navigate('/forgot-password')}>Forgot Password?</button>
            </div>
            <button type="submit" className="btn-primary">Sign In</button>
          </form>
          <div className={styles.divider}><span>OR</span></div>
          <button className={styles.googleBtn}>
            <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Sign in with Google
          </button>
          <p className={styles.footer}>Don't have an account? <a onClick={() => navigate('/register')}>Register</a></p>
        </div>
      </div>
    </PageTransition>
  );
}
