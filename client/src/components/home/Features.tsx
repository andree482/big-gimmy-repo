import { Medal, Dumbbell, Store } from "lucide-react";

const features = [
  {
    icon: <Medal className="h-12 w-12" />,
    title: "Qualità Premium",
    description:
      "Selezioniamo solo i migliori prodotti e marchi più affidabili per garantirti risultati eccellenti.",
  },
  {
    icon: <Dumbbell className="h-12 w-12" />,
    title: "Esperti del Settore",
    description:
      "Il nostro staff è formato da appassionati di fitness pronti a consigliarti il prodotto giusto per te.",
  },
  {
    icon: <Store className="h-12 w-12" />,
    title: "Due Sedi",
    description:
      "Ci trovi a Torino e ora anche in Valle d'Aosta, per essere sempre più vicini ai nostri clienti.",
  },
];

const Features = () => {
  return (
    <section className="py-16 bg-[#FFF9E0]">
      <div className="container mx-auto px-4">
        <div className="rounded-lg p-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-montserrat font-bold mb-4">
              Benvenuti da <span className="text-[#FFD100]">Big Gimmy Integratori</span>
            </h2>
            <p className="max-w-2xl mx-auto">
              Il tuo negozio di fiducia per integratori, accessori e tutto ciò di cui hai bisogno per raggiungere i tuoi obiettivi fitness.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md text-center">
                <div className="text-[#FFD100] mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="font-montserrat font-bold text-xl mb-2">{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
