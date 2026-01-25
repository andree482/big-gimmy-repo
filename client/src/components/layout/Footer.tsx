import { Link } from "wouter";
import { 
  Facebook, 
  Instagram
} from "lucide-react";
import Logo from "../ui/Logo";

const Footer = () => {
  return (
    <footer className="bg-[#212121] text-white py-8 sm:py-10 md:py-12">
      <div className="container mx-auto px-4">
        {/* Mobile footer with accordion-like sections */}
        <div className="md:hidden">
          <div className="mb-8">
            <div className="mb-4 flex justify-center">
              <Logo size={140} />
            </div>
            <p className="mb-4 text-center text-sm">
              Il tuo partner per integratori e accessori fitness di qualità in Piemonte e Valle d'Aosta.
            </p>
            <div className="flex justify-center space-x-6">
              <a href="https://www.facebook.com/p/BIG-GIMMY-Integratori-100063525402348/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#FFD100] transition-all" aria-label="Visita la nostra pagina Facebook">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="https://www.instagram.com/biggimmyintegratori/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#FFD100] transition-all" aria-label="Visita il nostro profilo Instagram">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-white hover:text-[#FFD100] transition-all" aria-label="Visita il nostro profilo TikTok">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 448 512" aria-hidden="true">
                  <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Mobile footer links in a list format */}
          <div className="mb-6 pb-6 border-b border-gray-800">
            <h3 className="font-montserrat font-semibold text-base mb-3 text-[#FFD100] text-center">Collegamenti Rapidi</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <Link href="/" className="hover:text-[#FFD100] transition-all text-center py-2">Home</Link>
              <Link href="/chi-siamo" className="hover:text-[#FFD100] transition-all text-center py-2">Chi Siamo</Link>
              <Link href="/prodotti" className="hover:text-[#FFD100] transition-all text-center py-2">Prodotti</Link>
              <Link href="/negozi" className="hover:text-[#FFD100] transition-all text-center py-2">Negozi</Link>
              <Link href="/contatti" className="hover:text-[#FFD100] transition-all text-center py-2">Contatti</Link>
              <Link href="/privacy-policy" className="hover:text-[#FFD100] transition-all text-center py-2">Privacy</Link>
              <Link href="/cookie-policy" className="hover:text-[#FFD100] transition-all text-center py-2">Cookie</Link>
              <Link href="/diritto-recesso" className="hover:text-[#FFD100] transition-all text-center py-2">Recesso</Link>
            </div>
          </div>
        </div>

        {/* Desktop footer */}
        <div className="hidden md:grid md:grid-cols-4 gap-8">
          <div>
            <div className="mb-4">
              <Logo size={160} />
            </div>
            <p className="mb-4">
              Il tuo partner per integratori e accessori fitness di qualità in Piemonte e Valle d'Aosta.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/p/BIG-GIMMY-Integratori-100063525402348/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#FFD100] transition-all" aria-label="Visita la nostra pagina Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com/biggimmyintegratori/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#FFD100] transition-all" aria-label="Visita il nostro profilo Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-[#FFD100] transition-all" aria-label="Visita il nostro profilo TikTok">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 448 512" aria-hidden="true">
                  <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"/>
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h3 className="font-montserrat font-semibold text-lg mb-4 text-[#FFD100]">Collegamenti Rapidi</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-[#FFD100] transition-all">Home</Link></li>
              <li><Link href="/chi-siamo" className="hover:text-[#FFD100] transition-all">Chi Siamo</Link></li>
              <li><Link href="/prodotti" className="hover:text-[#FFD100] transition-all">Prodotti</Link></li>
              <li><Link href="/negozi" className="hover:text-[#FFD100] transition-all">Negozi</Link></li>
              <li><Link href="/contatti" className="hover:text-[#FFD100] transition-all">Contatti</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-montserrat font-semibold text-lg mb-4 text-[#FFD100]">Categorie Prodotti</h3>
            <ul className="space-y-2">
              <li><Link href="/prodotti" className="hover:text-[#FFD100] transition-all">Proteine</Link></li>
              <li><Link href="/prodotti" className="hover:text-[#FFD100] transition-all">Aminoacidi</Link></li>
              <li><Link href="/prodotti" className="hover:text-[#FFD100] transition-all">Pre-workout</Link></li>
              <li><Link href="/prodotti" className="hover:text-[#FFD100] transition-all">Vitamine e Minerali</Link></li>
              <li><Link href="/prodotti" className="hover:text-[#FFD100] transition-all">Accessori</Link></li>
              <li><Link href="/prodotti" className="hover:text-[#FFD100] transition-all">Abbigliamento</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-montserrat font-semibold text-lg mb-4 text-[#FFD100]">Seguici sui Social</h3>
            <p className="mb-4">Seguici sui social media per rimanere aggiornato sulle novità, promozioni e consigli sul fitness e l'alimentazione.</p>
            <p className="mb-4">Condividiamo regolarmente contenuti utili e ispiranti per aiutarti a raggiungere i tuoi obiettivi.</p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-6 md:mt-8 pt-6 md:pt-8 text-center">
          <div className="mb-4 hidden md:flex justify-center space-x-6">
            <Link href="/privacy-policy" className="text-white hover:text-[#FFD100] transition-all">
              Privacy Policy
            </Link>
            <Link href="/cookie-policy" className="text-white hover:text-[#FFD100] transition-all">
              Cookie Policy
            </Link>
            <Link href="/diritto-recesso" className="text-white hover:text-[#FFD100] transition-all">
              Diritto di Recesso
            </Link>
          </div>
          <p className="text-sm md:text-base">&copy; {new Date().getFullYear()} BigGimmy. Tutti i diritti riservati. P.IVA 09256080012</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;