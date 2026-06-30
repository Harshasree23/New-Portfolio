import { useState } from 'react';

// Per-role accent palette, cycled by index since the Supabase data doesn't
// carry an explicit `color` field like the static ROLES did.
// Original green/pink kept as-is; only the 3rd slot (was yellow) is now violet.
const ACCENT_PALETTE = [
  'var(--color-accent-green)',
  'var(--color-accent-pink)',
  'var(--color-accent-violet, #8b5cf6)',
];

const Experience = ({ data }) => {
  const experiences = data || [];
  const [activeIndex, setActiveIndex] = useState(0);

  // Safeguard: fallback to an empty object if data is still loading
  const activeRole = experiences[activeIndex] || {
    title: '', company: '', description: '', skills: '', from_date: '', to_date: ''
  };

  // Helper to parse comma-separated skills string from Supabase
  const parseTech = (techStr) => {
    if (!techStr || techStr === 'NA') return [];
    return techStr.split(',').map(s => s.trim()).filter(Boolean);
  };

  // Helper to turn a single description string into bullet-style detail lines,
  // since the theme's UI expects a `details` array rather than one paragraph.
  const parseDetails = (descStr) => {
    if (!descStr || descStr === 'NA') return [];
    // Prefer explicit newlines if present; otherwise split on sentence boundaries.
    const lines = descStr.includes('\n')
      ? descStr.split('\n')
      : descStr.split(/(?<=[.!?])\s+(?=[A-Z])/);
    return lines.map(s => s.trim()).filter(Boolean);
  };

  // Helper to generate a consistent period string
  const formatPeriod = (start, end) => `${start} — ${end}`;

  const getColor = (idx) => ACCENT_PALETTE[idx % ACCENT_PALETTE.length];

  if (experiences.length === 0) return null;

  const activeColor = getColor(activeIndex);
  const activeDetails = parseDetails(activeRole.description);

  return (
    <section id="experience" className="relative py-[clamp(6rem,10vw,10rem)] bg-[var(--color-bg-primary)] transition-colors duration-700 isolate overflow-hidden">

      {/* Subtle Ambient Background to tie the section together */}
      <div
        className="absolute inset-0 pointer-events-none z-0 transition-colors duration-700"
        style={{
          backgroundImage: `
            radial-gradient(circle at 80% 50%, color-mix(in srgb, ${activeColor} 5%, transparent) 0%, transparent 50%),
            radial-gradient(circle at 20% 80%, color-mix(in srgb, var(--color-bg-tertiary) 50%, transparent) 0%, transparent 50%)
          `
        }}
      />

      <div className="relative z-20 max-w-[1400px] mx-auto px-[clamp(1rem,4vw,4rem)]">

        {/* Section Header */}
        <h2 className="font-display font-extrabold tracking-tighter text-[clamp(2.5rem,5vw,4.5rem)] text-[var(--color-text-primary)] mb-12 transition-colors duration-700">
          Experience
        </h2>

        {/* --- MOBILE LAYOUT: Glassmorphic Stacked Cards --- */}
        <div className="flex flex-col gap-6 md:hidden">
          {experiences.map((role, idx) => {
            const color = getColor(idx);
            const details = parseDetails(role.description);
            return (
              <div
                key={role.id ?? idx}
                className="rounded-[var(--radius-xl)] border border-[var(--color-border-light)] overflow-hidden flex flex-col shadow-lg"
                style={{
                  backgroundColor: 'var(--color-glass-bg)',
                  backdropFilter: 'blur(var(--blur-glass))',
                  WebkitBackdropFilter: 'blur(var(--blur-glass))'
                }}
              >
                {/* Mobile Card Header */}
                <div
                  className="px-6 py-6 border-b border-[var(--color-border-light)]"
                  style={{ backgroundColor: `color-mix(in srgb, ${color} 5%, transparent)` }}
                >
                  <div className="flex gap-5 items-center">
                    <div
                      className="text-5xl font-display font-bold"
                      style={{ color, opacity: 0.8 }}
                    >
                      0{idx + 1}
                    </div>
                    <div>
                      <h3 className="font-display text-[1.25rem] font-bold text-[var(--color-text-primary)] mb-1 leading-tight">
                        {role.title}
                      </h3>
                      <p className="text-sm font-semibold text-[var(--color-text-secondary)]">
                        {role.company}
                      </p>
                      <p className="text-xs font-medium text-[var(--color-text-muted)] mt-1 tracking-wider uppercase">
                        {formatPeriod(role.from_date, role.to_date)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mobile Card Details */}
                <div className="px-6 py-6">
                  <ul className="flex flex-col gap-3 mb-6">
                    {details.map((detail, i) => (
                      <li key={i} className="text-sm text-[var(--color-text-secondary)] leading-relaxed relative pl-5">
                        <span
                          className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full shadow-sm"
                          style={{ backgroundColor: color }}
                        />
                        {detail}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    {parseTech(role.skills).map(t => (
                      <span key={t} className="px-3 py-1 text-xs font-semibold text-[var(--color-text-primary)] bg-[var(--color-bg-tertiary)] border border-[var(--color-border-light)] rounded-[var(--radius-pill)]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* --- DESKTOP LAYOUT: Interactive Split View --- */}
        <div className="hidden md:grid md:grid-cols-[1fr_1.2fr] lg:grid-cols-[1fr_1.5fr] gap-[clamp(2rem,4vw,4rem)] items-start">

          {/* LEFT COLUMN: Stacked Glass Triggers */}
          <div className="flex flex-col relative pt-4">
            {experiences.map((role, idx) => {
              const isActive = activeIndex === idx;
              const color = getColor(idx);

              // Physics-based stack animation
              const rotate = idx % 2 === 0 ? '-1.5deg' : '1.5deg';
              const translateX = idx % 2 === 0 ? '-5px' : '5px';

              return (
                <div
                  key={role.id ?? idx}
                  onClick={() => setActiveIndex(idx)}
                  className="flex gap-8 px-6 py-8 rounded-[var(--radius-lg)] border cursor-pointer relative transition-all duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] group overflow-hidden"
                  style={{
                    zIndex: isActive ? 10 : 5 - idx,
                    transform: isActive
                      ? 'scale(1.02) translateY(0) rotate(0deg)'
                      : `scale(1) translateX(${translateX}) rotate(${rotate})`,
                    marginBottom: isActive ? '1.5rem' : '0.5rem',

                    backdropFilter: 'blur(var(--blur-glass))',
                    WebkitBackdropFilter: 'blur(var(--blur-glass))',

                    backgroundColor: isActive
                      ? `color-mix(in srgb, ${color} 5%, var(--color-glass-bg))`
                      : 'var(--color-bg-secondary)',
                    borderColor: isActive
                      ? `color-mix(in srgb, ${color} 40%, transparent)`
                      : 'var(--color-border-light)',
                    boxShadow: isActive
                      ? `0 20px 40px rgba(0,0,0,0.1), 0 0 20px color-mix(in srgb, ${color} 10%, transparent)`
                      : '0 4px 12px rgba(0,0,0,0.05)',
                  }}
                >

                  {isActive && (
                    <div
                      className="absolute left-0 top-0 bottom-0 w-1 rounded-l-[var(--radius-lg)]"
                      style={{ backgroundColor: color }}
                    />
                  )}
                  <div className="flex gap-8 items-center w-full">
                    <div
                      className="text-7xl lg:text-8xl font-display font-black transition-colors duration-500"
                      style={{
                        color: isActive ? color : 'var(--color-text-muted)',
                        opacity: isActive ? 0.9 : 0.3
                      }}
                    >
                      0{idx + 1}
                    </div>

                    <div className="flex-1">
                      <h3 className={`font-display text-[1.5rem] lg:text-[1.75rem] font-bold mb-1 leading-tight transition-colors duration-300 ${isActive ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)]'}`}>
                        {role.title}
                      </h3>
                      <p className="text-sm font-semibold text-[var(--color-text-secondary)]">
                        {role.company}
                      </p>
                      <p className="text-xs font-medium text-[var(--color-text-muted)] mt-1 uppercase tracking-widest">
                        {formatPeriod(role.from_date, role.to_date)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT COLUMN: Dynamic Glass Details Container */}
          <div
            className="sticky top-32 rounded-[var(--radius-xl)] border border-[var(--color-border-light)] overflow-hidden flex flex-col px-8 lg:px-12 py-10 min-h-[500px] shadow-[0_8px_32px_rgba(0,0,0,0.05)] transition-all duration-700"
            style={{
              backgroundColor: 'var(--color-glass-bg)',
              backdropFilter: 'blur(var(--blur-glass))',
              WebkitBackdropFilter: 'blur(var(--blur-glass))'
            }}
          >
            {/* Header */}
            <div className="mb-8 border-b border-[var(--color-border-light)] pb-6">
              <span
                className="text-xs uppercase tracking-widest font-bold block mb-4 transition-colors duration-500"
                style={{ color: activeColor }}
              >
                {formatPeriod(activeRole.from_date, activeRole.to_date)}
              </span>
              <h2 className="font-display font-bold text-[clamp(2rem,3vw,2.5rem)] text-[var(--color-text-primary)] leading-tight mb-2 transition-colors duration-500">
                {activeRole.title}
              </h2>
              <h3 className="text-lg text-[var(--color-text-secondary)] font-medium transition-colors duration-500">
                @ {activeRole.company}
              </h3>
            </div>

            {/* Bullet Points (derived from description) */}
            <ul className="flex flex-col gap-5 mb-10">
              {activeDetails.map((detail, idx) => (
                <li key={idx} className="text-[0.95rem] lg:text-base text-[var(--color-text-secondary)] leading-relaxed relative pl-6 transition-colors duration-500">
                  <span
                    className="absolute left-0 top-2.5 w-1.5 h-1.5 rounded-full shadow-sm transition-colors duration-500"
                    style={{ backgroundColor: activeColor }}
                  />
                  {detail}
                </li>
              ))}
            </ul>

            {/* Tech Stack Pills */}
            <div className="mt-auto flex flex-wrap gap-2 pt-6 border-t border-[var(--color-border-light)]">
              {parseTech(activeRole.skills).map(t => (
                <span
                  key={t}
                  className="px-4 py-2 text-xs font-semibold text-[var(--color-text-primary)] border border-[var(--color-border-light)] rounded-[var(--radius-pill)] transition-all duration-300 hover:border-[var(--color-text-primary)] cursor-default"
                  style={{ backgroundColor: 'var(--color-bg-tertiary)' }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;