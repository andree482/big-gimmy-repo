import { db } from "./db";
import { products, brands, productCategories, productImages } from "@shared/schema";

interface ProductInfo {
  name: string;
  brand: string;
  category: string;
  flavors: string[];
  sizes: string[];
  keyIngredients: string[];
  description: string;
  longDescription: string;
}

const jamiesonVitaminsProducts: ProductInfo[] = [
  {
    name: "Vitamina C 1000mg",
    brand: "Jamieson",
    category: "vitamine-minerali",
    flavors: ["Natural"],
    sizes: ["100 compresse", "200 compresse"],
    keyIngredients: ["Vitamina C (Acido ascorbico)", "Cellulosa microcristallina", "Bioflavonoidi degli agrumi"],
    description: "Integratore di Vitamina C ad alto dosaggio per supportare il sistema immunitario",
    longDescription: "La Vitamina C 1000mg di Jamieson fornisce una dose elevata di acido ascorbico per sostenere le naturali difese dell'organismo. Arricchita con bioflavonoidi degli agrumi per una migliore assimilazione. Ideale per rafforzare il sistema immunitario, favorire la formazione del collagene e proteggere le cellule dallo stress ossidativo."
  },
  {
    name: "Vitamina D3 1000 UI",
    brand: "Jamieson",
    category: "vitamine-minerali", 
    flavors: ["Natural"],
    sizes: ["240 compresse", "375 compresse"],
    keyIngredients: ["Vitamina D3 (Colecalciferolo)", "Cellulosa microcristallina", "Fosfato dicalcico"],
    description: "Vitamina D3 per il benessere di ossa, denti e sistema immunitario",
    longDescription: "La Vitamina D3 1000 UI di Jamieson è essenziale per l'assorbimento del calcio e del fosforo, contribuendo al mantenimento di ossa e denti normali. Supporta inoltre la normale funzione del sistema immunitario e la funzione muscolare. Formulazione ad alta biodisponibilità."
  },
  {
    name: "Complesso B 100",
    brand: "Jamieson",
    category: "vitamine-minerali",
    flavors: ["Natural"],
    sizes: ["90 compresse"],
    keyIngredients: ["Tiamina (B1)", "Riboflavina (B2)", "Niacina (B3)", "Acido pantotenico (B5)", "Piridossina (B6)", "Biotina (B7)", "Acido folico (B9)", "Cobalamina (B12)"],
    description: "Complesso completo di vitamine del gruppo B per energia e benessere nervoso",
    longDescription: "Il Complesso B 100 di Jamieson fornisce tutte le 8 vitamine del gruppo B in dosaggi bilanciati. Essenziale per il metabolismo energetico, il normale funzionamento del sistema nervoso e la riduzione di stanchezza e affaticamento. Supporta la formazione dei globuli rossi e la sintesi degli amminoacidi."
  },
  {
    name: "Magnesio 250mg",
    brand: "Jamieson", 
    category: "vitamine-minerali",
    flavors: ["Natural"],
    sizes: ["90 compresse", "180 compresse"],
    keyIngredients: ["Magnesio (ossido)", "Cellulosa microcristallina", "Acido stearico"],
    description: "Integratore di magnesio per muscoli, ossa e sistema nervoso",
    longDescription: "Il Magnesio 250mg di Jamieson contribuisce alla normale funzione muscolare e nervosa, al mantenimento di ossa e denti normali e alla riduzione di stanchezza e affaticamento. Essenziale per oltre 300 reazioni enzimatiche nell'organismo. Formulazione ad alta biodisponibilità."
  },
  {
    name: "Calcio 600mg + Vitamina D3",
    brand: "Jamieson",
    category: "vitamine-minerali",
    flavors: ["Natural"],
    sizes: ["120 compresse"],
    keyIngredients: ["Calcio carbonato", "Vitamina D3 (Colecalciferolo)", "Magnesio stearato"],
    description: "Calcio e Vitamina D3 per ossa e denti forti",
    longDescription: "La combinazione Calcio 600mg + Vitamina D3 di Jamieson fornisce gli elementi essenziali per il mantenimento di ossa e denti normali. La Vitamina D3 migliora l'assorbimento del calcio, mentre il calcio contribuisce alla normale coagulazione del sangue e alla funzione muscolare."
  },
  {
    name: "Omega-3 Select",
    brand: "Jamieson",
    category: "vitamine-minerali",
    flavors: ["Natural"],
    sizes: ["90 softgel", "200 softgel"],
    keyIngredients: ["Olio di pesce concentrato", "EPA (Acido eicosapentaenoico)", "DHA (Acido docosaesaenoico)", "Vitamina E"],
    description: "Acidi grassi essenziali Omega-3 per cuore, cervello e vista",
    longDescription: "L'Omega-3 Select di Jamieson fornisce acidi grassi essenziali EPA e DHA da olio di pesce di alta qualità. Contribuisce alla normale funzione cardiaca, al mantenimento della normale funzione cerebrale e della capacità visiva. Arricchito con Vitamina E come antiossidante naturale."
  }
];

async function insertJamiesonVitamins() {
  console.log("🚀 Inserimento prodotti Jamieson Vitamins...");

  try {
    // Verifica/Crea il brand Jamieson
    let jamiesonBrand = await db.query.brands.findFirst({
      where: (brands, { eq }) => eq(brands.name, "Jamieson")
    });

    if (!jamiesonBrand) {
      console.log("📋 Creazione brand Jamieson...");
      const [newBrand] = await db.insert(brands).values({
        name: "Jamieson",
        slug: "jamieson",
        description: "Leader mondiale negli integratori vitaminici e minerali di alta qualità",
        logo: "/images/brands/jamieson-logo.jpg"
      }).returning();
      jamiesonBrand = newBrand;
    }

    // Verifica/Crea la categoria vitamine-minerali
    let vitamineCategory = await db.query.productCategories.findFirst({
      where: (categories, { eq }) => eq(categories.slug, "vitamine-minerali")
    });

    if (!vitamineCategory) {
      // Prova anche con "vitamine-e-minerali" nel caso sia già stata creata con questo slug
      vitamineCategory = await db.query.productCategories.findFirst({
        where: (categories, { eq }) => eq(categories.slug, "vitamine-e-minerali")
      });
    }

    if (!vitamineCategory) {
      console.log("📋 Creazione categoria Vitamine e Minerali...");
      const [newCategory] = await db.insert(productCategories).values({
        name: "Vitamine e Minerali",
        slug: "vitamine-minerali",
        description: "Integratori vitaminici e minerali per il benessere quotidiano",
        image: "/images/categories/vitamine-minerali.jpg"
      }).returning();
      vitamineCategory = newCategory;
    } else {
      console.log("✅ Categoria Vitamine e Minerali già esistente, utilizzo quella presente");
    }

    let successCount = 0;
    let errorCount = 0;

    // Inserisci ogni prodotto
    for (const product of jamiesonVitaminsProducts) {
      try {
        console.log(`\n📦 Inserimento prodotto: ${product.name}...`);

        // Crea il prodotto base
        const [insertedProduct] = await db.insert(products).values({
          name: product.name,
          slug: product.name.toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-'),
          description: product.description,
          longDescription: product.longDescription,
          brandId: jamiesonBrand.id,
          categoryId: vitamineCategory.id,
          features: product.keyIngredients,
          size: product.sizes[0], // Prima taglia disponibile
          quantity: product.sizes[0],
          isNew: false,
          isBestSeller: false,
          hasSpecialOffer: false
        }).returning();

        // Crea un'immagine per il prodotto
        await db.insert(productImages).values({
          productId: insertedProduct.id,
          src: `/images/products/jamieson-${product.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}.jpg`,
          alt: `${product.name} - ${product.description}`,
          isPrimary: true
        });

        console.log(`✅ Prodotto ${product.name} inserito con successo`);
        successCount++;

      } catch (error) {
        console.error(`❌ Errore inserimento prodotto ${product.name}:`, error);
        errorCount++;
      }
    }

    console.log(`\n🎉 Inserimento completato!`);
    console.log(`✅ Prodotti inseriti con successo: ${successCount}`);
    console.log(`❌ Errori: ${errorCount}`);

  } catch (error) {
    console.error("💥 Errore generale:", error);
  }

  process.exit(0);
}

// Esegui lo script
insertJamiesonVitamins();