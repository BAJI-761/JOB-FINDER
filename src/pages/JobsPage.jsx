import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Archive, Bookmark, CheckCircle, SlidersHorizontal } from 'lucide-react';
import { useApp } from '../context/AppContext';
import PageTransition from '../components/PageTransition';
import JobCard from '../components/JobCard';
import styles from './JobsPage.module.css';

const categories = ['Engineering', 'Design', 'Product', 'Data Science', 'Operations'];

export default function JobsPage() {
  const { state, dispatch, getFilteredJobs, getSavedJobs, getUserApplications } = useApp();
  const navigate = useNavigate();
  const [toggleView, setToggleView] = useState(null);
  const jobs = getFilteredJobs();

  let displayJobs = jobs;
  let viewTitle = "LATEST DISPATCHES";

  if (toggleView === 'saved') {
    displayJobs = getSavedJobs();
    viewTitle = "BOOKMARKED ENTRIES";
  } else if (toggleView === 'applied') {
    const appIds = getUserApplications().map(a => a.jobId);
    displayJobs = state.jobs.filter(j => appIds.includes(j.id));
    viewTitle = "MY APPLICATIONS";
  }

  return (
    <PageTransition variant="newsprint">
      <div className={styles.jobsLayout}>
        {/* Left Sidebar: Advanced Filtering */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarSection}>
            <h3 className={styles.sideTitle}>NAVIGATE ARCHIVES</h3>
            <div className={styles.sideNav}>
              <button 
                className={`${styles.sideNavBtn} ${toggleView === null ? styles.active : ''}`}
                onClick={() => setToggleView(null)}
              >
                <Archive size={16} />
                <span>All Editions</span>
              </button>
              <button 
                className={`${styles.sideNavBtn} ${toggleView === 'saved' ? styles.active : ''}`}
                onClick={() => setToggleView('saved')}
              >
                <Bookmark size={16} />
                <span>Saved Items</span>
              </button>
              <button 
                className={`${styles.sideNavBtn} ${toggleView === 'applied' ? styles.active : ''}`}
                onClick={() => setToggleView('applied')}
              >
                <CheckCircle size={16} />
                <span>My Briefcase</span>
              </button>
            </div>
          </div>

          <div className={styles.sidebarSection}>
            <h3 className={styles.sideTitle}>CATEGORIES</h3>
            <div className={styles.categoryList}>
              {categories.map(c => (
                <label key={c} className={styles.catLabel}>
                  <input 
                    type="checkbox" 
                    checked={state.activeCategory === c} 
                    onChange={() => dispatch({ type: 'SET_CATEGORY', payload: state.activeCategory === c ? null : c })} 
                  />
                  <span>{c}</span>
                </label>
              ))}
            </div>
          </div>

          <div className={styles.sidebarSection}>
            <h3 className={styles.sideTitle}>REFINE BY</h3>
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Contract Type</label>
              <select 
                className={styles.filterSelect}
                value={state.activeJobFilter}
                onChange={(e) => dispatch({ type: 'SET_JOB_FILTER', payload: e.target.value })}
              >
                <option>All Types</option>
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Remote</option>
                <option>Freelance</option>
                <option>Internship</option>
              </select>
            </div>
          </div>
        </aside>

        {/* Main Feed */}
        <div className={styles.mainFeed}>
          <header className={styles.feedHeader}>
            <div className={styles.headerTop}>
              <span className={styles.vol}>VOL. 24 / NO. 04</span>
              <span className={styles.edition}>{viewTitle}</span>
            </div>
            <h1 className={styles.mainTitle}>The Dispatch Archives</h1>
            <div className={styles.headerBottom}>
              <div className={styles.searchBar}>
                <Search size={18} />
                <input 
                  type="text" 
                  placeholder="Search keywords, roles, companies..." 
                  value={state.searchQuery}
                  onChange={(e) => dispatch({ type: 'SET_SEARCH', payload: e.target.value })}
                />
              </div>
              <div className={styles.resultsCount}>
                Showing {displayJobs.length} verified listings
              </div>
            </div>
          </header>

          <div className={styles.jobsGrid}>
            {displayJobs.length > 0 ? (
              displayJobs.map((job, i) => (
                <JobCard key={job.id} job={job} index={i} />
              ))
            ) : (
              <div className={styles.emptyState}>
                <h3 className={styles.emptyTitle}>No Entries Found</h3>
                <p className={styles.emptyText}>The archives are currently empty for this specific criteria. Please refine your parameters.</p>
                <button 
                  className={styles.resetBtn} 
                  onClick={() => {
                    dispatch({ type: 'SET_SEARCH', payload: '' });
                    dispatch({ type: 'SET_JOB_FILTER', payload: 'All Editions' });
                    dispatch({ type: 'SET_CATEGORY', payload: null });
                  }}
                >
                  CLEAR ALL FILTERS
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
