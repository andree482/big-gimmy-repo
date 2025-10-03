import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

// Ultimi 6 prodotti del batch 1 (prodotti 15-20)
const products = [
  {
    name: "Glucosamina + Condroitina + MSM + Vitamina C",
    slug: "glucosamina-condroitina-msm-vitamina-c",
    brandId: 22,
    categoryId: 7, // Vitamine/Minerali/Antiossidanti
    description: "Integratore alimentare per il benessere articolare con glucosamina, condroitina solfato, MSM e vitamina C per supportare cartilagini e tessuti connettivi.",
    longDescription: `Integratore alimentare per il benessere articolare con glucosamina, condroitina solfato, MSM e vitamina C. La glucosamina è un componente fondamentale della cartilagine articolare. La condroitina solfato è una molecola che fa parte della matrice cartilaginea. L'MSM (metilsulfonilmetano) è una fonte naturale di zolfo organico. La vitamina C contribuisce alla normale formazione del collagene per la normale funzione delle cartilagini e delle ossa. La vitamina C contribuisce inoltre alla protezione delle cellule dallo stress ossidativo.`,
    howToUse: "Assumere 3 capsule al giorno con acqua durante i pasti principali.",
    ingredients: "Glucosamina cloridrato (da crostacei), MSM (metilsulfonilmetano), agente di carica: cellulosa microcristallina; condroitina solfato, agente di rivestimento: idrossipropilmetilcellulosa; acido L-ascorbico (vitamina C), agenti antiagglomeranti: sali di magnesio degli acidi grassi, biossido di silicio.",
    nutritionalInfo: `<table class="nutritional-table">
      <thead><tr><th>Componente</th><th>Per 3 caps</th></tr></thead>
      <tbody>
        <tr><td>Glucosamina cloridrato</td><td>1500 mg</td></tr>
        <tr><td>MSM (metilsulfonilmetano)</td><td>900 mg</td></tr>
        <tr><td>Condroitina solfato</td><td>400 mg</td></tr>
        <tr><td>Vitamina C</td><td>180 mg (225% NRV)</td></tr>
      </tbody>
    </table>`,
    variants: [
      { flavor: null, size: "120 capsule", price: 3490, imageName: "glucosamina-+-condroitina-+-msm-+-vitamina-c.png" }
    ]
  },
  {
    name: "Starter 1000",
    slug: "starter-1000",
    brandId: 22,
    categoryId: 3, // Energetici
    description: "Prodotto specifico per la fase pre-gara o pre-workout per sostenere attività intense e prolungate, per un'ottimale gestione della fatica e della concentrazione.",
    longDescription: `STARTER 1000® è un integratore specifico per la fase pre-gara o pre-workout. Apporta citrullina, arginina, beta-alanina, taurina, beetroot, creatina, caffeina, BCAA e vitamine, ingredienti molto utili per la prestazione sportiva. La caffeina (70mg/dose) contribuisce ad aumentare l'attenzione e la concentrazione. La caffeina microincapsulata (NEWCAFF®) permette inoltre un rilascio graduale per un effetto più modulato e costante. Le vitamine contribuiscono alla riduzione della stanchezza e dell'affaticamento (B12, B6, C), al normale funzionamento del sistema nervoso (B1, B12, C), permettono il fisiologico metabolismo energetico (B12, B1, B6, C,) e supportano il normale metabolismo delle proteine e del glicogeno (B6). Lo zinco contribuisce alla normale sintesi proteica.`,
    howToUse: "Sciogliere 1 dose (3 misurini=20 g) in 200-250 ml di acqua. Assumere 20-30 minuti circa prima dell'allenamento.",
    ingredients: "Mix di carboidrati (Maltodestrine DE19, Isomaltulosio (Palatinose®), Aminoblast® BCAA (L-leucina, L-isoleucina, L-valina), destrina ciclica altamente ramificata (Cluster Dextrin®)), Beta Alanina, Citrullina Malato, Creatina mix (Creatina monoidrato, Creatina citrato), Arginina alfa-chetoglutarato, Taurina, Barbabietola rossa (beta vulgaris l.) polvere.",
    nutritionalInfo: `<table class="nutritional-table">
      <thead><tr><th>Componente</th><th>100g</th><th>1 dose (20g)</th></tr></thead>
      <tbody>
        <tr><td>Valore energetico</td><td>384 kcal / 1610 kJ</td><td>77 kcal / 403 kJ</td></tr>
        <tr><td>Grassi</td><td>0 g</td><td>0 g</td></tr>
        <tr><td>Carboidrati</td><td>40 g</td><td>8 g</td></tr>
        <tr><td>di cui zuccheri</td><td>2.5 g</td><td>0.5 g</td></tr>
        <tr><td>Proteine</td><td>54 g</td><td>11 g</td></tr>
        <tr><td>Sale</td><td>0.16 g</td><td>0.03 g</td></tr>
        <tr><td>BCAA Mix</td><td>12.5 g</td><td>2.5 g</td></tr>
        <tr><td>Citrullina DL Malato</td><td>10 g</td><td>2 g</td></tr>
        <tr><td>Beta Alanina</td><td>10 g</td><td>2 g</td></tr>
        <tr><td>Creatina Mix</td><td>7.5 g</td><td>1.5 g</td></tr>
        <tr><td>Caffeina totale</td><td>350 mg</td><td>70 mg</td></tr>
      </tbody>
    </table>`,
    variants: [
      { flavor: "Arancia Rossa", size: "400g", price: 4190, imageName: "starter-1000.jpg" }
    ]
  },
  {
    name: "Caffeina Suprema",
    slug: "caffeina-suprema",
    brandId: 22,
    categoryId: 7, // Vitamine/Minerali/Antiossidanti
    description: "Integratore alimentare a base di caffeina con estratto di galanga, taurina e vitamine. Caffeina 200mg/dose.",
    longDescription: `Caffeina Suprema® è un integratore alimentare dalla formula innovativa che unisce caffeina in forma libera e caffeina microincapsulata (NEWCAFF™ microcapsules) per ottenere un'ottimale distribuzione del suo effetto. La caffeina (200 mg/dose die) contribuisce ad aumentare la lucidità mentale e aiuta a migliorare la concentrazione. La formula contiene inoltre taurina, teanina, vitamine ed estratto di Galanga. EnXtra® (estratto concentrato di Alpinia Galanga), insieme alla Teanina, genera un'azione fortemente sinergica con la caffeina. Gli studi attribuiscono a questa associazione un'azione benefica su concentrazione e lucidità mentale, con un effetto costante e prolungato.`,
    howToUse: "Assumere 1 cps al giorno, preferibilmente al mattino o poco prima di un'attività intensa.",
    ingredients: "Caffeina, galanga (alpinia galanga (l.) Willd.) Estratto secco di rizoma (EnXtra®), agente di carica: ipromellosa; acido l-ascorbico (vitamina c), taurina, maltodestrina, teanina da estratto di tè verde, caffeina microincapsulata (microcapsule NEWCAFF™).",
    nutritionalInfo: `<table class="nutritional-table">
      <thead><tr><th>Componente</th><th>Per 1 cps</th><th>%NRV</th></tr></thead>
      <tbody>
        <tr><td>Caffeina</td><td>150 mg</td><td>-</td></tr>
        <tr><td>Caffeina microincapsulata</td><td>66.64 mg</td><td>-</td></tr>
        <tr><td>di cui caffeina</td><td>50 mg</td><td>-</td></tr>
        <tr><td>Galanga estratto secco</td><td>150 mg</td><td>-</td></tr>
        <tr><td>Taurina</td><td>100 mg</td><td>-</td></tr>
        <tr><td>Teanina da estratto di tè verde</td><td>70 mg</td><td>-</td></tr>
        <tr><td>Vitamina C</td><td>100 mg</td><td>125%</td></tr>
        <tr><td>Tiamina (vitamina B1)</td><td>1,1 mg</td><td>100%</td></tr>
        <tr><td>Riboflavina (vitamina B2)</td><td>1,4 mg</td><td>100%</td></tr>
        <tr><td>Niacina</td><td>32 mg</td><td>200%</td></tr>
      </tbody>
    </table>`,
    variants: [
      { flavor: null, size: "30 capsule", price: 1890, imageName: "caffeina-suprema.png" }
    ]
  },
  {
    name: "Super Dextrin Gel Pro",
    slug: "super-dextrin-gel-pro",
    brandId: 22,
    categoryId: 3, // Energetici
    description: "Gel energetico con carboidrati a rapporto 1:0.8 (glucosio:fruttosio) per la massima efficienza energetica durante l'attività.",
    longDescription: `Super Dextrin® Gel Pro è un gel energetico di nuova generazione con carboidrati in rapporto 1:0.8 (glu:fru), per massimizzare il flusso energetico. Il prodotto ha un efficace svuotamento gastrico, favorisce un elevato ingresso di carboidrati nell'organismo e permette un'ottimale distribuzione delle scorte energetiche. La speciale formula sfrutta la sinergia tra HBCD (Destrine Cicliche Altamente Ramificate = Cluster Dextrin® e SusCarb®), Maltodestrine DE6 e DE18, Palatinose™ e Fruttosio. Super Dextrin® Gel Pro è senza caffeina e non contiene glutine.`,
    howToUse: "Durante l'attività: 1 pack ogni 1-1.5 ore, insieme a 100-150 ml di acqua.",
    ingredients: "Acqua, Isomaltulosio° (Palatinose®), Fruttosio, Maltodestrine DE18, Destrina ciclica altamente ramificata (Cluster Dextrin®), Maltodestrine DE6, SusCarb® Dextrine, Succo concentrato di Limone, Acidificante: Acido Citrico; Alginato di sodio, Conservante: Sorbato di potassio; Aroma naturale (limone-lime).°L'isomaltulosio è una fonte di glucosio e di fruttosio.",
    nutritionalInfo: `<table class="nutritional-table">
      <thead><tr><th>Componente</th><th>100 ml</th><th>Per pack (60 ml)</th></tr></thead>
      <tbody>
        <tr><td>Valore energetico</td><td>318 kcal / 1328 kJ</td><td>190 kcal / 795 kJ</td></tr>
        <tr><td>Grassi</td><td>0.2 g</td><td>0.1 g</td></tr>
        <tr><td>di cui saturi</td><td>0 g</td><td>0 g</td></tr>
        <tr><td>Carboidrati</td><td>77 g</td><td>46 g</td></tr>
        <tr><td>di cui zuccheri</td><td>45 g</td><td>27 g</td></tr>
        <tr><td>Proteine</td><td>0.4 g</td><td>0.2 g</td></tr>
        <tr><td>Sale</td><td>0 g</td><td>0 g</td></tr>
      </tbody>
    </table>`,
    variants: [
      { flavor: "Arancia", size: "60 ml - 15 pz", price: 4500, imageName: "super-dextrin-gel-pro.png" },
      { flavor: "Limone", size: "60 ml - 15 pz", price: 4500, imageName: "super-dextrin-gel-pro.png" }
    ]
  },
  {
    name: "Repoxan",
    slug: "repoxan",
    brandId: 22,
    categoryId: 7, // Vitamine/Minerali/Antiossidanti
    description: "Integratore alimentare di melatonina per prendere sonno rapidamente e dormire meglio, con 6 azioni combinate.",
    longDescription: `REPOXAN è un integratore alimentare con una formula avanzata che combina ingredienti naturali per promuovere un sonno tranquillo e migliorare il benessere mentale. Il prodotto è formulato con melatonina, magnesio, lavanda, passiflora, griffonia, camomilla, escolzia e vitamina B6 per offrire numerosi benefici a chi non ha un buon rapporto con il sonno. REPOXAN, grazie all'azione combinata dei suoi ingredienti, è studiato per aiutare a ridurre il tempo necessario per addormentarsi, per aiutare a diminuire la stanchezza e l'affaticamento anche al risveglio e per supportare una qualità del sonno ottimale.`,
    howToUse: "Si consiglia l'assunzione di REPOXAN circa 20-30 min prima di coricarsi, per ottenere i massimi benefici. Sciogliere in bocca. L'effetto benefico si ottiene con l'assunzione di 1mg di melatonina. Da assumere in previsione di un periodo di sonno di almeno 6 ore.",
    ingredients: "FIZZcarrier® [edulcoloranti: mannitolo, sorbitolo, xilitolo, sucralosio; bicarbonato di potassio, acidificanti: acido malico, acido tartarico] 65%; Agente di carica: cellulosa microcristallina; Ossido di magnesio; Lavanda (Lavandula angustifolia Mill.) fiore e.s. tit. 0,5% o.e; Passiflora (Passiflora incarnata L.) parte aerea con fiori e.s. tit. 1% flavonoidi; Griffonia (Griffonia simplicifolia (DC.) Baill.) seme e.s. tit. 25% 5-HTP; Camomilla (Matricaria chamomilla L.) fiore e.s. tit. 0,75% apigenina; Escolzia (Eschscholzia californica Cham.) parte aerea e.s. tit. 1% protopina; Melatonina; Vitamina B6 (cloridrato di piridossina).",
    nutritionalInfo: `<table class="nutritional-table">
      <thead><tr><th>Componente</th><th>Per 1 cpr</th><th>%NRV</th></tr></thead>
      <tbody>
        <tr><td>Melatonina</td><td>1 mg</td><td>-</td></tr>
        <tr><td>Lavanda e.s.</td><td>30 mg</td><td>-</td></tr>
        <tr><td>di cui o.e.</td><td>0,15 mg</td><td>-</td></tr>
        <tr><td>Passiflora e.s.</td><td>30 mg</td><td>-</td></tr>
        <tr><td>di cui flavonoidi</td><td>0.3 mg</td><td>-</td></tr>
        <tr><td>Griffonia e.s.</td><td>30 mg</td><td>-</td></tr>
        <tr><td>di cui 5-HTP</td><td>7.5 mg</td><td>-</td></tr>
        <tr><td>Camomilla e.s.</td><td>30 mg</td><td>-</td></tr>
        <tr><td>di cui apigenina</td><td>0.225 mg</td><td>-</td></tr>
        <tr><td>Escolzia e.s.</td><td>25 mg</td><td>-</td></tr>
        <tr><td>di cui protopina</td><td>0.25 mg</td><td>-</td></tr>
        <tr><td>Magnesio</td><td>60 mg</td><td>16%</td></tr>
        <tr><td>Vitamina B6</td><td>0.7 mg</td><td>50%</td></tr>
      </tbody>
    </table>`,
    variants: [
      { flavor: null, size: "30 compresse", price: 1650, imageName: "repoxan.jpg" }
    ]
  },
  {
    name: "Creatina Vector",
    slug: "creatina-vector",
    brandId: 22,
    categoryId: 7, // Vitamine/Minerali/Antiossidanti
    description: "Integratore alimentare di creatina e vitamina C per la dieta dello sportivo, con sistema vettore.",
    longDescription: `La creatina viene trasformata dall'organismo in creatina fosfato, che è a sua volta utilizzata per convertire molto rapidamente ADP in ATP, ovvero fa da carrier per la "moneta con cui paghiamo l'energia". È noto che una opportuna scorta di creatina determina un miglioramento dell'intensità dell'allenamento e del recupero, in sport con componenti anaerobiche. La risposta e l'efficienza muscolare risultano pesantemente influenzate dalla presenza di creatina.`,
    howToUse: "Si consiglia di assumere 1 busta al giorno sciolta in circa 200 ml di acqua, preferibilmente lontano dai pasti. Per la dieta dello sportivo, durante le fasi di carico, si possono assumere fino a 2 buste al giorno (pari a 6g di creatina) per non oltre 30gg, successivamente 1 busta al giorno. Durante il periodo di integrazione con creatina è opportuno assumere molta acqua.",
    ingredients: "Creatina monoidrato, Fosfato dipotassico, Acidificante: acido citrico; Carbonato di calcio, Saccarosio 3,5%, Acido L-ascorbico (vitamina C), Agente antiagglomerante: biossido di silicio; L-arginina alfa-chetoglutarato, Destrosio 2,0%, Acido L-glutammico, Taurina, Aroma, Glicina, L-arginina, Gluconato di Zinco, L-glutammina, Edulcorante: sucralosio; Acido Alfa lipoico.",
    nutritionalInfo: `<table class="nutritional-table">
      <thead><tr><th>Componente</th><th>Per dose (1 bst)</th><th>%NRV</th></tr></thead>
      <tbody>
        <tr><td>Creatina</td><td>3000 mg</td><td>-</td></tr>
        <tr><td>L-Arginina alfa-chetoglutarato (AAKG)</td><td>169 mg</td><td>-</td></tr>
        <tr><td>di cui L-Arginina</td><td>11 mg</td><td>-</td></tr>
        <tr><td>L-Arginina</td><td>89 mg</td><td>-</td></tr>
        <tr><td>Acido L-glutammico</td><td>150 mg</td><td>-</td></tr>
        <tr><td>Taurina</td><td>150 mg</td><td>-</td></tr>
        <tr><td>Glicina</td><td>100 mg</td><td>-</td></tr>
        <tr><td>L-Glutammina</td><td>50 mg</td><td>-</td></tr>
        <tr><td>Acido lipoico</td><td>10 mg</td><td>-</td></tr>
        <tr><td>Vitamina C</td><td>200 mg</td><td>250%</td></tr>
        <tr><td>Potassio</td><td>644 mg</td><td>32%</td></tr>
        <tr><td>Calcio</td><td>120 mg</td><td>15%</td></tr>
        <tr><td>Fosforo</td><td>255 mg</td><td>36%</td></tr>
        <tr><td>Zinco</td><td>6,3 mg</td><td>63%</td></tr>
      </tbody>
    </table>`,
    variants: [
      { flavor: null, size: "20 buste", price: 2650, imageName: "creatina-vector.jpg" }
    ]
  }
];

async function insertFinalProducts() {
  console.log('🚀 Inizio inserimento degli ultimi 6 prodotti del batch 1...');
  
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
  
  console.log('\n🎉 Inserimento di tutti i 20 prodotti EthicSport completato!');
}

// Esegui lo script
insertFinalProducts().catch(console.error);