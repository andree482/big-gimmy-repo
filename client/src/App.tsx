import { Switch, Route } from "wouter";
import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CookieConsentBanner from "@/components/CookieConsentBanner";
import AccessibilityMenu from "@/components/AccessibilityMenu";
import { CartProvider } from "@/components/cart/CartProvider";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import InfoBanner from "@/components/layout/InfoBanner";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Lock, Loader2 } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { AuthModal } from "@/components/auth/AuthModal";

import Home from "@/pages/Home";
import AboutUs from "@/pages/AboutUs";
import Products from "@/pages/Products";
import Stores from "@/pages/Stores";
import Gallery from "@/pages/Gallery";
import Contact from "@/pages/Contact";
import Favorites from "@/pages/Favorites";
import Cart from "@/pages/Cart";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import CookiePolicy from "@/pages/CookiePolicy";
import NotFound from "@/pages/not-found";

// Importiamo i componenti per le pagine dei prodotti
import ProductCategory from "@/pages/ProductCategory";
import ProductCategoryWithVariants from "@/pages/ProductCategoryWithVariants";
import ProductDetail from "@/pages/ProductDetail";
import ProductVariants from "@/pages/ProductVariants";
import AdminOrders from "@/pages/AdminOrders";
import AdminUsers from "@/pages/AdminUsers";
import AdminLayout from "@/components/admin/AdminLayout";
import Profile from "@/pages/Profile";

function Router() {
  // Attiva lo scroll automatico verso l'alto ad ogni cambio di pagina
  useScrollToTop();
  
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/chi-siamo" component={AboutUs} />
      <Route path="/prodotti/:category/varianti" component={ProductVariants} />
      <Route path="/prodotti/:category/:slug" component={ProductDetail} />
      <Route path="/prodotti/:category" component={ProductCategory} />
      <Route path="/prodotti" component={Products} />
      <Route path="/negozi" component={Stores} />
      <Route path="/galleria" component={Gallery} />
      <Route path="/contatti" component={Contact} />
      <Route path="/preferiti" component={Favorites} />
      <Route path="/carrello" component={Cart} />
      <Route path="/admin/users" component={() => <AdminLayout><AdminUsers /></AdminLayout>} />
      <Route path="/admin/ordini" component={() => <AdminLayout><AdminOrders /></AdminLayout>} />
      <Route path="/profilo" component={Profile} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/cookie-policy" component={CookiePolicy} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const { toast } = useToast();
  const [accessGranted, setAccessGranted] = useState<boolean>(false);
  const [checkingAccess, setCheckingAccess] = useState<boolean>(true);
  const [code, setCode] = useState<string>("");
  const [showCode, setShowCode] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [authOpen, setAuthOpen] = useState<boolean>(false);
  // Registrazione Service Worker per caching ottimizzato
  useEffect(() => {
    if ('serviceWorker' in navigator && import.meta.env.PROD) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    }

    // Configurazione Snipcart semplificata
    const initSnipcart = () => {
      if (window.Snipcart && window.Snipcart.api) {
        window.Snipcart.api.session.setLanguage('it');
        console.log('Snipcart initialized successfully');
      } else {
        // Retry dopo un breve delay
        setTimeout(initSnipcart, 100);
      }
    };
    
    initSnipcart();
  }, []);

  useEffect(() => {
    let cancelled = false;
    const check = async () => {
      try {
        const res = await fetch("/api/access/status", { credentials: "include" });
        if (!res.ok) throw new Error(String(res.status));
        const data = await res.json();
        if (!cancelled) {
          setAccessGranted(!!data.granted);
          setCheckingAccess(false);
        }
      } catch {
        if (!cancelled) setCheckingAccess(false);
      }
    };
    check();
    return () => { cancelled = true; };
  }, []);

  const handleVerifyCode = async () => {
    if (!code || code.length < 6) {
      toast({ title: "Codice richiesto", description: "Inserisci il codice di accesso", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    try {
      const res = await apiRequest("POST", "/api/access/verify", { code });
      if (res?.granted) {
        setAccessGranted(true);
        toast({ title: "Accesso consentito", description: "Hai sbloccato il sito" });
      } else {
        toast({ title: "Codice non valido", description: "Controlla e riprova", variant: "destructive" });
      }
    } catch (e: any) {
      toast({ title: "Errore", description: "Impossibile verificare il codice", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <CartProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <InfoBanner />
        <main className="flex-grow">
          <Router />
        </main>
        <Footer />
        <CookieConsentBanner />
        <AccessibilityMenu />
        {(!accessGranted && !checkingAccess) && (
          <div className="fixed inset-0 z-[1000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
              <CardHeader>
                <div className="mx-auto w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Lock className="h-7 w-7 text-[#FFD100]" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Input
                      type={showCode ? "text" : "password"}
                      placeholder="Inserisci il codice di accesso"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                    />
                    <button type="button" className="mt-2 text-xs text-gray-500" onClick={() => setShowCode(!showCode)}>
                      {showCode ? "Nascondi" : "Mostra"}
                    </button>
                  </div>
                  <Button
                    className="w-full bg-[#FFD100] hover:bg-[#E6BC00] text-black"
                    onClick={handleVerifyCode}
                    disabled={submitting}
                  >
                    {submitting ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" />Verifica...</>) : ("Sblocca")}
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-[#FFD100] text-[#FFD100]"
                    onClick={() => setAuthOpen(true)}
                  >
                    Accedi o Registrati
                  </Button>
                </div>
              </CardContent>
            </Card>
            {authOpen && (
              <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} defaultTab={'login'} />
            )}
          </div>
        )}
      </div>
    </CartProvider>
  );
}

export default App;
