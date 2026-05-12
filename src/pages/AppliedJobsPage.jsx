import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ClipboardCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import CompanyLogo from '../components/CompanyLogo';
import PageTransition from '../components/PageTransition';

export default function AppliedJobsPage() {
  const { state, getUserApplications } = useApp();
  const navigate = useNavigate();
  const applications = getUserApplications();

  const getJob = (jobId) => state.jobs.find(j => j.id === jobId);
  const statusColors = { pending: 'var(--status-pending)', reviewed: 'var(--status-reviewed)', shortlisted: 'var(--status-shortlisted)', rejected: 'var(--status-rejected)' };
  const statusBg = { pending: 'var(--status-pending-bg)', reviewed: 'var(--status-reviewed-bg)', shortlisted: 'var(--status-shortlisted-bg)', rejected: 'var(--status-rejected-bg)' };

  return (
    <PageTransition>
      <div className="page-content" style={{ padding: 'var(--page-padding)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}><ArrowLeft size={22} /></button>
          <h1 style={{ fontSize: 20, fontWeight: 700 }}>Applied Jobs</h1>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {applications.length > 0 ? applications.map((app, i) => {
            const job = getJob(app.jobId);
            if (!job) return null;
            return (
              <div key={app.id} className="card stagger-enter" style={{ animationDelay: `${i * 60}ms`, display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }} onClick={() => navigate(`/job/${job.id}`)}>
                <CompanyLogo company={job.company} size="md" />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{job.title}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{job.company}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Applied {new Date(app.appliedDate).toLocaleDateString()}</div>
                </div>
                <span className="status-badge" style={{ background: statusBg[app.status], color: statusColors[app.status] }}>{app.status}</span>
              </div>
            );
          }) : (
            <div className="empty-state"><div className="empty-state-icon"><ClipboardCheck size={32} /></div><div className="empty-state-title">No applications yet</div><div className="empty-state-text">Start applying to jobs you're interested in</div></div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
