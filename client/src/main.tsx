import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
// Font self-hosted: nessuna chiamata a Google, GDPR-compliant
import "@fontsource/montserrat/600.css";
import "@fontsource/montserrat/700.css";
import "@fontsource/montserrat/800.css";
import "@fontsource/open-sans/400.css";
import "@fontsource/open-sans/600.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/hooks/useAuth";
// import SiteAccessGate from "@/components/SiteAccessGate";

createRoot(document.getElementById("root")!).render(
//<SiteAccessGate> 
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
