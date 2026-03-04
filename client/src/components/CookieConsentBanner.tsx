import { useState, useEffect } from 'react';
import { X, Cookie, Info, Settings, Shield, BarChart3, Target } from 'lucide-react';
import { Link } from 'wouter';
import {
  shouldShowCookieBanner,
  acceptAllCookies,
  rejectAllCookies,
  dismissCookieBanner,
  getCookiePreferences,
  setCookiePreferences,
  type CookiePreferences
} from '@/utils/cookieUtils';

export default function CookieConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
    functional: false,
  });

  useEffect(() => {
    // Check if banner should be shown
    if (shouldShowCookieBanner()) {
      setIsVisible(true);
    }

    // Load current preferences
    const currentPrefs = getCookiePreferences();
    setPreferences(currentPrefs);
    setIsLoading(false);
  }, []);

  const handleAcceptAll = () => {
    acceptAllCookies();
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    rejectAllCookies();
    setIsVisible(false);
  };

  const handleDismiss = () => {
    dismissCookieBanner();
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    setCookiePreferences(preferences, true); // true = logga sul server
    setIsVisible(false);
  };

  const handlePreferenceChange = (key: keyof CookiePreferences, value: boolean) => {
    if (key === 'necessary') return; // Cannot disable necessary cookies
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  if (isLoading || !isVisible) {
    return null;
  }

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-yellow-400 shadow-lg backdrop-blur-sm animate-slide-up"
    >
      <div className="container mx-auto px-4 py-4 max-w-7xl">
        {!showAdvanced ? (
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
            {/* Icon and main content */}
            <div className="flex items-start gap-3 flex-1">
              <Cookie className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  Utilizzo dei Cookie
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  BigGimmy utilizza cookie tecnici necessari per il funzionamento del sito e, previo consenso, cookie analitici (Google Analytics) per migliorare la tua esperienza di navigazione.
                  Puoi accettare, rifiutare o personalizzare le tue scelte. Chiudere questo banner equivale a rifiutare i cookie non necessari.
                </p>
                <Link href="/cookie-policy" className="inline-flex items-center gap-1 text-amber-700 hover:text-amber-800 text-sm font-medium mt-2 hover:underline transition-colors">
                  <Info className="w-3 h-3" />
                  Scopri di più nella Cookie Policy
                </Link>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-2 lg:gap-3 w-full lg:w-auto">
              <div className="flex flex-col items-center gap-3 w-full sm:flex-row sm:w-auto">
                <button
                  onClick={handleAcceptAll}
                  className="w-full sm:w-auto px-6 py-2.5 bg-yellow-500 hover:bg-yellow-600 active:scale-95 text-black font-semibold rounded-lg transition-all duration-200 text-sm"
                >
                  Accetta tutti
                </button>
                <button
                  onClick={() => setShowAdvanced(true)}
                  className="w-full sm:w-auto px-6 py-2.5 bg-blue-500 hover:bg-blue-600 active:scale-95 text-white font-medium rounded-lg transition-all duration-200 text-sm flex items-center justify-center gap-2"
                >
                  <Settings className="w-4 h-4" />
                  Personalizza
                </button>
                <button
                  onClick={handleRejectAll}
                  className="px-6 py-2.5 bg-gray-200 hover:bg-gray-300 active:scale-95 text-gray-800 font-medium rounded-lg transition-all duration-200 text-sm whitespace-nowrap"
                >
                  Rifiuta tutti
                </button>
                <button
                  onClick={handleDismiss}
                  className="p-2.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 active:scale-90 rounded-lg transition-all duration-200"
                  title="Chiudi banner"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Preferenze Cookie
              </h3>
              <button
                onClick={() => setShowAdvanced(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid gap-3">
              {/* Necessary Cookies */}
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900">Cookie Necessari</h4>
                    <p className="text-sm text-gray-600">Essenziali per il funzionamento del sito</p>
                  </div>
                </div>
                <div className="text-green-600 font-medium text-sm">Sempre attivi</div>
              </div>

              {/* Analytics Cookies */}
              <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-3">
                  <BarChart3 className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900">Cookie Analitici</h4>
                    <p className="text-sm text-gray-600">Google Analytics — analizzano l'utilizzo in forma anonimizzata</p>
                  </div>
                </div>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={(e) => handlePreferenceChange('analytics', e.target.checked)}
                    className="sr-only"
                  />
                  <div
                    className={`relative w-11 h-6 rounded-full transition-colors ${preferences.analytics ? 'bg-blue-500' : 'bg-gray-300'}`}
                  >
                    <div
                      className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${preferences.analytics ? 'translate-x-6' : 'translate-x-1'}`}
                    />
                  </div>
                </label>
              </div>

              {/* Marketing Cookies */}
              <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-3">
                  <Target className="w-5 h-5 text-purple-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900">Cookie di Marketing</h4>
                    <p className="text-sm text-gray-600">Per personalizzare annunci e contenuti</p>
                  </div>
                </div>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.marketing}
                    onChange={(e) => handlePreferenceChange('marketing', e.target.checked)}
                    className="sr-only"
                  />
                  <div
                    className={`relative w-11 h-6 rounded-full transition-colors ${preferences.marketing ? 'bg-purple-500' : 'bg-gray-300'}`}
                  >
                    <div
                      className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${preferences.marketing ? 'translate-x-6' : 'translate-x-1'}`}
                    />
                  </div>
                </label>
              </div>

              {/* Functional Cookies */}
              <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-3">
                  <Settings className="w-5 h-5 text-orange-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900">Cookie Funzionali</h4>
                    <p className="text-sm text-gray-600">Per ricordare le tue preferenze</p>
                  </div>
                </div>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.functional}
                    onChange={(e) => handlePreferenceChange('functional', e.target.checked)}
                    className="sr-only"
                  />
                  <div
                    className={`relative w-11 h-6 rounded-full transition-colors ${preferences.functional ? 'bg-orange-500' : 'bg-gray-300'}`}
                  >
                    <div
                      className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${preferences.functional ? 'translate-x-6' : 'translate-x-1'}`}
                    />
                  </div>
                </label>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={handleSavePreferences}
                className="flex-1 px-6 py-2.5 bg-yellow-500 hover:bg-yellow-600 active:scale-[0.98] text-black font-semibold rounded-lg transition-all duration-200"
              >
                Salva Preferenze
              </button>
              <button
                onClick={handleRejectAll}
                className="flex-1 px-6 py-2.5 bg-gray-200 hover:bg-gray-300 active:scale-[0.98] text-gray-800 font-medium rounded-lg transition-all duration-200"
              >
                Rifiuta Tutti
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
