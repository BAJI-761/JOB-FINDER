import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Globe, MapPin, Users, Star } from 'lucide-react';
import { useApp } from '../context/AppContext';
import CompanyLogo from '../components/CompanyLogo';
import JobCard from '../components/JobCard';
import PageTransition from '../components/PageTransition';

export default function CompanyProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useApp();
  const company = state.companies.find(c => c.id === id);
  const companyJobs = state.jobs.filter(j => j.companyId === id || j.company === company?.name);

  if (!company) return <div className="empty-state"><div className="empty-state-title">Company not found</div></div>;

  return (
    <PageTransition>
      <div className="page-content" style={{ padding: 'var(--page-padding)' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', marginBottom: 16 }}><ArrowLeft size={22} /></button>
        <div className="card" style={{ textAlign: 'center', padding: 24, marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}><CompanyLogo company={company.name} size="lg" /></div>
          <h2 style={{ fontSize: 20, fontWeight: 700 }}>{company.name}</h2>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 8 }}>{company.industry}</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, fontSize: 12, color: 'var(--text-muted)', marginBottom: 16 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><MapPin size={12} />{company.location}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Users size={12} />{company.size}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Star size={12} />{company.rating}</span>
          </div>
          <button className="btn-primary" style={{ height: 44, maxWidth: 200, margin: '0 auto' }}>Follow</button>
        </div>
        <div className="card" style={{ padding: 16, marginBottom: 16 }}><h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>About</h3><p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{company.description}</p></div>
        {company.benefits?.length > 0 && (
          <div className="card" style={{ padding: 16, marginBottom: 16 }}><h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Benefits</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{company.benefits.map(b => <span key={b} style={{ padding: '4px 10px', borderRadius: 9999, fontSize: 11, background: 'var(--primary-light)', color: 'var(--primary)', fontWeight: 500 }}>{b}</span>)}</div>
          </div>
        )}
        {companyJobs.length > 0 && (
          <div><h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Open Positions</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>{companyJobs.map((j, i) => <JobCard key={j.id} job={j} index={i} />)}</div>
          </div>
        )}
      </div>
    </PageTransition>
  );
}
