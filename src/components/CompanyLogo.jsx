import { useState } from 'react';

export default function CompanyLogo({ company, size = 'md' }) {
  const [imgError, setImgError] = useState(false);
  const sizes = { sm: 32, md: 44, lg: 72 };
  const px = sizes[size] || 44;
  const borderRadius = size === 'lg' ? '50%' : '10px';

  const logos = {
    google: (
      <svg viewBox="0 0 24 24" width={px * 0.6} height={px * 0.6}>
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
    ),
    microsoft: (
      <svg viewBox="0 0 24 24" width={px * 0.5} height={px * 0.5}>
        <rect x="1" y="1" width="10" height="10" fill="#F25022"/>
        <rect x="13" y="1" width="10" height="10" fill="#7FBA00"/>
        <rect x="1" y="13" width="10" height="10" fill="#00A4EF"/>
        <rect x="13" y="13" width="10" height="10" fill="#FFB900"/>
      </svg>
    ),
    apple: (
      <svg viewBox="0 0 24 24" width={px * 0.55} height={px * 0.55} fill="#000">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
      </svg>
    ),
    amazon: (
      <svg viewBox="0 0 24 24" width={px * 0.55} height={px * 0.55}>
        <path d="M.045 18.02c.072-.116.187-.124.348-.022 3.053 1.928 6.434 2.892 10.145 2.892 2.906 0 5.576-.672 8.013-2.017.392-.22.752-.264 1.08-.132.328.132.42.404.276.816-.143.412-.476.652-.999.72-3.455.616-6.758.482-9.907-.404-3.15-.887-5.79-2.345-7.92-4.373-.072-.068-.12-.072-.144-.012l-.036.084c-.048.108-.144.168-.288.18l-.048.006c-.072 0-.12-.024-.144-.072-.048-.096-.024-.168.072-.216l.048-.036c.072-.048.108-.108.108-.18 0-.084-.036-.132-.108-.144z" fill="#FF9900"/>
        <path d="M6.678 10.813c0-1.212.364-2.18 1.092-2.904.728-.724 1.66-1.086 2.796-1.086 1.068 0 1.956.346 2.664 1.038.708.692 1.062 1.602 1.062 2.73 0 1.212-.358 2.19-1.074 2.934-.716.744-1.65 1.116-2.802 1.116-1.044 0-1.92-.354-2.628-1.062-.708-.708-1.062-1.632-1.062-2.772l-.048.006z" fill="#232F3E"/>
      </svg>
    ),
    meta: (
      <svg viewBox="0 0 24 24" width={px * 0.55} height={px * 0.55}>
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" fill="#1877F2"/>
      </svg>
    )
  };

  const getInitial = () => {
    const colors = ['#3B9EE8', '#E8453C', '#22C55E', '#F59E0B', '#8B5CF6', '#EC4899'];
    const colorIndex = (company || '').charCodeAt(0) % colors.length;
    return { letter: (company || 'C')[0].toUpperCase(), color: colors[colorIndex] };
  };

  const logoKey = (company || '').toLowerCase().replace(/\s+/g, '');
  const hasLogo = logos[logoKey];

  return (
    <div
      style={{
        width: px,
        height: px,
        borderRadius,
        background: '#FFFFFF',
        border: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        overflow: 'hidden',
        boxShadow: size === 'lg' ? 'var(--shadow-card)' : 'none'
      }}
    >
      {hasLogo ? (
        logos[logoKey]
      ) : (
        <div style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: `${getInitial().color}15`,
          color: getInitial().color,
          fontSize: px * 0.4,
          fontWeight: 700
        }}>
          {getInitial().letter}
        </div>
      )}
    </div>
  );
}
