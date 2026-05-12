export default function ApplicantAvatars({ count = 0, light = false }) {
  const colors = ['#3B9EE8', '#22C55E', '#F59E0B', '#8B5CF6'];
  const shown = Math.min(count, 3);
  const remaining = Math.max(0, count - shown);

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {Array.from({ length: shown }).map((_, i) => (
        <div key={i} style={{
          width: 24,
          height: 24,
          borderRadius: '50%',
          background: light ? 'rgba(255,255,255,0.3)' : colors[i % colors.length],
          border: light ? '2px solid rgba(255,255,255,0.5)' : '2px solid #fff',
          marginLeft: i > 0 ? -8 : 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 10,
          fontWeight: 600,
          color: '#fff',
          zIndex: shown - i
        }}>
          {String.fromCharCode(65 + i)}
        </div>
      ))}
      {remaining > 0 && (
        <span style={{
          marginLeft: 6,
          fontSize: 11,
          fontWeight: 600,
          color: light ? 'rgba(255,255,255,0.85)' : 'var(--text-muted)',
          background: light ? 'rgba(255,255,255,0.15)' : 'var(--border-light)',
          padding: '2px 8px',
          borderRadius: 9999
        }}>
          +{remaining}
        </span>
      )}
    </div>
  );
}
