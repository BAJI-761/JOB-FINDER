export default function JobTagChip({ label, variant = 'outlined' }) {
  const styles = {
    outlined: {
      background: 'transparent',
      border: '1px solid var(--border)',
      color: 'var(--text-secondary)'
    },
    filled: {
      background: 'var(--primary-light)',
      border: '1px solid transparent',
      color: 'var(--primary)'
    },
    dark: {
      background: 'var(--text-primary)',
      border: '1px solid transparent',
      color: '#FFFFFF'
    }
  };

  const s = styles[variant] || styles.outlined;

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      padding: '4px 10px',
      borderRadius: '9999px',
      fontSize: '11px',
      fontWeight: 500,
      whiteSpace: 'nowrap',
      ...s
    }}>
      {label}
    </span>
  );
}
