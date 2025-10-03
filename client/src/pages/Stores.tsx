import { stores } from "@/lib/constants";
import { MapPin, Phone, Clock, Link as LinkIcon } from "lucide-react";
import { useState } from "react";
import Lightbox from "@/components/ui/lightbox";
import sedeTorinoPic from "../assets/sede_torino_nuovo.png";
import sedeAostaPic from "../assets/sede_aosta.jpeg";

const Stores = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Immagini gallery per ogni negozio
  const storeGalleries = {
    "Sede di Aosta": [
      "/images/stores/aosta/aosta-1.jpg",
      "/images/stores/aosta/aosta-2.jpg",
      "/images/stores/aosta/aosta-3.jpg",
      "/images/stores/aosta/aosta-4.jpg",
      "/images/stores/aosta/aosta-5.jpg",
      "/images/stores/aosta/aosta-6.jpg",
    ],
    "Sede di Torino": [
      "/images/stores/torino/torino-1.jpg",
      "/images/stores/torino/torino-2.jpg",
      "/images/stores/torino/torino-3.jpg",
      "/images/stores/torino/torino-4.jpg",
      "/images/stores/torino/torino-5.jpg",
      "/images/stores/torino/torino-6.jpg",
    ],
  };

  const openLightbox = (images: string[], index: number) => {
    setLightboxImages(images);
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % lightboxImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + lightboxImages.length) % lightboxImages.length,
    );
  };
  return (
    <div className="min-h-screen">
      {/* Stores Hero */}
      <section className="bg-[#212121] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-montserrat font-bold mb-6">
            I Nostri <span className="text-[#FFD100]">Negozi</span>
          </h1>
          <p className="max-w-3xl mx-auto text-lg">
            Vieni a trovarci nei nostri punti vendita a Torino e in Valle
            d'Aosta.
          </p>
        </div>
      </section>

      {/* Stores Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-montserrat font-bold mb-4">
              Due Sedi a Tua Disposizione
            </h2>
            <p className="max-w-2xl mx-auto">
              Vieni a trovarci nei nostri punti vendita, dove potrai ricevere
              consulenze personalizzate e scoprire tutti i nostri prodotti.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {stores.map((store, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-lg shadow-lg border border-gray-100"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-montserrat font-bold text-3xl text-[#FFD100]">
                    {store.name}
                  </h3>
                </div>

                <div className="mb-6 w-full h-96 bg-gray-200 rounded-lg overflow-hidden shadow-md">
                  <img
                    src={
                      store.name === "Sede di Torino"
                        ? sedeTorinoPic
                        : sedeAostaPic
                    }
                    alt={`Negozio BigGimmy - ${store.name}`}
                    className="w-full h-full object-cover"
                    style={
                      store.name === "Sede di Torino"
                        ? { objectPosition: "center 80%" }
                        : {}
                    }
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                  <div>
                    <h4 className="font-montserrat font-semibold text-xl mb-4 text-gray-800">
                      Informazioni
                    </h4>
                    <p className="mb-3 flex items-center">
                      <MapPin className="h-5 w-5 mr-2 text-[#FFD100]" />{" "}
                      {store.address}
                    </p>
                    <p className="mb-3 flex items-center">
                      <Phone className="h-5 w-5 mr-2 text-[#FFD100]" />{" "}
                      {store.phone}
                    </p>
                    <p className="mb-4 flex items-start">
                      <Clock className="h-5 w-5 mr-2 text-[#FFD100] mt-1" />
                      <span style={{ whiteSpace: "pre-line" }}>
                        {store.hours}
                      </span>
                    </p>
                    <a
                      href={store.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mb-4 flex items-center text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      <LinkIcon className="h-5 w-5 mr-2 text-[#FFD100]" />{" "}
                      Visualizza su Google Maps
                    </a>
                  </div>

                  <div>
                    <h4 className="font-montserrat font-semibold text-xl mb-4 text-gray-800">
                      Servizi Offerti
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-[#FFD100] mr-2">✓</span>
                        <span>Consulenza personalizzata</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#FFD100] mr-2">✓</span>
                        <span>Ampia selezione di integratori</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#FFD100] mr-2">✓</span>
                        <span>Prezzi competitivi</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#FFD100] mr-2">✓</span>
                        <span>Staff qualificato</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#FFD100] mr-2">✓</span>
                        <span>Prodotti delle migliori marche</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Galleria immagini negozio */}
                <div className="mt-8">
                  <h4 className="font-montserrat font-semibold text-xl mb-4 text-gray-800">
                    Galleria del Negozio
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                    {storeGalleries[
                      store.name as keyof typeof storeGalleries
                    ]?.map((imageSrc, index) => (
                      <div
                        key={index}
                        className="aspect-square bg-gray-100 rounded-lg overflow-hidden shadow-md cursor-pointer hover:shadow-lg transition-shadow group"
                        onClick={() =>
                          openLightbox(
                            storeGalleries[
                              store.name as keyof typeof storeGalleries
                            ],
                            index,
                          )
                        }
                      >
                        <img
                          src={imageSrc}
                          alt={`${store.name} - Foto ${index + 1}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox per visualizzazione immagini a schermo intero */}
      <Lightbox
        images={lightboxImages}
        currentIndex={currentImageIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        onNext={nextImage}
        onPrev={prevImage}
      />
    </div>
  );
};

export default Stores;
