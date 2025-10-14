import { useEffect } from "react";
import { useLocation } from "wouter";
// import { useAuth } from "@/hooks/useAuth";
import AdminSidebar from "./AdminSidebar";
import { Card, CardContent } from "@/components/ui/card";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [, navigate] = useLocation();

  useEffect(() => {
    // Simple admin check - in a real app this would verify with the server
    const checkAdminAccess = async () => {
      try {
        const response = await fetch('/api/auth/me');
        if (response.ok) {
          const data = await response.json();
          if (!data.user || !data.user.isAdmin) {
            navigate("/");
          }
        } else {
          navigate("/");
        }
      } catch (error) {
        navigate("/");
      }
    };
    
    checkAdminAccess();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}