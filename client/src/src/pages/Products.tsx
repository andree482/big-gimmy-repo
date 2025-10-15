import { productCategories, brands } from "@/lib/constants";
import { Link } from "wouter";

const Products = () => {
  return (
    <div className="min-h-screen">
      {/* Products Hero */}
      <section className="bg-[#212121] text-white py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-montserrat font-bold mb-4 sm:mb-6">
            I Nostri <span className="text-[#FFD100]">Prodotti</span>
          </h1>
          <p className="max-w-3xl mx-auto text-base sm:text-lg px-2">
            Scopri la nostra selezione di integratori e accessori per il fitness di alta qualità.
          </p>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-montserrat font-bold mb-4">Categorie di Prodotti</h2>
            <p className="max-w-2xl mx-auto">
              Esplora la nostra ampia gamma di prodotti, selezionati per qualità ed efficacia.
            </p>
          </div>

          {/* Prima riga: 3 categorie */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-6 md:mb-8">
            {productCategories.slice(0, 3).map((category, index) => (
              <Link key={index} href={`/prodotti/${category.slug}`}>
                <div className="block bg-[#F5F5F5] rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all p-4 sm:p-5 md:p-6 cursor-pointer hover:bg-gray-100">
                <div className="text-[#FFD100] mb-3 md:mb-4 flex justify-center">
                  <svg className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h4 className="font-montserrat font-bold text-lg sm:text-xl mb-2 text-center">{category.name}</h4>
                <p className="text-center text-sm sm:text-base">{category.description}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Seconda riga: 3 categorie */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-6 md:mb-8">
            {productCategories.slice(3, 6).map((category, index) => (
              <Link key={index + 3} href={`/prodotti/${category.slug}`}>
                <div className="block bg-[#F5F5F5] rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all p-4 sm:p-5 md:p-6 cursor-pointer hover:bg-gray-100">
                    <div className="text-[#FFD100] mb-3 md:mb-4 flex justify-center">
                      <svg className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <h4 className="font-montserrat font-bold text-lg sm:text-xl mb-2 text-center">{category.name}</h4>
                    <p className="text-center text-sm sm:text-base">{category.description}</p>
                  </div>
                </Link>
              ))}
          </div>

          {/* Terza riga: 1 categoria centrata */}
          <div className="flex justify-center">
            {productCategories.slice(6, 7).map((category, index) => (
              <Link key={index + 6} href={`/prodotti/${category.slug}`}>
                <div className="block bg-[#F5F5F5] rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all p-4 sm:p-5 md:p-6 cursor-pointer hover:bg-gray-100 w-full max-w-xs sm:max-w-sm">
                  <div className="text-[#FFD100] mb-3 md:mb-4 flex justify-center">
                    <svg className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h4 className="font-montserrat font-bold text-lg sm:text-xl mb-2 text-center">{category.name}</h4>
                  <p className="text-center text-sm sm:text-base">{category.description}</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* Quality Assurance */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-montserrat font-bold mb-4">Garanzia di Qualità</h2>
            <p className="max-w-2xl mx-auto">
              I nostri prodotti sono selezionati secondo rigorosi standard di qualità e sicurezza.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            <div className="bg-white p-6 sm:p-7 md:p-8 rounded-lg shadow-md text-center">
              <div className="text-[#FFD100] mb-4 flex justify-center">
                <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 12L11 15L16 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="font-montserrat font-bold text-lg sm:text-xl mb-2">100% Originali</h3>
              <p className="text-sm sm:text-base">
                Tutti i nostri prodotti sono originali e provengono direttamente dai produttori ufficiali.
              </p>
            </div>
            <div className="bg-white p-6 sm:p-7 md:p-8 rounded-lg shadow-md text-center">
              <div className="text-[#FFD100] mb-4 flex justify-center">
                <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="font-montserrat font-bold text-lg sm:text-xl mb-2">Controllati e Approvati</h3>
              <p className="text-sm sm:text-base">
                I nostri prodotti sono controllati e approvati seguendo le regole europee più severe.
              </p>
            </div>
            <div className="bg-white p-6 sm:p-7 md:p-8 rounded-lg shadow-md text-center">
              <div className="text-[#FFD100] mb-4 flex justify-center">
                <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9.09 9C9.3251 8.33167 9.78915 7.76811 10.4 7.40913C11.0108 7.05016 11.7289 6.91894 12.4272 7.03871C13.1255 7.15849 13.7588 7.52152 14.2151 8.06353C14.6713 8.60553 14.9211 9.29152 14.92 10C14.92 12 11.92 13 11.92 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 17H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="font-montserrat font-bold text-lg sm:text-xl mb-2">Consulenza Gratuita</h3>
              <p className="text-sm sm:text-base">
                Il nostro staff è a tua disposizione per consigliarti il prodotto più adatto alle tue esigenze.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;