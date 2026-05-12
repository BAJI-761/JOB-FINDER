import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import BookmarkButton from './BookmarkButton';
import styles from './FeaturedJobCard.module.css';

export default function FeaturedJobCard({ job }) {
  const navigate = useNavigate();

  return (
    <motion.div 
      className={styles.spotlightCard} 
      onClick={() => navigate(`/job/${job.id}`)} 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ y: -4 }}
    >
      <div className={styles.label}>TOP HEADLINE</div>
      
      <div className={styles.content}>
        <h2 className={styles.title}>{job.title}</h2>
        <div className={styles.companyRow}>
          <span className={styles.company}>{job.company}</span>
          <span className={styles.location}>{job.location}</span>
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.salary}>
          ${job.salaryMin?.toLocaleString()} — ${job.salaryMax?.toLocaleString()}
        </div>
        <div className={styles.bookmark}>
          <BookmarkButton jobId={job.id} />
        </div>
      </div>
      
      <div className={styles.readMore}>
        <span>VIEW FULL SPEC</span>
        <ArrowRight size={14} />
      </div>
    </motion.div>
  );
}
