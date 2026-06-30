const GeneratingLoader = ({
    label = 'Loading',
    exitDuration = 500,
    } = {}) => {

    const letters = label.split('');

    return (
        <div
        className={`fixed inset-0 w-screen h-screen flex items-center justify-center bg-black select-none transition-opacity ease-out z-[9999]`}
        style={{ transitionDuration: `${exitDuration}ms` }}
        role="status"
        aria-live="polite"
        aria-label={label}
        >
        <div className="relative flex items-center justify-center w-[180px] h-[180px] rounded-full bg-transparent font-sans font-light text-[1.2em] text-white">
            <div className="absolute inset-0 rounded-full bg-transparent z-0 animate-loader-spin animate-loader-cycle" />

            <span className="relative z-10 flex">
            {letters.map((char, i) => (
                <span
                key={i}
                className="inline-block opacity-40 rounded-full animate-loader-letter"
                style={{ animationDelay: `${i * 0.1}s` }}
                >
                {char === ' ' ? '\u00A0' : char}
                </span>
            ))}
            </span>
        </div>

        <style>{`
            @keyframes loader-spin {
            0%   { transform: rotate(90deg); }
            50%  { transform: rotate(270deg); }
            100% { transform: rotate(450deg); }
            }
            @keyframes loader-cycle {
            0% {
                box-shadow:
                0 10px 20px 0 #fff inset,
                0 20px 30px 0 #ad5fff inset,
                0 60px 60px 0 #471eec inset;
            }
            25% {
                box-shadow:
                0 10px 20px 0 #fff inset,
                0 20px 30px 0 #d60a47 inset,
                0 60px 60px 0 #311e80 inset;
            }
            50% {
                box-shadow:
                0 10px 20px 0 #fff inset,
                0 20px 30px 0 #ffb020 inset,
                0 60px 60px 0 #d6360a inset;
            }
            75% {
                box-shadow:
                0 10px 20px 0 #fff inset,
                0 20px 30px 0 #2fd672 inset,
                0 60px 60px 0 #0a8ad6 inset;
            }
            100% {
                box-shadow:
                0 10px 20px 0 #fff inset,
                0 20px 30px 0 #ad5fff inset,
                0 60px 60px 0 #471eec inset;
            }
            }
            @keyframes loader-letter {
            0%, 100% { opacity: 0.4; transform: translateY(0); }
            20%      { opacity: 1;   transform: scale(1.15); }
            40%      { opacity: 0.7; transform: translateY(0); }
            }
            .animate-loader-spin {
            animation: loader-spin 2s linear infinite;
            }
            .animate-loader-cycle {
            animation: loader-cycle 4s linear infinite;
            }
            .animate-loader-letter {
            animation: loader-letter 2s infinite;
            }
            @media (prefers-reduced-motion: reduce) {
            .animate-loader-spin, .animate-loader-cycle, .animate-loader-letter {
                animation-duration: 0.001ms !important;
                animation-iteration-count: 1 !important;
            }
            }
        `}</style>
        </div>
    );
};

export default GeneratingLoader;