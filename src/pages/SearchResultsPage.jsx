import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';
import PageTransition from '../components/PageTransition';
import SearchBar from '../components/SearchBar';
import JobCard from '../components/JobCard';

export default function SearchResultsPage() {
  const { state, dispatch, getFilteredJobs } = useApp();
  const navigate = useNavigate();
  const jobs = getFilteredJobs();

  return (
    <PageTransition>
      <div className="page-content" style={{ padding: 'var(--page-padding)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}><ArrowLeft size={22} /></button>
          <div style={{ flex: 1 }}>
            <SearchBar value={state.searchQuery} onChange={v => dispatch({ type: 'SET_SEARCH', payload: v })} />
          </div>
        </div>
        <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>{jobs.length} results found</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {jobs.length > 0 ? jobs.map((j, i) => <JobCard key={j.id} job={j} index={i} />) : (
            <div className="empty-state"><div className="empty-state-icon">🔍</div><div className="empty-state-title">No jobs found</div><div className="empty-state-text">Try different keywords</div></div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
