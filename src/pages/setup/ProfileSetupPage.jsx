import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, MapPin, FileText } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import PageTransition from '../../components/PageTransition';

export default function ProfileSetupPage() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: state.currentUser?.name || '', headline: '', location: '', bio: '' });

  const handleNext = () => {
    dispatch({ type: 'UPDATE_PROFILE', payload: { name: form.name, headline: form.headline, location: { label: form.location, address: form.location }, bio: form.bio } });
    navigate('/setup/skills');
  };

  return (
    <PageTransition>
      <div style={{ minHeight: '100vh', padding: '24px var(--page-padding)', background: 'var(--bg-page)' }}>
        <div style={{ height: 6, borderRadius: 3, background: 'var(--border)', marginBottom: 24, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: '33%', background: 'var(--primary)', borderRadius: 3, transition: 'width 300ms ease' }} />
        </div>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Personal Info</h2>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 24 }}>Step 1 of 3 — Tell us about yourself</p>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 24 }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', fontSize: 28, fontWeight: 700 }}>
            {form.name?.[0]?.toUpperCase() || '?'}
          </div>
          <button className="btn-secondary" style={{ marginTop: 12, fontSize: 12 }}>Upload Photo</button>
        </div>
        <div className="form-group"><label className="form-label">Full Name</label><input className="form-input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="John Doe" /></div>
        <div className="form-group"><label className="form-label">Headline</label><input className="form-input" value={form.headline} onChange={e => setForm({ ...form, headline: e.target.value })} placeholder="UI/UX Designer" /></div>
        <div className="form-group"><label className="form-label">Location</label><input className="form-input" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} placeholder="Bangalore, India" /></div>
        <div className="form-group"><label className="form-label">Bio</label><textarea className="form-textarea" value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} placeholder="Tell us about yourself..." rows={3} /></div>
        <button className="btn-primary" onClick={handleNext} style={{ marginTop: 8 }}>Next →</button>
      </div>
    </PageTransition>
  );
}
