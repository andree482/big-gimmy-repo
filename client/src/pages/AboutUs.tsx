import { storeImages } from "@/lib/constants";
import sedeTorinoImg from "../assets/sede_torino_new.jpeg";
import sedeAostaImg from "../assets/sede_aosta.jpeg";
import negozioImg1 from "../assets/negozio_img1.jpeg";
import negozioImg2 from "../assets/negozio_img2.jpeg";

const AboutUs = () => {
  return (
    <div className="min-h-screen">
      {/* About Hero */}
      <section className="bg-[#212121] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-montserrat font-bold mb-6">
            Chi <span className="text-[#FFD100]">Siamo</span>
          </h1>
          <p className="max-w-3xl mx-auto text-lg">
            Scopri la storia di BigGimmy, la nostra missione e i valori che ci
            guidano ogni giorno.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-montserrat font-bold mb-6">
                La Nostra <span className="text-[#FFD100]">Storia</span>
              </h2>
              <p className="mb-4">
                Big Gimmy Integratori nasce nella provincia di Torino dalla
                passione per il fitness e il benessere fisico.
              </p>
              <p className="mb-4">
                Il nostro negozio nella provincia di Torino, è rapidamente
                diventato un punto di riferimento nella città, grazie all'ampia
                selezione di prodotti, i prezzi competitivi e soprattutto la
                competenza del nostro staff, sempre pronto a consigliare il
                prodotto più adatto alle specifiche esigenze di ogni cliente.
              </p>
              <p className="mb-4">
                La nostra avventura è iniziata nel 2006, quando il fondatore
                Renato, appassionato di bodybuilding e nutrizione sportiva, ha
                deciso di trasformare la sua passione in un'attività
                imprenditoriale che potesse realmente fare la differenza nel
                panorama dell'integrazione sportiva. L'obiettivo fin dall'inizio
                è stato quello di creare un negozio che non fosse solo un punto
                vendita, ma un vero centro di consulenza per atleti di ogni
                livello.
              </p>
              <p className="mb-4">
                Ciò che ci distingue è l'attenzione personalizzata che
                dedichiamo a ogni cliente. Non ci limitiamo a vendere prodotti,
                ma offriamo una consulenza completa che include suggerimenti su
                alimentazione, allenamento e integrazione, creando piani
                personalizzati in base agli obiettivi individuali di ciascuno.
              </p>
              <p className="mb-4">
                Ad aprile 2025, abbiamo deciso di espanderci aprendo una nuova
                sede in Valle d'Aosta, per portare la nostra esperienza e
                qualità anche in questa regione. Il nuovo negozio mantiene la
                stessa filosofia del primo: offrire solo prodotti selezionati
                dei migliori marchi, con un servizio di consulenza
                personalizzata alle esigenze del cliente.
              </p>
              <p className="mb-4">
                L'apertura del secondo punto vendita rappresenta non solo
                un'espansione territoriale, ma anche l'evoluzione della nostra
                visione: creare una rete di negozi specializzati dove la qualità
                dei prodotti si unisce alla competenza di un personale altamente
                qualificato, sempre aggiornato sulle ultime novità del settore e
                pronto a condividere la propria conoscenza.
              </p>

              <h2 className="text-3xl font-montserrat font-bold mb-6 mt-12">
                La Nostra <span className="text-[#FFD100]">Missione</span>
              </h2>
              <p className="mb-4">
                La nostra missione è supportare ogni persona nel raggiungimento
                dei propri obiettivi fitness, sia che si tratti di un atleta
                professionista, sia che si tratti di chi si avvicina per la
                prima volta al mondo del fitness.
              </p>
              <p className="mb-4">
                Crediamo che ogni percorso verso il benessere fisico sia unico e
                personale, per questo offriamo non solo prodotti, ma anche
                consigli personalizzati basati sulle esigenze specifiche di ogni
                cliente.
              </p>
            </div>

            <div className="md:w-1/2">
              <div className="sticky top-24">
                <div className="relative h-[400px] mb-6 rounded-lg overflow-hidden shadow-xl">
                  <img
                    src="/images/sede-torino.jpg"
                    alt="Sede di Torino - BigGimmy Integratori"
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-4">
                    <h3 className="font-montserrat font-bold text-xl">
                      Sede di Torino
                    </h3>
                    <p className="text-sm">
                      Corso Torino, 85, 10090 Buttigliera Alta TO
                    </p>
                  </div>
                </div>

                <div className="relative h-[320px] mb-8 rounded-lg overflow-hidden shadow-xl">
                  <img
                    src={sedeAostaImg}
                    alt="Sede di Aosta"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-4">
                    <h3 className="font-montserrat font-bold text-xl">
                      Sede di Aosta{" "}
                      <span className="text-[#FFD100] text-sm font-bold ml-2">
                        NUOVO
                      </span>
                    </h3>
                    <p className="text-sm">
                      Corso Saint-Martin-de-Corléans, 55, 11100 Aosta AO
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="h-[260px] w-full rounded-lg shadow-md overflow-hidden">
                    <img
                      src={negozioImg1}
                      alt="Interno negozio BigGimmy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="h-[260px] w-full rounded-lg shadow-md overflow-hidden">
                    <img
                      src={negozioImg2}
                      alt="Interno negozio con scaffali di prodotti"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="text-3xl font-montserrat font-bold mb-6 text-center">
              I Nostri <span className="text-[#FFD100]">Valori</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div className="bg-[#F5F5F5] p-8 rounded-lg shadow-md">
                <div className="text-[#FFD100] mb-4 flex justify-center">
                  <svg
                    className="w-12 h-12"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8 12L11 15L16 10"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className="font-montserrat font-bold text-xl text-center mb-3">
                  Qualità
                </h3>
                <p className="text-center">
                  La qualità dei nostri prodotti è la nostra priorità assoluta.
                  Selezioniamo solo marchi certificati e riconosciuti nel
                  settore del fitness e dell'integrazione sportiva, garantendo
                  l'originalità di ogni articolo venduto nei nostri negozi.
                </p>
              </div>

              <div className="bg-[#F5F5F5] p-8 rounded-lg shadow-md">
                <div className="text-[#FFD100] mb-4 flex justify-center">
                  <svg
                    className="w-12 h-12"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17 21V19C17 16.7909 15.2091 15 13 15H5C2.79086 15 1 16.7909 1 19V21"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M23 21V19C22.9986 17.1771 21.765 15.5857 20 15.13"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16 3.13C17.7699 3.58317 19.0078 5.178 19.0078 7.005C19.0078 8.832 17.7699 10.4268 16 10.88"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className="font-montserrat font-bold text-xl text-center mb-3">
                  Competenza
                </h3>
                <p className="text-center">
                  Il nostro team è formato da appassionati di fitness con anni
                  di esperienza nel settore dell'integrazione sportiva.
                  Partecipiamo regolarmente a corsi di aggiornamento per
                  offrirti sempre le soluzioni più adatte alle tue esigenze
                  specifiche.
                </p>
              </div>

              <div className="bg-[#F5F5F5] p-8 rounded-lg shadow-md">
                <div className="text-[#FFD100] mb-4 flex justify-center">
                  <svg
                    className="w-12 h-12"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className="font-montserrat font-bold text-xl text-center mb-3">
                  Eccellenza
                </h3>
                <p className="text-center">
                  Puntiamo all'eccellenza in ogni aspetto del nostro servizio,
                  dalla consulenza personalizzata al rapporto qualità-prezzo. La
                  soddisfazione dei nostri clienti e i risultati che ottengono
                  grazie ai nostri prodotti sono la nostra migliore ricompensa.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
