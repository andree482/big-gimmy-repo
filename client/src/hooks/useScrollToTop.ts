import { useEffect } from "react";
import { useLocation } from "wouter";

/**
 * Hook che automaticamente scrolla all'inizio della pagina quando cambia la route
 * Migliora l'esperienza utente assicurando che ogni nuova pagina inizi dall'alto
 */
export function useScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    // Scroll automatico all'inizio della pagina con comportamento smooth
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [location]); // Trigger quando cambia la location/route
}