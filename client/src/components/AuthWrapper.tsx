import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { openAuthModal } from '@/lib/authModalBus';

interface AuthWrapperProps {
  children: React.ReactNode;
}

// Componente di loading per l'autenticazione
const AuthLoading = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <div className="w-16 h-16 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center animate-pulse">
        <span className="text-xl font-bold text-black font-montserrat">BG</span>
      </div>
      <p className="text-gray-600 font-open-sans">Caricamento...</p>
    </div>
  </div>
);

export function AuthWrapper({ children }: AuthWrapperProps) {
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    // Non fare nulla mentre sta caricando
    if (isLoading) return;

    if (!isAuthenticated) {
      openAuthModal();
    }
  }, [isAuthenticated, isLoading]);

  // Mostra loading durante la verifica iniziale
  if (isLoading) {
    return <AuthLoading />;
  }

  // Se l'utente non è autenticato, permettiamo comunque il rendering dell'app
  // (che gestirà le rotte pubbliche/private e mostrerà la modale se necessario)
  // Il blocco precedente impediva l'accesso anche alla pagina di login o home pubblica.
  
  return <>{children}</>;
}
