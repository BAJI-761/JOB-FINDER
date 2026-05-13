import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Target, Users, Zap, ArrowRight, ArrowLeft, Briefcase } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import PageTransition from '../../components/PageTransition';
import SetupLayout from '../../components/SetupLayout';
import EditorialInput from '../../components/EditorialInput';
import { HIRING_ASSETS } from '../../data/OnboardingAssets';
import styles from './Setup.module.css';

export default function HiringPreferencesPage() {
  const { dispatch } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({ 
    cadence: 'high', 
    talentTier: 'senior', 
    focus: '' 
  });

  const handleNext = (e) => {
    e.preventDefault();
    dispatch({ 
      type: 'UPDATE_HIRING_PREFS', 
      payload: form 
    });
    navigate('/setup/first-dispatch');
  };

  return (
    <PageTransition variant="newsprint">
      <SetupLayout
        step={2}
        totalSteps={3}
        image={HIRING_ASSETS.PREFERENCES}
        title="Recruitment Preferences"
        subtitle="Define your hiring cadence and talent tiers."
        sidebarTitle="Recruitment Strategy"
        sidebarSubtitle="Calibrate your search parameters to secure top-tier industry talent within the network."
      >
        <form onSubmit={handleNext}>
          <div className={styles.fieldGroup} style={{ marginBottom: '32px' }}>
            <label className={styles.editorialLabel}>Hiring Cadence</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '12px' }}>
              {['high', 'boutique'].map(c => (
                <button 
                  key={c}
                  type="button"
                  onClick={() => setForm({ ...form, cadence: c })}
                  style={{ 
                    padding: '12px', 
                    border: '1px solid var(--border)', 
                    background: form.cadence === c ? 'var(--primary)' : 'transparent',
                    color: form.cadence === c ? 'var(--bg-page)' : 'var(--text-primary)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    borderRadius: 0
                  }}
                >
                  {c === 'high' ? 'High Volume' : 'Boutique Select'}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.fieldGroup} style={{ marginBottom: '32px' }}>
            <label className={styles.editorialLabel}>Target Talent Tier</label>
            <select 
              className={styles.editorialInput} 
              value={form.talentTier} 
              onChange={e => setForm({ ...form, talentTier: e.target.value })}
              style={{ background: 'var(--bg-card)', marginTop: '8px', padding: '0 12px', height: '44px' }}
            >
              <option value="entry">Executive Trainee (Entry)</option>
              <option value="mid">Industry Associate (Mid)</option>
              <option value="senior">Strategic Leader (Senior)</option>
              <option value="lead">Principal Architect (Lead)</option>
            </select>
          </div>

          <EditorialInput 
            label="Strategic Focus Area"
            icon={Target}
            value={form.focus}
            onChange={e => setForm({ ...form, focus: e.target.value })}
            placeholder="e.g. Quantitative Analysis, System Design"
            required
          />

          <div className={styles.footer} style={{ marginTop: '40px' }}>
            <button 
              type="button"
              className={styles.btnOutline} 
              onClick={() => navigate(-1)} 
              style={{ padding: '12px 24px', fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase', border: '1px solid var(--border)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <ArrowLeft size={16} />
              Archive Back
            </button>
            <button type="submit" className={styles.dispatchBtn}>
              Continue to Dispatch
              <ArrowRight size={16} />
            </button>
          </div>
        </form>
      </SetupLayout>
    </PageTransition>
  );
}
