import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2, Users, Plus } from 'lucide-react';
import { useApp } from '../context/AppContext';
import CompanyLogo from '../components/CompanyLogo';
import Modal from '../components/Modal';
import PageTransition from '../components/PageTransition';

export default function MyPostingsPage() {
  const { state, dispatch, getEmployerJobs, getJobApplications } = useApp();
  const navigate = useNavigate();
  const jobs = getEmployerJobs();
  const [deleteId, setDeleteId] = useState(null);

  const handleDelete = () => { dispatch({ type: 'DELETE_JOB', payload: deleteId }); setDeleteId(null); };

  return (
    <PageTransition>
      <div className="page-content" style={{ padding: 'var(--page-padding)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}><ArrowLeft size={22} /></button>
            <h1 style={{ fontSize: 20, fontWeight: 700 }}>My Postings</h1>
          </div>
          <button className="btn-secondary" onClick={() => navigate('/post-job')}><Plus size={14} /> New</button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {jobs.length > 0 ? jobs.map((job, i) => {
            const appCount = getJobApplications(job.id).length;
            return (
              <div key={job.id} className="card stagger-enter" style={{ animationDelay: `${i * 60}ms`, padding: 16 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
                  <CompanyLogo company={job.company} size="md" />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15, fontWeight: 600 }}>{job.title}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{job.company} · {job.location}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>Posted {job.postedDate}</div>
                  </div>
                  <span style={{ padding: '4px 10px', borderRadius: 9999, fontSize: 11, fontWeight: 600, background: 'var(--primary-light)', color: 'var(--primary)' }}>{appCount} applicants</span>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="btn-secondary" style={{ flex: 1, fontSize: 12 }} onClick={() => navigate(`/edit-job/${job.id}`)}><Edit size={14} /> Edit</button>
                  <button className="btn-secondary" style={{ flex: 1, fontSize: 12 }} onClick={() => navigate(`/postings/${job.id}/applicants`)}><Users size={14} /> Applicants</button>
                  <button onClick={() => setDeleteId(job.id)} style={{ width: 40, height: 36, borderRadius: 8, background: 'var(--accent-light)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer' }}><Trash2 size={16} /></button>
                </div>
              </div>
            );
          }) : (
            <div className="empty-state"><div className="empty-state-icon">📋</div><div className="empty-state-title">No postings yet</div><div className="empty-state-text">Post your first job to start receiving applicants</div>
              <button className="btn-primary" style={{ marginTop: 16, maxWidth: 200 }} onClick={() => navigate('/post-job')}>Post a Job</button>
            </div>
          )}
        </div>
        <Modal isOpen={!!deleteId} onClose={() => setDeleteId(null)} type="error" title="Delete Job?" message="This will permanently remove this job posting and all its applications."
          actions={<><button className="btn-outline" onClick={() => setDeleteId(null)}>Cancel</button><button className="btn-primary" style={{ background: 'var(--accent)', boxShadow: 'none' }} onClick={handleDelete}>Delete</button></>} />
      </div>
    </PageTransition>
  );
}
