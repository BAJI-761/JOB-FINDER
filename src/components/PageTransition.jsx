import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const variants = {
  default: {
    initial: { opacity: 0, y: 15, scale: 0.98 },
    in: { opacity: 1, y: 0, scale: 1 },
    out: { opacity: 0, y: -15, scale: 1.02 }
  },
  newsprint: {
    initial: { opacity: 0, y: 30, filter: 'contrast(150%) brightness(50%)' },
    in: { opacity: 1, y: 0, filter: 'contrast(100%) brightness(100%)' },
    out: { opacity: 0, y: -30, filter: 'contrast(150%) brightness(50%)' }
  }
};

const transition = {
  type: 'tween',
  ease: [0.16, 1, 0.3, 1], // Custom cubic-bezier for high-end feel
  duration: 0.6
};

export default function PageTransition({ children, variant = 'default' }) {
  const location = useLocation();
  const activeVariant = variants[variant] || variants.default;

  return (
    <motion.div
      key={location.pathname}
      initial="initial"
      animate="in"
      exit="out"
      variants={activeVariant}
      transition={transition}
      style={{ width: '100%' }}
    >
      {children}
    </motion.div>
  );
}
