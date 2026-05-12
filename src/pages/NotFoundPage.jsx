import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
      <div style={{ fontSize: 64, marginBottom: 16 }}>🔍</div>
      <h1 style={{ fontSize: 48, fontWeight: 800, color: 'var(--primary)', marginBottom: 8 }}>404</h1>
      <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>Page Not Found</p>
      <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 24 }}>The page you're looking for doesn't exist</p>
      <button className="btn-primary" onClick={() => navigate('/home')} style={{ maxWidth: 200 }}>Go Home</button>
    </div>
  );
}
