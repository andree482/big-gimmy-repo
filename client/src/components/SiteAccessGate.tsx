import { useState, useEffect, lazy, Suspense } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";

// Codice di accesso per la versione privata del sito
const ACCESS_CODE = "XNCahKl09P!298Gq20LkAns!1";
const STORAGE_KEY = "site_access_granted";

// Lazy load dell'app SOLO quando l'accesso è concesso
const AppWithProviders = lazy(() => import("@/AppWithProviders"));

// Loading component per quando l'app sta caricando
function AppLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center">
      <div className="animate-pulse text-amber-600 text-lg">Caricamento...</div>
    </div>
  );
}

export default function SiteAccessGate() {
  const [isAccessGranted, setIsAccessGranted] = useState<boolean | null>(null);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [showCode, setShowCode] = useState(false);

  // Controlla se l'accesso è già stato concesso (salvato in sessionStorage)
  useEffect(() => {
    const accessGranted = sessionStorage.getItem(STORAGE_KEY);
    setIsAccessGranted(accessGranted === "true");
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (code === ACCESS_CODE) {
      sessionStorage.setItem(STORAGE_KEY, "true");
      setIsAccessGranted(true);
      setError("");
    } else {
      setError("Codice non valido. Riprova.");
      setCode("");
    }
  };

  // Loading state iniziale
  if (isAccessGranted === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center">
        <div className="animate-pulse">
          <Lock className="w-12 h-12 text-amber-600" />
        </div>
      </div>
    );
  }

  // Se l'accesso è concesso, carica l'app (lazy loading)
  if (isAccessGranted) {
    return (
      <Suspense fallback={<AppLoading />}>
        <AppWithProviders />
      </Suspense>
    );
  }

  // Altrimenti mostra il form di accesso (senza dipendenze esterne a Supabase)
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="p-6 text-center space-y-4">
          {/* Logo placeholder - testo semplice */}
          <h1 className="text-3xl font-bold text-amber-700">Big Gimmy</h1>

          <div className="flex justify-center">
            <div className="p-3 bg-amber-100 rounded-full">
              <Lock className="w-8 h-8 text-amber-600" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-800">
            Accesso Riservato
          </h2>

          <p className="text-gray-600 text-sm">
            Questo sito è in fase di sviluppo e l'accesso è riservato.
            <br />
            Inserisci il codice di accesso per continuare.
          </p>
        </div>

        <div className="px-6 pb-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type={showCode ? "text" : "password"}
                placeholder="Inserisci il codice di accesso"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                  setError("");
                }}
                autoComplete="off"
                autoFocus
                className="w-full h-10 px-3 py-2 pr-10 text-center text-lg tracking-wider rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowCode(!showCode)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showCode ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={!code.trim()}
              className="w-full h-10 bg-amber-600 hover:bg-amber-700 disabled:bg-amber-300 disabled:cursor-not-allowed text-white font-medium rounded-md transition-colors"
            >
              Accedi al Sito
            </button>
          </form>

          <p className="mt-6 text-xs text-center text-gray-500">
            Se non hai il codice di accesso, contatta il proprietario del sito.
          </p>
        </div>
      </div>
    </div>
  );
}
