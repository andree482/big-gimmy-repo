import { useState, useEffect } from 'react';
import { X, Cookie, Info, Settings, Shield, BarChart3, Target } from 'lucide-react';
import { Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
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
    setCookiePreferences(preferences);
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
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
            duration: 0.4
          }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-yellow-400 shadow-lg backdrop-blur-sm"
        >
          <div className="container mx-auto px-4 py-4 max-w-7xl">
            <AnimatePresence mode="wait">
              {!showAdvanced ? (
                <motion.div
                  key="basic"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col lg:flex-row items-start lg:items-center gap-4"
                >
                  {/* Icon and main content */}
                  <div className="flex items-start gap-3 flex-1">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    >
                      <Cookie className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
                    </motion.div>
                    <div className="flex-1">
                      <motion.h3 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="font-semibold text-gray-900 mb-2 flex items-center gap-2"
                      >
                        <Info className="w-4 h-4" />
                        Utilizzo dei Cookie
                      </motion.h3>
                      <motion.p 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-sm text-gray-700 leading-relaxed"
                      >
                        BigGimmy utilizza cookie tecnici necessari per il funzionamento del sito e cookie analitici per migliorare la tua esperienza di navigazione. 
                        Puoi accettare tutti i cookie, rifiutarli o semplicemente chiudere questo banner per continuare la navigazione.
                      </motion.p>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <Link href="/cookie-policy" className="inline-flex items-center gap-1 text-yellow-600 hover:text-yellow-700 text-sm font-medium mt-2 hover:underline transition-colors">
                          <Info className="w-3 h-3" />
                          Scopri di più nella Cookie Policy
                        </Link>
                      </motion.div>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col sm:flex-row gap-2 lg:gap-3 w-full lg:w-auto"
                  >
                    <motion.div className="flex flex-col items-center gap-3 w-full sm:flex-row sm:w-auto">
                    <motion.button
                      onClick={handleAcceptAll}
                      whileHover={{ scale: 1.05, boxShadow: '0 4px 15px rgba(255, 209, 0, 0.3)' }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full sm:w-auto px-6 py-2.5 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg transition-colors duration-200 text-sm"
                    >
                      Accetta tutti
                    </motion.button>
                    <motion.button
                      onClick={() => setShowAdvanced(true)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full sm:w-auto px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-200 text-sm flex items-center justify-center gap-2"
                    >
                      <Settings className="w-4 h-4" />
                      Personalizza
                    </motion.button>
                    <motion.button
                      onClick={handleRejectAll}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition-colors duration-200 text-sm whitespace-nowrap"
                    >
                      Rifiuta tutti
                    </motion.button>
                    <motion.button
                      onClick={handleDismiss}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                      title="Chiudi banner"
                    >
                      <X className="w-5 h-5" />
                    </motion.button>
</motion.div>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  key="advanced"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <motion.h3 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="font-semibold text-gray-900 flex items-center gap-2"
                    >
                      <Settings className="w-5 h-5" />
                      Preferenze Cookie
                    </motion.h3>
                    <motion.button
                      onClick={() => setShowAdvanced(false)}
                      whileHover={{ scale: 1.1, }}
                      whileTap={{ scale: 0.9 }}
                      className="text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </motion.button>
                  </div>

                  <div className="grid gap-3">
                    {/* Necessary Cookies */}
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-start gap-3">
                        <Shield className="w-5 h-5 text-green-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-gray-900">Cookie Necessari</h4>
                          <p className="text-sm text-gray-600">Essenziali per il funzionamento del sito</p>
                        </div>
                      </div>
                      <div className="text-green-600 font-medium text-sm">Sempre attivi</div>
                    </motion.div>

                    {/* Analytics Cookies */}
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <BarChart3 className="w-5 h-5 text-blue-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-gray-900">Cookie Analitici</h4>
                          <p className="text-sm text-gray-600">Ci aiutano a migliorare il sito analizzando l'utilizzo</p>
                        </div>
                      </div>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={preferences.analytics}
                          onChange={(e) => handlePreferenceChange('analytics', e.target.checked)}
                          className="sr-only"
                        />
                        <motion.div 
                          animate={{ backgroundColor: preferences.analytics ? '#3b82f6' : '#d1d5db' }}
                          className="relative w-11 h-6 rounded-full transition-colors"
                        >
                          <motion.div 
                            animate={{ x: preferences.analytics ? 20 : 4 }}
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                            className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-sm"
                          />
                        </motion.div>
                      </label>
                    </motion.div>

                    {/* Marketing Cookies */}
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
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
                        <motion.div 
                          animate={{ backgroundColor: preferences.marketing ? '#a855f7' : '#d1d5db' }}
                          className="relative w-11 h-6 rounded-full transition-colors"
                        >
                          <motion.div 
                            animate={{ x: preferences.marketing ? 20 : 4 }}
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                            className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-sm"
                          />
                        </motion.div>
                      </label>
                    </motion.div>

                    {/* Functional Cookies */}
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
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
                        <motion.div 
                          animate={{ backgroundColor: preferences.functional ? '#f97316' : '#d1d5db' }}
                          className="relative w-11 h-6 rounded-full transition-colors"
                        >
                          <motion.div 
                            animate={{ x: preferences.functional ? 20 : 4 }}
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                            className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-sm"
                          />
                        </motion.div>
                      </label>
                    </motion.div>
                  </div>

                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex gap-3 pt-2"
                  >
                    <motion.button
                      onClick={handleSavePreferences}
                      whileHover={{ scale: 1.02, boxShadow: '0 4px 15px rgba(255, 209, 0, 0.3)' }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 px-6 py-2.5 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg transition-colors duration-200"
                    >
                      Salva Preferenze
                    </motion.button>
                    <motion.button
                      onClick={handleAcceptAll}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-6 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition-colors duration-200"
                    >
                      Accetta Tutti
                    </motion.button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}