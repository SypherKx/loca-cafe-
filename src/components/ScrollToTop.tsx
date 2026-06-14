import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    const htmlEl = document.documentElement;
    const originalScrollBehavior = htmlEl.style.scrollBehavior;
    
    // Disable smooth scrolling temporarily to scroll instantly
    htmlEl.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);
    
    // Restore original scroll behavior and refresh GSAP ScrollTrigger
    const timer = setTimeout(() => {
      htmlEl.style.scrollBehavior = originalScrollBehavior;
      ScrollTrigger.refresh();
    }, 50);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
