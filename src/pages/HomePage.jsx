import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, TrendingUp, Clock, Filter, Users, Zap, Globe } from 'lucide-react';
import { useApp } from '../context/AppContext';
import PageTransition from '../components/PageTransition';
import FeaturedJobCard from '../components/FeaturedJobCard';
import JobCard from '../components/JobCard';
import styles from './HomePage.module.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const filterChips = ['All Editions', 'Full Time', 'Part Time', 'Freelance', 'Remote'];

const Ticker = () => {
  return (
    <div className={styles.tickerContainer}>
      <div className={styles.tickerContent}>
        {[...Array(2)].map((_, i) => (
          <div key={i} className={styles.tickerGroup}>
            <span><Zap size={14} /> 247 PROFESSIONALS JOINED TODAY</span>
            <span className={styles.separator}>|</span>
            <span><Globe size={14} /> 12 NEW DISPATCHES IN ENGINEERING</span>
            <span className={styles.separator}>|</span>
            <span><Users size={14} /> ACTIVE HIRING TREND: UP 12.4%</span>
            <span className={styles.separator}>|</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function HomePage() {
  const { state, dispatch, getFilteredJobs } = useApp();
  const navigate = useNavigate();
  const jobs = getFilteredJobs();
  const featured = jobs.filter(j => j.featured).slice(0, 6);
  const latest = jobs.slice(0, 10);
  
  const pageRef = useRef();
  const titleRef = useRef();
  const [counts, setCounts] = useState({ roles: 0, growth: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline Animation: Blur-to-Sharp Reveal
      const chars = titleRef.current.innerText.split('');
      titleRef.current.innerHTML = chars.map(c => `<span class="char">${c === ' ' ? '&nbsp;' : c}</span>`).join('');
      
      gsap.fromTo('.char', 
        { filter: 'blur(10px)', opacity: 0, y: 20 },
        { 
          filter: 'blur(0px)', 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          stagger: 0.05, 
          ease: "power3.out" 
        }
      );

      // News list stagger
      gsap.fromTo('.gsap-news-item', 
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: '.gsap-news-container',
            start: "top 85%"
          }
        }
      );

      // Counter animation
      const targetRoles = jobs.length * 12;
      const targetGrowth = 12.4;

      gsap.to({}, {
        duration: 2,
        onUpdate: function() {
          const progress = this.progress();
          setCounts({
            roles: Math.floor(progress * targetRoles),
            growth: (progress * targetGrowth).toFixed(1)
          });
        },
        scrollTrigger: {
          trigger: `.${styles.sideSection}`,
          start: "top 90%"
        }
      });

    }, pageRef);
    return () => ctx.revert();
  }, [jobs.length]);

  return (
    <PageTransition variant="newsprint">
      <div ref={pageRef} className={styles.homeContainer}>
        <Ticker />

        {/* Editorial Masthead */}
        <header className={styles.masthead}>
          <div className={styles.mastheadTop}>
            <div className={styles.dateLine}>
              <span>EST. 2024</span>
              <span className={styles.dot}>•</span>
              <span>GLOBAL PROFESSIONAL NETWORK</span>
              <span className={styles.dot}>•</span>
              <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).toUpperCase()}</span>
            </div>
          </div>
          <h1 ref={titleRef} className={styles.mainTitle}>The Front Page</h1>
        </header>

        {/* Featured Spotlight Grid */}
        <section className={styles.spotlightSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              <TrendingUp size={20} />
              <span>Editorial Spotlight</span>
            </h2>
            <div className={styles.line} />
          </div>
          
          <div className={`${styles.spotlightGrid} hide-scrollbar`}>
            {featured.length > 0 ? (
              featured.map(job => <FeaturedJobCard key={job.id} job={job} />)
            ) : (
              jobs.slice(0, 3).map(job => <FeaturedJobCard key={job.id} job={job} />)
            )}
          </div>
        </section>

        {/* Main Feed Grid */}
        <div className={styles.mainGrid}>
          {/* Latest Dispatches */}
          <div className={styles.feedColumn}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                <Clock size={20} />
                <span>Latest Dispatches</span>
              </h2>
              <div className={styles.filterWrap}>
                <Filter size={14} />
                <select 
                  value={state.activeJobFilter} 
                  onChange={(e) => dispatch({ type: 'SET_JOB_FILTER', payload: e.target.value })}
                  className={styles.filterSelect}
                >
                  {filterChips.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            <div className={`${styles.newsList} gsap-news-container`}>
              {latest.map((job, i) => (
                <div key={job.id} className="gsap-news-item">
                  <JobCard job={job} index={i} />
                </div>
              ))}
            </div>

            <button className={styles.loadMore} onClick={() => navigate('/jobs')}>
              <span>View Archives</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Right Column: Trending/Stats */}
          <aside className={styles.sideColumn}>
            <div className={styles.sideSection}>
              <h3 className={styles.sideTitle}>MARKET TRENDS</h3>
              <div className={styles.trendList}>
                <div className={styles.trendItem}>
                  <span className={styles.trendLabel}>Active Roles</span>
                  <span className={styles.trendValue}>{counts.roles}</span>
                </div>
                <div className={styles.trendItem}>
                  <span className={styles.trendLabel}>Top Sector</span>
                  <span className={styles.trendValue}>ENGINEERING</span>
                </div>
                <div className={styles.trendItem}>
                  <span className={styles.trendLabel}>Network Growth</span>
                  <span className={styles.trendValue}>+{counts.growth}%</span>
                </div>
              </div>
            </div>

            <div className={styles.sideSection}>
              <h3 className={styles.sideTitle}>QUICK ACTIONS</h3>
              <div className={styles.actionGrid}>
                <button onClick={() => navigate('/post-job')} className={styles.actionBtn}>
                  <Zap size={14} />
                  Dispatch Job
                </button>
                <button onClick={() => navigate('/saved-jobs')} className={styles.actionBtn}>
                  <Clock size={14} />
                  Saved Items
                </button>
                <button onClick={() => navigate('/applied-jobs')} className={styles.actionBtn}>
                  <ArrowRight size={14} />
                  My Briefcase
                </button>
              </div>
            </div>

            <div className={styles.premiumCard}>
              <div className={styles.cardGlow} />
              <div className={styles.adLabel}>PREMIUM EDITION</div>
              <h4 className={styles.premiumTitle}>Unlock Advanced Network Insights</h4>
              <p className={styles.adText}>Upgrade to LINKUP PREMIERE for detailed market insights and priority dispatches.</p>
              <button className={styles.adBtn}>SUBSCRIBE NOW</button>
            </div>
          </aside>
        </div>
      </div>
    </PageTransition>
  );
}

