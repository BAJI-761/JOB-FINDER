import { useState } from 'react';
import { Bookmark } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function BookmarkButton({ jobId, light = false }) {
  const { isJobSaved, dispatch, state } = useApp();
  const [bouncing, setBouncing] = useState(false);
  const saved = isJobSaved(jobId);

  const handleClick = (e) => {
    e.stopPropagation();
    if (!state.auth.isAuthenticated) return;
    setBouncing(true);
    setTimeout(() => setBouncing(false), 300);
    dispatch({ type: 'TOGGLE_SAVE', payload: { jobId } });
  };

  return (
    <button
      onClick={handleClick}
      className={bouncing ? 'bookmark-bounce' : ''}
      aria-pressed={saved}
      aria-label={saved ? 'Remove from saved' : 'Save job'}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: 4,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'transform 200ms ease'
      }}
    >
      <Bookmark
        size={20}
        fill={saved ? '#E8453C' : 'none'}
        color={saved ? '#E8453C' : (light ? 'rgba(255,255,255,0.7)' : '#9CA3AF')}
        strokeWidth={2}
      />
    </button>
  );
}
