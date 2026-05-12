import { useNavigate } from 'react-router-dom';
import { MapPin, CheckCircle, ArrowUpRight } from 'lucide-react';
import CompanyLogo from './CompanyLogo';
import BookmarkButton from './BookmarkButton';
import styles from './JobCard.module.css';
import { motion } from 'framer-motion';

export default function JobCard({ job, index = 0 }) {
  const navigate = useNavigate();

  return (
    <motion.div
      className={styles.editorialCard}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      onClick={() => navigate(`/job/${job.id}`)}
      role="article"
    >
      <div className={styles.header}>
        <div className={styles.meta}>
          <span className={styles.category}>{job.tags?.[0] || 'POSITION'}</span>
          <span className={styles.divider}>/</span>
          <span className={styles.date}>NEW DISPATCH</span>
        </div>
        <BookmarkButton jobId={job.id} />
      </div>

      <div className={styles.body}>
        <h3 className={styles.title}>{job.title}</h3>
        <p className={styles.company}>
          {job.company} {job.trusted !== false && <CheckCircle size={12} className={styles.trustedIcon} />}
        </p>
      </div>

      <div className={styles.footer}>
        <div className={styles.details}>
          <div className={styles.detailItem}>
            <MapPin size={12} />
            <span>{job.location}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.mono}>${job.salaryMin?.toLocaleString()} — ${job.salaryMax?.toLocaleString()}</span>
          </div>
        </div>
        <div className={styles.action}>
          <ArrowUpRight size={20} />
        </div>
      </div>
    </motion.div>
  );
}
