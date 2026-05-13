import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Globe, MapPin, Briefcase, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import PageTransition from '../../components/PageTransition';
import SetupLayout from '../../components/SetupLayout';
import EditorialInput from '../../components/EditorialInput';
import { HIRING_ASSETS } from '../../data/OnboardingAssets';
import styles from './Setup.module.css';

export default function CompanySetupPage() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({ 
    companyName: '', 
    industry: '', 
    website: '', 
    location: '', 
    description: '' 
  });

  const handleNext = (e) => {
    e.preventDefault();
    dispatch({ 
      type: 'UPDATE_COMPANY', 
      payload: { 
        id: state.currentUser?.companyId,
        ...form,
        location: { label: form.location, address: form.location }
      } 
    });
    navigate('/setup/preferences');
  };

  return (
    <PageTransition variant="newsprint">
      <SetupLayout
        step={1}
        totalSteps={3}
        image={HIRING_ASSETS.COMPANY}
        title="Company Gazetteer"
        subtitle="Establish your organization's presence in the Newsprint registry."
        sidebarTitle="Corporate Registry"
        sidebarSubtitle="Position your organization as a pillar of industry authority. Define your firm's domain."
      >
        <form onSubmit={handleNext}>
          <EditorialInput 
            label="Legal Entity Name"
            icon={Building2}
            value={form.companyName}
            onChange={e => setForm({ ...form, companyName: e.target.value })}
            placeholder="e.g. Global Insight Group"
            required
          />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <EditorialInput 
              label="Industry Domain"
              icon={Briefcase}
              value={form.industry}
              onChange={e => setForm({ ...form, industry: e.target.value })}
              placeholder="e.g. Technology"
              required
            />
            <EditorialInput 
              label="Digital Headquarters (URL)"
              icon={Globe}
              value={form.website}
              onChange={e => setForm({ ...form, website: e.target.value })}
              placeholder="https://authority.com"
              required
            />
          </div>

          <EditorialInput 
            label="Principal Jurisdiction (Location)"
            icon={MapPin}
            value={form.location}
            onChange={e => setForm({ ...form, location: e.target.value })}
            placeholder="e.g. London, UK"
            required
          />

          <EditorialInput 
            label="Corporate Narrative (Bio)"
            multiline
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            placeholder="Define your organization's impact and mission..."
            required
          />

          <div className={styles.footer} style={{ marginTop: '40px' }}>
            <div /> {/* Spacer */}
            <button type="submit" className={styles.dispatchBtn}>
              Continue to Strategy
              <ArrowRight size={16} />
            </button>
          </div>
        </form>
      </SetupLayout>
    </PageTransition>
  );
}
