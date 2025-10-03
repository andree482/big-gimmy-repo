import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

// Product data from batch 1
const products = [
  {
    name: "VPR-VEGETAL PROTEIN INTEGRATORE ALIMENTARE DI PROTEINE VEGETALI",
    slug: "vpr-vegetal-protein-integratore-alimentare-di-proteine-vegetali",
    brandId: 22,
    categoryId: 1, // Proteine
    description: "Proteina vegetale completa da pisello, riso e zucca. Senza soia, con vitamina B12, ad alta digeribilità. Adatta ai vegani.",
    longDescription: `VPR VEGETAL PROTEIN è una proteina vegetale completa e ben tollerata, ottenuta da pisello, riso e zucca: tre fonti complementari per un profilo amminoacidico bilanciato.
Senza soia, naturalmente senza glutine né lattosio, è arricchita con Vitamina B12 e MCT da cocco, per una migliore digeribilità e un profilo nutrizionale adatto anche a chi segue una dieta vegana.
Il gusto cacao naturale, senza retrogusti vegetali, e l'ottima solubilità la rendono pratica e piacevole da assumere anche solo con acqua.`,
    howToUse: "Assumere 1 porzione (30g = 2 misurini) in 200–250 ml d'acqua o altra bevanda vegetale. Ideale dopo l'allenamento, a colazione o come spuntino proteico.",
    ingredients: "Proteine isolate di pisello, cacao 10%, proteine di semi di zucca, proteine di riso, olio MCT (70%) in polvere da olio di cocco microincapsulato con gomma arabica, aromi, edulcoranti: sucralosio e glicosidi steviolici da Stevia, addensanti: gomma di xantano e gomma arabica, sale, aromi, metilcobalamina (vitamina B12).",
    nutritionalInfo: `<table class="nutritional-table">
      <thead><tr><th>Componente</th><th>30g</th><th>100g</th></tr></thead>
      <tbody>
        <tr><td>Valore energetico</td><td>115 Kcal (480 kJ)</td><td>383 Kcal (1600 kJ)</td></tr>
        <tr><td>Grassi</td><td>2.4 g</td><td>7.9 g</td></tr>
        <tr><td>di cui acidi grassi saturi</td><td>0.9 g</td><td>3.0 g</td></tr>
        <tr><td>Carboidrati</td><td>0.7 g</td><td>2.3 g</td></tr>
        <tr><td>di cui zuccheri</td><td>0 g</td><td>0 g</td></tr>
        <tr><td>Fibra alimentare</td><td>2.4 g</td><td>7.9 g</td></tr>
        <tr><td>Proteine</td><td>21 g</td><td>71 g</td></tr>
        <tr><td>Sale</td><td>0.77 g</td><td>2.6 g</td></tr>
        <tr><td>Vitamina B12</td><td>2.5 μg (100% NRV)</td><td>8.33 μg</td></tr>
      </tbody>
    </table>`,
    variants: [
      { flavor: "Cacao", size: "500g", price: 1990, imageName: "vpr-vegetal-protein-integratore-alimentare-di-proteine-vegetali.png" }
    ]
  },
  {
    name: "MAGNESIUM GLYCINATE",
    slug: "magnesium-glycinate",
    brandId: 22,
    categoryId: 7, // Vitamine/Minerali/Antiossidanti
    description: "Magnesio in forma organica con eccellente tollerabilità, adatta anche per assunzioni prolungate",
    longDescription: `MAGNESIUM GLYCINATE® è un integratore alimentare in capsule vegetali a base di magnesio bisglicinato, una forma organica ottenuta attraverso l'unione del magnesio con l'amminoacido glicina.
Questa forma è particolarmente stabile e ben tollerata, nota per la buona assimilazione a livello intestinale e indicata anche per utilizzi prolungati. Il magnesio svolge numerose funzioni fondamentali per l'organismo: contribuisce alla riduzione della stanchezza e dell'affaticamento¹, al normale metabolismo energetico² e al normale funzionamento del sistema nervoso³. Partecipa alla normale funzione muscolare⁵, psicologica⁴, al mantenimento di ossa⁶ e denti⁷ normali, oltre a supportare l'equilibrio elettrolitico⁸.
Il prodotto è senza glutine e zuccheri aggiunti, adatto anche a diete vegane e doping free tested*.`,
    howToUse: "Assumere 1 dose (3 capsule) al giorno, preferibilmente lontano dai pasti principali.",
    ingredients: "Bisglicinato di magnesio (magnesio), inulina, agente di carica: idrossipropilmetilcellulosa; Agente antiagglomerante: sali di magnesio degli acidi grassi",
    nutritionalInfo: `<table class="nutritional-table">
      <thead><tr><th>Componente</th><th>3 caps</th></tr></thead>
      <tbody>
        <tr><td>MAGNESIO</td><td>400 mg (120% NRV)</td></tr>
      </tbody>
    </table>`,
    variants: [
      { flavor: null, size: "90 capsule", price: 2190, imageName: "magnesium-glycinate.png" }
    ]
  },
  {
    name: "Thermo Master",
    slug: "thermo-master",
    brandId: 22,
    categoryId: 7, // Vitamine/Minerali/Antiossidanti
    description: "ThermoMaster® combina 10 attivi sinergici per supportare il metabolismo. Favorisce il controllo del peso durante regimi ipocalorici.",
    longDescription: `Integratore alimentare che può risultare un utile complemento nell'ambito di diete ipocaloriche rivolte al controllo e alla riduzione del peso². Il tè verde favorisce l'equilibrio del peso corporeo² e il drenaggio dei liquidi⁴, mentre il ginseng supporta il metabolismo dei carboidrati³ e aiuta a contrastare la stanchezza fisica e mentale5. Il cromo contribuisce al mantenimento di normali livelli di glucosio nel sangue e il green coffee offre un sostegno al metabolismo¹. Il prodotto contiene un elevato tenore di caffeina (200 mg/dose).`,
    howToUse: "Assumere 3 capsule al giorno, preferibilmente al mattino o circa 2 ore prima dell'attività fisica",
    ingredients: "L-Tirosina, agente di carica: idrossipropilmetilcellulosa; L-Carnitina tartrato, estratto di chicchi di caffè verde (coffea Arabica L.) - 50% acido clorogenico e 5% caffeina, estratto di foglie di tè verde (camellia sinensis (L.) Kuntze) - 50% polifenoli, estratto di radice di zenzero (zingiber officinale rosc.) - 5% gingeroli, Caffeina anidra, estratto di semi di mango africano (irvingia gabonensis L.) Der 10:1, estratto di radice di ginseng (panax ginseng ca mey.) - 20% ginsenosidi, agente antiagglomerante: biossido di silicio; Estratto di frutto di pepe nero (piper nigrum L.) - 95% piperina, picolinato di cromo (cromo).",
    nutritionalInfo: `<table class="nutritional-table">
      <thead><tr><th>Componente</th><th>Per dose</th></tr></thead>
      <tbody>
        <tr><td>L-tirosina</td><td>600 mg</td></tr>
        <tr><td>L-carnitina tartrato</td><td>400 mg</td></tr>
        <tr><td>- Di cui l-carnitina</td><td>272 mg</td></tr>
        <tr><td>Estratto di caffè verde</td><td>300 mg</td></tr>
        <tr><td>Tè verde estratto secco</td><td>250 mg</td></tr>
        <tr><td>Estratto di radice di zenzero</td><td>150 mg</td></tr>
        <tr><td>Caffeina anidra</td><td>100 mg</td></tr>
        <tr><td>Estratto di semi di mango africano</td><td>100 mg</td></tr>
        <tr><td>Estratto di radice di panax ginseng</td><td>100 mg</td></tr>
        <tr><td>Estratto di frutto di pepe nero</td><td>5 mg</td></tr>
        <tr><td>Cromo</td><td>40 μg (100% NRV)</td></tr>
      </tbody>
    </table>`,
    variants: [
      { flavor: null, size: "90 capsule", price: 3250, imageName: "thermo-master.png" }
    ]
  },
  {
    name: "GLUCOSAMINA + CONDROITINA + MSM + VITAMINA C",
    slug: "glucosamina-+-condroitina-+-msm-+-vitamina-c",
    brandId: 22,
    categoryId: 7, // Vitamine/Minerali/Antiossidanti
    description: "Formula per il benessere delle articolazioni, con componenti strutturali e vitamina C, utile per la normale funzione di ossa e cartilagini.",
    longDescription: `L'integratore apporta glucosamina, condroitina, MSM e vitamina C in una formula pratica e ben dosabile, pensata per affiancare protocolli specifici anche in modo ciclico. È senza glutine e adatto a regimi alimentari controllati. Ogni lotto è sottoposto a rigorosi controlli qualitativi, inclusi test per l'assenza di sostanze proibite.
Una scelta particolarmente indicata per chi ha superato i 40 anni o per chi chiede molto alle proprie articolazioni, tra sport, lavoro e movimento quotidiano.`,
    howToUse: "Assumere 1 compressa al giorno",
    ingredients: "Glucosamina solfato 2KCl, Metilsulfonilmetano (MSM), Agente di carica: Cellulosa microcristallina; Condroitina solfato, Acido L-ascorbico (Vitamina C), Amido, Agenti antiagglomeranti: Sali di magnesio degli acidi grassi, Biossido di silicio.",
    nutritionalInfo: `<table class="nutritional-table">
      <thead><tr><th>Componente</th><th>Per dose (1 tabl)</th></tr></thead>
      <tbody>
        <tr><td>Glucosamina solfato 2KCL</td><td>500 mg</td></tr>
        <tr><td>di cui Glucosamina</td><td>295 mg</td></tr>
        <tr><td>MSM (Metilsulfonilmetano)</td><td>300 mg</td></tr>
        <tr><td>Condroitina solfato</td><td>180 mg</td></tr>
        <tr><td>Vitamina C</td><td>80 mg (100% VNR)</td></tr>
      </tbody>
    </table>`,
    variants: [
      { flavor: null, size: "60 compresse", price: 2290, imageName: "glucosamina-+-condroitina-+-msm-+-vitamina-c.png" }
    ]
  },
  {
    name: "MALTOSHOT ENDURANCE PLUS",
    slug: "maltoshot-endurance-plus",
    brandId: 22,
    categoryId: 3, // Energetici
    description: "Gel energetico evoluto con 5 carboidrati, beta-alanina, sodio e magnesio. Energia duratura, zero caffeina, alta tollerabilità, ottimale digeribilità.",
    longDescription: `MaltoShot® Endurance PLUS è un gel energetico evoluto, progettato per fornire energia duratura anche durante le prestazioni più intense. Contiene 35 g di carboidrati per dose, in rapporto 1:0.8 (glucosio:fruttosio), distribuiti tra 5 fonti a diverso indice glicemico, inclusa la ciclodestrina SusCarb®, una destrina ramificata ad alto peso molecolare. La presenza di sodio (155 mg) e beta-alanina (305 mg) arricchisce la formula, offrendo un profilo avanzato per affrontare situazioni di ad alto impegno. La consistenza è fluida, con ottima digeribilità e piacevole freschezza al gusto. È una formula di nuova generazione, ben tollerata anche in condizioni estreme. Senza caffeina.`,
    howToUse: "Assumere durante l'attività fisica, anche in condizioni di sforzo prolungato. 1 pack ogni 50–70 minuti, accompagnato da un sorso d'acqua. Dose max 4 pack al giorno. Testare il prodotto prima in allenamento per identificare il corretto timing e la quantità ideale per il proprio metabolismo. Per sforzi superiori ai 90 minuti, può essere utile alternarlo a fonti solide o elettrolitiche (es. Super Dextrin Bar o SuperHydro).",
    ingredients: "Acqua, maltodestrina DE19, Fruttosio, Destrosio, Maltodestrina DE6, SusCarb® (ciclodestrine ramificate), Cloruro di Magnesio, Magnesio citrato, Cloruro di sodio, Beta-Alanina, acidificante: Acido Citrico, Aroma, conservante: Sorbato di Potassio.",
    nutritionalInfo: `<table class="nutritional-table">
      <thead><tr><th>Componente</th><th>100 ml</th><th>1 pack (50ml)</th></tr></thead>
      <tbody>
        <tr><td>Energia</td><td>1212 kJ / 286 kcal</td><td>606 kJ / 143 kcal</td></tr>
        <tr><td>Grassi</td><td>0.1 g</td><td>0.05 g</td></tr>
        <tr><td>Carboidrati</td><td>70 g</td><td>35 g</td></tr>
        <tr><td>di cui zuccheri</td><td>36 g</td><td>18 g</td></tr>
        <tr><td>Proteine</td><td>0.9 g</td><td>0.5 g</td></tr>
        <tr><td>Sale</td><td>0.78 g</td><td>0.39 g</td></tr>
        <tr><td>Magnesio</td><td>210 mg (56% NRV)</td><td>105 mg (28% NRV)</td></tr>
        <tr><td>Sodio</td><td>310 mg</td><td>155 mg</td></tr>
        <tr><td>Beta-Alanina</td><td>610 mg</td><td>305 mg</td></tr>
      </tbody>
    </table>`,
    variants: [
      { flavor: "Mojito - Mint", size: "15 pz da 50 ml", price: 4090, imageName: "maltoshot-endurance-plus.png" },
      { flavor: "Orange - Lemon", size: "15 pz da 50 ml", price: 4090, imageName: "maltoshot-endurance-plus.png" }
    ]
  }
];

async function insertProducts() {
  console.log('🚀 Inizio inserimento dei primi 5 prodotti del batch 1...');
  
  for (const productData of products) {
    try {
      console.log(`\n📦 Inserimento prodotto: ${productData.name}`);
      
      // Inserisci prodotto principale
      const productResult = await sql`
        INSERT INTO products (
          slug, name, brand_id, category_id, description, long_description, 
          how_to_use, warnings, flavor, size, quantity
        ) VALUES (
          ${productData.slug}, ${productData.name}, ${productData.brandId}, 
          ${productData.categoryId}, ${productData.description}, ${productData.longDescription},
          ${productData.howToUse}, ${productData.ingredients}, 
          ${productData.variants[0].flavor}, ${productData.variants[0].size}, null
        ) RETURNING id
      `;
      
      const productId = productResult[0].id;
      console.log(`  ✅ Prodotto inserito con ID: ${productId}`);
      
      // Inserisci immagine principale
      await sql`
        INSERT INTO product_images (product_id, src, alt, is_primary)
        VALUES (${productId}, ${'/images/' + productData.variants[0].imageName}, ${productData.name}, true)
      `;
      console.log(`  🖼️ Immagine principale inserita: ${productData.variants[0].imageName}`);
      
      // Inserisci varianti di prezzo/formato
      for (const variant of productData.variants) {
        await sql`
          INSERT INTO product_sizes (product_id, value, unit, price)
          VALUES (${productId}, ${variant.size}, 'formato', ${variant.price})
        `;
        console.log(`  💰 Variante inserita: ${variant.size} - €${(variant.price/100).toFixed(2)}`);
      }
      
      // Inserisci informazioni nutrizionali come feature
      if (productData.nutritionalInfo) {
        await sql`
          UPDATE products 
          SET features = ${JSON.stringify([productData.nutritionalInfo])}
          WHERE id = ${productId}
        `;
        console.log(`  📊 Informazioni nutrizionali inserite`);
      }
      
    } catch (error) {
      console.error(`❌ Errore inserimento prodotto ${productData.name}:`, error);
    }
  }
  
  console.log('\n🎉 Inserimento dei primi 5 prodotti completato!');
}

// Esegui lo script
insertProducts().catch(console.error);