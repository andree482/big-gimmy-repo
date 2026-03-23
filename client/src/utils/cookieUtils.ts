// Cookie utility functions for BigGimmy
export type CookieConsentStatus = 'accepted' | 'rejected' | 'dismissed' | null;

const COOKIE_CONSENT_KEY = 'biggimmy_cookie_consent';
const COOKIE_PREFERENCES_KEY = 'biggimmy_cookie_preferences';
const BANNER_DISMISSED_AT_KEY = 'biggimmy_banner_dismissed_at';
const CONSENT_DATE_KEY = 'biggimmy_consent_date';
// Versione del banner: aggiornare ad ogni modifica sostanziale del banner o della policy
export const BANNER_VERSION = '1.1';

// Scadenze (Linee Guida Garante 2021)
const DISMISS_EXPIRY_MONTHS = 6;   // dismiss → banner riappare dopo 6 mesi
const CONSENT_EXPIRY_MONTHS = 12;  // accepted/rejected → rinnovo consenso dopo 12 mesi

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
    localStorage.setItem(CONSENT_DATE_KEY, new Date().toISOString());
  } else {
    localStorage.removeItem(COOKIE_CONSENT_KEY);
    localStorage.removeItem(CONSENT_DATE_KEY);
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
  }

  return defaultPreferences;
}

export function setCookiePreferences(preferences: Partial<CookiePreferences>, logToServer = false) {
  if (typeof window === 'undefined') return;

  const current = getCookiePreferences();
  const updated = { ...current, ...preferences, necessary: true };

  localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(updated));
  applyCookiePreferences(updated);

  // Logga solo quando l'utente salva esplicitamente dal pannello preferenze
  if (logToServer) {
    logConsentToServer('custom', updated);
  }
}

// Registra il consenso sul server per audit GDPR (art. 7 — onere della prova)
// Fire-and-forget: non blocca l'utente in caso di errore
async function logConsentToServer(
  status: CookieConsentStatus,
  preferences: CookiePreferences
) {
  try {
    await fetch('/api/consent-log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status,
        preferences,
        bannerVersion: BANNER_VERSION,
        sessionId: sessionStorage.getItem('site_access_gate') ?? undefined,
        userAgent: navigator.userAgent,
      }),
    });
  } catch {
    // Silenzioso: il log è best-effort, non deve bloccare l'UX
  }
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
  logConsentToServer('accepted', allAccepted);
}

export function rejectAllCookies() {
  setCookieConsent('rejected');
  setCookiePreferences(defaultPreferences);
  logConsentToServer('rejected', defaultPreferences);
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
  localStorage.removeItem(CONSENT_DATE_KEY);
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

// Mostra il banner se:
// - consenso mai espresso
// - dismiss scaduto (>6 mesi)
// - consenso accepted/rejected scaduto (>12 mesi) → rinnovo periodico richiesto dal Garante
export function shouldShowCookieBanner(): boolean {
  const consent = getCookieConsent();
  if (consent === null) return true;

  if (consent === 'dismissed') {
    const dismissedAt = localStorage.getItem(BANNER_DISMISSED_AT_KEY);
    if (!dismissedAt) return true;
    const expiry = new Date(dismissedAt);
    expiry.setMonth(expiry.getMonth() + DISMISS_EXPIRY_MONTHS);
    return new Date() > expiry;
  }

  if (consent === 'accepted' || consent === 'rejected') {
    const consentDate = localStorage.getItem(CONSENT_DATE_KEY);
    if (!consentDate) return true;
    const expiry = new Date(consentDate);
    expiry.setMonth(expiry.getMonth() + CONSENT_EXPIRY_MONTHS);
    return new Date() > expiry;
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
