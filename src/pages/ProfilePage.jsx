import { useNavigate } from 'react-router-dom';
import { Edit, MapPin, Briefcase, GraduationCap, Settings, LogOut, Bookmark, ClipboardCheck, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import PageTransition from '../components/PageTransition';
import JobTagChip from '../components/JobTagChip';

export default function ProfilePage() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const user = state.currentUser;

  if (!user) return null;

  const menuItems = [
    { icon: <Bookmark size={18} />, label: 'Saved Jobs', path: '/saved-jobs' },
    { icon: <ClipboardCheck size={18} />, label: 'Applied Jobs', path: '/applied-jobs' },
    { icon: <Settings size={18} />, label: 'Settings', path: '/settings' },
  ];

  return (
    <PageTransition>
      <div className="page-content" style={{ padding: 'var(--page-padding)' }}>
        {/* Profile Card */}
        <div className="card" style={{ textAlign: 'center', padding: 24, marginBottom: 16, position: 'relative' }}>
          <button onClick={() => navigate('/edit-profile')} style={{ position: 'absolute', top: 16, right: 16, background: 'var(--primary-light)', width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', border: 'none', cursor: 'pointer' }}>
            <Edit size={14} />
          </button>
          <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 28, fontWeight: 700, margin: '0 auto 12px' }}>
            {user.name?.[0]?.toUpperCase() || 'U'}
          </div>
          <h2 style={{ fontSize: 18, fontWeight: 700 }}>{user.name}</h2>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 4 }}>{user.headline || 'Add your headline'}</p>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}><MapPin size={12} />{user.location?.address || 'Add location'}</p>
          {/* Progress */}
          <div style={{ marginTop: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 4 }}><span style={{ color: 'var(--text-muted)' }}>Profile completion</span><span style={{ fontWeight: 600, color: 'var(--primary)' }}>{user.profileCompletion}%</span></div>
            <div style={{ height: 6, borderRadius: 3, background: 'var(--border)', overflow: 'hidden' }}><div style={{ height: '100%', width: `${user.profileCompletion}%`, background: 'var(--primary)', borderRadius: 3, transition: 'width 500ms ease' }} /></div>
          </div>
        </div>

        {/* Bio */}
        {user.bio && <div className="card" style={{ marginBottom: 16, padding: 16 }}><h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>About</h3><p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{user.bio}</p></div>}

        {/* Skills */}
        {user.skills?.length > 0 && (
          <div className="card" style={{ marginBottom: 16, padding: 16 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Skills</h3>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>{user.skills.map(s => <JobTagChip key={s} label={s} variant="filled" />)}</div>
          </div>
        )}

        {/* Experience */}
        {user.experience?.length > 0 && (
          <div className="card" style={{ marginBottom: 16, padding: 16 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Experience</h3>
            {user.experience.map((e, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, paddingBottom: 12, borderBottom: i < user.experience.length - 1 ? '1px solid var(--border)' : 'none', marginBottom: i < user.experience.length - 1 ? 12 : 0 }}>
                <Briefcase size={16} color="var(--primary)" style={{ marginTop: 2, flexShrink: 0 }} />
                <div><div style={{ fontSize: 13, fontWeight: 600 }}>{e.role}</div><div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{e.company}</div><div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{e.duration}</div></div>
              </div>
            ))}
          </div>
        )}

        {/* Menu */}
        <div className="card" style={{ padding: 8 }}>
          {menuItems.map(item => (
            <button key={item.path} onClick={() => navigate(item.path)} style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%', padding: '14px 12px', background: 'none', border: 'none', cursor: 'pointer', borderRadius: 8, transition: 'background 150ms' }}>
              <span style={{ color: 'var(--primary)' }}>{item.icon}</span>
              <span style={{ flex: 1, textAlign: 'left', fontSize: 14, fontWeight: 500 }}>{item.label}</span>
              <ChevronRight size={16} color="var(--text-muted)" />
            </button>
          ))}
          <button onClick={() => { dispatch({ type: 'LOGOUT' }); navigate('/login'); }} style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%', padding: '14px 12px', background: 'none', border: 'none', cursor: 'pointer', borderRadius: 8, color: 'var(--accent)' }}>
            <LogOut size={18} />
            <span style={{ flex: 1, textAlign: 'left', fontSize: 14, fontWeight: 500 }}>Log Out</span>
          </button>
        </div>
      </div>
    </PageTransition>
  );
}
