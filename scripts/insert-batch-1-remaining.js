import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

// Rimanenti 15 prodotti del batch 1 (prodotti 6-20)
const products = [
  {
    name: "Super Dextrin Energy Bar",
    slug: "super-dextrin",
    brandId: 22,
    categoryId: 3, // Energetici
    description: "Alimento studiato per chi pratica attività intense. Fornisce energia in modo rapido e duraturo, con gusto gradevole e ottima digeribilità. Facile da masticare anche durante l'attività. Gluten free.",
    longDescription: `SUPER DEXTRIN BAR è una barretta energetica a base di carboidrati, ideale prima e durante l'attività fisica.
La formula contiene SusCarb® (ciclodestrine ramificate), carboidrato ad alto peso molecolare noto per l'elevata solubilità e la cinetica di assorbimento modulata. Fornisce energia rapidamente, con un rilascio graduale utile per affrontare attività prolungate. Le barrette sono morbide e gradevoli al palato, con ottimo gusto e digeribilità, anche in condizioni impegnative.`,
    howToUse: "Assumere 1 barretta circa 60–90 minuti prima dell'attività, accompagnata da acqua. Per sforzi di lunga durata: 1 barretta ogni 1,5–2 ore, sempre con liquidi.",
    ingredients: "Pasta di datteri (datteri), granella di arachidi pralinate (arachidi, zucchero), crisp di riso (farina di riso, zucchero, olio di semi di girasole, sale), fiocchi di avena senza glutine, arachidi, ciclodestrina Suscarb®, creme caramel (zucchero, sciroppo di glucosio, acqua, panna fresca di Isigny D.O.P., latte intero in polvere, burro salato di Isigny D.O.P., fibre alimentari, sale di Guérande IGP, aroma naturale di vaniglia) (2%), maltodestrina, zucchero, sale (0,7%), aroma naturale, cacao in polvere, sodio ascorbato. Il prodotto può contenere tracce di: sesamo, soia, latte e altra frutta a guscio.",
    nutritionalInfo: `<table class="nutritional-table">
      <thead><tr><th>Componente</th><th>100g</th><th>Per bar (45g)</th></tr></thead>
      <tbody>
        <tr><td>Valore energetico</td><td>1663 kJ / 394 kcal</td><td>748 kJ / 177 kcal</td></tr>
        <tr><td>Grassi</td><td>8.3 g</td><td>3.7 g</td></tr>
        <tr><td>di cui saturi</td><td>1.6 g</td><td>0.7 g</td></tr>
        <tr><td>Carboidrati</td><td>70 g</td><td>32 g</td></tr>
        <tr><td>di cui zuccheri</td><td>47 g</td><td>21 g</td></tr>
        <tr><td>Fibre</td><td>7.3 g</td><td>3.3 g</td></tr>
        <tr><td>Proteine</td><td>6.3 g</td><td>2.8 g</td></tr>
        <tr><td>Sale</td><td>1.8 g</td><td>0.81 g</td></tr>
      </tbody>
    </table>`,
    variants: [
      { flavor: "Sweet", size: "45g - 25 pz", price: 7290, imageName: "super-dextrin-sweet.jpg" },
      { flavor: "Tasty", size: "45g - 25 pz", price: 7290, imageName: "super-dextrin-tasty.jpg" }
    ]
  },
  {
    name: "Testogen",
    slug: "testogen",
    brandId: 22,
    categoryId: 7, // Vitamine/Minerali/Antiossidanti
    description: "CONTRIBUISCE AL MANTENIMENTO DI NORMALI LIVELLI DI TESTOSTERONE NEL SANGUE GRAZIE ALLA PRESENZA DI ZINCO.",
    longDescription: `Testogen® è un integratore alimentare di policosanoli, zinco, vitamina C e magnesio, con Tribulus terrestris (tit 60%) e polifenoli concentrati di origine naturale. La presenza di Tribulus terrestris svolge una funzione tonica e può essere utile nei casi di stanchezza fisica e mentale. Lo zinco e la vitamina C contribuiscono alla protezione delle cellule dallo stress ossidativo, mentre il magnesio e la vitamina B6 aiutano a contrastare stanchezza e affaticamento. Lo zinco inoltre contribuisce al mantenimento di normali livelli di testosterone nel sangue. Il prodotto non contiene glutine (Gluten Free) è pertanto indicato anche per soggetti celiaci o con intolleranza al glutine.`,
    howToUse: "4 capsule al giorno. Una confezione è sufficiente per un ciclo di 1 mese, ripetibile più volte durante l'anno.",
    ingredients: "Tribulus terrestris (Tribulus terrestris L.) frutto e.s. tit. 60% saponine; Agenti di carica: cellulosa microcrocristallina, fosfato dicalcico; Ossido di magnesio; Agenti di rivestimento: idrossi-propil-metilcellulosa, talco; Vinitrox™ [polifenoli da Vite (Vitis vinifera L.) frutto e.s.; Mela (Malus pumila Mill.) falso frutto (pomo) e.s.]; Vitamina C (acido L-ascorbico); Stabilizzanti: mono e digliceridi degli acidi grassi, idrossi-propil-metilcellulosa, polietilenglicole, glicerolo; Agenti antiagglomeranti: biossido di silicio, sali di magnesio degli acidi grassi; Gluconato di zinco; Coloranti: carbonato di calcio, ossidi e idrossidi di ferro; Policosanoli da riso; Vitamina B6 (cloridrato di piridossina).",
    nutritionalInfo: `<table class="nutritional-table">
      <thead><tr><th>Componente</th><th>Per dose (4 caps)</th></tr></thead>
      <tbody>
        <tr><td>TRIBULUS TERRESTRIS, FRUTTO E.S. TIT. 60% IN SAPONINE</td><td>1000 mg</td></tr>
        <tr><td>VINITROXIM</td><td>70 mg</td></tr>
        <tr><td>DI CUI POLIFENOLI</td><td>66.5 mg</td></tr>
        <tr><td>POLICOSANOLI DA RISO</td><td>7.2 mg</td></tr>
        <tr><td>ZINCO</td><td>8 mg (80% NRV)</td></tr>
        <tr><td>MAGNESIO</td><td>263 mg (70% NRV)</td></tr>
        <tr><td>VITAMINA C</td><td>48 mg (60% NRV)</td></tr>
        <tr><td>VITAMINA B6</td><td>0.84 mg (60% NRV)</td></tr>
      </tbody>
    </table>`,
    variants: [
      { flavor: null, size: "120 capsule", price: 10000, imageName: "testogen.png" }
    ]
  },
  {
    name: "Fluid Motion",
    slug: "fluid-motion",
    brandId: 22,
    categoryId: 7, // Vitamine/Minerali/Antiossidanti
    description: "Apporta nutrienti per la regolare funzione delle cartilagini e per il mantenimento di tessuti connettivi normali.",
    longDescription: `FLUID MOTION® è un integratore alimentare di Glucosamina, Condrotinsolfato, Bromelina, Vitamina C, Rame e Zinco, con Acido ialuronico ed estratto estratto concentrato di curcuma di elevata qualità.
La Vitamina C contribuisce alla protezione delle cellule dallo stress ossidativo (azione antiossidante)4 e contribuisce alla normale formazione del collagene3 per la regolare funzione delle cartilagini1 e delle ossa. La Bromelina - enzima proteolitico- è associata a Glucosamina, Acido Ialuronico e Condroitinsolfato, per offrire una formulazione particolarmente completa.
FLUID MOTION® apporta anche Rame e Zinco, costituenti di coenzimi che svolgono un ruolo attivo nel fisiologico metabolismo delle cartilagini1.
Il Rame in particolare contribuisce al mantenimento di tessuti connettivi2 normali.
ll prodotto FLUID MOTION® non contiene glutine (Gluten free), è pertanto indicato anche per soggetti celiaci o con intolleranza al glutine.`,
    howToUse: "Si consiglia l'assunzione di 2 capsule al giorno.",
    ingredients: "Glucosamina solfato 2KCl (da crostacei) Inulina, Agente di Carica: Idrossipropilmetilcellulosa; Condroitinsolfato, Zinco Gluconato (Zinco), acido l - ascorbico (Vitamina C), Acido Ialuronico (Ialuronato di Sodio), Bromelina 2500 GDU/G, Curcuma (Curcuma Longa L., Rizoma) E.S. TIT. 95% in curcuminoidi; Diglicinato di Rame (Rame), Agenti Antiagglomeranti: Sali di Magnesio degli Acidi Grassi, Biossido di Silicio.",
    nutritionalInfo: `<table class="nutritional-table">
      <thead><tr><th>Componente</th><th>Per dose (2 caps)</th></tr></thead>
      <tbody>
        <tr><td>Glucosamina Solfato 2KCI</td><td>845 mg</td></tr>
        <tr><td>di cui Glucosamina</td><td>500 mg</td></tr>
        <tr><td>Condroitinsolfato</td><td>160 mg</td></tr>
        <tr><td>Zinco</td><td>7,5 mg (75% NRV)</td></tr>
        <tr><td>Vitamina C</td><td>50 mg (63% NRV)</td></tr>
        <tr><td>Acido laluronico</td><td>40 mg</td></tr>
        <tr><td>Bromelina 2500 GDU</td><td>30 mg</td></tr>
        <tr><td>Estratto di Rizoma di Curcuma</td><td>25 mg</td></tr>
        <tr><td>di cui curcuminoidi (95%)</td><td>23.75 mg</td></tr>
        <tr><td>Rame</td><td>0.6 mg (60% NRV)</td></tr>
      </tbody>
    </table>`,
    variants: [
      { flavor: null, size: "60 capsule", price: 2250, imageName: "fluid-motion.png" }
    ]
  },
  {
    name: "Collagene",
    slug: "collagene-ethicsport",
    brandId: 22,
    categoryId: 7, // Vitamine/Minerali/Antiossidanti
    description: "Collagene idrolizzato puro in compresse, facilmente dosabile e indicato per integrare selettivamente questa proteina strutturale presente nella pelle, nei tessuti connettivi e nelle cartilagini.",
    longDescription: `COLLAGENE® è un integratore alimentare in compresse, a base di collagene idrolizzato di origine bovina, sottoposto a un processo specifico di idrolisi enzimatica. Il collagene è una proteina naturalmente presente nell'organismo, in particolare nei tessuti connettivi, dove svolge un ruolo di componente strutturale.
L'integrazione può risultare utile in regimi alimentari controllati o in situazioni in cui l'apporto di specifici componenti proteici risulti quantitativamente o qualitativamente limitato.
La formulazione in compresse consente un dosaggio frazionabile e adatto a utilizzi ciclici o continuativi, secondo necessità individuali. Il prodotto è senza glutine, senza zuccheri aggiunti e doping free tested.`,
    howToUse: "Assumere 1 dose (3 compresse) fino a due volte al giorno, con acqua. Modalità d'uso personalizzabili secondo esigenze specifiche.",
    ingredients: "Idrolizzato di collagene (bovino), agenti antiagglomeranti: diossido di Silicio, sali di magnesio degli acidi grassi.",
    nutritionalInfo: `<table class="nutritional-table">
      <thead><tr><th>Componente</th><th>3 compresse</th></tr></thead>
      <tbody>
        <tr><td>Collagene idrolizzato</td><td>3000 mg</td></tr>
      </tbody>
    </table>`,
    variants: [
      { flavor: null, size: "90 compresse", price: 2290, imageName: "collagene-ethicsport.png" }
    ]
  },
  {
    name: "Collagene Marino",
    slug: "collagene-marino",
    brandId: 22,
    categoryId: 7, // Vitamine/Minerali/Antiossidanti
    description: "Con collagene marino, acido ialuronico e vitamina C, per prendersi cura di pelle e tessuti connettivi ogni giorno. La vitamina C favorisce la normale formazione del collagene e protegge dallo stress ossidativo.",
    longDescription: `Marine Collagen + Hyaluronic Acid + Vitamin C è un integratore alimentare in capsule, formulato con peptidi di collagene marino idrolizzato, acido ialuronico (ialuronato di sodio) e vitamina C, destinato a supportare i fabbisogni nutrizionali dell'organismo.
La vitamina C: contribuisce alla normale formazione del collagene per il corretto funzionamento di pelle, gengive e denti¹²³⁴, contribuisce alla protezione delle cellule dallo stress ossidativo¹. Questa formulazione può risultare utile in tutti i casi in cui si voglia integrare specifici componenti strutturali presenti nei tessuti connettivi, in particolare cutanei e articolari, nell'ambito di uno stile di vita sano.`,
    howToUse: "Assumere 1 dose (4 capsule) al giorno",
    ingredients: "Peptidi di collagene di pesce idrolizzato, agente di carica: idrossipropilmetilcellulosa; acido ialuronico (ialuronato di sodio), acido l-ascorbico (Vitamina C), agente antiagglomerante: sali di magnesio degli acidi grassi.",
    nutritionalInfo: `<table class="nutritional-table">
      <thead><tr><th>Componente</th><th>Per 4 caps</th></tr></thead>
      <tbody>
        <tr><td>PEPTIDI DI COLLAGENE DI PESCE (IDROLIZZATI)</td><td>2200 mg</td></tr>
        <tr><td>VITAMINA C</td><td>80 mg (100% NRV)</td></tr>
        <tr><td>SODIO IALURONATO</td><td>120 mg</td></tr>
      </tbody>
    </table>`,
    variants: [
      { flavor: null, size: "120 capsule", price: 2490, imageName: "collagene-marino.png" }
    ]
  },
  {
    name: "Vitamina C 1000",
    slug: "vitamina-c-1000-ethicsport",
    brandId: 22,
    categoryId: 7, // Vitamine/Minerali/Antiossidanti
    description: "Per il sistema immunitario, la protezione antiossidante e la formazione del collagene.",
    longDescription: `VITAMINA C 1000 è un integratore alimentare in capsule vegetali a base di Vitamina C (acido L-ascorbico), specificamente formulato per supportare le naturali difese dell'organismo e contribuire al benessere quotidiano. La Vitamina C è un micronutriente essenziale che svolge molteplici funzioni fisiologiche ed è particolarmente utile nei periodi di maggiore stress fisico o mentale, cambi di stagione, convalescenza o alimentazione disordinata.`,
    howToUse: "Assumere 1 capsula al giorno, preferibilmente al pasto principale.",
    ingredients: "Acido L-ascorbico (Vitamina C), agente di carica: idrossipropilmetilcellulosa; agenti antiagglomeranti: sali di magnesio degli acidi grassi, biossido di silicio.",
    nutritionalInfo: `<table class="nutritional-table">
      <thead><tr><th>Componente</th><th>1 cap</th></tr></thead>
      <tbody>
        <tr><td>VITAMINA C</td><td>1000 mg (1250% NRV)</td></tr>
      </tbody>
    </table>`,
    variants: [
      { flavor: null, size: "120 capsule", price: 1890, imageName: "vitamina-c-1000.png" }
    ]
  },
  {
    name: "Vitamina D3 2000 IU",
    slug: "vitamina-d3-2000-iu",
    brandId: 22,
    categoryId: 7, // Vitamine/Minerali/Antiossidanti
    description: "Per il mantenimento di ossa forti, una normale funzione muscolare e buone difese immunitarie.",
    longDescription: `La Vitamina D3 è un nutriente essenziale che contribuisce al normale assorbimento/utilizzo del calcio e del fosforo, al mantenimento di normali livelli di calcio nel sangue, al mantenimento di ossa normali, alla normale funzione del sistema immunitario e dei muscoli. Questo integratore fornisce 2000 UI (50 μg) di vitamina D3 per softgel, un dosaggio ottimale per il mantenimento di livelli adeguati nell'organismo.`,
    howToUse: "Assumere 1 capsula al giorno.",
    ingredients: "Olio di semi di girasole, Agente di rivestimento: gelatina; Umettante: glicerolo; Vitamina D3 (colecalciferolo).",
    nutritionalInfo: `<table class="nutritional-table">
      <thead><tr><th>Componente</th><th>1 softgel</th></tr></thead>
      <tbody>
        <tr><td>VITAMINA D</td><td>50 μg / 2000 IU (1000% NRV)</td></tr>
      </tbody>
    </table>`,
    variants: [
      { flavor: null, size: "60 capsule", price: 1990, imageName: "vitamina-d3-2000-iu.png" }
    ]
  },
  {
    name: "Super Dextrin Pro",
    slug: "super-dextrin-pro",
    brandId: 22,
    categoryId: 3, // Energetici
    description: "Super Dextrin PRO è un integratore energetico di nuova generazione con carboidrati a rilascio differenziato per la massima efficienza energetica.",
    longDescription: `Super Dextrin® Pro è un integratore alimentare energetico di nuova generazione con carboidrati in rapporto 1:0.8 (glu:fru), per massimizzare il flusso energetico. Il prodotto ha un efficace svuotamento gastrico, favorisce un elevato ingresso di carboidrati nell'organismo e permette un'ottimale distribuzione delle scorte energetiche. La speciale formula sfrutta la sinergia tra HBCD (Destrine Cicliche Altamente Ramificate = Cluster Dextrin® e SusCarb®), Maltodestrine DE6 e DE18, PalatinoseTM e Fruttosio. Super Dextrin® PRO è senza caffeina e non contiene glutine. La formula è brevettata e doping free tested*.`,
    howToUse: "Sciogliere 60 g (circa 3 misurini) di polvere in 600 ml di acqua e assumere durante l'attività fisica. Dosare la quantità in funzione delle necessità e delle capacità digestive. L'assunzione di elevati carichi di carboidrati richiede un adeguato allenamento intestinale.",
    ingredients: "Fruttosio, Maltodestrina DE18, Destrina ciclica altamente ramificata (SusCarb®), Isomaltulosio° (Palatinose™), Maltodestrina DE6 (Glucidex®), Destrine cicliche altamente ramificate (Cluster Dextrin®), correttore di acidità: acido citrico; aroma. °L'isomaltulosio è una fonte di glucosio e di fruttosio.",
    nutritionalInfo: `<table class="nutritional-table">
      <thead><tr><th>Componente</th><th>100g</th><th>60g (1 porzione)</th></tr></thead>
      <tbody>
        <tr><td>VALORE ENERGETICO</td><td>1640 kJ / 393 kcal</td><td>984 kJ / 236 kcal</td></tr>
        <tr><td>Grassi</td><td>0 g</td><td>0 g</td></tr>
        <tr><td>Carboidrati</td><td>96 g</td><td>58 g</td></tr>
        <tr><td>di cui zuccheri</td><td>38 g</td><td>23 g</td></tr>
        <tr><td>Proteine</td><td>0 g</td><td>0 g</td></tr>
        <tr><td>Sale</td><td>0.03 g</td><td>0.02 g</td></tr>
      </tbody>
    </table>`,
    variants: [
      { flavor: null, size: "840g", price: 3590, imageName: "super-dextrin-pro.png" }
    ]
  }
];

async function insertRemainingProducts() {
  console.log('🚀 Inizio inserimento dei prodotti 6-14 del batch 1...');
  
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
  
  console.log('\n🎉 Inserimento dei prodotti 6-14 completato!');
}

// Esegui lo script
insertRemainingProducts().catch(console.error);