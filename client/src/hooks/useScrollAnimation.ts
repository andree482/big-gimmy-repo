import { useEffect, useState } from 'react';

export function useScrollAnimation() {
  const [scrollY, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;
    let debounceTimeout: NodeJS.Timeout;

    const updateScrollY = () => {
      const currentScrollY = window.scrollY;
      
      // Zone critiche con throttling più aggressivo
      let threshold: number;
      if (currentScrollY >= 100 && currentScrollY <= 150) {
        // Zona critica della transizione - throttling massimo
        threshold = 25;
      } else if (currentScrollY < 200) {
        // Zona iniziale - throttling medio
        threshold = 20;
      } else {
        // Resto della pagina - throttling normale
        threshold = 10;
      }
      
      if (Math.abs(currentScrollY - lastScrollY) > threshold) {
        // Debounce per la zona critica per evitare micro-lag
        if (currentScrollY >= 100 && currentScrollY <= 150) {
          clearTimeout(debounceTimeout);
          debounceTimeout = setTimeout(() => {
            setScrollDirection(currentScrollY > lastScrollY ? 'down' : 'up');
            setScrollY(currentScrollY);
            lastScrollY = currentScrollY;
          }, 8);
        } else {
          setScrollDirection(currentScrollY > lastScrollY ? 'down' : 'up');
          setScrollY(currentScrollY);
          lastScrollY = currentScrollY;
        }
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
    
    return () => {
      window.removeEventListener('scroll', requestTick);
      clearTimeout(debounceTimeout);
    };
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