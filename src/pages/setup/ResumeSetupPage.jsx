import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileText, CheckCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import PageTransition from '../../components/PageTransition';

export default function ResumeSetupPage() {
  const { dispatch } = useApp();
  const navigate = useNavigate();
  const [fileName, setFileName] = useState('');
  const [done, setDone] = useState(false);

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (file) { setFileName(file.name); dispatch({ type: 'UPDATE_PROFILE', payload: { resume: file.name } }); }
  };

  const handleComplete = () => { setDone(true); setTimeout(() => navigate('/home', { replace: true }), 1500); };

  if (done) return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-page)' }}>
      <div className="scale-in" style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--trusted-green-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
        <CheckCircle size={40} color="var(--trusted-green)" />
      </div>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>All Set! 🎉</h2>
      <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>Redirecting to home...</p>
    </div>
  );

  return (
    <PageTransition>
      <div style={{ minHeight: '100vh', padding: '24px var(--page-padding)', background: 'var(--bg-page)' }}>
        <div style={{ height: 6, borderRadius: 3, background: 'var(--border)', marginBottom: 24, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: '100%', background: 'var(--trusted-green)', borderRadius: 3, animation: 'progressFill 500ms ease-out' }} />
        </div>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Upload Resume</h2>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 24 }}>Step 3 of 3 — Almost done!</p>
        <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 40, border: '2px dashed var(--border)', borderRadius: 16, background: '#fff', cursor: 'pointer', transition: 'all 200ms ease' }}>
          <input type="file" accept=".pdf" onChange={handleFile} style={{ display: 'none' }} />
          {fileName ? <FileText size={40} color="var(--primary)" /> : <Upload size={40} color="var(--text-muted)" />}
          <span style={{ marginTop: 12, fontSize: 14, fontWeight: 600, color: fileName ? 'var(--primary)' : 'var(--text-secondary)' }}>{fileName || 'Drag & drop or click to upload'}</span>
          <span style={{ marginTop: 4, fontSize: 11, color: 'var(--text-muted)' }}>PDF only, max 5MB</span>
        </label>
        <div style={{ display: 'flex', gap: 12, marginTop: 32 }}>
          <button className="btn-outline" onClick={() => navigate(-1)} style={{ flex: 1 }}>← Back</button>
          <button className="btn-primary" onClick={handleComplete} style={{ flex: 2, height: 48 }}>Complete Setup ✅</button>
        </div>
        <button onClick={() => navigate('/home', { replace: true })} style={{ width: '100%', marginTop: 16, fontSize: 13, color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}>Skip for now</button>
      </div>
    </PageTransition>
  );
}
