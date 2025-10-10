// Cookie utility functions for BigGimmy
export type CookieConsentStatus = 'accepted' | 'rejected' | 'dismissed' | null;

const COOKIE_CONSENT_KEY = 'biggimmy_cookie_consent';
const COOKIE_PREFERENCES_KEY = 'biggimmy_cookie_preferences';

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
  // When dismissed, use default preferences (only necessary cookies)
  setCookiePreferences(defaultPreferences);
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
    // Initialize marketing cookies (Facebook Pixel, etc.)
    console.log('Marketing cookies enabled');
  } else {
    // Disable marketing cookies
    console.log('Marketing cookies disabled');
  }
  
  if (preferences.functional) {
    // Initialize functional cookies
    console.log('Functional cookies enabled');
  } else {
    // Disable functional cookies  
    console.log('Functional cookies disabled');
  }
}

function initializeGoogleAnalytics() {
  // Only initialize if GA tracking ID is available
  const GA_TRACKING_ID = import.meta.env.VITE_GA_TRACKING_ID;
  
  if (GA_TRACKING_ID && typeof window !== 'undefined') {
    // Load Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
    document.head.appendChild(script);
    
    // Initialize gtag
    (window as any).dataLayer = (window as any).dataLayer || [];
    const gtag = (...args: any[]) => {
      (window as any).dataLayer.push(args);
    };
    
    gtag('js', new Date());
    gtag('config', GA_TRACKING_ID, {
      anonymize_ip: true,
      cookie_flags: 'SameSite=None;Secure'
    });
    
    console.log('Google Analytics initialized');
  }
}

function disableGoogleAnalytics() {
  // Disable Google Analytics
  if (typeof window !== 'undefined') {
    const GA_TRACKING_ID = import.meta.env.VITE_GA_TRACKING_ID;
    if (GA_TRACKING_ID) {
      (window as any)[`ga-disable-${GA_TRACKING_ID}`] = true;
      console.log('Google Analytics disabled');
    }
  }
}

// Check if cookies should be shown on page load
export function shouldShowCookieBanner(): boolean {
  return getCookieConsent() === null;
}

// Clean expired cookies
export function cleanExpiredCookies() {
  // Implementation for cleaning expired cookies
  const preferences = getCookiePreferences();
  
  if (!preferences.analytics) {
    // Remove analytics cookies
    document.cookie.split(";").forEach(function(c) { 
      document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
    });
  }
}