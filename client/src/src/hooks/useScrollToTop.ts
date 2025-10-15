import { useEffect } from 'react';
import { useLocation } from 'wouter';

export function useScrollToTop(behavior: 'smooth' | 'instant' = 'smooth') {
  const [location] = useLocation();

  useEffect(() => {
    // Scroll to top when route changes
    window.scrollTo({ top: 0, behavior });
  }, [location, behavior]);
}