import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, X, Plus } from 'lucide-react';
import { useApp } from '../context/AppContext';
import PageTransition from '../components/PageTransition';

export default function EditProfilePage() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const user = state.currentUser;
  const [form, setForm] = useState({ name: user?.name || '', headline: user?.headline || '', location: user?.location?.address || '', bio: user?.bio || '', phone: user?.phone || '' });

  const handleSave = () => {
    dispatch({ type: 'UPDATE_PROFILE', payload: { ...form, location: { label: form.location, address: form.location } } });
    dispatch({ type: 'ADD_TOAST', payload: { type: 'success', message: 'Profile updated!' } });
    navigate(-1);
  };

  return (
    <PageTransition>
      <div className="page-content" style={{ padding: 'var(--page-padding)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}><ArrowLeft size={22} /></button>
            <h1 style={{ fontSize: 20, fontWeight: 700 }}>Edit Profile</h1>
          </div>
          <button className="btn-secondary" onClick={handleSave}>Save</button>
        </div>
        <div className="card" style={{ padding: 20 }}>
          <div className="form-group"><label className="form-label">Full Name</label><input className="form-input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
          <div className="form-group"><label className="form-label">Headline</label><input className="form-input" value={form.headline} onChange={e => setForm({ ...form, headline: e.target.value })} placeholder="UI/UX Designer" /></div>
          <div className="form-group"><label className="form-label">Location</label><input className="form-input" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} placeholder="City, Country" /></div>
          <div className="form-group"><label className="form-label">Phone</label><input className="form-input" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+91 9876543210" /></div>
          <div className="form-group"><label className="form-label">Bio</label><textarea className="form-textarea" value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} /></div>
        </div>
      </div>
    </PageTransition>
  );
}
