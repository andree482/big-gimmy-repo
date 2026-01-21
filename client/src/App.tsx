import { Switch, Route } from "wouter";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CookieConsentBanner from "@/components/CookieConsentBanner";
import AccessibilityMenu from "@/components/AccessibilityMenu";
import { CartProvider } from "@/components/cart/CartProvider";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import InfoBanner from "@/components/layout/InfoBanner";
import { AuthModal } from "@/components/auth/AuthModal";

import Home from "@/pages/Home";
import AboutUs from "@/pages/AboutUs";
import Products from "@/pages/Products";
import Stores from "@/pages/Stores";
import Gallery from "@/pages/Gallery";
import Contact from "@/pages/Contact";
import Favorites from "@/pages/Favorites";
import Cart from "@/pages/Cart";
import CheckoutSuccess from "@/pages/CheckoutSuccess";
import CheckoutCancel from "@/pages/CheckoutCancel";
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
import MyOrders from "@/pages/MyOrders";

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
      <Route path="/cart" component={Cart} />
      <Route path="/checkout/success" component={CheckoutSuccess} />
      <Route path="/checkout/cancel" component={CheckoutCancel} />
      <Route path="/admin/users" component={() => <AdminLayout><AdminUsers /></AdminLayout>} />
      <Route path="/admin/ordini" component={() => <AdminLayout><AdminOrders /></AdminLayout>} />
      <Route path="/profilo" component={Profile} />
      <Route path="/ordini" component={MyOrders} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/cookie-policy" component={CookiePolicy} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();
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
      </div>
    </CartProvider>
  );
}

export default App;
