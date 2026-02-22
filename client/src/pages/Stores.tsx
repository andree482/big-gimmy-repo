import { MapPin, Phone, Clock, Link as LinkIcon, Instagram } from "lucide-react";
import { useState } from "react";
import Lightbox from "@/components/ui/lightbox";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import sedeTorinoPic from "../assets/sede_torino_nuovo.png";
import sedeAostaPic from "../assets/sede_aosta_nuovo.png";

const Stores = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Immagini gallery per ogni negozio
  const torinoGallery = [
    "/images/stores/torino/torino-1.jpg",
    "/images/stores/torino/torino-2.jpg",
    "/images/stores/torino/torino-3.jpg",
    "/images/stores/torino/torino-4.jpg",
    "/images/stores/torino/torino-5.jpg",
    "/images/stores/torino/torino-6.jpg"
  ];

  const aostaGallery = [
    "/images/stores/aosta/aosta-2.jpg",
    "/images/stores/aosta/aosta-1.jpg",
    "/images/stores/aosta/aosta-3.jpg",
    "/images/stores/aosta/aosta-4.jpg",
    "/images/stores/aosta/aosta-5.jpg",
    "/images/stores/aosta/aosta-6.jpg"
  ];

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
    setCurrentImageIndex((prev) => (prev - 1 + lightboxImages.length) % lightboxImages.length);
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
            Vieni a trovarci nei nostri punti vendita a Torino e in Valle d'Aosta.
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
              Vieni a trovarci nei nostri punti vendita, dove potrai ricevere consulenze personalizzate e scoprire tutti i nostri prodotti.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Sede di Torino */}
            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-montserrat font-bold text-3xl text-[#FFD100]">
                  Sede di Torino
                </h3>
              </div>

              <div className="mb-6 w-full h-96 bg-gray-200 rounded-lg overflow-hidden shadow-md">
                <OptimizedImage
                  src={sedeTorinoPic}
                  alt="Negozio BigGimmy - Sede di Torino"
                  className="w-full h-full"
                  objectFit="cover"
                  objectPosition="center 80%"
                  priority={true}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                <div>
                  <h4 className="font-montserrat font-semibold text-xl mb-4 text-gray-800">Informazioni</h4>
                  <p className="mb-3 flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-[#FFD100]" /> Corso Torino, 85, 10090 Buttigliera Alta TO
                  </p>
                  <p className="mb-3 flex items-center">
                    <Phone className="h-5 w-5 mr-2 text-[#FFD100]" /> 3385486392
                  </p>
                  <p className="mb-4 flex items-start">
                    <Clock className="h-5 w-5 mr-2 text-[#FFD100] mt-1" />
                    <span style={{ whiteSpace: "pre-line" }}>{"Lun-Ven 09:30-12:30, 15:30-19:30\nSabato 09:30-12:30"}</span>
                  </p>
                  <a
                    href="https://maps.app.goo.gl/6P97G3cR8YUHY9Zx7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mb-3 flex items-center text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    <LinkIcon className="h-5 w-5 mr-2 text-[#FFD100]" /> Visualizza su Google Maps
                  </a>
                  <a
                    href="https://www.instagram.com/biggimmyintegratori/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mb-4 flex items-center text-pink-600 hover:text-pink-800 hover:underline"
                  >
                    <Instagram className="h-5 w-5 mr-2 text-[#FFD100]" /> Seguici su Instagram
                  </a>
                </div>

                <div>
                  <h4 className="font-montserrat font-semibold text-xl mb-4 text-gray-800">Servizi Offerti</h4>
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

              {/* Galleria immagini negozio Torino */}
              <div className="mt-8">
                <h4 className="font-montserrat font-semibold text-xl mb-4 text-gray-800">Galleria del Negozio</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                  {torinoGallery.map((imageSrc, imgIndex) => (
                    <div
                      key={imgIndex}
                      className="h-32 sm:h-40 md:h-44 bg-gray-100 rounded-lg overflow-hidden shadow-md cursor-pointer hover:shadow-lg transition-shadow group"
                      onClick={() => openLightbox(torinoGallery, imgIndex)}
                    >
                      <OptimizedImage
                        src={imageSrc}
                        alt={`Sede di Torino - Foto ${imgIndex + 1}`}
                        className="w-full h-full group-hover:scale-105 transition-transform duration-300"
                        objectFit="cover"
                        objectPosition="center center"
                        width={200}
                        height={200}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sede di Aosta */}
            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-montserrat font-bold text-3xl text-[#FFD100]">
                  Sede di Aosta
                </h3>
                <span className="bg-[#FFD100] text-black px-3 py-1 rounded-full text-sm font-bold">
                  NUOVO
                </span>
              </div>

              <div className="mb-6 w-full h-96 bg-gray-200 rounded-lg overflow-hidden shadow-md">
                <OptimizedImage
                  src={sedeAostaPic}
                  alt="Negozio BigGimmy - Sede di Aosta"
                  className="w-full h-full"
                  objectFit="cover"
                  objectPosition="center center"
                  priority={false}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                <div>
                  <h4 className="font-montserrat font-semibold text-xl mb-4 text-gray-800">Informazioni</h4>
                  <p className="mb-3 flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-[#FFD100]" /> Corso Saint-Martin-de-Corléans, 55, 11100 Aosta AO
                  </p>
                  <p className="mb-3 flex items-center">
                    <Phone className="h-5 w-5 mr-2 text-[#FFD100]" /> 0165 086006
                  </p>
                  <p className="mb-4 flex items-start">
                    <Clock className="h-5 w-5 mr-2 text-[#FFD100] mt-1" />
                    <span style={{ whiteSpace: "pre-line" }}>{"Lun-Ven 09-12:30, 15-19:30\nSabato 09-12:30, 15-19"}</span>
                  </p>
                  <a
                    href="https://maps.app.goo.gl/zTbmgiNPYLdd6QQ69"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mb-3 flex items-center text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    <LinkIcon className="h-5 w-5 mr-2 text-[#FFD100]" /> Visualizza su Google Maps
                  </a>
                  <a
                    href="https://www.instagram.com/biggimmyintegratori2/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mb-4 flex items-center text-pink-600 hover:text-pink-800 hover:underline"
                  >
                    <Instagram className="h-5 w-5 mr-2 text-[#FFD100]" /> Seguici su Instagram
                  </a>
                </div>

                <div>
                  <h4 className="font-montserrat font-semibold text-xl mb-4 text-gray-800">Servizi Offerti</h4>
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

              {/* Galleria immagini negozio Aosta */}
              <div className="mt-8">
                <h4 className="font-montserrat font-semibold text-xl mb-4 text-gray-800">Galleria del Negozio</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                  {aostaGallery.map((imageSrc, imgIndex) => (
                    <div
                      key={imgIndex}
                      className="h-32 sm:h-40 md:h-44 bg-gray-100 rounded-lg overflow-hidden shadow-md cursor-pointer hover:shadow-lg transition-shadow group"
                      onClick={() => openLightbox(aostaGallery, imgIndex)}
                    >
                      <OptimizedImage
                        src={imageSrc}
                        alt={`Sede di Aosta - Foto ${imgIndex + 1}`}
                        className="w-full h-full group-hover:scale-105 transition-transform duration-300"
                        objectFit="cover"
                        objectPosition="center center"
                        width={200}
                        height={200}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
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
