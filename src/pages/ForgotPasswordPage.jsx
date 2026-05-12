import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import styles from './LoginPage.module.css';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => { e.preventDefault(); if (email) setSent(true); };

  return (
    <PageTransition>
      <div className={styles.page}>
        {sent ? (
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--trusted-green-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <CheckCircle size={32} color="var(--trusted-green)" />
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Email Sent!</h2>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 24 }}>Check your inbox for password reset instructions.</p>
            <button className="btn-primary" onClick={() => navigate('/login')} style={{ maxWidth: 300 }}>Back to Login</button>
          </div>
        ) : (
          <>
            <button onClick={() => navigate(-1)} style={{ position: 'absolute', top: 20, left: 20, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}><ArrowLeft size={22} /></button>
            <div className={styles.logo}>JF</div>
            <h1 className={styles.title}>Forgot Password?</h1>
            <p className={styles.subtitle}>Enter your email to receive reset instructions</p>
            <div className={styles.card}>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <div style={{ position: 'relative' }}>
                    <Mail size={16} style={{ position: 'absolute', left: 14, top: 16, color: 'var(--text-muted)' }} />
                    <input className="form-input" style={{ paddingLeft: 40 }} type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
                  </div>
                </div>
                <button type="submit" className="btn-primary">Send Reset Link</button>
              </form>
            </div>
          </>
        )}
      </div>
    </PageTransition>
  );
}
