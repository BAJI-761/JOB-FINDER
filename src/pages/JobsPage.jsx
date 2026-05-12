import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, SlidersHorizontal } from 'lucide-react';
import { useApp } from '../context/AppContext';
import PageTransition from '../components/PageTransition';
import SearchBar from '../components/SearchBar';
import FilterChips from '../components/FilterChips';
import JobCard from '../components/JobCard';
import SavedAppliedToggle from '../components/SavedAppliedToggle';
import styles from './JobsPage.module.css';

const categoryChips = ['UI/UX Designer', 'Frontend Dev', 'Backend Dev', 'Data Science', 'DevOps', 'Product Manager'];

export default function JobsPage() {
  const { state, dispatch, getFilteredJobs, getSavedJobs, getUserApplications } = useApp();
  const navigate = useNavigate();
  const [toggleView, setToggleView] = useState(null);
  const jobs = getFilteredJobs();
  const user = state.currentUser;

  let displayJobs = jobs;
  if (toggleView === 'saved') {
    displayJobs = getSavedJobs();
  } else if (toggleView === 'applied') {
    const appIds = getUserApplications().map(a => a.jobId);
    displayJobs = state.jobs.filter(j => appIds.includes(j.id));
  }

  return (
    <PageTransition>
      <div className={`page-content ${styles.jobsLayout}`}>
        {/* Left Sidebar (Desktop only) */}
        <div className={styles.sidebarLeft}>
          <div className="card">
            <h3 style={{ fontSize: 16, marginBottom: 16 }}>Filters</h3>
            <div className="form-group">
              <label className="form-label">Search</label>
              <SearchBar
                value={state.searchQuery}
                onChange={v => dispatch({ type: 'SET_SEARCH', payload: v })}
                variant="jobs"
              />
            </div>
            <div className="form-group" style={{ marginTop: 16 }}>
              <label className="form-label">Job Type</label>
              <select className="form-select" style={{ height: 40, fontSize: 13 }}>
                <option>All Types</option>
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Contract</option>
                <option>Remote</option>
              </select>
            </div>
          </div>
          
          <div className="card">
            <h3 style={{ fontSize: 16, marginBottom: 12 }}>Categories</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {categoryChips.map(c => (
                <label key={c} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}>
                  <input type="checkbox" checked={state.activeCategory === c} onChange={() => dispatch({ type: 'SET_CATEGORY', payload: state.activeCategory === c ? null : c })} />
                  {c}
                </label>
              ))}
            </div>
          </div>

          <div className="card">
            <h3 style={{ fontSize: 16, marginBottom: 12 }}>My Jobs</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <button 
                className={`btn-outline ${toggleView === null ? 'active' : ''}`}
                style={{ width: '100%', justifyContent: 'flex-start', borderColor: toggleView === null ? 'var(--primary)' : '' }}
                onClick={() => setToggleView(null)}
              >
                All Jobs
              </button>
              <button 
                className={`btn-outline ${toggleView === 'saved' ? 'active' : ''}`}
                style={{ width: '100%', justifyContent: 'flex-start', borderColor: toggleView === 'saved' ? 'var(--primary)' : '' }}
                onClick={() => setToggleView('saved')}
              >
                Saved Jobs
              </button>
              <button 
                className={`btn-outline ${toggleView === 'applied' ? 'active' : ''}`}
                style={{ width: '100%', justifyContent: 'flex-start', borderColor: toggleView === 'applied' ? 'var(--primary)' : '' }}
                onClick={() => setToggleView('applied')}
              >
                Applied Jobs
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className={styles.mainContent}>
          <div className={styles.topBar}>
            <div className={styles.searchFlex}>
              <SearchBar
                value={state.searchQuery}
                onChange={v => dispatch({ type: 'SET_SEARCH', payload: v })}
                variant="jobs"
              />
            </div>
            <div className={styles.userAvatar} onClick={() => navigate('/profile')}>
              {user?.name?.[0]?.toUpperCase() || 'U'}
            </div>
          </div>

          <div className={styles.mobileFilters}>
            <div className={styles.filterRow}>
              <button className={styles.filterBtn}>
                <SlidersHorizontal size={14} /> Filters <ChevronDown size={12} />
              </button>
              <button className={styles.filterBtn}>
                {state.sortBy} <ChevronDown size={12} />
              </button>
            </div>

            <div className={styles.chipsWrap}>
              <FilterChips
                chips={categoryChips}
                activeChip={state.activeCategory}
                onChipClick={c => dispatch({ type: 'SET_CATEGORY', payload: state.activeCategory === c ? null : c })}
              />
            </div>
          </div>

        <div className={styles.resultsRow}>
          <span className={styles.resultsCount}>{displayJobs.length} Jobs Found</span>
          <button className={styles.seeAll}>See all</button>
        </div>

        <div className={styles.jobsList}>
          {displayJobs.length > 0 ? (
            displayJobs.map((job, i) => <JobCard key={job.id} job={job} index={i} />)
          ) : (
            <div className="empty-state">
              <div className="empty-state-icon">📋</div>
              <div className="empty-state-title">No jobs found</div>
              <div className="empty-state-text">Try adjusting your filters or search terms</div>
            </div>
          )}
        </div>

        <div className={styles.mobileFilters}>
          <SavedAppliedToggle active={toggleView} onToggle={v => setToggleView(toggleView === v ? null : v)} />
        </div>
        </div> {/* End Main Content */}
      </div>
    </PageTransition>
  );
}
