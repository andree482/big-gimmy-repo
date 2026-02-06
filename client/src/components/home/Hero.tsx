import { Link } from "wouter";

const DumbbellIcon = () => (
  <div className="animate-fade-in-scale">
    <svg
      width="150"
      height="150"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mx-auto mb-4 hover:scale-110 transition-transform duration-300"
    >
      {/* Manubrio - asta centrale */}
      <rect x="6" y="11" width="12" height="2" fill="#FFD100" rx="1" />

      {/* Pesi a sinistra */}
      <rect x="2" y="9" width="4" height="6" fill="#FFD100" rx="1" />
      <rect x="3" y="7" width="2" height="10" fill="#FFD100" rx="1" />

      {/* Pesi a destra */}
      <rect x="18" y="9" width="4" height="6" fill="#FFD100" rx="1" />
      <rect x="19" y="7" width="2" height="10" fill="#FFD100" rx="1" />
    </svg>
  </div>
);

const Hero = () => {
  return (
    <section className="hero-section min-h-[500px] md:min-h-[600px] flex items-center justify-center py-10 md:py-16 overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        {/* Icon */}
        <div className="mb-2 md:mb-4">
          <DumbbellIcon />
        </div>

        {/* Main Title - render immediato per FCP/LCP */}
        <div className="flex items-center justify-center mb-4 md:mb-6 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-montserrat font-bold">
            <span className="text-white">BIG</span>{" "}
            <span className="text-[#FFD100]">GIMMY</span>{" "}
            <span className="text-[#FFD100]">INTEGRATORI</span>
          </h1>
        </div>

        {/* Subtitle */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-montserrat font-bold text-white mb-4 md:mb-6 animate-fade-in">
          Potenzia le tue{" "}
          <span className="text-[#FFD100] hover:scale-105 inline-block transition-transform">
            Performance
          </span>
        </h2>

        {/* Description */}
        <p className="text-base sm:text-lg md:text-xl text-white mb-6 md:mb-8 max-w-2xl mx-auto px-2 animate-fade-in">
          La qualità degli integratori e accessori per la palestra che cerchi, ora anche in Valle d'Aosta.
        </p>

        {/* CTA Button */}
        <div className="animate-fade-in">
          <Link
            href="/prodotti"
            className="bg-[#FFD100] hover:bg-yellow-500 hover:scale-105 hover:shadow-lg text-[#212121] font-montserrat font-bold px-6 sm:px-8 py-3 rounded-md transition-all duration-200 inline-block w-full sm:w-auto max-w-xs mx-auto active:scale-95"
          >
            Scopri i Prodotti
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
