import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, X, Plus } from 'lucide-react';
import { useApp } from '../context/AppContext';
import PageTransition from '../components/PageTransition';
import Modal from '../components/Modal';

const jobTypes = ['Full-time', 'Part-time', 'Freelance', 'Internship'];
const workplaceTypes = ['On-Site', 'Remote', 'Hybrid'];

export default function PostJobPage() {
  const { dispatch, state } = useApp();
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [form, setForm] = useState({ title: '', company: state.currentUser?.companyName || '', description: '', salaryMin: '', salaryMax: '', jobType: 'Full-time', workplaceType: 'On-Site', location: '', workingHours: '9 AM - 6 PM', experience: '0-2 years', skills: [], tags: [] });
  const [skillInput, setSkillInput] = useState('');

  const addSkill = () => { if (skillInput.trim() && !form.skills.includes(skillInput.trim())) { setForm({ ...form, skills: [...form.skills, skillInput.trim()], tags: [...form.tags, skillInput.trim()] }); setSkillInput(''); } };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.location) { dispatch({ type: 'ADD_TOAST', payload: { type: 'error', message: 'Please fill required fields' } }); return; }
    dispatch({ type: 'ADD_JOB', payload: { ...form, salaryMin: Number(form.salaryMin) || 0, salaryMax: Number(form.salaryMax) || 0, trusted: true } });
    setShowSuccess(true);
  };

  return (
    <PageTransition>
      <div className="page-content" style={{ padding: 'var(--page-padding)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}><ArrowLeft size={22} /></button>
          <h1 style={{ fontSize: 20, fontWeight: 700 }}>Post a Job</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="card" style={{ padding: 20, marginBottom: 16 }}>
            <div className="form-group"><label className="form-label">Job Title *</label><input className="form-input" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Senior UI/UX Designer" /></div>
            <div className="form-group"><label className="form-label">Company</label><input className="form-input" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} /></div>
            <div className="form-group"><label className="form-label">Description *</label><textarea className="form-textarea" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Describe the role, responsibilities, requirements..." /></div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div className="form-group"><label className="form-label">Min Salary ($)</label><input className="form-input" type="number" value={form.salaryMin} onChange={e => setForm({ ...form, salaryMin: e.target.value })} placeholder="50000" /></div>
              <div className="form-group"><label className="form-label">Max Salary ($)</label><input className="form-input" type="number" value={form.salaryMax} onChange={e => setForm({ ...form, salaryMax: e.target.value })} placeholder="80000" /></div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div className="form-group"><label className="form-label">Job Type</label><select className="form-select" value={form.jobType} onChange={e => setForm({ ...form, jobType: e.target.value })}>{jobTypes.map(t => <option key={t} value={t}>{t}</option>)}</select></div>
              <div className="form-group"><label className="form-label">Workplace</label><select className="form-select" value={form.workplaceType} onChange={e => setForm({ ...form, workplaceType: e.target.value })}>{workplaceTypes.map(t => <option key={t} value={t}>{t}</option>)}</select></div>
            </div>
            <div className="form-group"><label className="form-label">Location *</label><input className="form-input" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} placeholder="Bangalore, India" /></div>
            <div className="form-group"><label className="form-label">Experience</label><input className="form-input" value={form.experience} onChange={e => setForm({ ...form, experience: e.target.value })} placeholder="0-2 years" /></div>
            <div className="form-group">
              <label className="form-label">Skills</label>
              <div style={{ display: 'flex', gap: 8 }}>
                <input className="form-input" value={skillInput} onChange={e => setSkillInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addSkill())} placeholder="Add skill" />
                <button type="button" className="btn-secondary" onClick={addSkill}><Plus size={14} /></button>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
                {form.skills.map(s => (
                  <span key={s} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 10px', borderRadius: 9999, background: 'var(--primary-light)', color: 'var(--primary)', fontSize: 12, fontWeight: 500 }}>
                    {s} <X size={12} style={{ cursor: 'pointer' }} onClick={() => setForm({ ...form, skills: form.skills.filter(x => x !== s) })} />
                  </span>
                ))}
              </div>
            </div>
          </div>
          <button type="submit" className="btn-primary">Post Job 🚀</button>
        </form>
        <Modal isOpen={showSuccess} onClose={() => { setShowSuccess(false); navigate('/my-postings'); }} type="success" title="Job Posted! 🎉" message="Your job has been posted successfully and is now visible to candidates." />
      </div>
    </PageTransition>
  );
}
