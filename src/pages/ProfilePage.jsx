import { useNavigate } from 'react-router-dom';
import { Edit, MapPin, Briefcase, GraduationCap, ArrowRight, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import PageTransition from '../components/PageTransition';
import styles from './ProfilePage.module.css';

export default function ProfilePage() {
  const { state } = useApp();
  const navigate = useNavigate();
  const user = state.currentUser;

  if (!user) return null;

  return (
    <PageTransition variant="newsprint">
      <div className={styles.profileLayout}>
        {/* Editorial Header */}
        <header className={styles.header}>
          <div className={styles.headerMain}>
            <div className={styles.photoContainer}>
              <div className={styles.photo}>
                {user.name?.[0]?.toUpperCase() || 'U'}
              </div>
              <button className={styles.editBtn} onClick={() => navigate('/edit-profile')}>
                <Edit size={14} />
                <span>EDIT DOSSIER</span>
              </button>
            </div>
            
            <div className={styles.info}>
              <div className={styles.status}>
                <ShieldCheck size={14} />
                <span>VERIFIED PROFESSIONAL</span>
              </div>
              <h1 className={styles.name}>{user.name}</h1>
              <p className={styles.headline}>{user.headline || 'Contributor at LinkUp Network'}</p>
              <div className={styles.meta}>
                <div className={styles.metaItem}>
                  <MapPin size={14} />
                  <span>{user.location?.address || 'Global Network'}</span>
                </div>
                <span className={styles.divider}>/</span>
                <div className={styles.metaItem}>
                  <span>Member since April 2024</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.stats}>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>COMPLETION</span>
              <span className={styles.statValue}>{user.profileCompletion}%</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>AUTHORITY</span>
              <span className={styles.statValue}>LVL 4</span>
            </div>
          </div>
        </header>

        {/* Content Grid */}
        <div className={styles.contentGrid}>
          {/* Main Dossier Column */}
          <div className={styles.dossier}>
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>CONTRIBUTOR BIO</h2>
              <p className={styles.bio}>
                {user.bio || 'No public bio available. This contributor is a verified professional in the LinkUp network.'}
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>SERVICE HISTORY</h2>
              <div className={styles.timeline}>
                {user.experience?.length > 0 ? user.experience.map((e, i) => (
                  <div key={i} className={styles.timelineItem}>
                    <div className={styles.timelineMeta}>
                      <span className={styles.duration}>{e.duration}</span>
                    </div>
                    <div className={styles.timelineContent}>
                      <h3 className={styles.role}>{e.role}</h3>
                      <p className={styles.company}>{e.company}</p>
                    </div>
                  </div>
                )) : (
                  <p className={styles.emptyText}>No service history recorded.</p>
                )}
              </div>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>EDUCATION & CREDENTIALS</h2>
              <div className={styles.timeline}>
                {user.education?.length > 0 ? user.education.map((e, i) => (
                  <div key={i} className={styles.timelineItem}>
                    <div className={styles.timelineMeta}>
                      <span className={styles.duration}>{e.year || '2020'}</span>
                    </div>
                    <div className={styles.timelineContent}>
                      <h3 className={styles.role}>{e.degree}</h3>
                      <p className={styles.company}>{e.school}</p>
                    </div>
                  </div>
                )) : (
                  <p className={styles.emptyText}>No academic records found.</p>
                )}
              </div>
            </section>
          </div>

          {/* Side Info Column */}
          <aside className={styles.sidebar}>
            <div className={styles.sideSection}>
              <h3 className={styles.sideTitle}>EXPERTISE</h3>
              <div className={styles.skillGrid}>
                {user.skills?.map(s => (
                  <div key={s} className={styles.skillTag}>{s}</div>
                ))}
              </div>
            </div>

            <div className={styles.dossierFooter}>
              <div className={styles.qrBlock}>
                <div className={styles.qrCode} />
                <span className={styles.qrLabel}>SCAN FOR DIGITAL VERIFICATION</span>
              </div>
              <p className={styles.legal}>Authenticated by LinkUp Editorial Standards. All credentials verified via global node protocols.</p>
            </div>
          </aside>
        </div>
      </div>
    </PageTransition>
  );
}
