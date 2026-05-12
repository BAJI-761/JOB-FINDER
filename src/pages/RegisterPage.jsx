import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useApp } from '../context/AppContext';
import PageTransition from '../components/PageTransition';
import styles from './LoginPage.module.css';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [role, setRole] = useState('candidate');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const { dispatch, state } = useApp();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirm) { setError('Please fill in all fields'); return; }
    if (password !== confirm) { setError('Passwords do not match'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters'); return; }
    if (state.users.find(u => u.email === email)) { setError('Email already registered'); return; }
    dispatch({ type: 'REGISTER', payload: { name, email, password, role } });
    navigate('/setup/profile', { replace: true });
  };

  return (
    <PageTransition>
      <div className={styles.page}>
        <div className={styles.logo} style={{ fontFamily: 'var(--font-display-family)' }}>LU</div>
        <h1 className={styles.title}>Create Account</h1>
        <p className={styles.subtitle}>Join thousands of job seekers & employers</p>
        <div className={styles.card}>
          {/* Role Toggle */}
          <div style={{ display: 'flex', background: 'var(--border-light)', borderRadius: 9999, padding: 4, marginBottom: 24 }}>
            {['candidate', 'employer'].map(r => (
              <button key={r} onClick={() => setRole(r)} style={{
                flex: 1, padding: '10px 0', borderRadius: 9999, fontSize: 13, fontWeight: 600, border: 'none', cursor: 'pointer',
                background: role === r ? 'var(--primary)' : 'transparent', color: role === r ? 'var(--bg-page)' : 'var(--text-muted)',
                boxShadow: role === r ? 'var(--shadow-sm)' : 'none', transition: 'all 200ms ease'
              }}>
                {r === 'candidate' ? '👤 Candidate' : '🏢 Employer'}
              </button>
            ))}
          </div>
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <div style={{ position: 'relative' }}>
                <User size={16} style={{ position: 'absolute', left: 14, top: 16, color: 'var(--text-muted)' }} />
                <input className="form-input" style={{ paddingLeft: 40 }} placeholder="John Doe" value={name} onChange={e => { setName(e.target.value); setError(''); }} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: 14, top: 16, color: 'var(--text-muted)' }} />
                <input className="form-input" style={{ paddingLeft: 40 }} type="email" placeholder="you@example.com" value={email} onChange={e => { setEmail(e.target.value); setError(''); }} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', left: 14, top: 16, color: 'var(--text-muted)' }} />
                <input className="form-input" style={{ paddingLeft: 40, paddingRight: 40 }} type={showPw ? 'text' : 'password'} placeholder="Min 6 characters" value={password} onChange={e => { setPassword(e.target.value); setError(''); }} />
                <button type="button" onClick={() => setShowPw(!showPw)} style={{ position: 'absolute', right: 12, top: 12, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>{showPw ? <EyeOff size={18} /> : <Eye size={18} />}</button>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', left: 14, top: 16, color: 'var(--text-muted)' }} />
                <input className="form-input" style={{ paddingLeft: 40 }} type="password" placeholder="Re-enter password" value={confirm} onChange={e => { setConfirm(e.target.value); setError(''); }} />
              </div>
            </div>
            {error && <p className="form-error" style={{ marginBottom: 12 }}>{error}</p>}
            <button type="submit" className="btn-primary">Create Account</button>
          </form>
          <p className={styles.footer} style={{ marginTop: 16 }}>Already have an account? <a onClick={() => navigate('/login')}>Sign In</a></p>
        </div>
      </div>
    </PageTransition>
  );
}
