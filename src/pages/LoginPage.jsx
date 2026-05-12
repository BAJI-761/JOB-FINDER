import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useApp } from '../context/AppContext';
import PageTransition from '../components/PageTransition';
import AuthLayout from '../components/AuthLayout';
import loginAuthImg from '../assets/login_auth.png';

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
    <PageTransition variant="newsprint">
      <AuthLayout 
        image={loginAuthImg}
        title="Welcome Back"
        subtitle="Secure access to your professional dashboard."
        sidebarTitle="The Authority in Professional Networking"
        sidebarSubtitle="Revisit your connections and stay ahead of the industry curve."
      >
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label" style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                className="form-input" 
                style={{ paddingLeft: 40, background: 'transparent', height: '48px' }} 
                type="email" 
                placeholder="candidate@demo.com" 
                value={email} 
                onChange={e => { setEmail(e.target.value); setError(''); }} 
              />
            </div>
          </div>

          <div className="form-group" style={{ margin: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '6px' }}>
              <label className="form-label" style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Password</label>
              <button 
                type="button" 
                onClick={() => navigate('/forgot-password')}
                style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', fontSize: '12px', cursor: 'pointer', fontFamily: 'var(--font-sans)', padding: 0 }}
              >
                Forgot Password?
              </button>
            </div>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                className="form-input" 
                style={{ paddingLeft: 40, paddingRight: 40, background: 'transparent', height: '48px' }} 
                type={showPw ? 'text' : 'password'} 
                placeholder="••••••••" 
                value={password} 
                onChange={e => { setPassword(e.target.value); setError(''); }} 
              />
              <button 
                type="button" 
                onClick={() => setShowPw(!showPw)} 
                style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
              >
                {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input type="checkbox" id="remember" style={{ accentColor: 'var(--primary)' }} />
            <label htmlFor="remember" style={{ fontSize: '13px', color: 'var(--text-secondary)', cursor: 'pointer' }}>Keep me signed in for 30 days</label>
          </div>

          {error && <p className="form-error" style={{ margin: 0 }}>{error}</p>}

          <button type="submit" className="btn-primary" style={{ height: '48px', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Enter Platform
          </button>

          <p style={{ 
            textAlign: 'center', 
            fontSize: '13px', 
            marginTop: '12px', 
            color: 'var(--text-secondary)',
            fontFamily: 'var(--font-sans)'
          }}>
            New to the network? <Link to="/register" style={{ color: 'var(--primary)', fontWeight: '600', textDecoration: 'none' }}>Register an account</Link>
          </p>
        </form>
      </AuthLayout>
    </PageTransition>
  );
}
