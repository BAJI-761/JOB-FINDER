import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Calendar } from 'lucide-react';
import { useApp } from '../context/AppContext';
import JobTagChip from '../components/JobTagChip';
import PageTransition from '../components/PageTransition';

export default function ApplicantsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch, getJobApplications } = useApp();
  const job = state.jobs.find(j => j.id === id);
  const applicants = getJobApplications(id);
  const sC = { pending: 'var(--status-pending)', shortlisted: 'var(--status-shortlisted)', rejected: 'var(--status-rejected)' };
  const sB = { pending: 'var(--status-pending-bg)', shortlisted: 'var(--status-shortlisted-bg)', rejected: 'var(--status-rejected-bg)' };

  return (
    <PageTransition>
      <div className="page-content" style={{ padding: 'var(--page-padding)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}><ArrowLeft size={22} /></button>
          <h1 style={{ fontSize: 20, fontWeight: 700 }}>Applicants</h1>
        </div>
        {job && <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 20 }}>For: {job.title}</p>}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {applicants.length > 0 ? applicants.map((app, i) => (
            <div key={app.id} className="card stagger-enter" style={{ animationDelay: `${i*60}ms`, padding: 16 }}>
              <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', fontWeight: 700 }}>{app.userName?.[0] || 'U'}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{app.userName}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{app.userEmail}</div>
                </div>
                <span className="status-badge" style={{ background: sB[app.status], color: sC[app.status] }}>{app.status}</span>
              </div>
              {app.userSkills?.length > 0 && <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 12 }}>{app.userSkills.slice(0,4).map(s => <JobTagChip key={s} label={s} variant="filled" />)}</div>}
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn-secondary" style={{ flex: 1, fontSize: 12 }} onClick={() => dispatch({ type: 'UPDATE_APPLICATION_STATUS', payload: { applicationId: app.id, status: 'shortlisted' } })}>✅ Shortlist</button>
                <button className="btn-outline" style={{ flex: 1, fontSize: 12 }} onClick={() => dispatch({ type: 'UPDATE_APPLICATION_STATUS', payload: { applicationId: app.id, status: 'rejected' } })}>❌ Reject</button>
              </div>
            </div>
          )) : <div className="empty-state"><div className="empty-state-title">No applicants yet</div></div>}
        </div>
      </div>
    </PageTransition>
  );
}
