import { useState, useEffect } from 'react';
import { X, AlertTriangle, Wrench } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'wouter';

const STORAGE_KEY = 'maintenance_notice_dismissed_at';
const HOURS_12_MS = 12 * 60 * 60 * 1000;
const SESSION_KEY = 'maintenance_notice_products_shown';

function shouldShow(isProductsPage: boolean): boolean {
  // Pagina prodotti: mostra una volta per sessione anche se già chiuso
  if (isProductsPage && !sessionStorage.getItem(SESSION_KEY)) {
    return true;
  }
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return true; // prima visita
  return Date.now() - parseInt(raw) > HOURS_12_MS;
}

export default function MaintenanceBanner() {
  const [location] = useLocation();
  const [visible, setVisible] = useState(false);

  const isProductsPage = location.startsWith('/prodotti');

  useEffect(() => {
    if (shouldShow(isProductsPage)) {
      setVisible(true);
      if (isProductsPage) {
        sessionStorage.setItem(SESSION_KEY, '1');
      }
    }
  }, [location]);

  function dismiss() {
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
          onClick={(e) => { if (e.target === e.currentTarget) dismiss(); }}
        >
          <motion.div
            initial={{ scale: 0.88, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.92, y: 20, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden"
          >
            {/* Fascia superiore arancione */}
            <div className="bg-orange-500 px-6 py-4 flex items-center gap-3">
              <motion.div
                animate={{ rotate: [0, -8, 8, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 2 }}
              >
                <Wrench className="w-7 h-7 text-white flex-shrink-0" />
              </motion.div>
              <div className="flex-1">
                <h2 className="text-white font-bold text-lg leading-tight">
                  Manutenzione straordinaria in corso
                </h2>
                <p className="text-orange-100 text-sm mt-0.5">
                  Aggiornamento del catalogo prodotti
                </p>
              </div>
              <button
                onClick={dismiss}
                className="text-orange-200 hover:text-white transition-colors p-1 rounded-lg hover:bg-orange-600"
                aria-label="Chiudi avviso"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Corpo */}
            <div className="px-6 py-5">
              <div className="flex gap-3 mb-4">
                <AlertTriangle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <p className="text-gray-800 font-medium text-base leading-relaxed">
                  Potresti riscontrare <span className="text-orange-600 font-semibold">incongruenze temporanee</span> nella sezione prodotti (immagini mancanti, prezzi in aggiornamento o prodotti non visibili correttamente).
                </p>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                Stiamo completando un importante aggiornamento del nostro catalogo con nuovi prodotti e informazioni aggiornate. Ci scusiamo sinceramente per il disagio.
              </p>

              <p className="text-gray-600 text-sm leading-relaxed mb-5">
                <span className="font-medium text-gray-700">Il sito tornerà alla normalità nel più breve tempo possibile.</span> Per qualsiasi necessità urgente puoi <a href="/contatti" className="text-orange-500 hover:underline font-medium" onClick={dismiss}>contattarci</a> direttamente.
              </p>

              <button
                onClick={dismiss}
                className="w-full bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-semibold py-3 rounded-xl transition-colors duration-200 text-base"
              >
                Ho capito, continua al sito
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
