import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/hooks/useAuth';

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
      <p className="text-gray-600 font-open-sans">Verifica accesso...</p>
    </div>
  </div>
);

export function AuthWrapper({ children }: AuthWrapperProps) {
  const [location, setLocation] = useLocation();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    // Non fare nulla mentre sta caricando
    if (isLoading) return;

    // Se l'utente non è autenticato e non è già su /login, redirect a /login
    if (!isAuthenticated && location !== '/login') {
      console.log('🔒 Utente non autenticato, redirect a /login');
      setLocation('/login');
      return;
    }

    // Se l'utente è autenticato e è su /login, redirect IMMEDIATO alla home
    if (isAuthenticated && location === '/login') {
      console.log('✅ Login completato, redirect istantaneo alla home');
      // Redirect sincrono senza delay
      setLocation('/');
      return;
    }
  }, [isAuthenticated, isLoading, location, setLocation]);

  // Mostra loading durante la verifica iniziale
  if (isLoading) {
    return <AuthLoading />;
  }

  // Se non autenticato e non su /login, mostra loading (redirect in corso)
  if (!isAuthenticated && location !== '/login') {
    return <AuthLoading />;
  }

  // Se autenticato e su /login, mostra loading (redirect in corso)
  if (isAuthenticated && location === '/login') {
    return <AuthLoading />;
  }

  // Altrimenti mostra il contenuto
  return <>{children}</>;
}