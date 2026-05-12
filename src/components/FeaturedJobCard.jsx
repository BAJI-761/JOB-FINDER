import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import CompanyLogo from './CompanyLogo';
import BookmarkButton from './BookmarkButton';
import ApplicantAvatars from './ApplicantAvatars';
import styles from './FeaturedJobCard.module.css';

export default function FeaturedJobCard({ job }) {
  const navigate = useNavigate();

  return (
    <motion.div 
      className={styles.card} 
      onClick={() => navigate(`/job/${job.id}`)} 
      role="article" 
      aria-label={`${job.title} at ${job.company}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div className={styles.topRow}>
        <div className={styles.companyInfo}>
          <CompanyLogo company={job.company} size="sm" />
          <span className={styles.companyName}>{job.company}</span>
        </div>
        <BookmarkButton jobId={job.id} light />
      </div>
      <div className={styles.jobTitle}>{job.title}</div>
      <div className={styles.salary}>${job.salaryMin?.toLocaleString()} - ${job.salaryMax?.toLocaleString()}/yr</div>
      <div className={styles.bottomRow}>
        <ApplicantAvatars count={job.applicants} light />
        <button className={styles.applyBtn} onClick={(e) => { e.stopPropagation(); navigate(`/job/${job.id}`); }}>Apply</button>
      </div>
    </motion.div>
  );
}
