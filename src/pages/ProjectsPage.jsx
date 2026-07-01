import { useState, useMemo, useEffect } from 'react';

// Map your backend short-codes to readable frontend labels
const CATEGORY_MAP = {
  'WEB': 'Web Engineering',
  'FRONT': 'Frontend',
  'BACK': 'Backend',
  'APP': 'Mobile Apps',
  'HARD': 'Hardware',
  'BIZZ': 'Business Strategy',
  'ML': 'Machine Learning'
};

const FILTER_OPTIONS = ['All', ...Object.values(CATEGORY_MAP)];

const ProjectsPage = ({ data }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const baseProjects = data || [];

  // Lock body scroll when the modal overlay is active
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => document.body.style.overflow = 'unset';
  }, [selectedProject]);

  // --- Helpers for parsing database strings ---
  const getPrimaryImage = (imagesStr, fallbackId) => {
    if (!imagesStr || imagesStr === 'NA') return `https://picsum.photos/seed/${fallbackId}/1920/1080`;
    return imagesStr.split(',')[0].trim();
  };

  const parseCommaList = (str) => {
    if (!str || str === 'NA') return [];
    return str.split(',').map(item => item.trim()).filter(Boolean);
  };

  const getStatusConfig = (status) => {
    const s = (status || '').toLowerCase();
    if (s === 'live') return { color: 'bg-green-500', label: 'Live' };
    if (s === 'working') return { color: 'bg-yellow-500', label: 'Working' };
    return { color: 'bg-red-500', label: 'Not Live' };
  };

  // --- Search and Filter Logic ---
  const filteredProjects = useMemo(() => {
    return baseProjects.filter((project) => {
      const searchLower = searchQuery.toLowerCase();
      const parsedSkills = parseCommaList(project.skills).join(' ').toLowerCase();
      
      const matchesSearch = 
        project.title?.toLowerCase().includes(searchLower) ||
        project.description?.toLowerCase().includes(searchLower) ||
        parsedSkills.includes(searchLower);

      // Handle space-separated categories (e.g. "WEB FRONT ML")
      const matchesCategory = selectedCategory === 'All' || 
        (project.category && project.category.split(' ').some(catCode => CATEGORY_MAP[catCode] === selectedCategory));

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, baseProjects]);

  return (
    <section className="relative min-h-screen pt-32 pb-24 bg-[var(--color-bg-primary)] 
    transition-colors duration-700 isolate">
      <div className="max-w-[1400px] mx-auto px-[clamp(1rem,4vw,4rem)]">
        
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="font-display font-extrabold tracking-tighter leading-[1.05] 
          text-[clamp(3rem,8vw,4.5rem)] text-[var(--color-text-primary)] mb-8">
            All Projects
          </h1>

          {/* Search & Filter Command Center */}
          {/* Search & Filter Command Center */}
          <div 
            className="sticky top-24 z-40 flex flex-col lg:flex-row items-center 
            justify-between gap-4 p-4 md:p-6 rounded-[var(--radius-lg)] border border-[var(--color-border-light)] shadow-[0_8px_32px_rgba(0,0,0,0.05)]"
            style={{
              backgroundColor: 'color-mix(in srgb, var(--color-glass-bg) 80%, transparent)',
              backdropFilter: 'blur(var(--blur-glass))',
              WebkitBackdropFilter: 'blur(var(--blur-glass))'
            }}
          >
            {/* Search Input */}
            <div className="relative w-full lg:max-w-md">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input 
                type="text" 
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[var(--color-bg-tertiary)] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] text-sm rounded-[var(--radius-pill)] pl-12 pr-6 py-3 border border-[var(--color-border-light)] focus:outline-none focus:ring-1 focus:ring-[var(--color-text-primary)] transition-all"
              />
            </div>

            {/* Dropdown Filter */}
            <div className="relative w-full lg:w-64">
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full appearance-none bg-[var(--color-bg-tertiary)] text-[var(--color-text-primary)] text-sm font-semibold rounded-[var(--radius-pill)] px-6 py-3 border border-[var(--color-border-light)] focus:outline-none focus:ring-1 focus:ring-[var(--color-text-primary)] cursor-pointer transition-all"
              >
                {FILTER_OPTIONS.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              {/* Custom Dropdown Arrow */}
              <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="w-full py-20 flex flex-col items-center justify-center text-center rounded-[var(--radius-xl)] border border-[var(--color-border-light)] border-dashed bg-[var(--color-bg-secondary)]">
            <svg className="w-16 h-16 text-[var(--color-text-muted)] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
            <h3 className="text-xl font-display font-bold text-[var(--color-text-primary)] mb-2">No projects found</h3>
            <p className="text-[var(--color-text-secondary)]">We couldn't find anything matching "{searchQuery}" in {selectedCategory}.</p>
            <button 
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="mt-6 px-6 py-2 rounded-full border border-[var(--color-border-light)] text-[var(--color-text-primary)] hover:bg-[var(--color-text-primary)] hover:text-[var(--color-text-inverse)] transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* --- COMPACT 2-COLUMN GRID LAYOUT --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
          {filteredProjects.map((project, index) => {
            const primaryImage = getPrimaryImage(project.images, project.id);
            const statusConfig = getStatusConfig(project.status);
            
            // Calculate gradient for the border and text-area hue
            const dynamicColor = project.color || `linear-gradient(135deg, hsl(${index * 65}, 85%, 45%), hsl(${index * 65 + 40}, 90%, 30%))`;
            
            // Generate full category tags to display
            const categoryTags = (project.category || '').split(' ').map(c => CATEGORY_MAP[c]).filter(Boolean);

            return (
              <div
                key={project.id}
                onClick={() => setSelectedProject({ ...project, computedColor: dynamicColor })}
                className="group relative w-full h-[300px] sm:h-[350px] rounded-[var(--radius-xl)] p-[2px] shadow-[0_8px_24px_rgba(0,0,0,0.05)] cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-1"
                style={{ background: dynamicColor }}
              >
                <div className="relative w-full h-full bg-[var(--color-bg-primary)] rounded-[calc(var(--radius-xl)-2px)] overflow-hidden flex flex-col justify-end">
                  
                  {/* Background Image */}
                  <img 
                    src={primaryImage} 
                    alt={project.title} 
                    className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700 ease-out"
                  />
                  
                  {/* Protection Gradient for text */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-primary)] via-[var(--color-bg-primary)]/40 to-transparent pointer-events-none transition-opacity duration-500" />

                  {/* Status Badge (Top Right) - NOW WITH TEXT */}
                  <div className="absolute top-4 right-4 z-20">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-black/40 backdrop-blur-md rounded-full border border-white/10 shadow-lg">
                      <span className={`w-2 h-2 rounded-full ${statusConfig.color} animate-pulse shadow-[0_0_8px_currentColor]`} />
                      <span className="text-[10px] sm:text-xs font-bold text-white uppercase tracking-wider">
                        {statusConfig.label}
                      </span>
                    </div>
                  </div>

                  {/* Minimalist Info Bar (Bottom) - Hue injected here */}
                  <div 
                    className="relative z-20 w-full border-t border-[var(--color-border-light)] p-5 sm:p-7 flex flex-col gap-1 overflow-hidden"
                    style={{
                      backgroundColor: 'var(--color-glass-bg)',
                      backdropFilter: 'blur(var(--blur-glass))',
                      WebkitBackdropFilter: 'blur(var(--blur-glass))'
                    }}
                  >
                    <div 
                      className="absolute inset-0 z-0 opacity-[0.15]" 
                      style={{ background: dynamicColor }}
                    />
                    
                    <div className="relative z-10">
                      <div className="flex flex-wrap gap-2 mb-2">
                          {categoryTags.slice(0, 2).map((tag, i) => (
                            <span key={i} className="text-[10px] font-bold text-white/80 uppercase tracking-widest drop-shadow-sm">{tag}</span>
                          ))}
                      </div>
                      <h3 className="font-display font-bold tracking-tight text-xl sm:text-2xl text-[var(--color-text-primary)] leading-tight">
                        {project.title}
                      </h3>
                      {/* <p className="text-[var(--color-text-secondary)] text-sm line-clamp-2 mt-1">
                        {project.description}
                      </p> */}
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* --- EXPANDED DETAILED MODAL --- */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 md:p-12"
          onClick={() => setSelectedProject(null)} 
        >
          <div 
            className="absolute inset-0 bg-black/60 animate-in fade-in duration-300" 
            style={{ backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
          />

          <div 
            className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-[var(--radius-xl)] border border-[var(--color-border-light)] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300"
            style={{ backgroundColor: 'var(--color-bg-primary)' }}
            onClick={(e) => e.stopPropagation()} 
          >
            {/* Close Button */}
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 z-50 flex items-center justify-center w-10 h-10 rounded-full bg-black/40 text-white backdrop-blur-md hover:bg-black/60 transition-colors border border-white/20 shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-[var(--color-border-light)] scrollbar-track-transparent">
              
              {/* Clean Modal Header Image */}
              <div className="w-full h-[25vh] sm:h-[35vh] relative bg-[var(--color-bg-tertiary)]">
                <img 
                  src={getPrimaryImage(selectedProject.images, selectedProject.id)} 
                  alt={selectedProject.title} 
                  className="w-full h-full object-cover object-top opacity-80" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-primary)] to-transparent" />
                
                {/* Accent line at the bottom of the image using the project's color */}
                <div 
                  className="absolute bottom-0 left-0 w-full h-1"
                  style={{ background: selectedProject.computedColor }}
                />
              </div>

              {/* Modal Content Body */}
              <div className="p-[clamp(1.5rem,4vw,3rem)] flex flex-col gap-8 -mt-6 relative z-[100]">
                
                {/* Title & Metadata row */}
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    {(selectedProject.category || '').split(' ').map((c, idx) => (
                      <span key={idx} className="px-3 py-1 rounded-full bg-[var(--color-bg-tertiary)] border border-[var(--color-border-light)] text-xs font-bold text-[var(--color-text-primary)] uppercase tracking-wider">
                        {CATEGORY_MAP[c] || c}
                      </span>
                    ))}

                    <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--color-border-light)]">
                       <span className={`w-2 h-2 rounded-full ${getStatusConfig(selectedProject.status).color}`} />
                       <span className="text-xs font-semibold text-[var(--color-text-secondary)]">
                         {getStatusConfig(selectedProject.status).label}
                       </span>
                    </div>
                  </div>

                  <h2 className="font-display font-extrabold text-[clamp(2rem,4vw,3rem)] text-[var(--color-text-primary)] leading-tight mb-6">
                    {selectedProject.title}
                  </h2>

                  {/* Links Row */}
                  <div className="flex flex-wrap gap-4">
                    {selectedProject.project_link && selectedProject.project_link !== 'NA' && (
                      <a href={selectedProject.project_link} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--color-text-primary)] text-[var(--color-text-inverse)] text-sm font-bold hover:scale-105 transition-transform shadow-sm">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                        View Live Project
                      </a>
                    )}
                    {selectedProject.github && selectedProject.github !== 'NA' && (
                      <a href={selectedProject.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-[var(--color-border-light)] text-[var(--color-text-primary)] text-sm font-bold hover:bg-[var(--color-bg-tertiary)] transition-colors">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                        Source Code
                      </a>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h4 className="text-sm font-bold text-[var(--color-text-primary)] border-b border-[var(--color-border-light)] pb-2 mb-4">Overview</h4>
                  <p className="text-[var(--color-text-secondary)] text-base md:text-lg leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                {/* Important Features (Bullet Points) */}
                {selectedProject.important_features && selectedProject.important_features !== 'NA' && (
                  <div>
                    <h4 className="text-sm font-bold text-[var(--color-text-primary)] border-b border-[var(--color-border-light)] pb-2 mb-4">Key Features</h4>
                    <ul className="list-disc list-inside flex flex-col gap-2 text-[var(--color-text-secondary)] text-base md:text-lg">
                      {parseCommaList(selectedProject.important_features).map((feature, i) => (
                        <li key={i}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Skills / Tech Stack Chips */}
                {selectedProject.skills && selectedProject.skills !== 'NA' && (
                  <div>
                    <h4 className="text-sm font-bold text-[var(--color-text-primary)] border-b border-[var(--color-border-light)] pb-2 mb-4">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {parseCommaList(selectedProject.skills).map((skill, i) => (
                        <span key={i} className="px-4 py-1.5 rounded-md bg-[var(--color-text-primary)]/5 text-[var(--color-text-primary)] text-sm font-semibold border border-[var(--color-border-light)]">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectsPage;