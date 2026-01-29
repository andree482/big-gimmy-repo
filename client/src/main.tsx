import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/hooks/useAuth";
// import SiteAccessGate from "@/components/SiteAccessGate"; // RIMOSSO - vedere docs/differenze_privato_pubblico.md

createRoot(document.getElementById("root")!).render(
  // <SiteAccessGate> {/* RIMOSSO - vedere docs/differenze_privato_pubblico.md */}
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <AuthProvider>
          <App />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  // </SiteAccessGate>
);
