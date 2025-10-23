import { useState, useEffect, useMemo } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Heart, ShoppingCart, User, LogOut, Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Logo from "../ui/Logo";
import { useAuthQuery } from "@/hooks/useAuth";
import { AuthModal } from "@/components/auth/AuthModal";
import { useToast } from "@/hooks/use-toast";
import { useCartContext } from "@/components/cart/CartProvider";
import InfoBanner from "@/components/layout/InfoBanner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"login" | "register">("login");
  const [location] = useLocation();
  const { scrollY, scrollDirection } = useScrollAnimation();
  const [isNavigating, setIsNavigating] = useState(false);

  // 🔹 Aggiornato con isLoading
  const { user, isAuthenticated, isLoading, logout, isLogoutLoading } = useAuthQuery();

  const { toast } = useToast();
  const { totalItems } = useCartContext();

  // 🔹 Auto-apertura modale autenticazione
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      setAuthModalTab("login");
      setAuthModalOpen(true);
    }
  }, [isLoading, isAuthenticated]);

  // Chiudi il menu mobile quando cambia la pagina
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Memoizza i valori computati per prestazioni ottimali
  const isScrolled = useMemo(() => {
    // Isteresi: attiva a 130px, disattiva a 110px per evitare flicker
    const currentIsScrolled = scrollY > 120 && !mobileMenuOpen;
    const prevIsScrolled = scrollY > 110 && !mobileMenuOpen;
    return scrollY > 130 ? true : scrollY < 110 ? false : currentIsScrolled;
  }, [scrollY, mobileMenuOpen]);

  const shouldHide = useMemo(() => scrollDirection === 'down' && scrollY > 400 && !isNavigating && !mobileMenuOpen, [scrollDirection, scrollY, isNavigating, mobileMenuOpen]);
  
  // Memoizza gli stili per evitare re-calcoli - ottimizzazione GPU per eliminar lag
  const headerStyles = useMemo(() => ({
    transform: shouldHide ? 'translate3d(0, -100%, 0)' : 'translate3d(0, 0, 0)',
    transition: mobileMenuOpen ? 'none' : 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
    backfaceVisibility: 'hidden' as const,
    perspective: '1000px',
    contain: 'layout style paint'
  }), [shouldHide, mobileMenuOpen]);


  const containerStyles = useMemo(() => ({
    paddingTop: isScrolled ? '0.5rem' : '1rem',
    paddingBottom: isScrolled ? '0.5rem' : '1rem',
    transition: mobileMenuOpen ? 'none' : 'padding 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
    contain: 'layout style'
  }), [isScrolled, mobileMenuOpen]);


  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const handleNavClick = () => {
    setIsNavigating(true);
    setTimeout(() => setIsNavigating(false), 1000);
  };

  const handleLoginClick = () => {
    setAuthModalTab("login");
    setAuthModalOpen(true);
  };

  const handleRegisterClick = () => {
    setAuthModalTab("register");
    setAuthModalOpen(true);
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logout effettuato",
        description: "Sei stato disconnesso con successo",
      });
    } catch (error: any) {
      toast({
        title: "Errore logout",
        description: error.message || "Si è verificato un errore durante il logout",
        variant: "destructive",
      });
    }
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/chi-siamo", label: "Chi Siamo" },
    { href: "/prodotti", label: "Prodotti" },
    { href: "/negozi", label: "Negozi" },
    { href: "/contatti", label: "Contatti" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 ${mobileMenuOpen ? "" : "navbar-transition"} ${
        isScrolled ? "bg-[#212121]/95 backdrop-blur-md shadow-lg" : "bg-[#212121]"
      }`}
      style={headerStyles}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center" style={containerStyles}>
          {/* Logo */}
          <div className="flex items-center w-44">
            <div className="font-montserrat font-bold">
              <Link href="/" className="flex items-center">
                <Logo size={isScrolled ? 120 : 150} />
              </Link>
            </div>
          </div>

          {/* Navigation Menu */}
          <div className="hidden md:flex space-x-8 text-white font-montserrat font-semibold justify-center flex-1">
            {navLinks.map((link) => (
              <div key={link.href}>
                <Link
                  href={link.href}
                  onClick={handleNavClick}
                  className={`relative hover:text-[#FFD100] transition-colors duration-200 py-2 block ${
                    location === link.href ? "text-[#FFD100]" : ""
                  }`}
                >
                  {link.label}
                  {location === link.href && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FFD100]" />
                  )}
                </Link>
              </div>
            ))}
          </div>

          {/* Auth, Favorites, Cart */}
          <div className="hidden md:flex items-center gap-3 w-44 justify-end">
            {/* Authentication */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 px-3 py-2 rounded-full transition-colors duration-200 text-white hover:text-[#FFD100] hover:bg-white/5">
                    <User className="w-5 h-5" />
                    <span className="text-sm font-medium">{user?.firstName || user?.email}</span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem disabled>
                    <User className="mr-2 h-4 w-4" />
                    <span>{user?.email}</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {!user?.isAdmin && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href="/profilo" onClick={handleNavClick}>
                          <User className="mr-2 h-4 w-4" />
                          <span>Profilo</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/profilo" onClick={handleNavClick}>
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          <span>I miei ordini</span>
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  {user?.isAdmin && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/admin/users" onClick={handleNavClick}>
                          <Settings className="mr-2 h-4 w-4" />
                          <span>Admin Panel</span>
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} disabled={isLogoutLoading}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>{isLogoutLoading ? "Disconnessione..." : "Logout"}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <button
                onClick={handleLoginClick}
                className="flex items-center gap-2 px-3 py-2 rounded-full transition-colors duration-200 text-white hover:text-[#FFD100] hover:bg-white/5"
              >
                <User className="w-5 h-5" />
                <span className="text-sm font-medium">Accedi</span>
              </button>
            )}

            {/* Favorites */}
            <div>
              <Link
                href="/preferiti"
                onClick={handleNavClick}
                className={`flex items-center gap-2 px-3 py-2 rounded-full transition-colors duration-200 ${
                  location === "/preferiti"
                    ? "text-[#FFD100] bg-white/10"
                    : "text-white hover:text-[#FFD100] hover:bg-white/5"
                }`}
                aria-label="I tuoi preferiti"
              >
                <Heart className={`w-5 h-5 ${location === "/preferiti" ? "fill-current" : ""}`} />
                <span className="text-sm font-medium">Preferiti</span>
              </Link>
            </div>

            {/* Cart */}
            <div>
              <Link
                href="/carrello"
                onClick={handleNavClick}
                className={`flex items-center gap-2 px-3 py-2 rounded-full transition-colors duration-200 relative ${
                  location === "/carrello"
                    ? "text-[#FFD100] bg-white/10"
                    : "text-white hover:text-[#FFD100] hover:bg-white/5"
                }`}
                aria-label="Carrello"
              >
                <div className="relative">
                  <ShoppingCart className="w-5 h-5" />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#FFD100] text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </div>
                <span className="text-sm font-medium">Carrello</span>
              </Link>
            </div>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-white hover:text-[#FFD100] transition-colors duration-200"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#212121]/95 backdrop-blur-md border-t border-white/10"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col space-y-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={handleNavClick}
                    className={`text-white hover:text-[#FFD100] transition-colors duration-200 py-2 font-montserrat font-semibold ${
                      location === link.href ? "text-[#FFD100]" : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}

                {/* Authentication Mobile */}
                {isAuthenticated ? (
                  <>
                    <div className="flex items-center gap-2 py-2 font-montserrat font-semibold text-[#FFD100]">
                      <User className="w-5 h-5" />
                      {user?.firstName || user?.email}
                    </div>
                    {user?.isAdmin && (
                      <Link
                        href="/admin/ordini"
                        onClick={() => {
                          handleNavClick();
                          setMobileMenuOpen(false);
                        }}
                        className="flex items-center gap-2 py-2 font-montserrat font-semibold transition-colors duration-200 text-white hover:text-[#FFD100]"
                      >
                        <Settings className="w-5 h-5" />
                        Gestione Ordini
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      disabled={isLogoutLoading}
                      className="flex items-center gap-2 py-2 font-montserrat font-semibold transition-colors duration-200 text-white hover:text-[#FFD100]"
                    >
                      <LogOut className="w-5 h-5" />
                      {isLogoutLoading ? "Disconnessione..." : "Logout"}
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        handleLoginClick();
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-2 py-2 font-montserrat font-semibold transition-colors duration-200 text-white hover:text-[#FFD100]"
                    >
                      <User className="w-5 h-5" />
                      Accedi
                    </button>
                  </>
                )}

                {/* Cart Mobile */}
                <Link
                  href="/carrello"
                  onClick={() => {
                    handleNavClick();
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 py-2 font-montserrat font-semibold transition-colors duration-200 ${
                    location === "/carrello"
                      ? "text-[#FFD100]"
                      : "text-white hover:text-[#FFD100]"
                  }`}
                >
                  <div className="relative">
                    <ShoppingCart className="w-5 h-5" />
                    {totalItems > 0 && (
                      <span className="absolute -top-2 -right-2 bg-[#FFD100] text-black text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                        {totalItems}
                      </span>
                    )}
                  </div>
                  Carrello
                </Link>

                {/* Favorites Mobile */}
                <Link
                  href="/preferiti"
                  onClick={() => {
                    handleNavClick();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 py-2 font-montserrat font-semibold transition-colors duration-200 text-white hover:text-[#FFD100]"
                >
                  <Heart className="w-5 h-5" />
                  Preferiti
                </Link>

                {!isAuthenticated && (
                  <>
                    <button
                      onClick={() => {
                        handleRegisterClick();
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-2 py-2 font-montserrat font-semibold transition-colors duration-200 text-white hover:text-[#FFD100]"
                    >
                      <User className="w-5 h-5" />
                      Registrati
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🔹 Authentication Modal aggiornato */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => {
          if (!isAuthenticated) {
            setAuthModalOpen(true);
            return;
          }
          setAuthModalOpen(false);
        }}
        defaultTab={authModalTab}
      />
    </header>
  );
};

export default Navbar;
