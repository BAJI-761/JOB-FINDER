import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import LandingHeader from '../components/LandingHeader';
import MagneticButton from '../components/MagneticButton';
import Counter from '../components/Counter';
import AIPopup from '../components/AIPopup';

export default function SplashPage() {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1]
      }
    }
  };

  return (
    <div className="newsprint-texture" style={{
      width: '100vw',
      minHeight: '100vh',
      backgroundColor: 'var(--bg-page)',
      color: 'var(--text-primary)',
      overflowX: 'hidden'
    }}>
      <LandingHeader />

      <motion.div 
        id="about"
        ref={containerRef} 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '160px var(--page-padding) 80px',
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: '60px',
          position: 'relative'
        }}
      >
        
        {/* Left Column - 8/12 Hero Text */}
        <div style={{ gridColumn: 'span 12' }} className="lg-span-8">
          <style>{`
            @media (min-width: 1024px) {
              .lg-span-8 { grid-column: span 8 !important; border-right: 1px solid var(--border-light); padding-right: 60px; }
              .lg-span-4 { grid-column: span 4 !important; }
            }
          `}</style>
          
          <motion.h1 variants={itemVariants} style={{ 
            fontSize: 'clamp(48px, 8vw, 100px)', 
            fontWeight: 900, 
            lineHeight: 0.85, 
            marginBottom: '40px', 
            fontFamily: 'var(--font-display-family)',
            color: 'var(--text-primary)',
            letterSpacing: '-0.03em',
            textTransform: 'uppercase'
          }}>
            Transform the <br/>way your <br/><span style={{ color: 'var(--accent)' }}>network</span> works
          </motion.h1>
          
          <motion.div variants={itemVariants} style={{ 
            fontSize: '18px', 
            lineHeight: 1.6, 
            maxWidth: '520px',
            marginBottom: '56px',
            color: 'var(--text-secondary)',
            fontFamily: 'var(--font-sans)'
          }}>
            <span className="drop-cap">L</span>
            inkUp brings professionals together with powerful tools designed to streamline hiring, boost careers, and drive industry connections. Join thousands of teams already leveraging our platform.
          </motion.div>

          <motion.div variants={itemVariants} style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
            <MagneticButton onClick={() => navigate('/onboarding')} className="btn-primary" style={{ width: 'auto' }}>
              <span style={{ padding: '0 48px', height: '64px', display: 'flex', alignItems: 'center' }}>GET STARTED</span>
            </MagneticButton>
            <MagneticButton onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })} className="btn-outline" style={{ width: 'auto' }}>
              <span style={{ padding: '0 48px', height: '64px', display: 'flex', alignItems: 'center' }}>EXPLORE SOLUTIONS</span>
            </MagneticButton>
          </motion.div>
          
          <motion.div variants={itemVariants} style={{ 
            marginTop: '32px', 
            fontFamily: 'var(--font-mono)', 
            fontSize: '11px', 
            textTransform: 'uppercase', 
            letterSpacing: '0.1em',
            color: 'var(--text-muted)'
          }}>
            Over 50,000+ professionals already using LinkUp
          </motion.div>
        </div>

        {/* Right Column - 4/12 Stats Panel */}
        <div className="lg-span-4" style={{ gridColumn: 'span 12', display: 'flex', flexDirection: 'column', gap: '48px', justifyContent: 'center' }}>
          
          <motion.div variants={itemVariants} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '20px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>
                Network Density
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div style={{ fontSize: '42px', fontWeight: 900, fontFamily: 'var(--font-display-family)', lineHeight: 1 }}>
                  <Counter value={2.4} suffix="M" />
                </div>
                <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--accent)', textTransform: 'uppercase', fontWeight: 700 }}>+12% MoM</div>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '8px', fontFamily: 'var(--font-sans)' }}>Verified professionals across 140+ countries.</p>
            </div>

            <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '20px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>
                Placement Velocity
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div style={{ fontSize: '42px', fontWeight: 900, fontFamily: 'var(--font-display-family)', lineHeight: 1 }}>
                  <Counter value={14} suffix="s" />
                </div>
                <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-primary)', textTransform: 'uppercase', fontWeight: 700 }}>Avg. Match</div>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '8px', fontFamily: 'var(--font-sans)' }}>Proprietary AI matching engine at scale.</p>
            </div>

            <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '20px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>
                Capital Flow
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div style={{ fontSize: '42px', fontWeight: 900, fontFamily: 'var(--font-display-family)', lineHeight: 1 }}>
                  $<Counter value={4} suffix="B+" />
                </div>
                <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-primary)', textTransform: 'uppercase', fontWeight: 700 }}>Total Value</div>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '8px', fontFamily: 'var(--font-sans)' }}>Salary value facilitated through LinkUp platform.</p>
            </div>
          </motion.div>

          {/* Editorial Callout */}
          <motion.div variants={itemVariants} style={{ 
            border: '1px solid var(--border)', 
            padding: '24px', 
            background: 'var(--bg-card)',
            position: 'relative'
          }}>
            <div style={{ 
              position: 'absolute',
              top: '-12px',
              left: '20px',
              background: 'var(--primary)',
              color: 'var(--bg-page)',
              fontSize: '10px',
              padding: '4px 12px',
              fontFamily: 'var(--font-mono)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em'
            }}>
              Industry Report
            </div>
            <div style={{ fontSize: '14px', fontStyle: 'italic', color: 'var(--text-primary)', marginBottom: '16px' }}>
              "LinkUp has redefined the digital newsprint of professional networking, blending classic trust with modern efficiency."
            </div>
            <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              — The Times of Tech
            </div>
          </motion.div>
          
        </div>
      </motion.div>

      {/* Phase 2: Trusted By Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        style={{ 
          borderTop: '1px solid var(--border-light)', 
          borderBottom: '1px solid var(--border-light)',
          padding: '60px 0',
          background: 'var(--bg-page)'
        }}
      >
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 var(--page-padding)' }}>
          <div style={{ 
            fontFamily: 'var(--font-mono)', 
            fontSize: '11px', 
            textAlign: 'center', 
            textTransform: 'uppercase', 
            letterSpacing: '0.2em',
            marginBottom: '40px',
            color: 'var(--text-muted)'
          }}>
            Trusted by global industry leaders
          </div>
          
          <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', position: 'relative' }}>
            <style>{`
              @keyframes marquee {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              .marquee-container {
                display: flex;
                width: max-content;
                animation: marquee 30s linear infinite;
              }
              .marquee-container:hover { animation-play-state: paused; }
              .brand-item {
                font-size: 24px;
                font-weight: 900;
                font-family: var(--font-display-family);
                opacity: 0.6;
                padding: 0 40px;
                color: var(--text-primary);
                filter: grayscale(1);
                transition: opacity 0.3s ease;
              }
              .brand-item:hover { opacity: 1; filter: none; }
              [data-theme='dark'] .brand-item {
                filter: grayscale(1) brightness(2);
              }
            `}</style>
            <div className="marquee-container">
              {[
                'Google', 'Microsoft', 'Adobe', 'Amazon', 'Meta', 'Stripe', 
                'Apple', 'Airbnb', 'Uber', 'Netflix', 'SpaceX', 'Goldman Sachs'
              ].concat([
                'Google', 'Microsoft', 'Adobe', 'Amazon', 'Meta', 'Stripe', 
                'Apple', 'Airbnb', 'Uber', 'Netflix', 'SpaceX', 'Goldman Sachs'
              ]).map((brand, idx) => (
                <div key={idx} className="brand-item">
                  {brand}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Phase 2: Product Showcase */}
      <motion.section 
        id="product" 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        style={{ padding: '120px 0', background: 'var(--bg-page)', overflow: 'hidden' }}
      >
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 var(--page-padding)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '60px', alignItems: 'center' }}>
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{ gridColumn: 'span 12' }} className="lg-span-5"
            >
              <h2 style={{ 
                fontSize: 'clamp(32px, 5vw, 64px)', 
                fontWeight: 900, 
                fontFamily: 'var(--font-display-family)', 
                lineHeight: 1,
                marginBottom: '32px',
                textTransform: 'uppercase'
              }}>
                Experience the <br/>Future of <br/>Networking
              </h2>
              <p style={{ fontSize: '18px', lineHeight: 1.6, color: 'var(--text-secondary)', marginBottom: '40px' }}>
                Our platform bridges the gap between traditional professional integrity and high-velocity digital tools. Manage your entire career lifecycle in one editorial-grade environment.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {['Smart AI Matching', 'Professional Communities', 'Direct Recruiter Access'].map(item => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '6px', height: '6px', background: 'var(--accent)' }} />
                    <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '14px', letterSpacing: '0.05em' }}>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              style={{ gridColumn: 'span 12', position: 'relative', height: '600px' }} className="lg-span-7"
            >
              {/* Layered UI Visuals */}
              <motion.div 
                whileHover={{ y: -10, rotate: -2 }}
                style={{ 
                  position: 'absolute', 
                  top: '10%', 
                  left: '10%', 
                  width: '80%', 
                  height: '80%', 
                  background: 'var(--bg-card)', 
                  border: '1px solid var(--border)',
                  boxShadow: '20px 20px 0px rgba(0,0,0,0.05)',
                  padding: '24px',
                  zIndex: 2
                }}
              >
                <div style={{ height: '40px', borderBottom: '1px solid var(--border-light)', marginBottom: '24px', display: 'flex', gap: '8px' }}>
                   <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--border-light)' }} />
                   <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--border-light)' }} />
                   <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--border-light)' }} />
                </div>
                <div style={{ display: 'flex', gap: '20px' }}>
                  <div style={{ width: '30%', height: '300px', border: '1px solid var(--border-light)' }} />
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ height: '24px', width: '60%', background: 'var(--border-light)' }} />
                    <div style={{ height: '12px', width: '100%', background: 'var(--border-light)' }} />
                    <div style={{ height: '12px', width: '90%', background: 'var(--border-light)' }} />
                    <div style={{ height: '12px', width: '95%', background: 'var(--border-light)' }} />
                    <div style={{ height: '100px', width: '100%', border: '1px solid var(--border-light)', marginTop: '20px' }} />
                  </div>
                </div>
              </motion.div>
              <motion.div 
                whileHover={{ y: -20, rotate: 2 }}
                style={{ 
                  position: 'absolute', 
                  top: '40%', 
                  right: '5%', 
                  width: '50%', 
                  height: '40%', 
                  background: 'var(--primary)', 
                  padding: '20px',
                  zIndex: 3,
                  color: 'var(--bg-page)',
                  border: '1px solid var(--border)'
                }}
              >
                <div style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', marginBottom: '8px' }}>Live Matches</div>
                <div style={{ fontSize: '32px', fontWeight: 900 }}>1,248</div>
                <div style={{ fontSize: '10px', marginTop: 'auto', opacity: 0.6 }}>Real-time professional synergy</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Phase 2: Features Grid */}
      <motion.section 
        id="features" 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        style={{ padding: '120px 0', background: 'var(--bg-page)', borderTop: '1px solid var(--border-light)' }}
      >
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 var(--page-padding)' }}>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ textAlign: 'center', marginBottom: '80px' }}
          >
            <h2 style={{ fontSize: '14px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--accent)', marginBottom: '16px' }}>Core Capabilities</h2>
            <h3 style={{ fontSize: '48px', fontWeight: 900, fontFamily: 'var(--font-display-family)', textTransform: 'uppercase' }}>Built for Scale</h3>
          </motion.div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0' }}>
            {[
              { title: 'AI Networking', desc: 'Predictive algorithms that connect you with your next major breakthrough.' },
              { title: 'Smart Hiring', desc: 'Recruitment tools that prioritize quality and cultural synergy.' },
              { title: 'Professional Communities', desc: 'Private, high-authority spaces for industry-specific discourse.' },
              { title: 'Resume Builder', desc: 'Editorial-grade portfolio generation for the modern professional.' },
              { title: 'Real-time Messaging', desc: 'Secure, low-latency communication for instant networking.' },
              { title: 'Hiring Analytics', desc: 'Deep data insights into your professional reach and impact.' }
            ].map((f, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                style={{ 
                  padding: '48px', 
                  border: '1px solid var(--border-light)',
                  transition: 'all 0.3s ease',
                  cursor: 'default',
                  background: 'var(--bg-card)'
                }} className="feature-card"
              >
                <style>{`
                  .feature-card:hover { background: var(--bg-card-hover) !important; }
                `}</style>
                <div style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: '24px' }}>0{i+1}</div>
                <h4 style={{ fontSize: '20px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '16px', fontFamily: 'var(--font-display-family)' }}>{f.title}</h4>
                <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--text-secondary)' }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Phase 2: Testimonials Section */}
      <motion.section 
        id="pricing"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        style={{ padding: '120px 0', background: 'var(--bg-page)', borderTop: '1px solid var(--border-light)' }}
      >
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 var(--page-padding)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '60px' }}>
            <div style={{ gridColumn: 'span 12' }} className="lg-span-4">
               <h2 style={{ fontSize: '14px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--text-muted)', marginBottom: '16px' }}>Voices of Authority</h2>
               <h3 style={{ fontSize: '48px', fontWeight: 900, fontFamily: 'var(--font-display-family)', textTransform: 'uppercase', lineHeight: 1 }}>What Industry Leaders Say</h3>
            </div>
            
            <div style={{ gridColumn: 'span 12' }} className="lg-span-8">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '40px' }}>
                {[
                  { quote: "LinkUp has completely transformed our executive search process. The precision of their AI matching is unparalleled in the market.", author: "Sarah Jenkins", role: "VP of Talent, Google" },
                  { quote: "An editorial masterpiece of a platform. It feels as high-end as the professionals it serves.", author: "Marcus Thorne", role: "Creative Director, Adobe" },
                  { quote: "The only networking tool that respects the integrity of professional connections while delivering digital speed.", author: "David Chen", role: "CTO, Stripe" },
                  { quote: "Finally, a platform that doesn't feel like a social network, but a professional utility.", author: "Elena Rossi", role: "Principal Architect, Microsoft" }
                ].map((t, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    style={{ 
                      padding: '40px', 
                      background: 'var(--bg-card)', 
                      border: '1px solid var(--border-light)',
                      position: 'relative'
                    }}
                  >
                    <div style={{ fontSize: '40px', fontFamily: 'var(--font-display-family)', color: 'var(--accent)', position: 'absolute', top: '20px', left: '20px', opacity: 0.2 }}>"</div>
                    <p style={{ fontSize: '16px', lineHeight: 1.6, fontStyle: 'italic', marginBottom: '24px', position: 'relative', zIndex: 1 }}>
                      {t.quote}
                    </p>
                    <div>
                      <div style={{ fontWeight: 900, fontSize: '14px', textTransform: 'uppercase' }}>{t.author}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{t.role}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Phase 2: Footer */}
      <footer id="footer" style={{ padding: '100px 0 40px', background: 'var(--bg-page)', borderTop: '2px solid var(--border)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 var(--page-padding)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '60px', marginBottom: '100px' }}>
            <div style={{ gridColumn: 'span 12' }} className="lg-span-4">
              <div style={{ fontSize: '24px', fontWeight: 900, fontFamily: 'var(--font-display-family)', marginBottom: '24px', color: 'var(--text-primary)' }}>LINKUP<span style={{ color: 'var(--accent)' }}>.</span></div>
              <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--text-secondary)', maxWidth: '300px' }}>
                The definitive platform for professional excellence. Bridging the gap between legacy trust and digital velocity.
              </p>
            </div>
            
            <div style={{ gridColumn: 'span 12' }} className="lg-span-8">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }}>
                <div>
                  <h5 style={{ fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '24px', color: 'var(--text-primary)' }}>Product</h5>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                    <li style={{ cursor: 'pointer' }} onClick={(e) => { e.preventDefault(); document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }); }}>Features</li>
                    <li style={{ cursor: 'pointer' }} onClick={(e) => { e.preventDefault(); document.getElementById('product')?.scrollIntoView({ behavior: 'smooth' }); }}>Solutions</li>
                    <li style={{ cursor: 'pointer' }} onClick={(e) => { e.preventDefault(); document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' }); }}>Pricing</li>
                    <li style={{ cursor: 'pointer' }} onClick={() => navigate('/register')}>Security</li>
                  </ul>
                </div>
                <div>
                  <h5 style={{ fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '24px', color: 'var(--text-primary)' }}>Resources</h5>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                    <li style={{ cursor: 'pointer' }} onClick={() => navigate('/register')}>Documentation</li>
                    <li style={{ cursor: 'pointer' }} onClick={() => navigate('/register')}>Industry Report</li>
                    <li style={{ cursor: 'pointer' }} onClick={() => navigate('/register')}>Community</li>
                    <li style={{ cursor: 'pointer' }} onClick={() => navigate('/register')}>Partners</li>
                  </ul>
                </div>
                <div>
                  <h5 style={{ fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '24px', color: 'var(--text-primary)' }}>Company</h5>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                    <li style={{ cursor: 'pointer' }} onClick={(e) => { e.preventDefault(); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); }}>About Us</li>
                    <li style={{ cursor: 'pointer' }} onClick={() => navigate('/register')}>Careers</li>
                    <li style={{ cursor: 'pointer' }} onClick={() => navigate('/register')}>Legal</li>
                    <li style={{ cursor: 'pointer' }} onClick={() => navigate('/register')}>Contact</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div style={{ 
            borderTop: '1px solid var(--border-light)', 
            paddingTop: '40px', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            fontSize: '12px',
            fontFamily: 'var(--font-mono)',
            color: 'var(--text-muted)',
            textTransform: 'uppercase'
          }}>
            <div>© 2026 LINKUP INC. ALL RIGHTS RESERVED.</div>
            <div style={{ display: 'flex', gap: '24px' }}>
              <span>Twitter</span>
              <span>LinkedIn</span>
              <span>Instagram</span>
            </div>
          </div>
        </div>
      </footer>
      <AIPopup />
    </div>
  );
}
