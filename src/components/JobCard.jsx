import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, CheckCircle, ArrowUpRight } from 'lucide-react';
import CompanyLogo from './CompanyLogo';
import BookmarkButton from './BookmarkButton';
import styles from './JobCard.module.css';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { formatSalary } from '../data/jobs';

export default function JobCard({ job, index = 0 }) {
  const navigate = useNavigate();
  const cardRef = useRef(null);
  const iconRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    const icon = iconRef.current;
    if (!card || !icon) return;

    // Magnetic effect for the icon
    const onMouseMoveIcon = (e) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = icon.getBoundingClientRect();
      const x = (clientX - (left + width / 2)) * 0.5;
      const y = (clientY - (top + height / 2)) * 0.5;
      gsap.to(icon, { x, y, duration: 0.3, ease: 'power2.out' });
    };

    const onMouseLeaveIcon = () => {
      gsap.to(icon, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
    };

    // 3D tilt for the card (subtle)
    const onMouseMoveCard = (e) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = card.getBoundingClientRect();
      const xPercent = (clientX - left) / width - 0.5;
      const yPercent = (clientY - top) / height - 0.5;
      
      gsap.to(card, {
        rotateY: xPercent * 5,
        rotateX: -yPercent * 5,
        duration: 0.4,
        ease: 'power2.out'
      });
    };

    const onMouseLeaveCard = () => {
      gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'power3.out' });
    };

    icon.addEventListener('mousemove', onMouseMoveIcon);
    icon.addEventListener('mouseleave', onMouseLeaveIcon);
    card.addEventListener('mousemove', onMouseMoveCard);
    card.addEventListener('mouseleave', onMouseLeaveCard);

    return () => {
      icon.removeEventListener('mousemove', onMouseMoveIcon);
      icon.removeEventListener('mouseleave', onMouseLeaveIcon);
      card.removeEventListener('mousemove', onMouseMoveCard);
      card.removeEventListener('mouseleave', onMouseLeaveCard);
    };
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className={styles.editorialCard}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      onClick={() => navigate(`/job/${job.id}`)}
      role="article"
      style={{ perspective: '1000px' }}
    >
      <div className={styles.header}>
        <div className={styles.meta}>
          <span className={styles.category}>{job.tags?.[0] || 'POSITION'}</span>
          <span className={styles.divider}>/</span>
          <span className={styles.date}>NEW DISPATCH</span>
        </div>
        <div onClick={(e) => e.stopPropagation()}>
          <BookmarkButton jobId={job.id} />
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.mainContent}>
          <div className={styles.logoWrapper}>
            <CompanyLogo company={job.company} size="sm" />
          </div>
          <div className={styles.textWrapper}>
            <h3 className={styles.title}>{job.title}</h3>
            <p className={styles.company}>
              {job.company} {job.trusted !== false && <CheckCircle size={12} className={styles.trustedIcon} />}
            </p>
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.details}>
          <div className={styles.detailItem}>
            <MapPin size={12} />
            <span>{job.location}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.mono}>{formatSalary(job.salaryMin, job.salaryMax, job.salaryCurrency, job.salaryPeriod)}</span>
          </div>
        </div>
        <div ref={iconRef} className={styles.action}>
          <ArrowUpRight size={24} strokeWidth={2.5} />
        </div>
      </div>
    </motion.div>
  );
}
