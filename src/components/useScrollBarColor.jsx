import { useEffect } from 'react';

const useScrollbarColor = () => {
    useEffect(() => {
        const handleScroll = () => {
        // Calculate scroll percentage (0 to 1)
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;

        // Define HSL range: 120 is Green, 280 is Purple
        const startHue = 120;
        const endHue = 280;
        const hue = startHue + (endHue - startHue) * scrollPercent;

        // Update the CSS variable
        document.documentElement.style.setProperty(
            '--scroll-thumb-color', 
            `hsl(${hue}, 100%, 50%)`
        );
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
};

export default useScrollbarColor;