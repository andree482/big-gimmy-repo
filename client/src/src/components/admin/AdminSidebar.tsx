import { Link, useLocation } from "wouter";
import { Users, BarChart3, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
// import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

const menuItems = [
  {
    href: "/admin/users",
    label: "Utenti",
    icon: Users,
  },
  {
    href: "/admin/ordini",
    label: "Ordini",
    icon: BarChart3,
  },
];

export default function AdminSidebar() {
  const [location] = useLocation();
  
  const handleLogout = () => {
    // Clear any admin session data
    localStorage.removeItem('adminToken');
    sessionStorage.clear();
    window.location.href = '/';
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen relative">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900 font-montserrat">
          Admin Panel
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          BigGimmy Integratori
        </p>
      </div>
      
      <nav className="px-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                isActive 
                  ? "bg-[#FFD100] text-black font-semibold" 
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              )}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      
      <div className="absolute bottom-6 left-4 right-4">
        <Button
          onClick={handleLogout}
          variant="outline"
          size="sm"
          className="w-full gap-2 hover:bg-red-50 hover:border-red-200 hover:text-red-600"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}