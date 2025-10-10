import { Switch, Route, Redirect, useLocation } from "wouter";
import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CookieConsentBanner from "@/components/CookieConsentBanner";
import { AuthWrapper } from "@/components/AuthWrapper";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import Home from "@/pages/Home";
import AboutUs from "@/pages/AboutUs";
import Products from "@/pages/Products";
import Stores from "@/pages/Stores";
import Gallery from "@/pages/Gallery";
import Contact from "@/pages/Contact";
import Favorites from "@/pages/Favorites";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import CookiePolicy from "@/pages/CookiePolicy";
import Login from "@/pages/Login";
import NotFound from "@/pages/not-found";

// Importiamo i componenti per le pagine dei prodotti
import ProductCategory from "@/pages/ProductCategory";
import ProductCategoryWithVariants from "@/pages/ProductCategoryWithVariants";
import ProductDetail from "@/pages/ProductDetail";
import ProductVariants from "@/pages/ProductVariants";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/chi-siamo" component={AboutUs} />
      {/* Category redirects for old URLs */}
      <Route path="/prodotti/aminoacidi" component={() => <Redirect to="/prodotti/aminoacidi-e-creatina" />} />
      <Route path="/prodotti/vitamine-minerali-antiossidanti" component={() => <Redirect to="/prodotti/supplementi" />} />
      <Route path="/prodotti/pre-workout" component={() => <Redirect to="/prodotti/dimagranti" />} />
      <Route path="/prodotti/energetici" component={() => <Redirect to="/prodotti/pre-workout-energetici" />} />
      <Route path="/prodotti/accessori-e-merchandising" component={() => <Redirect to="/prodotti/merchandising-e-cosmetici" />} />
      {/* Product detail redirects for old category URLs */}
      <Route path="/prodotti/aminoacidi/:slug" component={({params}) => <Redirect to={`/prodotti/aminoacidi-e-creatina/${params.slug}`} />} />
      <Route path="/prodotti/vitamine-minerali-antiossidanti/:slug" component={({params}) => <Redirect to={`/prodotti/supplementi/${params.slug}`} />} />
      <Route path="/prodotti/pre-workout/:slug" component={({params}) => <Redirect to={`/prodotti/dimagranti/${params.slug}`} />} />
      <Route path="/prodotti/energetici/:slug" component={({params}) => <Redirect to={`/prodotti/pre-workout-energetici/${params.slug}`} />} />
      <Route path="/prodotti/accessori-e-merchandising/:slug" component={({params}) => <Redirect to={`/prodotti/merchandising-e-cosmetici/${params.slug}`} />} />
      {/* Variants redirects for old category URLs */}
      <Route path="/prodotti/aminoacidi/varianti" component={() => <Redirect to="/prodotti/aminoacidi-e-creatina/varianti" />} />
      <Route path="/prodotti/vitamine-minerali-antiossidanti/varianti" component={() => <Redirect to="/prodotti/supplementi/varianti" />} />
      <Route path="/prodotti/pre-workout/varianti" component={() => <Redirect to="/prodotti/dimagranti/varianti" />} />
      <Route path="/prodotti/energetici/varianti" component={() => <Redirect to="/prodotti/pre-workout-energetici/varianti" />} />
      <Route path="/prodotti/accessori-e-merchandising/varianti" component={() => <Redirect to="/prodotti/merchandising-e-cosmetici/varianti" />} />
      <Route path="/prodotti/:category/varianti" component={ProductVariants} />
      <Route path="/prodotti/:category/:slug" component={ProductDetail} />
      <Route path="/prodotti/:category" component={ProductCategory} />
      <Route path="/prodotti" component={Products} />
      <Route path="/negozi" component={Stores} />
      <Route path="/galleria" component={Gallery} />
      <Route path="/contatti" component={Contact} />
      <Route path="/preferiti" component={Favorites} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/cookie-policy" component={CookiePolicy} />
      <Route path="/login" component={Login} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [location] = useLocation();
  const isLoginPage = location === '/login';
  
  // Scroll automatico all'inizio della pagina quando si naviga
  useScrollToTop();
  
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
  }, []);

  return (
    <AuthWrapper>
      <div className="flex flex-col min-h-screen">
        {/* Nascondi navbar su pagina login per design minimale */}
        {!isLoginPage && <Navbar />}
        
        <main className={isLoginPage ? "min-h-screen" : "flex-grow"}>
          <Router />
        </main>
        
        {/* Nascondi footer su pagina login per design minimale */}
        {!isLoginPage && <Footer />}
        {!isLoginPage && <CookieConsentBanner />}
      </div>
    </AuthWrapper>
  );
}

export default App;