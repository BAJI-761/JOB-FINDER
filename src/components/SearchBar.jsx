import { Search, SlidersHorizontal, Mic } from 'lucide-react';
import styles from './SearchBar.module.css';

export default function SearchBar({ value = '', onChange, onFilter, onSubmit, placeholder = 'Search jobs, companies...', variant = 'home' }) {
  const handleKeyDown = (e) => { if (e.key === 'Enter' && onSubmit) onSubmit(); };

  return (
    <div className={styles.searchBar} id="search-bar">
      <Search className={styles.searchIcon} size={18} />
      <input
        className={styles.input}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onKeyDown={handleKeyDown}
        aria-label="Search"
      />
      {variant === 'jobs' && (
        <button className={styles.actionBtn} onClick={onFilter} aria-label="Voice search">
          <Mic size={16} />
        </button>
      )}
      <button className={styles.actionBtn} onClick={onFilter} aria-label="Filter">
        <SlidersHorizontal size={16} />
      </button>
    </div>
  );
}
