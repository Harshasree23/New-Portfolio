import { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const ProjectsSection = ({ data }) => {
  const navigate = useNavigate();
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const visibleElements = useRef(new Set());

  // Handle fallback or slicing for the top 4 featured projects
  const featuredProjects = useMemo(() => {
    return (data || []).slice(0, 4);
  }, [data]);

  // High-performance structural scrolling observer for card sync
  useEffect(() => {
    if (featuredProjects.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        let hasChanges = false;
        entries.forEach((entry) => {
          const idx = featuredProjects.findIndex(
            (p) => `project-${p.id}` === entry.target.id
          );
          if (idx !== -1) {
            if (entry.isIntersecting) {
              visibleElements.current.add(idx);
              hasChanges = true;
            } else {
              visibleElements.current.delete(idx);
              hasChanges = true;
            }
          }
        });
        if (hasChanges && visibleElements.current.size > 0) {
          setActiveProjectIdx(Math.max(...Array.from(visibleElements.current)));
        }
      },
      { rootMargin: '-30% 0px -30% 0px' }
    );

    featuredProjects.forEach((p) => {
      const el = document.getElementById(`project-${p.id}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [featuredProjects]);

  // Helper to extract the first image from the comma-separated string
  const getPrimaryImage = (imagesStr, fallbackId) => {
    if (!imagesStr) return `https://picsum.photos/seed/${fallbackId}/1920/1080`;
    const imageList = imagesStr.split(',').map(img => img.trim());
    return imageList[0] || `https://picsum.photos/seed/${fallbackId}/1920/1080`;
  };

  // Helper to map status to correct color and label
  const getStatusConfig = (status) => {
    const s = (status || '').toLowerCase();
    if (s === 'live') return { color: 'bg-green-500', label: 'Live' };
    if (s === 'working') return { color: 'bg-yellow-500', label: 'Working' };
    return { color: 'bg-red-500', label: 'Not Live' };
  };

  if (!featuredProjects.length) return null;

  return (
    <section
      id="projects"
      className="relative max-w-[1400px] mx-auto py-[clamp(5rem,10vw,10rem)] px-[clamp(1rem,5vw,4rem)]"
    >
      <div className="flex flex-col md:flex-row gap-8 lg:gap-16 items-start">
        
        {/* Left Sidebar: Sticky Navigator & Navigation Triggers */}
        <div className="hidden md:flex flex-col md:w-48 lg:w-64 sticky top-[20vh] h-[75vh] justify-between z-40">
          
          {/* Active Sticky Stack Tracker */}
          <div className="flex flex-col gap-6">
            <h4 className="text-sm uppercase tracking-widest text-[var(--color-text-muted)] mb-4 font-semibold">Featured Work</h4>
            
            {featuredProjects.map((p, index) => {
              const isActive = activeProjectIdx === index;
              const dynamicColor = `linear-gradient(135deg, hsl(${index * 90}, 100%, 50%), hsl(${index * 90 + 60}, 100%, 40%))`;
              
              return (
                <button
                  key={`nav-${p.id}`}
                  onClick={() => document.getElementById(`project-${p.id}`).scrollIntoView({ behavior: 'smooth' })}
                  className="flex flex-col gap-2 group text-left cursor-pointer"
                >
                  <div
                    className={`h-[2px] rounded-full transition-all duration-500 ${
                      isActive ? 'w-full' : 'w-8 bg-[var(--color-text-muted)]/20 group-hover:w-16 group-hover:bg-[var(--color-text-muted)]'
                    }`}
                    style={isActive ? { background: dynamicColor } : {}}
                  />
                  
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs font-mono transition-all duration-300 ${
                        isActive ? 'font-bold scale-110' : 'text-[var(--color-text-muted)] group-hover:text-[var(--color-text-primary)]'
                      }`}
                      style={isActive ? { backgroundImage: dynamicColor, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' } : {}}
                    >
                      0{index + 1}
                    </span>
                    <span 
                      className={`text-sm font-semibold truncate transition-all duration-300 ${
                          isActive ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-muted)] group-hover:text-[var(--color-text-primary)]'
                      }`}
                    >
                      {p.title}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <button
            onClick={() => { window.scrollTo(0, 0); navigate('/projects'); }}
            className="w-full whitespace-nowrap px-6 py-4 text-sm font-bold bg-[var(--color-text-primary)] text-[var(--color-text-inverse)] rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.15)] hover:scale-105 transition-transform duration-300"
          >
            View All Projects
          </button>
        </div>

        {/* Right Column: Stacked CSS Scroll Sticky Cards */}
        <div className="flex-1 w-full flex flex-col gap-[6vh] md:gap-[8vh] pb-[10vh]">
          {featuredProjects.map((project, index) => {
            const dynamicColor = `linear-gradient(135deg, hsl(${index * 90}, 100%, 50%), hsl(${index * 90 + 60}, 100%, 40%))`;
            const primaryImage = getPrimaryImage(project.images, project.id);
            const statusConfig = getStatusConfig(project.status);
            
            return (
              <div
                key={project.id}
                id={`project-${project.id}`}
                className="sticky w-full h-[65vh] md:h-[70vh] min-h-[450px] max-h-[800px] rounded-[1.5rem] md:rounded-[2rem] p-[2px] shadow-2xl transition-all duration-500 group opacity-100"
                style={{
                  background: dynamicColor,
                  top: `calc(5rem + ${index * 1.5}rem)`,
                  scrollMarginTop: `calc(5rem + ${index * 1.5}rem)`,
                }}
              >
                
                <div className="relative w-full h-full bg-[var(--color-bg-primary)] rounded-[calc(1.5rem-2px)] md:rounded-[calc(2rem-2px)] overflow-hidden flex flex-col">
                  
                  {/* Cleaned up Image parsing: Removed mix-blend, added scaling, adjusted mobile object positioning */}
                  <img
                    src={primaryImage}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover object-top sm:object-center opacity-70 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-1000 ease-out"
                  />
                  
                  {/* Softened protection gradient so it doesn't muddy the image too much */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-primary)] via-[var(--color-bg-primary)]/40 md:via-[var(--color-bg-primary)]/20 to-transparent pointer-events-none" />

                  {/* Top Right Status Badge */}
                  <div className="absolute top-4 right-4 md:top-6 md:right-6 z-30">
                    <div className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-black/40 backdrop-blur-md rounded-full border border-white/10 shadow-lg">
                      <span className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full ${statusConfig.color} animate-pulse shadow-[0_0_8px_currentColor]`} />
                      <span className="text-[10px] md:text-xs font-bold text-white uppercase tracking-wider">
                        {statusConfig.label}
                      </span>
                    </div>
                  </div>

                  {/* Bottom Banner with Injected Hue */}
                  <div 
                    className="relative z-20 mt-auto w-full border-t border-[var(--color-border-light)] px-[clamp(1.25rem,4vw,3rem)] py-[clamp(1.5rem,4vw,2.5rem)] flex flex-col gap-1.5 overflow-hidden"
                    style={{
                      backgroundColor: 'var(--color-glass-bg)',
                      backdropFilter: 'blur(var(--blur-glass))',
                      WebkitBackdropFilter: 'blur(var(--blur-glass))'
                    }}
                  >
                    {/* The Subtle Hue Overlay (Inherits dynamic color from parent logic) */}
                    <div 
                      className="absolute inset-0 z-0 opacity-[0.08]" 
                      style={{ background: dynamicColor }}
                    />
                    
                    {/* Text wrapper with higher z-index to stay above the hue layer */}
                    <div className="relative z-10">
                      <h3 className="font-display font-extrabold text-[clamp(1.5rem,4vw,3rem)] text-[var(--color-text-primary)] leading-tight">
                        {project.title}
                      </h3>
                      
                      <p className="text-[var(--color-text-secondary)] text-sm md:text-base line-clamp-2 md:line-clamp-3 max-w-3xl mt-1">
                        {project.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="flex justify-center mt-6 md:hidden relative z-40">
            <button
              onClick={() => { window.scrollTo(0, 0); navigate('/projects'); }}
              className="px-8 py-4 text-sm font-bold bg-[var(--color-text-primary)] text-[var(--color-text-inverse)] rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.15)] hover:scale-105 transition-transform"
            >
              View All Projects
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;