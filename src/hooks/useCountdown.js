import { useState, useEffect, useRef } from 'react';

export function useCountdown(targetDate) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const prevRef = useRef({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [flipping, setFlipping] = useState({});

  useEffect(() => {
    const calculate = () => {
      const now = new Date();
      const target = new Date(targetDate || now.getTime() + 3 * 24 * 60 * 60 * 1000);
      const diff = Math.max(0, target - now);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      const newTime = { days, hours, minutes, seconds };

      const newFlipping = {};
      Object.keys(newTime).forEach(key => {
        if (prevRef.current[key] !== newTime[key]) newFlipping[key] = true;
      });
      setFlipping(newFlipping);
      setTimeout(() => setFlipping({}), 150);

      prevRef.current = newTime;
      setTimeLeft(newTime);
    };

    calculate();
    const timer = setInterval(calculate, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return { timeLeft, flipping };
}
