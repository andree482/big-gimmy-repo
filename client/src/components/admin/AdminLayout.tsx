import { useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import AdminSidebar from "./AdminSidebar";
import { AlertCircle } from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [, navigate] = useLocation();
  const { user, isLoading, isAuthenticated } = useAuth();

  useEffect(() => {
    // Se non è autenticato, reindirizza alla home
    if (!isLoading && !isAuthenticated) {
      navigate("/");
      return;
    }

    // Se è autenticato ma non è admin, reindirizza alla home
    if (!isLoading && isAuthenticated && !user?.isAdmin) {
      navigate("/");
      return;
    }
  }, [user, isLoading, isAuthenticated, navigate]);

  // Mostra loading durante la verifica
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center animate-pulse">
          </div>
          <p className="text-gray-600 font-open-sans">Verifica permessi amministratore...</p>
        </div>
      </div>
    );
  }

  // Mostra messaggio di accesso negato se non è admin
  if (!user?.isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <AlertCircle className="w-16 h-16 mx-auto mb-4 text-red-500" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2 font-montserrat">
            Accesso Negato
          </h1>
          <p className="text-gray-600 font-open-sans">
            Non hai i permessi necessari per accedere a quest'area.
          </p>
        </div>
      </div>
    );
  }

  // Mostra l'interfaccia admin solo se l'utente è admin
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
