import { Link } from "wouter";

const Cta = () => {
  return (
    <section className="py-10 sm:py-12 md:py-16 bg-[#212121] text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl sm:text-3xl font-montserrat font-bold mb-4 md:mb-6">
          Pronto a migliorare le tue <span className="text-[#FFD100]">Performance?</span>
        </h2>
        <p className="max-w-2xl mx-auto mb-6 md:mb-8 text-base sm:text-lg px-2">
          Vieni a trovarci in uno dei nostri negozi e scopri tutti i prodotti che possono aiutarti a raggiungere i tuoi obiettivi fitness.
        </p>
        <div className="flex flex-row justify-center space-x-4">
          <Link
            href="/negozi"
            className="bg-[#FFD100] hover:bg-yellow-500 text-[#212121] font-montserrat font-bold px-6 sm:px-8 py-3 rounded-md transition-all inline-block w-auto"
          >
            Trova il Negozio
          </Link>
          <Link
            href="/prodotti"
            className="border-2 border-white hover:border-[#FFD100] hover:text-[#FFD100] font-montserrat font-bold px-6 sm:px-8 py-3 rounded-md transition-all inline-block w-auto"
          >
            Scopri i Prodotti
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Cta;
