import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, X, Plus } from 'lucide-react';
import { useApp } from '../context/AppContext';
import PageTransition from '../components/PageTransition';

const jobTypes = ['Full-time', 'Part-time', 'Freelance', 'Internship'];
const workplaceTypes = ['On-Site', 'Remote', 'Hybrid'];

export default function EditJobPage() {
  const { id } = useParams();
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const job = state.jobs.find(j => j.id === id);
  const [form, setForm] = useState({});
  const [skillInput, setSkillInput] = useState('');

  useEffect(() => { if (job) setForm({ ...job }); }, [id]);

  if (!job) return <div className="empty-state"><div className="empty-state-title">Job not found</div></div>;
  if (job.postedBy !== state.currentUser?.id) return <div className="empty-state"><div className="empty-state-title">Not authorized</div></div>;

  const addSkill = () => { if (skillInput.trim()) { setForm({ ...form, skills: [...(form.skills || []), skillInput.trim()] }); setSkillInput(''); } };

  const handleSave = () => {
    dispatch({ type: 'EDIT_JOB', payload: { ...form, salaryMin: Number(form.salaryMin), salaryMax: Number(form.salaryMax) } });
    navigate('/my-postings');
  };

  return (
    <PageTransition>
      <div className="page-content" style={{ padding: 'var(--page-padding)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}><ArrowLeft size={22} /></button>
            <h1 style={{ fontSize: 20, fontWeight: 700 }}>Edit Job</h1>
          </div>
          <button className="btn-outline" onClick={() => navigate(-1)}>Cancel</button>
        </div>
        <div className="card" style={{ padding: 20, marginBottom: 16 }}>
          <div className="form-group"><label className="form-label">Job Title</label><input className="form-input" value={form.title || ''} onChange={e => setForm({ ...form, title: e.target.value })} /></div>
          <div className="form-group"><label className="form-label">Description</label><textarea className="form-textarea" value={form.description || ''} onChange={e => setForm({ ...form, description: e.target.value })} /></div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div className="form-group"><label className="form-label">Min Salary</label><input className="form-input" type="number" value={form.salaryMin || ''} onChange={e => setForm({ ...form, salaryMin: e.target.value })} /></div>
            <div className="form-group"><label className="form-label">Max Salary</label><input className="form-input" type="number" value={form.salaryMax || ''} onChange={e => setForm({ ...form, salaryMax: e.target.value })} /></div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div className="form-group"><label className="form-label">Job Type</label><select className="form-select" value={form.jobType || ''} onChange={e => setForm({ ...form, jobType: e.target.value })}>{jobTypes.map(t => <option key={t}>{t}</option>)}</select></div>
            <div className="form-group"><label className="form-label">Workplace</label><select className="form-select" value={form.workplaceType || ''} onChange={e => setForm({ ...form, workplaceType: e.target.value })}>{workplaceTypes.map(t => <option key={t}>{t}</option>)}</select></div>
          </div>
          <div className="form-group"><label className="form-label">Location</label><input className="form-input" value={form.location || ''} onChange={e => setForm({ ...form, location: e.target.value })} /></div>
          <div className="form-group">
            <label className="form-label">Skills</label>
            <div style={{ display: 'flex', gap: 8 }}><input className="form-input" value={skillInput} onChange={e => setSkillInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addSkill())} placeholder="Add skill" /><button type="button" className="btn-secondary" onClick={addSkill}><Plus size={14} /></button></div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
              {(form.skills || []).map(s => (<span key={s} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 10px', borderRadius: 9999, background: 'var(--primary-light)', color: 'var(--primary)', fontSize: 12 }}>{s}<X size={12} style={{ cursor: 'pointer' }} onClick={() => setForm({ ...form, skills: form.skills.filter(x => x !== s) })} /></span>))}
            </div>
          </div>
        </div>
        <button className="btn-primary" onClick={handleSave}>Save Changes ✅</button>
      </div>
    </PageTransition>
  );
}
