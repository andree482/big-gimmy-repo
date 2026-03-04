// Cookie utility functions for BigGimmy
export type CookieConsentStatus = 'accepted' | 'rejected' | 'dismissed' | null;

const COOKIE_CONSENT_KEY = 'biggimmy_cookie_consent';
const COOKIE_PREFERENCES_KEY = 'biggimmy_cookie_preferences';
const BANNER_DISMISSED_AT_KEY = 'biggimmy_banner_dismissed_at';

// Dopo 6 mesi dal "dismiss" il banner viene riproposto (Linee Guida Garante 2021)
const DISMISS_EXPIRY_MONTHS = 6;

export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

export const defaultPreferences: CookiePreferences = {
  necessary: true, // Always true, cannot be disabled
  analytics: false,
  marketing: false,
  functional: false,
};

export function getCookieConsent(): CookieConsentStatus {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(COOKIE_CONSENT_KEY) as CookieConsentStatus;
}

export function setCookieConsent(status: CookieConsentStatus) {
  if (typeof window === 'undefined') return;

  if (status) {
    localStorage.setItem(COOKIE_CONSENT_KEY, status);
  } else {
    localStorage.removeItem(COOKIE_CONSENT_KEY);
  }
}

export function getCookiePreferences(): CookiePreferences {
  if (typeof window === 'undefined') return defaultPreferences;

  try {
    const stored = localStorage.getItem(COOKIE_PREFERENCES_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return { ...defaultPreferences, ...parsed, necessary: true };
    }
  } catch (error) {
    console.warn('Error parsing cookie preferences:', error);
  }

  return defaultPreferences;
}

export function setCookiePreferences(preferences: Partial<CookiePreferences>) {
  if (typeof window === 'undefined') return;

  const current = getCookiePreferences();
  const updated = { ...current, ...preferences, necessary: true };

  localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(updated));

  // Apply cookie preferences
  applyCookiePreferences(updated);
}

export function acceptAllCookies() {
  const allAccepted: CookiePreferences = {
    necessary: true,
    analytics: true,
    marketing: true,
    functional: true,
  };

  setCookieConsent('accepted');
  setCookiePreferences(allAccepted);
}

export function rejectAllCookies() {
  setCookieConsent('rejected');
  setCookiePreferences(defaultPreferences);
}

export function dismissCookieBanner() {
  setCookieConsent('dismissed');
  // Salva timestamp del dismiss per rimostrare il banner dopo 6 mesi
  localStorage.setItem(BANNER_DISMISSED_AT_KEY, new Date().toISOString());
  // Quando dismisso, applica solo i cookie necessari
  setCookiePreferences(defaultPreferences);
}

// Resetta completamente il consenso — usato dal link "Gestisci preferenze cookie"
// Obbligatorio per art. 7(3) GDPR: revoca con la stessa facilità del consenso
export function resetCookieConsent() {
  localStorage.removeItem(COOKIE_CONSENT_KEY);
  localStorage.removeItem(COOKIE_PREFERENCES_KEY);
  localStorage.removeItem(BANNER_DISMISSED_AT_KEY);
  disableGoogleAnalytics();
}

function applyCookiePreferences(preferences: CookiePreferences) {
  // Handle Google Analytics
  if (preferences.analytics) {
    initializeGoogleAnalytics();
  } else {
    disableGoogleAnalytics();
  }

  // Handle other tracking services
  if (preferences.marketing) {
    // TODO: Aggiungere qui l'inizializzazione di strumenti marketing (es. Meta Pixel)
    // IMPORTANTE: aggiornare anche la Cookie Policy prima di aggiungere nuovi strumenti
  } else {
    // Marketing cookies disabled — nessun tracker attivo
  }

  if (preferences.functional) {
    // Functional cookies enabled
  } else {
    // Functional cookies disabled
  }
}

function initializeGoogleAnalytics() {
  const GA_TRACKING_ID = import.meta.env.VITE_GA_TRACKING_ID;
  if (!GA_TRACKING_ID || typeof window === 'undefined') return;

  // Guard: evita doppio caricamento se già presente nel DOM
  if (document.getElementById('ga-script')) return;

  const script = document.createElement('script');
  script.id = 'ga-script';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
  document.head.appendChild(script);

  (window as any).dataLayer = (window as any).dataLayer || [];
  const gtag = (...args: any[]) => {
    (window as any).dataLayer.push(args);
  };

  gtag('js', new Date());
  gtag('config', GA_TRACKING_ID, {
    anonymize_ip: true,
    cookie_flags: 'SameSite=None;Secure'
  });
}

function disableGoogleAnalytics() {
  if (typeof window === 'undefined') return;
  const GA_TRACKING_ID = import.meta.env.VITE_GA_TRACKING_ID;
  if (GA_TRACKING_ID) {
    (window as any)[`ga-disable-${GA_TRACKING_ID}`] = true;
  }
}

// Mostra il banner se: consenso mai espresso OPPURE dismiss scaduto (>6 mesi)
export function shouldShowCookieBanner(): boolean {
  const consent = getCookieConsent();
  if (consent === null) return true;

  if (consent === 'dismissed') {
    const dismissedAt = localStorage.getItem(BANNER_DISMISSED_AT_KEY);
    if (!dismissedAt) return true;
    const expiryDate = new Date(dismissedAt);
    expiryDate.setMonth(expiryDate.getMonth() + DISMISS_EXPIRY_MONTHS);
    return new Date() > expiryDate;
  }

  return false;
}

// Rimuove i cookie analitici se l'utente non ha dato consenso
export function cleanExpiredCookies() {
  const preferences = getCookiePreferences();

  if (!preferences.analytics) {
    const analyticsNames = ["_ga", "_gid", "_gat", "_ga_"];
    const cookies = document.cookie.split(";").map(c => c.trim());
    cookies.forEach((c) => {
      const name = c.split("=")[0];
      const isAnalytics = analyticsNames.some(an => name === an || name.startsWith(an));
      const isSession = /session|sid|connect.sid|biggimmy-session/i.test(name);
      if (isAnalytics && !isSession) {
        document.cookie = `${name}=;expires=${new Date(0).toUTCString()};path=/`;
      }
    });
  }
}
