import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import UserProfile from "@/components/user/UserProfile";
import { openAuthModal } from "@/lib/authModalBus";

export default function Profile() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FFD100]"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Accesso richiesto</h2>
          <p className="text-gray-600 mb-6">Devi effettuare il login per accedere al tuo profilo</p>
          <Button
            onClick={() => openAuthModal()}
            className="bg-[#FFD100] text-black px-6 py-2 rounded-lg hover:bg-[#FFD100]/90 transition-colors"
          >
            Accedi
          </Button>
        </div>
      </div>
    );
  }

  return <UserProfile />;
}
