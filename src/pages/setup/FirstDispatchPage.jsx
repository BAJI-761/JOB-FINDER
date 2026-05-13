import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, ArrowRight, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import PageTransition from '../../components/PageTransition';
import SetupLayout from '../../components/SetupLayout';
import { HIRING_ASSETS } from '../../data/OnboardingAssets';
import styles from './Setup.module.css';

export default function FirstDispatchPage() {
  const navigate = useNavigate();

  const handleFinish = () => {
    navigate('/home');
  };

  return (
    <PageTransition variant="newsprint">
      <SetupLayout
        step={3}
        totalSteps={3}
        image={HIRING_ASSETS.DISPATCH}
        title="The First Dispatch"
        subtitle="You are now authorized to recruit. Launch your first posting to the network."
        sidebarTitle="Initial Transmission"
        sidebarSubtitle="Launch your presence to the global network. Secure authority within the recruitment gazette."
      >
        <div style={{ marginTop: '20px', padding: '32px', border: '1px solid var(--border)', textAlign: 'center', background: 'var(--bg-page-alt)' }}>
          <div style={{ 
            width: '64px', 
            height: '64px', 
            background: 'var(--primary)', 
            color: 'var(--bg-page)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            margin: '0 auto 24px' 
          }}>
            <Zap size={32} />
          </div>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', fontWeight: '400', marginBottom: '12px' }}>Initialize Recruitment</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', maxWidth: '400px', margin: '0 auto 32px', fontSize: '14px', lineHeight: 1.5 }}>
            Ready to find your next industry leader? Launch a job posting now or explore the recruitment gazette dashboard first.
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button className={styles.dispatchBtn} onClick={() => navigate('/post-job')} style={{ justifyContent: 'center' }}>
              Launch First Dispatch
              <ArrowRight size={16} />
            </button>
            <button 
              onClick={handleFinish}
              style={{ 
                background: 'none', 
                border: '1px solid var(--border)', 
                padding: '12px', 
                fontFamily: 'var(--font-mono)', 
                fontSize: '11px', 
                textTransform: 'uppercase', 
                cursor: 'pointer',
                color: 'var(--text-secondary)',
                letterSpacing: '1px'
              }}
            >
              Skip to Dashboard
            </button>
          </div>
        </div>

        <div style={{ marginTop: '32px', display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--trusted-green)', fontSize: '12px', fontFamily: 'var(--font-mono)', letterSpacing: '1px' }}>
          <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'var(--trusted-green)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Check size={12} />
          </div>
          <span>AUTHORITY ESTABLISHED</span>
        </div>
      </SetupLayout>
    </PageTransition>
  );
}
