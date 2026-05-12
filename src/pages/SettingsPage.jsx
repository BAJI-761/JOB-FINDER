import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Bell, Shield, Palette, HelpCircle, LogOut, RotateCcw, ChevronRight, Moon } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Modal from '../components/Modal';
import PageTransition from '../components/PageTransition';
import { useState } from 'react';

export default function SettingsPage() {
  const { dispatch } = useApp();
  const navigate = useNavigate();
  const [showReset, setShowReset] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  const sections = [
    { icon: <User size={18} />, label: 'Account', desc: 'Profile, email, password' },
    { icon: <Bell size={18} />, label: 'Notifications', desc: 'Push, email preferences' },
    { icon: <Shield size={18} />, label: 'Privacy', desc: 'Profile visibility, data' },
    { icon: <Palette size={18} />, label: 'Appearance', desc: 'Theme, font size' },
    { icon: <HelpCircle size={18} />, label: 'Help & Support', desc: 'FAQ, contact us' },
  ];

  return (
    <PageTransition>
      <div className="page-content" style={{ padding: 'var(--page-padding)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}><ArrowLeft size={22} /></button>
          <h1 style={{ fontSize: 20, fontWeight: 700 }}>Settings</h1>
        </div>
        <div className="card" style={{ padding: 8, marginBottom: 16 }}>
          {sections.map((s, i) => (
            <button key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, width: '100%', padding: '16px 12px', background: 'none', border: 'none', cursor: 'pointer', borderBottom: i < sections.length - 1 ? '1px solid var(--border-light)' : 'none' }}>
              <span style={{ color: 'var(--primary)' }}>{s.icon}</span>
              <div style={{ flex: 1, textAlign: 'left' }}><div style={{ fontSize: 14, fontWeight: 500 }}>{s.label}</div><div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{s.desc}</div></div>
              <ChevronRight size={16} color="var(--text-muted)" />
            </button>
          ))}
        </div>
        <div className="card" style={{ padding: 8 }}>
          <button onClick={() => setShowReset(true)} style={{ display: 'flex', alignItems: 'center', gap: 14, width: '100%', padding: '16px 12px', background: 'none', border: 'none', cursor: 'pointer', borderBottom: '1px solid var(--border-light)' }}>
            <RotateCcw size={18} color="var(--status-pending)" />
            <span style={{ flex: 1, textAlign: 'left', fontSize: 14, fontWeight: 500, color: 'var(--status-pending)' }}>Reset Demo Data</span>
          </button>
          <button onClick={() => setShowLogout(true)} style={{ display: 'flex', alignItems: 'center', gap: 14, width: '100%', padding: '16px 12px', background: 'none', border: 'none', cursor: 'pointer' }}>
            <LogOut size={18} color="var(--accent)" />
            <span style={{ flex: 1, textAlign: 'left', fontSize: 14, fontWeight: 500, color: 'var(--accent)' }}>Log Out</span>
          </button>
        </div>

        <Modal isOpen={showReset} onClose={() => setShowReset(false)} type="warning" title="Reset All Data?" message="This will clear all your data and restore the demo state."
          actions={<><button className="btn-outline" onClick={() => setShowReset(false)}>Cancel</button><button className="btn-primary" style={{ background: 'var(--status-pending)', boxShadow: 'none' }} onClick={() => { dispatch({ type: 'RESET_DATA' }); navigate('/'); }}>Reset</button></>} />
        <Modal isOpen={showLogout} onClose={() => setShowLogout(false)} type="warning" title="Log Out?" message="Are you sure you want to log out?"
          actions={<><button className="btn-outline" onClick={() => setShowLogout(false)}>Cancel</button><button className="btn-primary" style={{ background: 'var(--accent)', boxShadow: 'none' }} onClick={() => { dispatch({ type: 'LOGOUT' }); navigate('/login'); }}>Log Out</button></>} />
      </div>
    </PageTransition>
  );
}
