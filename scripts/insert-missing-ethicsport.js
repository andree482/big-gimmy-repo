import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

// Prodotti EthicSport mancanti (14 e 15)
const products = [
  {
    name: "EAA Amminoacidi Essenziali Solubili",
    slug: "eaa-amminoacidi-essenziali-solubili",
    brandId: 22,
    categoryId: 3, // Energetici
    description: "EAA - Enhanced Formula - è un integratore avanzato di amminoacidi essenziali arricchito con glutammina, zinco e vitamina B6, ideale per supportare la sintesi proteica, il recupero muscolare e contrastare l'affaticamento.",
    longDescription: `EAA - Enhanced Formula - AMMINOACIDI ESSENZIALI solubili è un integratore di A.A. Essenziali con Glutammina, Zinco e Vitamina B6, formulato per supportare la sintesi proteica, il recupero muscolare e contrastare l'affaticamento. Grazie alla formula evoluta, senza carboidrati e gluten-free, è ideale per atleti di endurance e di forza che desiderano un'integrazione mirata ed efficace. Lo zinco contribuisce alla normale sintesi proteica, mentre la vitamina B6 contribuisce al metabolismo energetico e delle proteine, e alla riduzione della fatica. È Doping Free Tested, altamente solubile e con un piacevole gusto di limone naturale.`,
    howToUse: "Sciogliere 2/3 di misurino (4 g) in circa 200-250 ml di acqua e assumere in base alle esigenze individuali. Ideale per supportare la sintesi proteica e il recupero muscolare. Il prodotto può essere utilizzato per integrare il fabbisogno giornaliero di amminoacidi essenziali, anche se non si pratica attività fisica.",
    ingredients: "Aminoacidi a catena ramificata BCAA (L-leucina, L-valina, L-isoleucina), maltodestrina, L-lisina cloridrato, aromi, L-glutammina, regolatore di acidità: acido citrico; L-treonina, L-fenilalanina, L-metionina, L-tirosina, L-arginina, L-istidina, L-triptofano, zinco picolinato (zinco), piridossina cloridrato (Vitamina B6), L-cisteina cloridrato, edulcoranti: sucralosio, acesulfame K; caroteni.",
    nutritionalInfo: `<table class="nutritional-table">
      <thead><tr><th>Componente</th><th>PRI (mg/kg/day)</th><th>Per dose (4g)</th></tr></thead>
      <tbody>
        <tr><td>Leucina</td><td>39</td><td>800 mg</td></tr>
        <tr><td>Isoleucina</td><td>20</td><td>370 mg</td></tr>
        <tr><td>Valina</td><td>26</td><td>408 mg</td></tr>
        <tr><td>Lisina Hcl</td><td>30</td><td>360 mg</td></tr>
        <tr><td>Metionina</td><td>15</td><td>120 mg</td></tr>
        <tr><td>Fenilalanina</td><td>25</td><td>180 mg</td></tr>
        <tr><td>Treonina</td><td>15</td><td>180 mg</td></tr>
        <tr><td>Triptofano</td><td>4</td><td>50 mg</td></tr>
        <tr><td>Histidina</td><td>10</td><td>80 mg</td></tr>
        <tr><td>Glutammina</td><td>-</td><td>220 mg</td></tr>
        <tr><td>Zinco</td><td>-</td><td>3 mg (30% NRV)</td></tr>
        <tr><td>Vitamina B6</td><td>-</td><td>0.7 mg (50% NRV)</td></tr>
      </tbody>
    </table>`,
    variants: [
      { flavor: "Limone", size: "300g", price: 3490, imageName: "eaa-amminoacidi-essenziali-solubili.png" }
    ]
  },
  {
    name: "Comfort Plus",
    slug: "comfort-plus",
    brandId: 22,
    categoryId: 7, // Vitamine/Minerali/Antiossidanti
    description: "Crema professionale con intense proprietà lenitive e antiattrito. Prodotto specifico per il soprasella del ciclista e per le zone di intensa frizione nel podista.",
    longDescription: `Comfort Plus è una crema antifrizione con proprietà lenitive, emollienti e antiattrito. È indicata per lo sportivo soggetto a facili arrossamenti o lesioni della cute durante l'attività sportiva. Indicata per le parti a contatto con la sella nel ciclista, per le zone di intensa frizione nel podista ed in generale per le aree soggette a trauma epidermico nell'atleta. La particolare composizione della crema protegge la pelle dalle abrasioni generate dalla ripetizione del gesto sportivo e riduce sensibilmente gli arrossamenti da sfregamento. L'alto tenore di ossido di zinco esercita un'efficace azione lenitiva e di protezione epidermica.`,
    howToUse: "Applicare con un leggero massaggio direttamente sulla pelle, prima e dopo l'impegno sportivo.",
    ingredients: "Aqua, Petrolatum, Zinc oxide, Glycerin, Bisabolol, Helianthus annuus seed oil, Cocos nucifera oil, Propylene glycol, Stearic acid, Cetearyl alcohol, Cera alba, Glyceryl stearate, PEG-40 hydrogenated castor oil, Polysorbate-20, Panthenol, Betaine, Troxerutin, Ceteareth-25, acrylic acid copolymer, Inulin, Allantoin, Arginine, Niacinamide, Tocopherol, Phenoxyethanol, Imidazolidinyl urea, Parfum, Sodium hydroxide, Disodium EDTA, Methylparaben, Pentaerythrityl tetra-di-t-butyl hydroxyhydrocinnamate, Butylparaben, Ethylparaben, Propylparaben.",
    nutritionalInfo: null, // Prodotto topico senza valori nutrizionali
    variants: [
      { flavor: null, size: "250 ml", price: 2450, imageName: "comfort-plus.jpg" }
    ]
  }
];

async function insertMissingProducts() {
  console.log('🚀 Inserimento prodotti EthicSport mancanti...');
  
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
      
      // Inserisci informazioni nutrizionali come feature se presenti
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
  
  console.log('\n🎉 Inserimento prodotti mancanti completato!');
  
  // Verifica finale
  const totalProducts = await sql`SELECT COUNT(*) as count FROM products WHERE brand_id = 22`;
  console.log(`📈 Totale prodotti EthicSport: ${totalProducts[0].count}`);
}

// Esegui lo script
insertMissingProducts().catch(console.error);