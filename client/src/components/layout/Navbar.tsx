import { useState, useEffect, useMemo } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Heart, ShoppingCart, User, LogOut, Settings, Users, BarChart3 } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Logo from "../ui/Logo";
import { useAuth } from "@/hooks/useAuth";
import { AuthModal } from "@/components/auth/AuthModal";
import { subscribeAuthModal } from "@/lib/authModalBus";
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
import { Badge } from "@/components/ui/badge";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"login" | "register">("login");
  const [location] = useLocation();
  const { scrollY, scrollDirection } = useScrollAnimation();
  const [isNavigating, setIsNavigating] = useState(false);
  const { user, isAuthenticated, isLoading, logout, logoutMutation } = useAuth();
  const isLogoutLoading = logoutMutation.isPending;
  // 🔹 Aggiornato con isLoading

  const { toast } = useToast();
  const { totalItems } = useCartContext();

  // Chiudi la modale se diventi autenticato
  useEffect(() => {
    if (isAuthenticated) setAuthModalOpen(false);
  }, [isAuthenticated]);

  useEffect(() => {
    const unsub = subscribeAuthModal((v) => setAuthModalOpen(v));
    return () => { unsub(); };
  }, []);

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

  // Navbar grande quando siamo in cima alla pagina
  const isAtTop = useMemo(() => scrollY < 20, [scrollY]);

  const shouldHide = useMemo(() => scrollDirection === 'down' && scrollY > 400 && !isNavigating && !mobileMenuOpen, [scrollDirection, scrollY, isNavigating, mobileMenuOpen]);
  
  // Memoizza gli stili per evitare re-calcoli - ottimizzazione GPU per eliminare lag
  // IMPORTANTE: Usiamo transform invece di padding per evitare layout shift
  const headerStyles = useMemo(() => ({
    transform: shouldHide ? 'translate3d(0, -100%, 0)' : 'translate3d(0, 0, 0)',
    transition: mobileMenuOpen ? 'none' : 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
    backfaceVisibility: 'hidden' as const,
    willChange: 'transform',
    contain: 'layout style paint',
  }), [shouldHide, mobileMenuOpen]);

  // Altezza dinamica: più grande in cima, si riduce quando si scrolla
  const containerStyles = useMemo(() => ({
    minHeight: isAtTop ? '96px' : '72px',
    height: isAtTop ? '96px' : '72px',
    transition: mobileMenuOpen ? 'none' : 'height 0.3s ease, min-height 0.3s ease',
    contain: 'layout style',
  }), [isAtTop, mobileMenuOpen]);


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
    <>
    <header
      className={`sticky top-0 z-50 ${mobileMenuOpen ? "" : "navbar-transition"} ${
        isScrolled ? "bg-[#212121]/95 backdrop-blur-md shadow-lg" : "bg-[#212121]"
      }`}
      style={headerStyles}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center" style={containerStyles}>
          {/* Logo - dimensione dinamica basata sullo scroll */}
          <div className="flex items-center w-44" style={{ minWidth: '176px' }}>
            <div className="font-montserrat font-bold" style={{ transition: 'transform 0.3s ease' }}>
              <Link href="/" className="flex items-center">
                <Logo size={isAtTop ? 160 : 140} />
              </Link>
            </div>
          </div>

          {/* Navigation Menu */}
          <div className="hidden lg:flex space-x-4 xl:space-x-6 text-white font-montserrat font-semibold justify-center flex-1 pl-20 xl:pl-32">
            {navLinks.map((link) => (
              <div key={link.href}>
                <Link
                  href={link.href}
                  onClick={handleNavClick}
                  className={`relative hover:text-[#FFD100] transition-colors duration-200 py-2 block whitespace-nowrap ${
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
          <div className="hidden lg:flex items-center gap-1 xl:gap-2 justify-end flex-shrink-0">
            {/* Authentication */}
            {isLoading ? (
              <div className="flex items-center gap-2 px-2 py-2 rounded-full text-white/80">
                <User className="w-5 h-5 animate-pulse" />
              </div>
            ) : isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-1 xl:gap-2 px-2 xl:px-3 py-2 rounded-full transition-colors duration-200 text-white hover:text-[#FFD100] hover:bg-white/5">
                    <User className="w-5 h-5" />
                    <span className="text-sm font-medium hidden xl:inline max-w-[100px] truncate">{user?.firstName || user?.email}</span>
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
                        <Link href="/ordini" onClick={handleNavClick}>
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
                        <Link href="/admin/ordini" onClick={handleNavClick}>
                          <BarChart3 className="mr-2 h-4 w-4" />
                          <span>Gestione Ordini</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/admin/users" onClick={handleNavClick}>
                          <Users className="mr-2 h-4 w-4" />
                          <span>Gestione Utenti</span>
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
                className="flex items-center gap-1 xl:gap-2 px-2 xl:px-3 py-2 rounded-full transition-colors duration-200 text-white hover:text-[#FFD100] hover:bg-white/5"
              >
                <User className="w-5 h-5" />
                <span className="text-sm font-medium hidden xl:inline">Accedi</span>
              </button>
            )}

            {/* Favorites */}
            <Link
              href="/preferiti"
              onClick={handleNavClick}
              className={`flex items-center gap-1 xl:gap-2 px-2 xl:px-3 py-2 rounded-full transition-colors duration-200 ${
                location === "/preferiti"
                  ? "text-[#FFD100] bg-white/10"
                  : "text-white hover:text-[#FFD100] hover:bg-white/5"
              }`}
              aria-label="I tuoi preferiti"
            >
              <Heart className={`w-5 h-5 ${location === "/preferiti" ? "fill-current" : ""}`} />
              <span className="text-sm font-medium hidden xl:inline">Preferiti</span>
            </Link>

            {/* Cart */}
            <Link
              href="/carrello"
              onClick={handleNavClick}
              className={`flex items-center gap-1 xl:gap-2 px-2 xl:px-3 py-2 rounded-full transition-colors duration-200 relative ${
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
              <span className="text-sm font-medium hidden xl:inline">Carrello</span>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <div className="lg:hidden ml-auto">
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

      {/* Mobile Menu - CSS transitions invece di framer-motion */}
      <div
        className={`lg:hidden bg-[#212121]/95 backdrop-blur-md border-t border-white/10 transition-all duration-300 ease-out ${
          mobileMenuOpen ? "max-h-[80vh] opacity-100 overflow-y-auto" : "max-h-0 opacity-0 overflow-hidden"
        }`}
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
            {isLoading ? (
              <div className="flex items-center gap-2 py-2 font-montserrat font-semibold text-white/80">
                <User className="w-5 h-5 animate-pulse" />
              </div>
            ) : isAuthenticated ? (
              <>
                <div className="flex items-center gap-2 py-2 font-montserrat font-semibold text-[#FFD100]">
                  <User className="w-5 h-5" />
                  {user?.firstName || user?.email}
                </div>
                {!user?.isAdmin && (
                  <>
                    <Link
                      href="/profilo"
                      onClick={() => {
                        handleNavClick();
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-2 py-2 font-montserrat font-semibold transition-colors duration-200 text-white hover:text-[#FFD100]"
                    >
                      <User className="w-5 h-5" />
                      Profilo
                    </Link>
                    <Link
                      href="/ordini"
                      onClick={() => {
                        handleNavClick();
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-2 py-2 font-montserrat font-semibold transition-colors duration-200 text-white hover:text-[#FFD100]"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      I miei ordini
                    </Link>
                  </>
                )}
                {user?.isAdmin && (
                  <>
                    <Link
                      href="/admin/ordini"
                      onClick={() => {
                        handleNavClick();
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-2 py-2 font-montserrat font-semibold transition-colors duration-200 text-white hover:text-[#FFD100]"
                    >
                      <BarChart3 className="w-5 h-5" />
                      Gestione Ordini
                    </Link>
                    <Link
                      href="/admin/users"
                      onClick={() => {
                        handleNavClick();
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-2 py-2 font-montserrat font-semibold transition-colors duration-200 text-white hover:text-[#FFD100]"
                    >
                      <Users className="w-5 h-5" />
                      Gestione Utenti
                    </Link>
                  </>
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
      </div>
    </header>
    <AuthModal
      isOpen={authModalOpen}
      onClose={() => {
        setAuthModalOpen(false);
      }}
      defaultTab={authModalTab}
    />
    </>
  );
};

export default Navbar;
