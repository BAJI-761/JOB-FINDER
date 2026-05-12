import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, MapPin, ChevronDown } from 'lucide-react';
import { useApp } from '../context/AppContext';
import PageTransition from '../components/PageTransition';
import ReminderBanner from '../components/ReminderBanner';
import SearchBar from '../components/SearchBar';
import FilterChips from '../components/FilterChips';
import FeaturedJobCard from '../components/FeaturedJobCard';
import JobCard from '../components/JobCard';
import styles from './HomePage.module.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const filterChips = ['See All', 'Full Time', 'Part Time', 'Freelance', 'Remote'];

export default function HomePage() {
  const { state, dispatch, getFilteredJobs, getUnreadNotificationCount } = useApp();
  const navigate = useNavigate();
  const jobs = getFilteredJobs();
  const featured = jobs.filter(j => j.featured).slice(0, 5);
  const latest = jobs.slice(0, 6);
  const unreadNotifs = getUnreadNotificationCount();
  const user = state.currentUser;
  
  const pageRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.gsap-reveal').forEach((el) => {
        gsap.fromTo(el, 
          { y: 50, opacity: 0 },
          {
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse"
            },
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out"
          }
        );
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <PageTransition>
      <div ref={pageRef} className={`page-content ${styles.homeLayout}`}>
        {/* Left Sidebar (Desktop only) */}
        <div className={`gsap-reveal ${styles.sidebarLeft}`}>
          <div className="card" style={{ textAlign: 'center', marginBottom: 24 }}>
            <div className={styles.avatarCircle} style={{ width: 64, height: 64, margin: '0 auto 16px', fontSize: 24 }}>
              {user?.name?.[0]?.toUpperCase() || 'U'}
            </div>
            <h3 style={{ fontSize: 18, marginBottom: 4 }}>{user?.name || 'Candidate'}</h3>
            <p className="text-secondary" style={{ fontSize: 13, marginBottom: 16 }}>
              {user?.role === 'employer' ? 'Hiring Manager' : 'Software Professional'}
            </p>
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16, textAlign: 'left' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span className="text-secondary" style={{ fontSize: 12 }}>Profile Views</span>
                <span className="text-primary" style={{ fontSize: 12, fontWeight: 600 }}>42</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="text-secondary" style={{ fontSize: 12 }}>Search Appearances</span>
                <span className="text-primary" style={{ fontSize: 12, fontWeight: 600 }}>18</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Feed Column */}
        <div className={styles.mainFeed}>
          {/* Header (Mobile Only) */}
        <div className={styles.header}>
          <div className={styles.avatarCircle} onClick={() => navigate('/profile')} style={{ cursor: 'pointer' }}>
            {user?.name?.[0]?.toUpperCase() || 'U'}
          </div>
          <button className={styles.locationBtn}>
            <MapPin size={14} />
            <span>{user?.location?.label || 'My Location'}</span>
            <ChevronDown size={14} />
          </button>
          <button className={styles.notifBtn} onClick={() => navigate('/notifications')} aria-label="Notifications">
            <Bell size={18} />
            {unreadNotifs > 0 && <span className={styles.notifBadge} />}
          </button>
        </div>

        {/* Reminder Banner */}
        <div className={styles.bannerWrap}>
          <ReminderBanner />
        </div>

        {/* Search */}
        <div className={styles.searchWrap}>
          <SearchBar
            value={state.searchQuery}
            onChange={(v) => dispatch({ type: 'SET_SEARCH', payload: v })}
            onSubmit={() => navigate('/search')}
          />
        </div>

        {/* Filter Chips */}
        <div className={styles.chipsWrap}>
          <FilterChips
            chips={filterChips}
            activeChip={state.activeJobFilter}
            onChipClick={(chip) => dispatch({ type: 'SET_JOB_FILTER', payload: chip })}
          />
        </div>

        {/* Recommended Section (Mobile Only - moved to right sidebar on desktop) */}
        <div className={`gsap-reveal ${styles.mobileRecommended}`}>
        {featured.length > 0 && (
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTitle}>Recommended 🚀</span>
              <button className={styles.seeAll} onClick={() => navigate('/jobs')}>See all</button>
            </div>
            <div className={`${styles.horizontalScroll} hide-scrollbar`}>
              {featured.map(job => (
                <FeaturedJobCard key={job.id} job={job} />
              ))}
              {/* If no featured, show first 3 as featured */}
              {featured.length === 0 && jobs.slice(0, 3).map(job => (
                <FeaturedJobCard key={job.id} job={job} />
              ))}
            </div>
          </div>
        )}
        {featured.length === 0 && jobs.length > 0 && (
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTitle}>Recommended 🚀</span>
              <button className={styles.seeAll} onClick={() => navigate('/jobs')}>See all</button>
            </div>
            <div className={`${styles.horizontalScroll} hide-scrollbar`}>
              {jobs.slice(0, 4).map(job => (
                <FeaturedJobCard key={job.id} job={job} />
              ))}
            </div>
          </div>
        )}
        </div>

        {/* Latest Posts */}
        <div className={`gsap-reveal ${styles.section}`}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTitle}>Latest Post 📌</span>
            <button className={styles.seeAll} onClick={() => navigate('/jobs')}>See all</button>
          </div>
          <div className={styles.jobsList}>
            {latest.map((job, i) => (
              <JobCard key={job.id} job={job} index={i} />
            ))}
          </div>
        </div>
        </div> {/* End Main Feed */}

        {/* Right Sidebar (Desktop only) */}
        <div className={`gsap-reveal ${styles.sidebarRight}`}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTitle}>Recommended 🚀</span>
          </div>
          <div className={styles.jobsList}>
            {(featured.length > 0 ? featured : jobs.slice(0, 3)).map(job => (
              <FeaturedJobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
