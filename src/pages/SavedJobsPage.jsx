import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bookmark } from 'lucide-react';
import { useApp } from '../context/AppContext';
import PageTransition from '../components/PageTransition';
import JobCard from '../components/JobCard';

export default function SavedJobsPage() {
  const { getSavedJobs } = useApp();
  const navigate = useNavigate();
  const saved = getSavedJobs();

  return (
    <PageTransition>
      <div className="page-content" style={{ padding: 'var(--page-padding)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}><ArrowLeft size={22} /></button>
          <h1 style={{ fontSize: 20, fontWeight: 700 }}>Saved Jobs</h1>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {saved.length > 0 ? saved.map((j, i) => <JobCard key={j.id} job={j} index={i} />) : (
            <div className="empty-state"><div className="empty-state-icon"><Bookmark size={32} /></div><div className="empty-state-title">No saved jobs yet</div><div className="empty-state-text">Tap the bookmark icon on any job to save it here</div></div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
