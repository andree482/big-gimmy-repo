
import { db } from "./db.js";
import { products, productImages } from "@shared/schema";
import { eq } from "drizzle-orm";

// Import del mapping immagini completo dal frontend
const PRODUCT_IMAGE_MAP: { [slug: string]: string } = {
  // Prodotti VOLCHEM - Mirabol Whey Protein 94%
  "mirabol-whey-protein-94-volchem": "Mirabol Whey Protein 94 vanilla 750g web.jpg",
  "mirabol-whey-94-vanilla-750g": "Mirabol Whey Protein 94 vanilla 750g web.jpg",
  "mirabol-whey-94-banana-750g": "Mirabol Whey 750g Banana web.jpg",
  "mirabol-whey-94-chocolate-750g": "Mirabol Whey Protein 94 chocolate 750g web.jpg",
  "mirabol-whey-94-coffee-750g": "Mirabol Whey 750g coffee web.jpg",
  "mirabol-whey-94-strawberry-750g": "Mirabol Whey Protein 94 strawberry 750g web.jpg",
  "mirabol-whey-94-double-chocolate-750g": "Mirabol Whey Protein 94 double chocolate 750g web.jpg",
  "mirabol-whey-94-bacio-750g": "Mirabol Whey Natural Bacio Web.jpg",
  "mirabol-whey-94-banana-500g": "Mirabol Whey Protein 94 banana 500g web.jpg",
  "mirabol-whey-94-strawberry-500g": "Mirabol Whey Protein 94 strawberry 500g web.jpg",
  "mirabol-whey-94-coffee-500g": "Mirabol Whey Protein 94 cooffe 500g web.jpg",

  // Prodotti VOLCHEM - Aminotool EAA
  "aminotool-eaa-volchem": "Aminotool eaa 252g orange web.jpg",
  "aminotool-eaa-orange": "Aminotool eaa 252g orange web.jpg",
  "aminotool-eaa-lemon-lime": "Aminotool EAA 252g lemon-lime web.jpg",
  "aminotool-252g-orange": "Aminotool 252g orange web.jpg",

  // Prodotti +WATT - Proteine
  "whey-protein-90-banana": "WHEY PROTEIN 90 Banana_Fronte.jpg",
  "whey-protein-90-vaniglia": "WHEY PROTEIN 90 Vaniglia_Fronte.jpg",
  "whey-protein-90-fragola": "WHEY PROTEIN 90 GUSTO FRAGOLA_FRONTE.jpg",
  "whey-protein-90-fior-di-latte": "WHEY PROTEIN 90 FIOR DI LATTE Fronte.jpg",
  "whey-protein-90-crema-nocciola": "WHEY PROTEIN 90_crema nocciola_Fronte.jpg",
  "whey-protein-90-natural": "WHEY PROTEIN 90_Natural_Fronte.jpg",

  "whey-protein-80-banana": "WHEYGHTY PROTEIN 80 BANANA fronte.jpg",
  "whey-protein-80-cacao": "WHEYGHTY PROTEIN 80 CACAO fronte.jpg",
  "whey-protein-80-cappuccino": "WHEYGHTY PROTEIN 80 CAPPUCCINO Fronte.jpg",
  "whey-protein-80-cocco": "WHEYGHTY PROTEIN 80 COCCO Fronte.jpg",
  "whey-protein-80-nocciola": "WHEYGHTY PROTEIN 80 NOCCIOLA 750g_Fronte.jpg",
  "whey-protein-80-fragola": "WHEYghty PROTEIN 80 Fragola_Fronte.jpg",
  "whey-protein-80-vaniglia": "WHEY PROTEIN 80_vaniglia_Fronte.jpg",

  // Prodotti +WATT - Barrette
  "protein-wafer-low-sugar": "PROTEIN WAFER LOW SUGAR_Cacao_Fronte.jpg",
  "protein-wafer-low-sugar-vaniglia": "PROTEIN WAFER LOW SUGAR_Vaniglia_Fronte.jpg",
  "protein-evo-cocco": "Protein+ EVO cocco FRONTE.jpg",
  "protein-evo-creme-caramel": "Protein+ EVO crème caramel FRONTE.jpg",
  "protein-classic-banana": "Protein+ classic_banana_fronte.jpg",
  "protein-classic-cacao": "Protein+ classic cacao FRONTE.jpg",
  "protein-classic-cocco": "Protein+ classic cocco FRONTE.jpg",
  "protein-white-limone": "Protein+ white crema limone FRONTE.jpg",
  "protein-white-tiramisu": "Protein+ white tiramisu FRONTE.jpg",
  "protein-white-vaniglia": "Protein+ white vaniglia FRONTE.jpg",
  "light-protein-bar-caramello": "LIGHT PROTEIN BAR CARAMELLO Fronte.jpg",
  "light-protein-bar-cheesecake": "LIGHT PROTEIN BAR CHEESECAKE Fronte.jpg",
  "big-bar-cookie-nocciola": "07-big-bar-cookie-nocciola.jpg",
  "bigbar-30-cocco": "06-big-bar-cocco.jpg",
  "low-sugar-bar-brownie": "Low-Sugar-Bar-50g-brownie-FRONTE.jpg",
  "low-sugar-bar-cookie-cream": "Low-Sugar-Bar-50g-cookie-cream-FRONTE.jpg",
  "barrettone-2-0-cacao": "04-barrettone-cacao.jpg",
  "barrettone-2-0-vaniglia": "05-barrettone-vaniglia.jpg", 
  "barrettone-2-0-burro-arachidi": "03-barrettone-burro-arachidi.jpg",
  "barrettone-2-0": "04-barrettone-cacao.jpg",
  "big-bar": "06-big-bar-cocco.jpg",

  // Prodotti +WATT - Creatina
  "creatina-extra-gold-100g": "CREATINA_Extra Gold_100g_Fronte.jpg",
  "creatina-compresse-extra-gold": "CREATINA Compresse Extra Gold_Fronte.jpg",
  "creatina-polvere-gold": "CREATINA POLVERE GOLD_FRONTE.jpg",
  "creatina-polvere-350g": "Creatina+ polvere extragold 350 FRONTE.jpg",
  "creanized-creatina": "CREANIZED_CRETINA_MONOIDRATO_Fronte.jpg",

  // Prodotti +WATT - Mass Gainer
  "mass-formula-mct-gainer-cacao": "mass-formula-cacao.jpg",
  "mass-formula-mct-gainer-nocciola": "MASS FORMULA MCT GAINER_Nocciola_Fronte.jpg",
  "avena-cappuccino": "AVENA 1-360KG CAPPUCCINO_FRONTE.jpg",
  "avena-cacao": "AVENA 1-360KG CACAO_FRONTE.jpg",
  "avena-nocciola": "avena-nocciola.jpg",

  // Prodotti +WATT - Vitamine e Minerali
  "electrolyte-arancia": "ELECTROLYTE_Arancia_Fronte.jpg",
  "electrolyte-limone": "ELECTROLYTE_Limone_Fronte.jpg",
  "energy-pump-limone": "ENERGY PUMP_Limone_Fronte.jpg",
  "fluid-cramp-arancia": "FLUID CRAMP_Arancia_Fronte.jpg",
  "ferro-ribes": "FERRO_Ribes_Fronte.jpg",
  "d-ribosio": "D RIBOSIO_Fronte.jpg",
  "b-strong": "B-STRONG-Fronte.jpg",
  "ashwagandha-pura": "ASHWAGANDHA-PURA-Fronte.jpg",
  "astaxantina-softgel": "ASTAXANTINA-SOFTGEL-FRONTE.jpg",
  "berberina-60-capsule": "BERBERINA-60-CAPSULE-FRONTE.jpg",
  "collagene": "Collagene-Fronte.jpg",
  "comfort-vision": "Comfort-Vision-Fronte.jpg",
  "bromelina": "Bromelina-Fronte.jpg",
  "antiradical-mix": "Antiradical-mix-60-capsule-FRONTE.jpg",
  "enziplus": "ENZIPLUS CAPSULE fronte.jpg",
  "dretox-450ml": "DRETOX-450ML-FRONTE.jpg",

  // Prodotti POWERBAR
  "powerbar-protein-plus-chocolate": "21484602_singolo.png",
  "powerbar-whey-isolate-vanilla": "21480202_box.png",
  "powerbar-protein-plus-vanilla": "21482402_singolo.png",
  "powerbar-whey-protein-strawberry": "21489401_box.png",
  "powerbar-recovery-protein-chocolate": "24712303_singolo.png",
  "powerbar-protein-max-cookies": "24717502_singolo.png",
  "powerbar-whey-isolate-pro-banana": "24763146_box.png",
  "powerbar-energize-berry": "21013001_box.png",
  "powerbar-performance-chocolate": "21033001_singolo.png",
  "powerbar-natural-energy-banana": "21012001_singolo.png",
  "powerbar-electrolytes-lemon": "22010800_singolo.png",
  "powerbar-magnesium": "22020100_singolo.png",
  "powerbar-vitamin-complex": "22060000_box.png",
  "powerbar-zinc-plus": "22040300_box.png",
  "powerbar-mass-gainer-chocolate": "23334700_singolo.png",
  "powerbar-weight-gainer-vanilla": "23345700_singolo.png",
  "powerbar-carb-load-orange": "21362042_box.png",
  "powerbar-energy-source": "21384100_singolo.png",
  "powerbar-caffeine-boost-cola": "21121001_box.png",

  // Prodotti JAMIESON
  "jamieson-vitamin-d3-1000": "12450712_singolo.png",
  "jamieson-omega-3": "128365_singolo.png",
  "jamieson-b-complex": "128370_singolo.png",

  // Prodotti WHY SPORT
  "why-sport-protein-chocolate": "2300_singolo.png",
  "energy-bar-premium-mixed": "2102_singolo.png",
  "amino-complex-pro-orange": "2215_singolo.png",

  // Altri prodotti energetici
  "liquid-carbo-arancia": "LIQUID CARBO_Arancia_Fronte.jpg",
  "carbowart-pistacchio": "CARBOWART_Pistacchio_Fronte.jpg",
  "burn-out-lampone": "01-burn-out-lampone.jpg",
  "burn-out": "01-burn-out-lampone.jpg",
  "fruitforce-ananas": "FRUITFORCE-ANANAS-Fronte.jpg",
  "fruitforce-fragola": "12-fruitforce-fragola.jpg",
  "fruitforce": "12-fruitforce-fragola.jpg",
  "carbo-energy-albicocca": "08-carbo-energy-albicocca.jpg",
  "carbo-energy-plus": "08-carbo-energy-albicocca.jpg",
  "carbo-energy-agrumi": "10-carbo-energy-agrumi.jpg",
  "carbo-energy-frutti-bosco": "09-carbo-energy-frutti-bosco.jpg",
  "carbo-energy-mela-verde": "11-carbo-energy-mela-verde.jpg",
  "grissini-proteici": "14-grissini-proteici-arachidi-mandorle.jpg",
  "iso-soya": "15-iso-soya-premier.jpg",
  "light-protein-plus-bar": "16-light-protein-bar-cheesecake.jpg",
  "oatmeal-pro-biscotto": "oatmeal-pro-biscotto.jpg",
  "veggie-ciok-albicocca": "Veggie-Ciok-40g-albicocca-FRONTE.jpg",
  "veggie-ciok-arancia": "Veggie-Ciok-40g-arancia-FRONTE.jpg",
  "veggie-ciok-cacao": "Veggie-Ciok-40g-cacao-FRONTE.jpg",
  "turboactive-arachidi": "TurboActive_Arachidi_Fronte.jpg",
  "turboactive-cacao": "TurboActive_Cacao_Fronte.jpg",
  "smart-protein-cacao": "SMART PROTEIN_CACAO_Fronte.jpg",
  "say-protein-221-cacao": "SAY PROTEIN 221 CACAO fronte.jpg",
  "say-protein-221-nocciola": "SAY PROTEIN 221 NOCCIOLA fronte.jpg"
};

async function removeProductsWithoutImages() {
  console.log("🔍 Identificazione prodotti senza immagini reali...");
  
  try {
    const allProducts = await db.select().from(products);
    console.log(`📦 Analizzando ${allProducts.length} prodotti...`);

    let removedCount = 0;

    for (const product of allProducts) {
      // Controlla se il prodotto ha un'immagine nel mapping
      const hasRealImage = PRODUCT_IMAGE_MAP[product.slug];
      
      // Controlla anche varianti del slug
      const slugVariants = [
        product.slug,
        product.slug.replace(/-standard$/, ''),
        product.slug.replace(/-limited-edition$/, ''),
        product.slug.replace(/-plus-watt$/, ''),
        product.slug.replace(/-premier$/, ''),
        product.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
      ];

      const hasImageVariant = slugVariants.some(variant => PRODUCT_IMAGE_MAP[variant]);

      if (!hasRealImage && !hasImageVariant) {
        // Questo prodotto non ha un'immagine mappata
        console.log(`🗑️  Rimuovendo prodotto senza immagine: ${product.name} (slug: ${product.slug})`);
        
        try {
          // Prima elimina le immagini associate al prodotto
          await db.delete(productImages).where(eq(productImages.productId, product.id));
          
          // Poi elimina il prodotto
          await db.delete(products).where(eq(products.id, product.id));
          removedCount++;
          console.log(`✅ Prodotto rimosso con successo: ${product.name}`);
        } catch (error) {
          console.error(`❌ Errore durante la rimozione di ${product.name}:`, error);
        }
      } else {
        console.log(`✅ Mantenuto: ${product.name} (ha immagine)`);
      }
    }

    console.log(`\n🎉 Pulizia completata!`);
    console.log(`🗑️  Prodotti rimossi (senza immagini): ${removedCount}`);
    console.log(`✅ Prodotti mantenuti (con immagini): ${allProducts.length - removedCount}`);
    console.log(`📊 Ora il catalogo mostra solo prodotti con immagini reali`);

  } catch (error) {
    console.error("❌ Errore durante la rimozione:", error);
  }
}

// Esegui se chiamato direttamente
if (import.meta.url === `file://${process.argv[1]}`) {
  removeProductsWithoutImages().then(() => process.exit(0));
}

export { removeProductsWithoutImages };
