import { useState, useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';

export default function Counter({ value, duration = 2, suffix = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    stiffness: 100,
    damping: 30,
    duration: duration * 1000,
  });

  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      motionValue.set(parseFloat(value) || 0);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      setDisplayValue(latest.toFixed(suffix.includes('.') ? 1 : 0));
    });
  }, [springValue, suffix]);

  return (
    <span ref={ref}>
      {displayValue}{suffix}
    </span>
  );
}
