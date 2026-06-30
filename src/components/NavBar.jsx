import { useState, useEffect } from 'react';
import { useTheme } from './ThemeContext';
import { Link, NavLink } from 'react-router-dom';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Academics', href: '/academics' },
];

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    // FIX: Changed z-[1] to z-[100] to ensure the navbar stays on top
    <nav
      className={`fixed left-0 right-0 z-[100] flex justify-center px-4 sm:px-6 md:px-10 transition-all 
        duration-500 ease-in-out ${
        scrolled ? 'top-4' : 'top-6 md:top-8'
      }`}
    >
      <div className="flex items-center justify-between w-full max-w-[1400px]">
        
        <Link
          to="/"
          className={`font-display text-2xl md:text-3xl font-black tracking-tighter uppercase transition-all duration-500 z-50 px-2 py-3 rounded-md ${
            scrolled ? 'scale-90' : 'scale-100'
          }`}
          style={{
            color: 'var(--color-text-primary)',
            backgroundColor: 'var(--color-glass-bg)',
            backdropFilter: 'blur(var(--blur-glass))',
            WebkitBackdropFilter: 'blur(var(--blur-glass))'
          }}
        >
          MSH.
        </Link>

        <div className="relative z-50">
          <div 
            className={`flex items-center gap-2 md:gap-6 rounded-full border border-[var(--color-border-light)] shadow-[0_8px_32px_rgba(0,0,0,0.1)] transition-all duration-500 ${
              scrolled ? 'py-2 px-4 md:px-6' : 'py-3 px-5 md:px-8'
            }`}
            style={{
              backgroundColor: 'var(--color-glass-bg)',
              backdropFilter: 'blur(var(--blur-glass))',
              WebkitBackdropFilter: 'blur(var(--blur-glass))'
            }}
          >
            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map(link => (
                <NavLink
                  key={link.label}
                  to={link.href}
                  className={({ isActive }) => 
                    `text-sm font-semibold relative py-1 transition-colors duration-300 group ${
                      isActive ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      <span className={`absolute -bottom-1 left-0 h-[2px] rounded-full transition-all duration-300 ${isActive ? 'w-full shadow-sm bg-[var(--color-text-primary)]' : 'w-0 group-hover:w-[50%] bg-[var(--color-text-primary)]/30'}`} />
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="h-8 w-8 flex items-center justify-center rounded-full bg-[var(--color-bg-tertiary)] hover:scale-110 transition-transform"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>

            {/* Mobile Toggle */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 focus:outline-none"
              style={{ color: 'var(--color-text-primary)' }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;