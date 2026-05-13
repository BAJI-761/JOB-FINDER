import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileText, CheckCircle, ArrowLeft, Zap } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import PageTransition from '../../components/PageTransition';
import SetupLayout from '../../components/SetupLayout';
import styles from './Setup.module.css';

import { PROFESSIONAL_ASSETS } from '../../data/OnboardingAssets';

export default function ResumeSetupPage() {
  const { dispatch } = useApp();
  const navigate = useNavigate();
  const [fileName, setFileName] = useState('');
  const [done, setDone] = useState(false);

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (file) { 
      setFileName(file.name); 
      dispatch({ type: 'UPDATE_PROFILE', payload: { resume: file.name } }); 
    }
  };

  const handleComplete = () => { 
    setDone(true); 
    setTimeout(() => navigate('/home', { replace: true }), 2000); 
  };

  if (done) return (
    <PageTransition variant="newsprint">
      <div className={styles.setupPageWrapper} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <div className={styles.grainOverlay} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ width: 80, height: 80, background: 'var(--primary)', color: 'var(--bg-page)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <CheckCircle size={40} />
          </div>
          <h2 className={styles.formTitle} style={{ marginBottom: '8px' }}>Authority Established</h2>
          <p className={styles.formSubtitle}>Your credentials have been indexed in the global network archives.</p>
          <div style={{ marginTop: '40px', fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '2px' }}>
            Redirecting to Front Page...
          </div>
        </div>
      </div>
    </PageTransition>
  );

  return (
    <PageTransition variant="newsprint">
      <SetupLayout
        step={3}
        totalSteps={3}
        image={PROFESSIONAL_ASSETS.RESUME}
        title="Dispatch Credentials"
        subtitle="Upload your professional resume to the network's high-authority database."
        sidebarTitle="Final Dispatch"
        sidebarSubtitle="Commit your credentials to the network's high-authority database."
      >
        <label className={styles.uploadZone} style={{ marginTop: '20px', minHeight: '240px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <input type="file" accept=".pdf" onChange={handleFile} style={{ display: 'none' }} />
          <div style={{ marginBottom: '20px' }}>
            {fileName ? <FileText size={56} color="var(--primary)" /> : <Upload size={56} color="var(--text-muted)" />}
          </div>
          <span style={{ 
            display: 'block', 
            fontFamily: 'var(--font-mono)', 
            fontSize: '12px', 
            fontWeight: 700, 
            textTransform: 'uppercase',
            letterSpacing: '1px',
            color: fileName ? 'var(--primary)' : 'var(--text-secondary)' 
          }}>
            {fileName || 'Transmit PDF / Document'}
          </span>
          <span style={{ marginTop: '12px', display: 'block', fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-sans)' }}>
            High-Resolution PDF (Max 5MB)
          </span>
        </label>

        <div className={styles.footer} style={{ marginTop: '60px' }}>
          <button className={styles.btnOutline} onClick={() => navigate(-1)} style={{ padding: '12px 24px', fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase', border: '1px solid var(--border)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ArrowLeft size={16} />
            Archive Back
          </button>
          <button className={styles.dispatchBtn} onClick={handleComplete}>
            Complete Onboarding
            <Zap size={16} />
          </button>
        </div>

        <button 
          onClick={() => navigate('/home', { replace: true })} 
          style={{ width: '100%', marginTop: '32px', fontSize: '11px', color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '1px' }}
        >
          Skip Dispatch for Now
        </button>
      </SetupLayout>
    </PageTransition>
  );
}
