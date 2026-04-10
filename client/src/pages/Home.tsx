import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import Cta from "@/components/home/Cta";
import { Link } from "wouter";
import { storeImages, productCategories } from "@/lib/constants";
import ScrollAnimatedSection from "@/components/animations/ScrollAnimatedSection";
import { AnimatedCard, AnimatedText } from "@/components/animations/AnimatedCard";

// Immagini per la sezione Chi Siamo
import aboutImg1 from "../assets/about_img1.jpeg";
import aboutImg2 from "../assets/about_img2.jpeg";
import aboutImg3 from "../assets/about_img3_new.jpeg";
import aboutImg4 from "../assets/about_img4.jpeg";

// Immagini per le categorie prodotti
import categoryProteine from "../../../attached_assets/nuove_foto_ancora/W251_essential-100-whey-900-g-cacao_singolo.png";
import categoryAminoacidi from "../assets/category-aminoacidi.jpg";
import categoryAlimentiFit from "../assets/category-alimenti-fit.jpg";

const Home = () => {
  return (
    <>
      <Hero />
      <Features />

      {/* About Section - Mobile Optimized with Animations */}
      <ScrollAnimatedSection animation="slideUp" className="py-10 sm:py-12 md:py-16">
        <section id="chi-siamo">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-8">
                <AnimatedText delay={0.1}>
                  <h2 className="text-2xl sm:text-3xl font-montserrat font-bold mb-4 md:mb-6 text-center md:text-left">Chi Siamo</h2>
                </AnimatedText>
                <AnimatedText delay={0.2}>
                  <p className="mb-4 text-base sm:text-lg">
                    Big Gimmy Integratori nasce a Buttigliera Alta (TO) dalla passione per il fitness e il benessere fisico.
                  </p>
                </AnimatedText>
                <AnimatedText delay={0.3}>
                  <p className="text-base sm:text-lg">
                    Il nostro negozio di Buttigliera è rapidamente diventato un punto di riferimento nella città, grazie all'ampia selezione di prodotti, i prezzi competitivi e soprattutto la competenza del nostro staff.
                  </p>
                </AnimatedText>
                <div className="mt-6 text-center md:text-left animate-fade-in">
                  <Link
                    href="/chi-siamo"
                    className="text-[#FFD100] font-semibold hover:underline inline-flex items-center transition-all hover:scale-105 group"
                  >
                    Scopri di più su di noi
                    <svg
                      className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <div className="grid grid-cols-2 gap-2 sm:gap-4">
                  <AnimatedCard delay={0.2} hoverScale={1.03} className="rounded-lg shadow-md h-40 sm:h-48 md:h-64 w-full overflow-hidden">
                    <img
                      src={aboutImg1}
                      alt="BigGimmy Store Interior"
                      className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                  </AnimatedCard>
                  <AnimatedCard delay={0.3} hoverScale={1.03} className="rounded-lg shadow-md h-40 sm:h-48 md:h-64 w-full overflow-hidden">
                    <img
                      src={aboutImg2}
                      alt="BigGimmy Product Display"
                      className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                  </AnimatedCard>
                  <AnimatedCard delay={0.4} hoverScale={1.03} className="rounded-lg shadow-md h-40 sm:h-48 md:h-64 w-full overflow-hidden">
                    <img
                      src={aboutImg3}
                      alt="BigGimmy Supplements"
                      className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
                      style={{ objectPosition: "center 30%" }}
                      loading="lazy"
                      decoding="async"
                    />
                  </AnimatedCard>
                  <AnimatedCard delay={0.5} hoverScale={1.03} className="rounded-lg shadow-md h-40 sm:h-48 md:h-64 w-full overflow-hidden">
                    <img
                      src={aboutImg4}
                      alt="BigGimmy Store Exterior"
                      className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                  </AnimatedCard>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollAnimatedSection>

      {/* Featured Products - Mobile Optimized with Animations */}
      <ScrollAnimatedSection animation="slideUp" className="py-10 sm:py-12 md:py-16 bg-[#F5F5F5]">
        <section>
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              <AnimatedText delay={0.1}>
                <h2 className="text-2xl sm:text-3xl font-montserrat font-bold mb-3 md:mb-4">I Nostri Prodotti</h2>
              </AnimatedText>
              <AnimatedText delay={0.2}>
                <p className="max-w-2xl mx-auto text-base sm:text-lg px-2">
                  Scopri la nostra selezione di prodotti premium per supportare il tuo allenamento e migliorare le tue performance.
                </p>
              </AnimatedText>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {productCategories.slice(0, 3).map((category, index) => {
                // Array delle immagini di sfondo per le prime 3 categorie
                const backgroundImages = [categoryProteine, categoryAminoacidi, categoryAlimentiFit];
                const backgroundImage = backgroundImages[index];

                return (
                  <AnimatedCard
                    key={index}
                    delay={0.3 + (index * 0.1)}
                    hoverScale={1.03}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-200"
                  >
                    <div className="relative w-full h-36 sm:h-40 md:h-48 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                      {/* Immagine di sfondo */}
                      <img
                        src={backgroundImage}
                        alt={`${category.name} background`}
                        className={`absolute inset-0 w-full h-full ${index === 0 ? 'object-contain' : 'object-cover scale-110'
                          }`}
                        style={{
                          filter: index !== 0 ? 'contrast(1.1) saturate(1.1)' : 'none'
                        }}
                      />
                      {/* Overlay gradient per migliorare la leggibilità */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent"></div>
                    </div>
                    <div className="p-4 sm:p-5 md:p-6">
                      <h3 className="font-montserrat font-bold text-lg sm:text-xl mb-2">{category.name}</h3>
                      <p className="mb-4 text-sm sm:text-base">{category.description}</p>
                      <Link
                        href="/prodotti"
                        className="text-[#FFD100] font-semibold hover:underline inline-flex items-center text-sm sm:text-base group transition-all"
                      >
                        Esplora prodotti
                        <svg
                          className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </Link>
                    </div>
                  </AnimatedCard>
                );
              })}
            </div>

            <div className="text-center mt-8 sm:mt-10 md:mt-12 animate-fade-in">
              <Link
                href="/prodotti"
                className="bg-[#FFD100] hover:bg-yellow-500 hover:scale-105 hover:shadow-lg active:scale-95 text-[#212121] font-montserrat font-bold px-6 sm:px-8 py-3 rounded-md transition-all duration-200 inline-block w-full sm:w-auto max-w-xs mx-auto"
              >
                Scopri tutti i prodotti
              </Link>
            </div>
          </div>
        </section>
      </ScrollAnimatedSection>

      <Cta />
    </>
  );
};

export default Home;
