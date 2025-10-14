import { useAuthQuery } from "@/hooks/useAuth";
import { Link } from "wouter";
import UserProfile from "@/components/user/UserProfile";

export default function Profile() {
  const { user, isLoading } = useAuthQuery();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FFD100]"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Accesso richiesto</h2>
          <p className="text-gray-600 mb-6">Devi effettuare il login per accedere al tuo profilo</p>
          <Link href="/login" className="bg-[#FFD100] text-black px-6 py-2 rounded-lg hover:bg-[#FFD100]/90 transition-colors">
            Accedi
          </Link>
        </div>
      </div>
    );
  }

  return <UserProfile />;
}