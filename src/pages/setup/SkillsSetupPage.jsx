import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Plus } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import PageTransition from '../../components/PageTransition';

const suggestedSkills = ['JavaScript', 'React', 'Python', 'Figma', 'Node.js', 'TypeScript', 'SQL', 'HTML/CSS', 'Java', 'Docker', 'AWS', 'Git'];

export default function SkillsSetupPage() {
  const { dispatch } = useApp();
  const navigate = useNavigate();
  const [skills, setSkills] = useState([]);
  const [exp, setExp] = useState([{ company: '', role: '', duration: '' }]);

  const toggleSkill = (s) => setSkills(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);

  const handleNext = () => {
    dispatch({ type: 'UPDATE_PROFILE', payload: { skills, experience: exp.filter(e => e.company) } });
    navigate('/setup/resume');
  };

  return (
    <PageTransition>
      <div style={{ minHeight: '100vh', padding: '24px var(--page-padding)', background: 'var(--bg-page)' }}>
        <div style={{ height: 6, borderRadius: 3, background: 'var(--border)', marginBottom: 24, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: '66%', background: 'var(--primary)', borderRadius: 3 }} />
        </div>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Skills & Experience</h2>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 24 }}>Step 2 of 3 — What can you do?</p>
        <label className="form-label">Select your skills</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
          {suggestedSkills.map(s => (
            <button key={s} onClick={() => toggleSkill(s)} style={{
              padding: '8px 14px', borderRadius: 9999, fontSize: 12, fontWeight: 500, border: '1.5px solid',
              background: skills.includes(s) ? 'var(--primary)' : '#fff',
              color: skills.includes(s) ? '#fff' : 'var(--text-secondary)',
              borderColor: skills.includes(s) ? 'var(--primary)' : 'var(--border)',
              cursor: 'pointer', transition: 'all 150ms ease'
            }}>{s}</button>
          ))}
        </div>
        <label className="form-label">Work Experience</label>
        {exp.map((e, i) => (
          <div key={i} className="card" style={{ marginBottom: 12, padding: 16 }}>
            <input className="form-input" placeholder="Company" value={e.company} onChange={ev => { const n = [...exp]; n[i].company = ev.target.value; setExp(n); }} style={{ marginBottom: 8 }} />
            <input className="form-input" placeholder="Role" value={e.role} onChange={ev => { const n = [...exp]; n[i].role = ev.target.value; setExp(n); }} style={{ marginBottom: 8 }} />
            <input className="form-input" placeholder="Duration (e.g. 2 years)" value={e.duration} onChange={ev => { const n = [...exp]; n[i].duration = ev.target.value; setExp(n); }} />
          </div>
        ))}
        <button className="btn-secondary" onClick={() => setExp([...exp, { company: '', role: '', duration: '' }])} style={{ marginBottom: 24 }}><Plus size={14} /> Add Experience</button>
        <div style={{ display: 'flex', gap: 12 }}>
          <button className="btn-outline" onClick={() => navigate(-1)} style={{ flex: 1 }}>← Back</button>
          <button className="btn-primary" onClick={handleNext} style={{ flex: 2, height: 48 }}>Next →</button>
        </div>
      </div>
    </PageTransition>
  );
}
