const Gallery = () => {
  // Dati placeholder per la galleria
  const placeholders = [
    "Negozio Torino - Esterno", 
    "Negozio Torino - Interno", 
    "Negozio Aosta - Esterno", 
    "Negozio Aosta - Interno",
    "Proteine e Integratori",
    "Accessori Fitness",
    "Abbigliamento Tecnico",
    "Area Consulenza"
  ];

  return (
    <div className="min-h-screen">
      {/* Gallery Hero */}
      <section className="bg-[#212121] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-montserrat font-bold mb-6">
            La Nostra <span className="text-[#FFD100]">Galleria</span>
          </h1>
          <p className="max-w-3xl mx-auto text-lg">
            Scopri i nostri negozi e alcuni dei nostri prodotti più popolari.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-montserrat font-bold mb-4">Galleria Fotografica</h2>
            <p className="max-w-2xl mx-auto">
              Qui inseriremo le immagini dei nostri negozi e prodotti.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {placeholders.map((title, index) => (
              <div 
                key={index} 
                className="w-full h-64 bg-gray-200 rounded-lg shadow-md flex items-center justify-center"
              >
                <div className="text-center p-4">
                  <div className="text-[#FFD100] flex justify-center mb-2">
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="2" />
                      <path d="M21 15L16 10L5 21" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </div>
                  <p className="text-gray-500 font-semibold">{title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Store Atmosphere */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-montserrat font-bold mb-4">I Nostri Negozi</h2>
            <p className="max-w-2xl mx-auto">
              Nei nostri negozi troverai un ambiente accogliente e professionale, dove potrai scoprire tutti i nostri prodotti.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div 
                className="w-full h-96 bg-gray-200 rounded-lg shadow-md mb-4 flex items-center justify-center"
              >
                <div className="text-center p-4">
                  <div className="text-[#FFD100] flex justify-center mb-2">
                    <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="2" y="3" width="20" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                      <path d="M2 7H22" stroke="currentColor" strokeWidth="2" />
                      <path d="M12 7L12 21" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </div>
                  <p className="text-gray-500 font-semibold text-xl">Sede di Torino</p>
                </div>
              </div>
              <h3 className="font-montserrat font-bold text-xl mb-2">Sede di Torino</h3>
              <p>
                Il nostro negozio storico, ampio e ben organizzato, dove potrai trovare un'ampia selezione di prodotti.
              </p>
            </div>
            <div>
              <div 
                className="w-full h-96 bg-gray-200 rounded-lg shadow-md mb-4 flex items-center justify-center"
              >
                <div className="text-center p-4">
                  <div className="text-[#FFD100] flex justify-center mb-2">
                    <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="2" y="3" width="20" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                      <path d="M2 7H22" stroke="currentColor" strokeWidth="2" />
                      <path d="M12 7L12 21" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </div>
                  <p className="text-gray-500 font-semibold text-xl">Sede di Aosta</p>
                </div>
              </div>
              <h3 className="font-montserrat font-bold text-xl mb-2">Sede di Valle d'Aosta</h3>
              <p>
                La nostra nuova sede, moderna e accogliente, progettata per offrirti un'esperienza di acquisto ottimale.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
