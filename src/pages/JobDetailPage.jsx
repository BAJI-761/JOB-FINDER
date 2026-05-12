import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Briefcase, Clock, MapPin } from 'lucide-react';
import { useApp } from '../context/AppContext';
import CompanyLogo from '../components/CompanyLogo';
import BookmarkButton from '../components/BookmarkButton';
import JobTagChip from '../components/JobTagChip';
import Modal from '../components/Modal';
import PageTransition from '../components/PageTransition';
import styles from './JobDetailPage.module.css';

export default function JobDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch, isJobApplied } = useApp();
  const [activeTab, setActiveTab] = useState('description');
  const [expanded, setExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const job = state.jobs.find(j => j.id === id);
  if (!job) return <div className="empty-state"><div className="empty-state-title">Job not found</div><button className="btn-secondary" onClick={() => navigate(-1)}>Go Back</button></div>;

  const applied = isJobApplied(job.id);
  const company = state.companies.find(c => c.name === job.company);

  const handleApply = () => {
    if (applied || !state.auth.isAuthenticated) return;
    dispatch({ type: 'APPLY_JOB', payload: { jobId: job.id } });
    setShowModal(true);
  };

  return (
    <PageTransition>
      <div className={styles.page}>
        <div className={styles.jobDetailLayout}>
          {/* Main Content Column */}
          <div className={styles.mainCol}>
            {/* Top Nav */}
            <div className={styles.topNav}>
          <button className={styles.navBtn} onClick={() => navigate(-1)} aria-label="Go back"><ArrowLeft size={18} /></button>
          <span className={styles.companyTitle}>{job.company} <CheckCircle size={14} color="#22C55E" /></span>
          <BookmarkButton jobId={job.id} light />
        </div>

        {/* Company Logo */}
        <div className={styles.logoSection}>
          <div className={styles.logoCircle}>
            <CompanyLogo company={job.company} size="lg" />
          </div>
          <div className={styles.jobTitleText}>{job.title}</div>
          <div className={styles.salaryText}>${job.salaryMin?.toLocaleString()} - ${job.salaryMax?.toLocaleString()}/yr</div>
          <div className={styles.tagsRow}>
            {(job.tags || []).map(tag => <JobTagChip key={tag} label={tag} variant="filled" />)}
          </div>
        </div>

        {/* Tabs (Mobile Only) */}
        <div className={`${styles.tabs} ${styles.mobileTabs}`}>
          <button className={`${styles.tab} ${activeTab === 'description' ? styles.active : ''}`} onClick={() => setActiveTab('description')}>Description</button>
          <button className={`${styles.tab} ${activeTab === 'company' ? styles.active : ''}`} onClick={() => setActiveTab('company')}>Company</button>
        </div>

        {/* Stats */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}><div className={styles.statLabel}>Job Type</div><div className={styles.statValue}>{job.jobType}</div></div>
          <div className={styles.statCard}><div className={styles.statLabel}>Working Hours</div><div className={styles.statValue}>{job.workingHours || '9 AM - 6 PM'}</div></div>
          <div className={styles.statCard}><div className={styles.statLabel}>Workplace</div><div className={styles.statValue}>{job.workplaceType}</div></div>
        </div>

        {activeTab === 'description' ? (
          <>
            {/* Description */}
            <div className={styles.detailSection}>
              <div className={styles.detailTitle}>Job Details</div>
              <div className={styles.detailText}>
                {expanded ? job.description : (job.description || '').slice(0, 200) + '...'}
              </div>
              {(job.description || '').length > 200 && (
                <button className={styles.readMore} onClick={() => setExpanded(!expanded)}>
                  {expanded ? 'Show Less' : 'Read More'}
                </button>
              )}
            </div>

            {/* Info Grid */}
            <div className={styles.infoGrid}>
              <div className={styles.infoCard}>
                <div className={styles.infoLabel}>Experience</div>
                <div className={styles.infoValue}>{job.experience || '0-2 years'}</div>
              </div>
              <div className={styles.infoCard}>
                <div className={styles.infoLabel}>Location</div>
                <div className={styles.infoValue}>{job.location}</div>
              </div>
            </div>

            {/* Skills */}
            {job.skills && job.skills.length > 0 && (
              <div className={styles.detailSection}>
                <div className={styles.detailTitle}>Required Skills</div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {job.skills.map(s => <JobTagChip key={s} label={s} variant="filled" />)}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className={styles.detailSection}>
            <div className={styles.detailTitle}>About {job.company}</div>
            <div className={styles.detailText}>{company?.description || 'Company information coming soon.'}</div>
            {company && (
              <div className={styles.infoGrid} style={{ marginTop: 16, padding: 0 }}>
                <div className={styles.infoCard}><div className={styles.infoLabel}>Industry</div><div className={styles.infoValue}>{company.industry}</div></div>
                <div className={styles.infoCard}><div className={styles.infoLabel}>Company Size</div><div className={styles.infoValue}>{company.size}</div></div>
                <div className={styles.infoCard}><div className={styles.infoLabel}>Founded</div><div className={styles.infoValue}>{company.founded}</div></div>
                <div className={styles.infoCard}><div className={styles.infoLabel}>Rating</div><div className={styles.infoValue}>⭐ {company.rating}</div></div>
              </div>
            )}
          </div>
        )}

        {/* Apply Bar */}
        <div className={styles.applyBar}>
          <button className={styles.applyBtn} onClick={handleApply} disabled={applied}>
            {applied ? '✅ Applied' : 'Apply Now'}
            {!applied && (
              <span className={styles.chevrons}>
                {[0,1,2,3,4].map(i => <span key={i} className="chevron-animate" style={{ fontSize: 14 }}>›</span>)}
              </span>
            )}
          </button>
        </div>
        </div> {/* End Main Col */}

        {/* Right Sidebar (Desktop only) */}
        <div className={styles.sideCol}>
          <div className="card">
            <div className={styles.detailTitle}>About {job.company}</div>
            <div className={styles.detailText}>{company?.description || 'Company information coming soon.'}</div>
            {company && (
              <div className={styles.infoGrid} style={{ marginTop: 16, padding: 0 }}>
                <div className={styles.infoCard}><div className={styles.infoLabel}>Industry</div><div className={styles.infoValue}>{company.industry}</div></div>
                <div className={styles.infoCard}><div className={styles.infoLabel}>Company Size</div><div className={styles.infoValue}>{company.size}</div></div>
                <div className={styles.infoCard}><div className={styles.infoLabel}>Founded</div><div className={styles.infoValue}>{company.founded}</div></div>
                <div className={styles.infoCard}><div className={styles.infoLabel}>Rating</div><div className={styles.infoValue}>⭐ {company.rating}</div></div>
              </div>
            )}
          </div>
        </div>
        </div> {/* End Layout Container */}

        {/* Success Modal */}
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          type="success"
          title="Application Sent! 🎉"
          message={`Your application for ${job.title} at ${job.company} has been submitted successfully.`}
        />
      </div>
    </PageTransition>
  );
}
