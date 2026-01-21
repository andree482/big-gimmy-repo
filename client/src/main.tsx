import { createRoot } from "react-dom/client";
import "./index.css";
import SiteAccessGate from "@/components/SiteAccessGate";

// SiteAccessGate gestisce internamente il lazy loading di AppWithProviders
// In questo modo Supabase non viene mai caricato finché l'utente non inserisce il codice
createRoot(document.getElementById("root")!).render(<SiteAccessGate />);
