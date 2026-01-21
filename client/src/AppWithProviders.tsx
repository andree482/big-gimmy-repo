import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/hooks/useAuth";
import App from "./App";

// Questo componente viene caricato in modo lazy, quindi Supabase
// non verrà inizializzato finché l'utente non ha inserito il codice di accesso
export default function AppWithProviders() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <AuthProvider>
          <App />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
