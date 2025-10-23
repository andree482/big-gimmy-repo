import { useState, useEffect, useMemo } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Logo from "../ui/Logo";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { scrollY, scrollDirection } = useScrollAnimation();
  const [isNavigating, setIsNavigating] = useState(false);
  
  // Close mobile menu when location changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Memoizza i valori computati con isteresi per evitare oscillazioni
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

  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleNavClick = () => {
    setIsNavigating(true);
    // Mantieni la navbar visibile per 1 secondo durante la navigazione
    setTimeout(() => {
      setIsNavigating(false);
    }, 1000);
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
      className={`sticky top-0 z-50 ${mobileMenuOpen ? '' : 'navbar-transition'} ${
        isScrolled ? 'bg-[#212121] shadow-lg' : 'bg-[#212121]'
      }`}
      style={headerStyles}
    >
      <div className="container mx-auto px-4">
        <div 
          className="flex justify-between items-center"
          style={containerStyles}
        >
          <div className="flex items-center">
            <div className="font-montserrat font-bold">
              <Link href="/" className="flex items-center">
                <Logo size={isScrolled ? 120 : 150} />
              </Link>
            </div>
          </div>
          
          <div className="hidden md:flex space-x-6 text-white font-montserrat font-semibold">
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
          
          {/* Favorites Link - Desktop */}
          <div className="hidden md:flex items-center">
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
          </div>
          
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-white hover:text-[#FFD100] transition-colors duration-200"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
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
                <Link
                  href="/preferiti"
                  onClick={handleNavClick}
                  className={`flex items-center gap-2 py-2 font-montserrat font-semibold transition-colors duration-200 ${
                    location === "/preferiti"
                      ? "text-[#FFD100]"
                      : "text-white hover:text-[#FFD100]"
                  }`}
                >
                  <Heart className={`w-5 h-5 ${location === "/preferiti" ? "fill-current" : ""}`} />
                  Preferiti
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;