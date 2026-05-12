import { useNavigate } from 'react-router-dom';
import { MapPin, CheckCircle } from 'lucide-react';
import CompanyLogo from './CompanyLogo';
import BookmarkButton from './BookmarkButton';
import JobTagChip from './JobTagChip';
import ApplicantAvatars from './ApplicantAvatars';
import styles from './JobCard.module.css';

import { motion } from 'framer-motion';

export default function JobCard({ job, index = 0 }) {
  const navigate = useNavigate();

  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileHover={{ scale: 1.02, y: -2 }}
      onClick={() => navigate(`/job/${job.id}`)}
      role="article"
      aria-label={`${job.title} at ${job.company}`}
    >
      <div className={styles.topRow}>
        <div className={styles.logoWrap}>
          <CompanyLogo company={job.company} size="md" />
        </div>
        <div className={styles.info}>
          <div className={styles.companyRow}>
            <span className={styles.companyName}>{job.company}</span>
            {job.trusted !== false && (
              <span className={styles.trustedBadge}>
                <CheckCircle size={10} /> Trusted
              </span>
            )}
          </div>
          <div className={styles.location}>
            <MapPin size={10} style={{ display: 'inline', verticalAlign: 'middle' }} /> {job.location}
          </div>
        </div>
        <BookmarkButton jobId={job.id} />
      </div>

      <div className={styles.jobTitle}>{job.title}</div>
      <div className={styles.salary}>
        ${job.salaryMin?.toLocaleString()} - ${job.salaryMax?.toLocaleString()}/yr
      </div>

      <div className={styles.tagRow}>
        {(job.tags || []).slice(0, 3).map(tag => (
          <JobTagChip key={tag} label={tag} />
        ))}
      </div>

      <div className={styles.bottomRow}>
        <ApplicantAvatars count={job.applicants} />
        <button className={styles.applyBtn} onClick={(e) => { e.stopPropagation(); navigate(`/job/${job.id}`); }}>Apply</button>
      </div>
    </motion.div>
  );
}
