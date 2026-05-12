import { useState } from 'react';
import styles from './FilterChips.module.css';

export default function FilterChips({ chips = [], activeChip, onChipClick }) {
  const [animating, setAnimating] = useState(null);

  const handleClick = (chip) => {
    setAnimating(chip);
    setTimeout(() => setAnimating(null), 150);
    onChipClick?.(chip);
  };

  return (
    <div className={`${styles.chipRow} hide-scrollbar`} role="tablist" aria-label="Filter options">
      {chips.map((chip) => (
        <button
          key={chip}
          className={`${styles.chip} ${activeChip === chip ? styles.active : ''} ${animating === chip ? 'chip-pulse' : ''}`}
          onClick={() => handleClick(chip)}
          role="tab"
          aria-selected={activeChip === chip}
        >
          {chip}
        </button>
      ))}
    </div>
  );
}
