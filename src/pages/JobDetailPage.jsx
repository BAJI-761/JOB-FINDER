import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, MapPin, Globe, Clock, ShieldCheck, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import BookmarkButton from '../components/BookmarkButton';
import Modal from '../components/Modal';
import PageTransition from '../components/PageTransition';
import styles from './JobDetailPage.module.css';
import { formatSalary } from '../data/jobs';

export default function JobDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch, isJobApplied } = useApp();
  const [showModal, setShowModal] = useState(false);

  const job = state.jobs.find(j => j.id === id);
  if (!job) return <div className={styles.empty}>ENTRY NOT FOUND</div>;

  const applied = isJobApplied(job.id);
  const company = state.companies.find(c => c.name === job.company);

  const handleApply = () => {
    if (applied || !state.auth.isAuthenticated) return;
    dispatch({ type: 'APPLY_JOB', payload: { jobId: job.id } });
    setShowModal(true);
  };

  return (
    <PageTransition variant="newsprint">
      <div className={styles.detailLayout}>
        {/* Navigation / Meta */}
        <nav className={styles.breadcrumb}>
          <button className={styles.backBtn} onClick={() => navigate(-1)}>
            <ArrowLeft size={16} />
            <span>RETURN TO ARCHIVES</span>
          </button>
          <div className={styles.meta}>
            <span className={styles.ref}>REF: {job.id.toUpperCase()}</span>
            <span className={styles.divider}>|</span>
            <span className={styles.status}>VERIFIED DISPATCH</span>
          </div>
        </nav>

        {/* Main Header Section */}
        <header className={styles.header}>
          <div className={styles.headerMain}>
            <div className={styles.titleArea}>
              <div className={styles.companyRow}>
                <span className={styles.companyName}>{job.company}</span>
                {job.trusted !== false && <CheckCircle size={14} className={styles.trustedIcon} />}
              </div>
              <h1 className={styles.jobTitle}>{job.title}</h1>
            </div>
            <div className={styles.actions}>
              <BookmarkButton jobId={job.id} />
              <button className={styles.applyBtn} onClick={handleApply} disabled={applied}>
                {applied ? 'APPLICATION SENT' : 'INITIALIZE APPLICATION'}
              </button>
            </div>
          </div>

          <div className={styles.keyStats}>
            <div className={styles.stat}>
              <span className={styles.statLabel}>LOCATION</span>
              <span className={styles.statValue}>{job.location}</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statLabel}>COMPENSATION</span>
              <span className={styles.statValue}>{formatSalary(job.salaryMin, job.salaryMax, job.salaryCurrency, job.salaryPeriod)}</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statLabel}>WORK STYLE</span>
              <span className={styles.statValue}>{job.workplaceType}</span>
            </div>
          </div>
        </header>

        {/* Content Grid */}
        <div className={styles.grid}>
          <main className={styles.mainContent}>
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>POSITION SPECIFICATION</h2>
              <div className={styles.description}>
                {job.description || 'Detailed specifications for this position are available upon successful application initialization. This role requires a high level of expertise and professional commitment.'}
              </div>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>CONTRIBUTOR REQUIREMENTS</h2>
              <div className={styles.requirementsList}>
                {job.skills?.map(skill => (
                  <div key={skill} className={styles.requirementItem}>
                    <ShieldCheck size={16} className={styles.reqIcon} />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>EDITORIAL NOTE</h2>
              <p className={styles.note}>
                All dispatches on the LinkUp Network are subject to strict editorial standards. This position has been verified by the LinkUp trust protocol. Applicants are advised to review their dossiers for accuracy before initializing an application.
              </p>
            </section>
          </main>

          <aside className={styles.sidebar}>
            <div className={styles.companyDossier}>
              <h3 className={styles.sidebarTitle}>COMPANY DOSSIER</h3>
              <div className={styles.companyInfo}>
                <div className={styles.infoItem}>
                  <Globe size={14} />
                  <span>{company?.industry || 'Technology Sector'}</span>
                </div>
                <div className={styles.infoItem}>
                  <Clock size={14} />
                  <span>Founded in {company?.founded || '2018'}</span>
                </div>
                <div className={styles.infoItem}>
                  <MapPin size={14} />
                  <span>Headquartered in {job.location.split(',')[1]?.trim() || 'San Francisco'}</span>
                </div>
              </div>
              <p className={styles.companyBio}>
                {company?.description || 'This organization is a verified participant in the LinkUp Global Network, specializing in advanced professional ecosystems.'}
              </p>
              <button className={styles.viewCompanyBtn} onClick={() => navigate(`/company/${job.company}`)}>
                VIEW FULL DOSSIER
                <ArrowRight size={14} />
              </button>
            </div>

            <div className={styles.disclaimerBox}>
              <div className={styles.disclaimerLabel}>LEGAL DISPATCH</div>
              <p>LinkUp acts solely as a verification layer. All employment contracts are negotiated independently between the contributor and the verified organization.</p>
            </div>
          </aside>
        </div>

        {/* Success Modal */}
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          type="success"
          title="APPLICATION INITIALIZED"
          message={`Your professional dossier has been dispatched to ${job.company} for the ${job.title} specification.`}
        />
      </div>
    </PageTransition>
  );
}
