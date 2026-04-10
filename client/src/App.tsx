import { Switch, Route } from "wouter";
import { useEffect, lazy, Suspense } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CookieConsentBanner from "@/components/CookieConsentBanner";
import { CartProvider } from "@/components/cart/CartProvider";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import InfoBanner from "@/components/layout/InfoBanner";
import { PendingOrderModal } from "@/components/PendingOrderModal";
import { supabase } from "@/lib/supabase";

// Lazy loading per tutte le pagine (riduce il bundle iniziale e migliora FCP/LCP)
const Home = lazy(() => import("@/pages/Home"));
const Products = lazy(() => import("@/pages/Products"));
const Stores = lazy(() => import("@/pages/Stores"));
const AboutUs = lazy(() => import("@/pages/AboutUs"));
const Gallery = lazy(() => import("@/pages/Gallery"));
const Contact = lazy(() => import("@/pages/Contact"));
const Favorites = lazy(() => import("@/pages/Favorites"));
const Cart = lazy(() => import("@/pages/Cart"));
const CheckoutSuccess = lazy(() => import("@/pages/CheckoutSuccess"));
const CheckoutCancel = lazy(() => import("@/pages/CheckoutCancel"));
const PrivacyPolicy = lazy(() => import("@/pages/PrivacyPolicy"));
const CookiePolicy = lazy(() => import("@/pages/CookiePolicy"));
const DirittoRecesso = lazy(() => import("@/pages/DirittoRecesso"));
const NotFound = lazy(() => import("@/pages/not-found"));
const ProductCategory = lazy(() => import("@/pages/ProductCategory"));
const ProductDetail = lazy(() => import("@/pages/ProductDetail"));
const ProductVariants = lazy(() => import("@/pages/ProductVariants"));
const AdminOrders = lazy(() => import("@/pages/AdminOrders"));
const AdminUsers = lazy(() => import("@/pages/AdminUsers"));
const AdminLayout = lazy(() => import("@/components/admin/AdminLayout"));
const Profile = lazy(() => import("@/pages/Profile"));
const MyOrders = lazy(() => import("@/pages/MyOrders"));
const AuthCallback = lazy(() => import("@/pages/AuthCallback"));
const ResetPassword = lazy(() => import("@/pages/ResetPassword"));
const AuthXDSync = lazy(() => import("@/pages/AuthXDSync"));

// Componente di fallback per il caricamento
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FFD100]"></div>
  </div>
);

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
      <Route path="/auth/callback" component={AuthCallback} />
      <Route path="/auth/xd-sync" component={AuthXDSync} />
      <Route path="/reset-password" component={ResetPassword} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/cookie-policy" component={CookiePolicy} />
      <Route path="/diritto-recesso" component={DirittoRecesso} />
      <Route component={NotFound} />
    </Switch>
  );
}

const CANONICAL_URL: string = import.meta.env.VITE_CANONICAL_URL || '';
const ALLOWED_XD_ORIGINS: string[] = [
  'https://www.biggimmyintegratori.com',
  'https://www.biggimmyintegratori.it',
  'https://biggimmyintegratori.com',
  'https://biggimmyintegratori.it',
];

function App() {
  // Registrazione Service Worker per caching ottimizzato
  useEffect(() => {
    if ('serviceWorker' in navigator && import.meta.env.PROD) {
      navigator.serviceWorker.register('/sw.js')
        .then((_registration) => { })
        .catch((_registrationError) => { });
    }
  }, []);

  // Cross-domain session sync: se siamo su un dominio non-canonico e non loggati,
  // proviamo a recuperare la sessione dal dominio canonico via iframe nascosto.
  useEffect(() => {
    if (!CANONICAL_URL) return;
    if (window.location.origin === CANONICAL_URL) return; // siamo già sul canonico

    // Aspetta un attimo per dare tempo alla sessione locale di caricarsi
    const timer = setTimeout(async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session) return; // già loggati, niente da fare

      const iframe = document.createElement('iframe');
      iframe.src = `${CANONICAL_URL}/auth/xd-sync`;
      iframe.style.cssText = 'display:none;width:0;height:0;border:none;position:absolute;';
      document.body.appendChild(iframe);

      function onMessage(event: MessageEvent) {
        if (!ALLOWED_XD_ORIGINS.includes(event.origin)) return;
        if (event.data?.type !== 'XD_SESSION') return;

        window.removeEventListener('message', onMessage);
        document.body.removeChild(iframe);

        const { access_token, refresh_token } = event.data;
        if (access_token && refresh_token) {
          supabase.auth.setSession({ access_token, refresh_token });
        }
      }

      window.addEventListener('message', onMessage);

      // Timeout di sicurezza: rimuovi iframe dopo 5 secondi se non risponde
      setTimeout(() => {
        window.removeEventListener('message', onMessage);
        if (document.body.contains(iframe)) document.body.removeChild(iframe);
      }, 5000);
    }, 800);

    return () => clearTimeout(timer);
  }, []);



  return (
    <CartProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <InfoBanner />
        <main className="flex-grow">
          <Suspense fallback={<PageLoader />}>
            <Router />
          </Suspense>
        </main>
        <Footer />
        <CookieConsentBanner />
        <PendingOrderModal />
      </div>
    </CartProvider>
  );
}

export default App;
