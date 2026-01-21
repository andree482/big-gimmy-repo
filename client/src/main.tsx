import { createRoot } from "react-dom/client";
import { lazy, Suspense } from "react";
import "./index.css";
import SiteAccessGate from "@/components/SiteAccessGate";

// Lazy load dell'app principale per evitare che Supabase venga inizializzato
// prima che l'utente abbia inserito il codice di accesso
const AppWithProviders = lazy(() => import("./AppWithProviders"));

// Loading fallback mentre si carica l'app
function AppLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center">
      <div className="animate-pulse text-amber-600 text-lg">Caricamento...</div>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(
  <SiteAccessGate>
    <Suspense fallback={<AppLoading />}>
      <AppWithProviders />
    </Suspense>
  </SiteAccessGate>
);
