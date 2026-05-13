import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Plus, ArrowRight, ArrowLeft, Target, Briefcase, Building2, Calendar } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import PageTransition from '../../components/PageTransition';
import SetupLayout from '../../components/SetupLayout';
import EditorialInput from '../../components/EditorialInput';
import { PROFESSIONAL_ASSETS } from '../../data/OnboardingAssets';
import styles from './Setup.module.css';

const suggestedSkills = ['JavaScript', 'React', 'Python', 'Figma', 'Node.js', 'TypeScript', 'SQL', 'HTML/CSS', 'Java', 'Docker', 'AWS', 'Git'];

export default function SkillsSetupPage() {
  const { dispatch } = useApp();
  const navigate = useNavigate();
  const [skills, setSkills] = useState([]);
  const [exp, setExp] = useState([{ company: '', role: '', duration: '' }]);

  const toggleSkill = (s) => setSkills(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);

  const handleNext = (e) => {
    e.preventDefault();
    dispatch({ type: 'UPDATE_PROFILE', payload: { skills, experience: exp.filter(e => e.company) } });
    navigate('/setup/resume');
  };

  return (
    <PageTransition variant="newsprint">
      <SetupLayout
        step={2}
        totalSteps={3}
        image={PROFESSIONAL_ASSETS.SKILLS}
        title="Talent Archives"
        subtitle="Index your core competencies and professional history."
        sidebarTitle="Talent Index"
        sidebarSubtitle="Categorize your core competencies to optimize your authority within the network."
      >
        <section style={{ marginBottom: '32px' }}>
          <label className={styles.editorialLabel}>Core Competencies</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: '16px' }}>
            {suggestedSkills.map(s => (
              <button 
                key={s} 
                onClick={() => toggleSkill(s)} 
                style={{
                  padding: '10px 16px', 
                  fontSize: '11px', 
                  fontFamily: 'var(--font-mono)',
                  textTransform: 'uppercase',
                  fontWeight: 600, 
                  border: '1px solid var(--border)',
                  background: skills.includes(s) ? 'var(--primary)' : 'transparent',
                  color: skills.includes(s) ? 'var(--bg-page)' : 'var(--text-secondary)',
                  cursor: 'pointer', 
                  transition: 'all 200ms ease',
                  borderRadius: 0
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </section>

        <section>
          <label className={styles.editorialLabel}>Professional History</label>
          <div style={{ marginTop: '16px', display: 'grid', gap: '16px' }}>
            {exp.map((e, i) => (
              <div key={i} style={{ border: '1px solid var(--border)', padding: '20px', background: 'var(--bg-page-alt)' }}>
                <EditorialInput 
                  icon={Building2}
                  placeholder="Organization Name" 
                  value={e.company} 
                  onChange={ev => { const n = [...exp]; n[i].company = ev.target.value; setExp(n); }} 
                />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <EditorialInput 
                    icon={Briefcase}
                    placeholder="Editorial Role" 
                    value={e.role} 
                    onChange={ev => { const n = [...exp]; n[i].role = ev.target.value; setExp(n); }} 
                  />
                  <EditorialInput 
                    icon={Calendar}
                    placeholder="Tenure (e.g. 2 yrs)" 
                    value={e.duration} 
                    onChange={ev => { const n = [...exp]; n[i].duration = ev.target.value; setExp(n); }} 
                  />
                </div>
              </div>
            ))}
          </div>
          <button 
            className={styles.actionBtnText} 
            onClick={() => setExp([...exp, { company: '', role: '', duration: '' }])} 
            style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <Plus size={14} />
            Append Experience
          </button>
        </section>

        <div className={styles.footer} style={{ marginTop: '40px' }}>
          <button 
            className={styles.btnOutline} 
            onClick={() => navigate(-1)} 
            style={{ padding: '12px 24px', fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase', border: '1px solid var(--border)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <ArrowLeft size={16} />
            Archive Back
          </button>
          <button className={styles.dispatchBtn} onClick={handleNext}>
            Continue to Dispatch
            <ArrowRight size={16} />
          </button>
        </div>
      </SetupLayout>
    </PageTransition>
  );
}
