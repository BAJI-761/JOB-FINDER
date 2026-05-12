import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import BookmarkButton from './BookmarkButton';
import styles from './FeaturedJobCard.module.css';
import gsap from 'gsap';
import { formatSalary } from '../data/jobs';

export default function FeaturedJobCard({ job }) {
  const navigate = useNavigate();
  const cardRef = useRef(null);
  const actionRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    const action = actionRef.current;
    if (!card || !action) return;

    // 3D tilt for the spotlight card
    const onMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = card.getBoundingClientRect();
      const xPercent = (clientX - left) / width - 0.5;
      const yPercent = (clientY - top) / height - 0.5;
      
      gsap.to(card, {
        rotateY: xPercent * 8,
        rotateX: -yPercent * 8,
        duration: 0.4,
        ease: 'power2.out'
      });
    };

    const onMouseLeave = () => {
      gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'power3.out' });
    };

    // Magnetic effect for the read more action
    const onMouseMoveAction = (e) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = action.getBoundingClientRect();
      const x = (clientX - (left + width / 2)) * 0.4;
      const y = (clientY - (top + height / 2)) * 0.4;
      gsap.to(action, { x, y, duration: 0.3, ease: 'power2.out' });
    };

    const onMouseLeaveAction = () => {
      gsap.to(action, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
    };

    card.addEventListener('mousemove', onMouseMove);
    card.addEventListener('mouseleave', onMouseLeave);
    action.addEventListener('mousemove', onMouseMoveAction);
    action.addEventListener('mouseleave', onMouseLeaveAction);

    return () => {
      card.removeEventListener('mousemove', onMouseMove);
      card.removeEventListener('mouseleave', onMouseLeave);
      action.removeEventListener('mousemove', onMouseMoveAction);
      action.removeEventListener('mouseleave', onMouseLeaveAction);
    };
  }, []);

  return (
    <motion.div 
      ref={cardRef}
      className={styles.spotlightCard} 
      onClick={() => navigate(`/job/${job.id}`)} 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      style={{ perspective: '1000px' }}
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
          {formatSalary(job.salaryMin, job.salaryMax, job.salaryCurrency, job.salaryPeriod)}
        </div>
        <div className={styles.bookmark} onClick={(e) => e.stopPropagation()}>
          <BookmarkButton jobId={job.id} light={state.theme === 'light'} />
        </div>
      </div>
      
      <div ref={actionRef} className={styles.readMore}>
        <span>VIEW FULL SPEC</span>
        <ArrowRight size={14} />
      </div>
    </motion.div>
  );
}
