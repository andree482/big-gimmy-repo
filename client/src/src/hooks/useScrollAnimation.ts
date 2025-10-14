import { useEffect, useState } from 'react';

export function useScrollAnimation() {
  const [scrollY, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollY = () => {
      const currentScrollY = window.scrollY;
      
      // Riduce l'aggiornamento nei primi 100px per evitare lag
      const threshold = currentScrollY < 100 ? 8 : 3;
      
      if (Math.abs(currentScrollY - lastScrollY) > threshold) {
        setScrollDirection(currentScrollY > lastScrollY ? 'down' : 'up');
        setScrollY(currentScrollY);
        lastScrollY = currentScrollY;
      }
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollY);
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestTick, { passive: true });
    return () => window.removeEventListener('scroll', requestTick);
  }, []);

  return { scrollY, scrollDirection };
}

export function useIntersectionObserver(
  elementRef: React.RefObject<Element>,
  options: IntersectionObserverInit = {}
) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        if (entry.isIntersecting && !hasIntersected) {
          setHasIntersected(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options,
      }
    );

    observer.observe(element);
    return () => observer.unobserve(element);
  }, [elementRef, hasIntersected, options]);

  return { isIntersecting, hasIntersected };
}