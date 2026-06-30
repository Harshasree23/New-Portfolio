import { useEffect, useRef } from 'react';
import myPic from '../assets/my_pic.png';

// Keep the categories for semantic listing/display
const CATEGORIES = ['All', 'Web Dev', 'Machine Learning', 'Operations Research'];

const Hero = () => {
  const heroRef = useRef(null);

  // High-performance mouse tracking for a very subtle ambient glow
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!heroRef.current) return;
      const { clientX, clientY } = e;
      heroRef.current.style.setProperty('--mouse-x', `${clientX}px`);
      heroRef.current.style.setProperty('--mouse-y', `${clientY}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden 
        isolate bg-[var(--color-bg-primary)] transition-colors duration-700"
    >

      {/* Ultra-Subtle Mouse Glow */}
      <div 
        className="hidden md:block absolute inset-0 pointer-events-none z-0 transition-opacity duration-500"
        style={{
          background: 'radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), color-mix(in srgb, var(--color-text-primary) 3%, transparent), transparent 40%)'
        }}
      />

      {/* Premium Grain Texture */}
      <svg className="hidden">
        <filter id="premium-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/>
          <feColorMatrix type="matrix" values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 0.08 0" />
        </filter>
      </svg>
      <div 
        className="absolute inset-0 pointer-events-none z-10 mix-blend-overlay"
        style={{ filter: 'url(#premium-noise)' }}
      />

      {/* The Core Glassmorphic Container */}
      <div className="relative z-20 max-w-[1400px] w-full mx-auto px-[clamp(1rem,4vw,4rem)]">
        
        {/* HIGH-FIDELITY FROSTED GLASS WRAPPER */}
        <div 
          className="relative flex flex-col-reverse md:flex-row items-center gap-[clamp(2.5rem,5vw,5rem)] p-[clamp(2rem,6vw,5rem)] rounded-[var(--radius-xl)] border border-[var(--color-border-light)] transition-all duration-700 overflow-hidden"
          style={{
            backgroundColor: 'var(--color-glass-bg)',
            backgroundImage: 'linear-gradient(110deg, rgba(255,255,255,0.05) 0%, transparent 40%, rgba(255,255,255,0.02) 100%)',
            boxShadow: `
              inset 0 1px 1px rgba(255, 255, 255, 0.15), 
              inset 0 -1px 1px rgba(0, 0, 0, 0.15), 
              0 16px 40px rgba(0, 0, 0, 0.1)
            `,
            backdropFilter: 'blur(var(--blur-glass))',
            WebkitBackdropFilter: 'blur(var(--blur-glass))'
          }}
        >
          {/* Text & Controls */}
          <div className="relative z-20 flex-1 flex flex-col items-center md:items-start text-center md:text-left w-full">
            
            <h1 className="font-display tracking-tighter leading-[1.05] 
              text-[clamp(2.5rem,8vw,6rem)] text-[var(--color-text-primary)] mb-5 transition-colors duration-700 drop-shadow-sm">
              Munimadugu<br />Sree Harsha
            </h1>

            <p className="text-[clamp(1rem,1.5vw,1.25rem)] text-[var(--color-text-secondary)] max-w-[600px] leading-relaxed font-normal mb-10 transition-colors duration-700">
              Full-Stack Engineer & AI Researcher translating complex mathematical models into scalable web applications.
            </p>

            {/* Focus Tag Indicators */}
            <div className="w-full md:w-auto scrollbar-none flex gap-2 sm:gap-3 overflow-x-auto snap-x snap-mandatory flex-nowrap pb-2 justify-start mask-fade-edges">
              {CATEGORIES.map((category) => (
                <div
                  key={category}
                  className="shrink-0 snap-start px-5 py-2.5 text-xs md:text-sm font-medium rounded-[var(--radius-pill)] border transition-all duration-300"
                  style={{
                    backgroundColor: 'transparent',
                    color: 'var(--color-text-secondary)',
                    borderColor: 'var(--color-border-light)',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = 'var(--color-text-primary)';
                    e.target.style.borderColor = 'color-mix(in srgb, var(--color-border-light) 100%, var(--color-text-primary) 30%)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = 'var(--color-text-secondary)';
                    e.target.style.borderColor = 'var(--color-border-light)';
                  }}
                >
                  {category}
                </div>
              ))}
            </div>
          </div>

          {/* Clean Profile Photo Integration */}
          <div className="relative z-20 shrink-0 w-[180px] h-[220px] md:w-[280px] md:h-[360px] rounded-[var(--radius-lg)] overflow-hidden shadow-2xl transition-transform duration-700 hover:scale-[1.02]">
            <div className="absolute inset-0 border border-[var(--color-border-light)] rounded-[var(--radius-lg)] z-10 pointer-events-none" />
            <img 
              src={myPic} 
              alt="Munimadugu Sree Harsha" 
              className="w-full h-full object-cover" 
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;