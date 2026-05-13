import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, MapPin, ArrowRight, Type, FileText, Camera } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import PageTransition from '../../components/PageTransition';
import SetupLayout from '../../components/SetupLayout';
import EditorialInput from '../../components/EditorialInput';
import { PROFESSIONAL_ASSETS } from '../../data/OnboardingAssets';
import styles from './Setup.module.css';

export default function ProfileSetupPage() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  const [form, setForm] = useState({ 
    name: state.currentUser?.name || '', 
    headline: '', 
    location: '', 
    bio: '',
    photo: null
  });

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm(prev => ({ ...prev, photo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    dispatch({ 
      type: 'UPDATE_PROFILE', 
      payload: { 
        name: form.name, 
        headline: form.headline, 
        location: { label: form.location, address: form.location }, 
        bio: form.bio,
        avatar: form.photo
      } 
    });
    navigate('/setup/skills');
  };

  return (
    <PageTransition variant="newsprint">
      <SetupLayout
        step={1}
        totalSteps={3}
        image={PROFESSIONAL_ASSETS.PROFILE}
        title="Professional Blueprint"
        subtitle="Establish your identity within the network's high-authority archives."
        sidebarTitle="Identity Archive"
        sidebarSubtitle="Your professional narrative begins here. Define how the network perceives your expertise."
      >
        <div className={styles.avatarSection} style={{ marginBottom: '40px' }}>
          <div className={styles.avatarCircle} style={{ overflow: 'hidden', border: '1px solid var(--border)' }}>
            {form.photo ? (
              <img src={form.photo} alt="Portrait" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <User size={32} />
            )}
          </div>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handlePhotoUpload} 
            style={{ display: 'none' }} 
            accept="image/*"
          />
          <button 
            type="button"
            className={styles.actionBtnText} 
            style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}
            onClick={() => fileInputRef.current?.click()}
          >
            <Camera size={14} />
            Replace Portrait
          </button>
        </div>

        <form onSubmit={handleNext}>
          <EditorialInput 
            label="Full Legal Name"
            icon={User}
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            placeholder="Editorial Professional"
            required
          />

          <EditorialInput 
            label="Professional Headline"
            icon={Type}
            value={form.headline}
            onChange={e => setForm({ ...form, headline: e.target.value })}
            placeholder="e.g. Strategic Product Architect"
            required
          />

          <EditorialInput 
            label="Primary Jurisdiction (Location)"
            icon={MapPin}
            value={form.location}
            onChange={e => setForm({ ...form, location: e.target.value })}
            placeholder="e.g. Bangalore, IN"
            required
          />

          <EditorialInput 
            label="Career Narrative (Bio)"
            icon={FileText}
            multiline
            value={form.bio}
            onChange={e => setForm({ ...form, bio: e.target.value })}
            placeholder="A brief history of your professional impact..."
            required
          />

          <div className={styles.footer} style={{ marginTop: '40px' }}>
            <div /> {/* Spacer */}
            <button type="submit" className={styles.dispatchBtn}>
              Continue to Skills
              <ArrowRight size={16} />
            </button>
          </div>
        </form>
      </SetupLayout>
    </PageTransition>
  );
}
