import OpenInNew from '../assets/open_in_new.png';
import ReactIcon from '../assets/reactjs-icon.svg';
import SupabaseIcon from '../assets/supabase-icon.svg';
import HeartIcon from '../assets/heart.png';
import LinkedinIcon from '../assets/linkedin.png';
import GithubIcon from '../assets/github.png';
import LeetcodeIcon from '../assets/code.png';

const NAV_LINKS = ['Home', 'Projects', 'Academics'];

const SOCIAL_LINKS = [
  { name: 'LinkedIn', icon: LinkedinIcon, href: 'https://www.linkedin.com/in/sreeharsha23/' },
  { name: 'GitHub', icon: GithubIcon, href: 'https://github.com/Harshasree23' },
  { name: 'LeetCode', icon: LeetcodeIcon, href: 'https://leetcode.com/u/harsha_2352/' },
];

// All source icons are black PNGs. `filter` inverts them to white only when
// a `.dark` ancestor class is present (adjust the selector below if this
// project toggles dark mode via a data-attribute or CSS variable instead).
const iconFilterClass = 'dark:[filter:invert(1)]';

const Contact = () => {

  return (
    <section
      id="contact"
      className="h-auto mt-30 overflow-visible md:overflow-hidden 
      flex flex-col justify-end pt-16 md:pt-0 pb-4 md:pb-8" >
      <div className="max-w-[1400px] mx-auto px-5 md:px-container flex-1 flex flex-col justify-between w-full">

        <div className="flex-1 flex flex-col">
          {/* Top row: heading left, nav + social right */}
          <div className="flex flex-col items-center md:flex-row md:items-end md:justify-between gap-10 md:gap-8 mb-10">

            {/* Left: Massive Heading */}
            <div className="font-display text-[clamp(3rem,12vw,10rem)] 
              leading-[0.9] text-primary tracking-tighter flex flex-col items-end gap-5">
              Get in touch
              <div className='font-display text-2xl md:text-5xl
              leading-[0.9] text-primary tracking-tighter'>
                sreeharsha2358@gmail.com
              </div>
            </div>

            {/* Right: Nav + Social, side by side */}
            <div className="flex gap-10 md:gap-20 shrink-0 w-full sm:w-fit justify-around">
              {/* Nav */}
              <div>
                <div className="text-[0.65rem] md:text-xs text-gray-500 uppercase tracking-widest mb-4">
                  Navigate
                </div>
                <ul className="flex flex-col gap-3">
                  {NAV_LINKS.map(link => (
                    <li key={link}>
                      <a
                        href={`/${link.toLowerCase() === 'home' ? '' : link.toLowerCase()}`}
                        className="text-xs md:text-sm text-secondary hover:text-primary uppercase 
                        tracking-widest transition-colors duration-200 inline-flex items-center gap-2 group"
                      >
                        {link}
                        <img
                          src={OpenInNew}
                          className={`h-3.5 w-3.5 opacity-60 group-hover:opacity-100 transition-opacity duration-200 ${iconFilterClass}`}
                          alt=""
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Social */}
              <div>
                <div className="text-[0.65rem] md:text-xs text-gray-500 uppercase tracking-widest mb-4">
                  Find me
                </div>
                <ul className="flex flex-col gap-3">
                  {SOCIAL_LINKS.map(social => (
                    <li key={social.name}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 group"
                      >
                        <img
                          src={social.icon}
                          className={`h-3.5 w-3.5 opacity-60 group-hover:opacity-100 transition-opacity duration-200 ${iconFilterClass}`}
                          alt=""
                        />
                        <span className="text-xs md:text-sm text-secondary group-hover:text-primary uppercase tracking-widest transition-colors duration-200">
                          {social.name}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Made with — sits below the heading/nav/social row */}
          <div className="flex items-center gap-2 flex-wrap mb-8 pl-5">
            <span className="text-[0.65rem] md:text-xs text-muted uppercase tracking-widest mr-2">
              Made with
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[var(--radius-pill,9999px)] border border-[var(--color-border-light)] bg-[var(--color-glass-bg)]">
              <img src={ReactIcon} className="h-4 w-4" alt="React" />
              <span className="text-xs hidden md:block text-secondary tracking-wide">React</span>
            </span>
            <span className="text-secondary text-xs">+</span>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[var(--radius-pill,9999px)] border border-[var(--color-border-light)] bg-[var(--color-glass-bg)]">
              <img src={SupabaseIcon} className="h-4 w-4" alt="Supabase" />
              <span className="text-xs hidden md:block text-secondary tracking-wide">Supabase</span>
            </span>
            <span className="text-secondary text-xs">+</span>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[var(--radius-pill,9999px)] border border-[var(--color-border-light)] bg-[var(--color-glass-bg)]">
              <img src={HeartIcon} className="h-4 w-4" alt="Love" />
              <span className="text-xs hidden md:block text-secondary tracking-wide">Love</span>
            </span>
          </div>
        </div>

        {/*Footer Image Banner */}
        <div className="shrink-0 mt-10">
          <div className="w-full h-[clamp(110px,10vh,250px)] overflow-hidden flex items-center justify-center px-6
            md:rounded-xl bg-neutral-950 noise-grain">
            <div className="relative z-20 text-center">
              
              <span 
                className="absolute inset-0 blur-2xl opacity-80 select-none
                  bg-gradient-to-r from-accent-green via-accent-pink via-accent-violet to-accent-purple 
                  animate-gradient-slow bg-[length:300%_300%] bg-clip-text text-transparent
                  text-[clamp(1.5rem,6vw,3.75rem)] leading-tight uppercase tracking-tighter"
                aria-hidden="true"
              >
                Munimadugu Sree Harsha
              </span>

              <span 
                className="relative 
                  bg-gradient-to-r from-accent-green via-accent-pink via-accent-violet to-accent-purple 
                  animate-gradient-slow bg-[length:300%_300%] bg-clip-text text-transparent
                  text-[clamp(1.5rem,6vw,3.75rem)] leading-tight uppercase tracking-tighter"
              >
                Munimadugu Sree Harsha
              </span>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Contact;