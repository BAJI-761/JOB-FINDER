import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useApp } from '../context/AppContext';
import PageTransition from '../components/PageTransition';
import AuthLayout from '../components/AuthLayout';
import { AUTH_ASSETS } from '../data/OnboardingAssets';

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

  const roleContent = {
    candidate: {
      title: "Join the Network",
      subtitle: "Establish your professional identity on the leading editorial platform.",
      sidebarTitle: "The Blueprint for Your Career",
      sidebarSubtitle: "Connect with high-authority professionals and discover exclusive opportunities.",
      image: AUTH_ASSETS.REGISTER_CANDIDATE
    },
    employer: {
      title: "Recruit Authority",
      subtitle: "Position your organization at the center of industry excellence.",
      sidebarTitle: "Source the Industry's Elite",
      sidebarSubtitle: "Establish your firm's authority and find the leaders of tomorrow.",
      image: AUTH_ASSETS.REGISTER_EMPLOYER
    }
  };

  const content = roleContent[role];

  const handleRegister = (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirm) { setError('Please fill in all fields'); return; }
    if (password !== confirm) { setError('Passwords do not match'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters'); return; }
    if (state.users.find(u => u.email === email)) { setError('Email already registered'); return; }
    dispatch({ type: 'REGISTER', payload: { name, email, password, role } });
    if (role === 'employer') {
      navigate('/setup/company', { replace: true });
    } else {
      navigate('/setup/profile', { replace: true });
    }
  };

  return (
    <PageTransition variant="newsprint">
      <AuthLayout 
        image={content.image}
        title={content.title}
        subtitle={content.subtitle}
        sidebarTitle={content.sidebarTitle}
        sidebarSubtitle={content.sidebarSubtitle}
      >
        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {/* Role Toggle */}
          <div style={{ display: 'flex', background: 'var(--bg-page)', padding: '2px', border: '1px solid var(--border)', marginBottom: '0px' }}>
            {['candidate', 'employer'].map(r => (
              <button 
                key={r} 
                type="button"
                onClick={() => setRole(r)} 
                style={{
                  flex: 1, 
                  padding: '10px 0', 
                  fontSize: '12px', 
                  fontFamily: 'var(--font-mono)',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  fontWeight: 600, 
                  border: 'none', 
                  cursor: 'pointer',
                  background: role === r ? 'var(--primary)' : 'transparent', 
                  color: role === r ? 'var(--bg-page)' : 'var(--text-muted)',
                  transition: 'all 200ms ease',
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: 8
                }}
              >
                {r === 'candidate' ? 'Professional' : 'Hiring Agent'}
              </button>
            ))}
          </div>

          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label" style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Full Name</label>
            <div style={{ position: 'relative' }}>
              <User size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                className="form-input" 
                style={{ paddingLeft: 40, background: 'transparent', height: '40px' }} 
                placeholder="Editorial Professional" 
                value={name} 
                onChange={e => { setName(e.target.value); setError(''); }} 
              />
            </div>
          </div>

          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label" style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                className="form-input" 
                style={{ paddingLeft: 40, background: 'transparent', height: '40px' }} 
                type="email" 
                placeholder="you@authority.com" 
                value={email} 
                onChange={e => { setEmail(e.target.value); setError(''); }} 
              />
            </div>
          </div>

          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label" style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                className="form-input" 
                style={{ paddingLeft: 40, paddingRight: 40, background: 'transparent', height: '40px' }} 
                type={showPw ? 'text' : 'password'} 
                placeholder="Minimum 6 characters" 
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

          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label" style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Confirm Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                className="form-input" 
                style={{ paddingLeft: 40, background: 'transparent', height: '40px' }} 
                type="password" 
                placeholder="Re-enter password" 
                value={confirm} 
                onChange={e => { setConfirm(e.target.value); setError(''); }} 
              />
            </div>
          </div>

          {error && <p className="form-error" style={{ margin: 0 }}>{error}</p>}

          <button type="submit" className="btn-primary" style={{ height: '40px', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '0px' }}>
            Initialize Account
          </button>

          <p style={{ 
            textAlign: 'center', 
            fontSize: '13px', 
            marginTop: '8px', 
            color: 'var(--text-secondary)',
            fontFamily: 'var(--font-sans)'
          }}>
            Already part of the network? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: '600', textDecoration: 'none' }}>Sign In</Link>
          </p>
        </form>
      </AuthLayout>
    </PageTransition>
  );
}
