import { useState } from 'react';

const Accordion = ({ semester }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="mb-4 rounded-[var(--radius-lg)] overflow-hidden border border-[var(--color-border-light)] shadow-[0_4px_16px_rgba(0,0,0,0.02)] transition-all duration-500"
      style={{
        backgroundColor: 'var(--color-glass-bg)',
        backdropFilter: 'blur(var(--blur-glass))',
        WebkitBackdropFilter: 'blur(var(--blur-glass))'
      }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center px-5 sm:px-6 py-5 bg-transparent border-none cursor-pointer transition-colors duration-300"
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'color-mix(in srgb, var(--color-text-primary) 5%, transparent)'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
      >
        <span className="flex items-center gap-3">
          <span className="text-[var(--color-text-primary)] text-base sm:text-lg font-semibold transition-colors duration-500">
            {semester.title}
          </span>
          {semester.sgpa != null && (
            <span className="text-[0.65rem] sm:text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-[var(--radius-pill,9999px)] border border-[var(--color-border-light)] text-[var(--color-text-secondary)]">
              SGPA {semester.sgpa.toFixed(2)}
            </span>
          )}
        </span>
        <svg
          className={`w-5 h-5 text-[var(--color-text-secondary)] transition-transform duration-300 ease-in-out shrink-0 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Accordion Content */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-5 sm:px-6 pb-6 overflow-x-auto scrollbar-thin scrollbar-thumb-[var(--color-border-light)]">
          <table className="w-full min-w-[400px] border-collapse text-left mt-2">
            <thead>
              <tr className="border-b border-[var(--color-border-light)]">
                <th className="py-3 text-[var(--color-text-muted)] font-medium text-xs uppercase tracking-widest transition-colors duration-500">Subject Name</th>
                <th className="py-3 text-[var(--color-text-muted)] font-medium text-xs uppercase tracking-widest transition-colors duration-500">Credits</th>
                <th className="py-3 text-[var(--color-text-muted)] font-medium text-xs uppercase tracking-widest text-right transition-colors duration-500">Grade</th>
              </tr>
            </thead>
            <tbody>
              {semester.courses.map((course, idx) => (
                <tr
                  key={idx}
                  className={`transition-colors duration-200 ${
                    idx === semester.courses.length - 1 ? 'border-0' : 'border-b border-[var(--color-border-light)]/50'
                  }`}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'color-mix(in srgb, var(--color-text-primary) 3%, transparent)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <td className="py-4 text-[var(--color-text-primary)] text-sm transition-colors duration-500">
                    {course.name}
                  </td>
                  <td className="py-4 text-[var(--color-text-secondary)] text-sm transition-colors duration-500">
                    {course.credits}
                  </td>
                  <td className="py-4 text-[var(--color-text-primary)] text-sm font-bold text-right transition-colors duration-500">
                    {course.grade}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Supabase `semester` column is stored as a JSON string; parse defensively
// since it may already arrive parsed depending on the client/library used.
const parseSemesters = (semesterField) => {
  if (!semesterField) return [];
  if (Array.isArray(semesterField)) return semesterField;
  try {
    return JSON.parse(semesterField);
  } catch {
    return [];
  }
};

const Academics = ({ data }) => {
  const programs = data || [];

  return (
    <section className="relative min-h-screen pt-32 pb-24 bg-[var(--color-bg-primary)] transition-colors duration-700 isolate overflow-hidden">

      {/* 1. Theme-Adaptive Static Ambient Mesh Gradient for Visual Continuity */}
      <div
        className="absolute inset-0 pointer-events-none z-0 transition-colors duration-700"
        style={{
          backgroundImage: `
            radial-gradient(at 20% 20%, color-mix(in srgb, var(--color-bg-tertiary) 60%, transparent) 0px, transparent 50%),
            radial-gradient(at 80% 80%, color-mix(in srgb, var(--color-bg-secondary) 80%, transparent) 0px, transparent 50%)
          `
        }}
      />

      {/* SVG Noise Filter Source */}
      <svg className="hidden">
        <filter id="academics-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.95" numOctaves="3" stitchTiles="stitch"/>
          <feColorMatrix type="matrix" values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 0.08 0" />
        </filter>
      </svg>

      {/* Grain/Noise Overlay Layer */}
      <div
        className="absolute inset-0 pointer-events-none z-10 mix-blend-overlay"
        style={{ filter: 'url(#academics-noise)' }}
      />

      {/* 2. Main Content Wrapper */}
      <div className="relative z-20 max-w-4xl mx-auto px-[clamp(1.5rem,4vw,4rem)]">

        <h1 className="font-display font-extrabold tracking-tighter leading-[1.05] text-[clamp(3rem,8vw,4.5rem)] text-[var(--color-text-primary)] mb-16 transition-colors duration-700">
          Academic Record
        </h1>

        <div className="flex flex-col gap-16">
          {programs.map((program, pIdx) => {
            const semesters = parseSemesters(program.semester);
            return (
              <div key={program.id ?? pIdx}>

                {/* Program Header */}
                <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-display font-bold text-[var(--color-text-primary)] mb-2 transition-colors duration-700">
                      {program.class}
                    </h2>
                    <p className="text-sm sm:text-base text-[var(--color-text-secondary)] font-medium transition-colors duration-700">
                      {program.institution}
                    </p>
                  </div>
                  {program.cgpa != null && (
                    <div
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-[var(--radius-pill,9999px)] border border-[var(--color-border-light)] shrink-0 w-fit"
                      style={{
                        backgroundColor: 'var(--color-glass-bg)',
                        backdropFilter: 'blur(var(--blur-glass))',
                        WebkitBackdropFilter: 'blur(var(--blur-glass))'
                      }}
                    >
                      <span className="text-[0.65rem] sm:text-xs font-medium uppercase tracking-widest text-[var(--color-text-muted)]">
                        CGPA
                      </span>
                      <span className="text-base sm:text-lg font-display font-bold text-[var(--color-text-primary)]">
                        {Number(program.cgpa).toFixed(2)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Semesters Container */}
                <div className="flex flex-col gap-2">
                  {semesters.map((sem, sIdx) => (
                    <Accordion key={sIdx} semester={sem} />
                  ))}
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Academics;