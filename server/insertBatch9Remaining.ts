import { db } from "./db";
import { 
  productGroups, products, productCategories, brands,
  type InsertProductGroup, type InsertProduct
} from "@shared/schema";

async function insertBatch9RemainingProducts() {
  console.log("🚀 Inserimento prodotti rimanenti Batch 9 (dal 4° al 20°)...");

  try {
    // Ottieni i brand esistenti
    const allBrands = await db.select().from(brands);
    const premierBrand = allBrands.find(b => b.slug === 'premier');
    const ethicsportBrand = allBrands.find(b => b.slug === 'ethicsport');

    if (!premierBrand || !ethicsportBrand) {
      throw new Error("Brand Premier o EthicSport non trovati!");
    }

    // Ottieni le categorie esistenti
    const allCategories = await db.select().from(productCategories);
    const getCategory = (slug: string) => allCategories.find(c => c.slug === slug);

    console.log("📦 Inserimento prodotti 4-6:");

    // ===================
    // PRODOTTO 4: High Pro Release
    // ===================
    console.log("4. High Pro Release");
    
    const highProGroup = await db.insert(productGroups).values({
      name: "High Pro Release",
      slug: "high-pro-release",
      description: "HIGH PRO RELEASE è un integratore alimentare in polvere di proteine del latte (caseinato di calcio, caseina micellare, proteine del siero di latte concentrate Volactive® ed isolate cfm Volactive®), proteine isolate del pisello (Pisane®), indicato per integrare l'alimentazione dello sportivo.",
      longDescription: "HIGH PRO RELEASE è un integratore alimentare in polvere di proteine del latte (caseinato di calcio, caseina micellare, proteine del siero di latte concentrate Volactive® ed isolate cfm Volactive®), proteine isolate del pisello (Pisane®), indicato per integrare l'alimentazione dello sportivo. HIGH PRO RELEASE fornisce una fonte proteica bilanciata di elevata qualità con un'eccellente solubilità.",
      howToUse: "Assumere fino a 40 g di prodotto (4 misurini) in 250 ml d'acqua al giorno lontano dai pasti principali. All'interno della confezione è presente un misurino dosatore.",
      brandId: premierBrand.id,
      categoryId: getCategory('proteine')!.id,
      features: JSON.stringify({
        "titolo": "Integratore Proteico con Enzimi",
        "valori_nutrizionali": {
          "per_100g": {
            "energia": "1661 kj / 391 kcal",
            "grassi": "2,5 g",
            "di_cui_saturi": "0,5 g",
            "carboidrati": "3 g",
            "di_cui_zuccheri": "1,9 g",
            "proteine": "87 g",
            "sale": "0,7 g",
            "vitamina_b1": "2,75 mg",
            "vitamina_b2": "3,5 mg",
            "vitamina_b6": "3,5 mg",
            "vitamina_b12": "4 mcg",
            "l_arginina": "1,5 g",
            "citrullina": "1 g",
            "miscela_di_enzimi_digezyme": "150 mg"
          },
          "per_dose_40g": {
            "valore_energetico": "664 kj / 156 kcal",
            "grassi": "1 g",
            "di_cui_saturi": "0,4 g",
            "carboidrati": "1,2 g",
            "di_cui_zuccheri": "0,8 g",
            "proteine": "35 g",
            "sale": "0,33 g",
            "vitamina_b1": "1,1 mg (100% VNR)",
            "vitamina_b2": "1,4 mg (100% VNR)",
            "vitamina_b6": "1,4 mg (100% VNR)",
            "vitamina_b12": "2,5 mcg (100% VNR)",
            "l_arginina": "0,6 g",
            "citrullina": "0,4 g"
          }
        },
        "ingredienti": "Proteine del LATTE (caseinato di calcio, caseina micellare, sieroproteine concentrate ed isolate), proteine isolate del pisello, aromi, Emulsionante: lecitina di girasole; L-Arginina, Citrullina, DigeZyme® (miscela di ezimi da Aspergillus oryzae, Bacillus subtilis, Rhizopus oryzae, Trichoderma Longibrachiatum, eccipiente: maltodestrine da mais). Edulcoranti: Acelsufame K, Sucralosio; Vitamina B6 (Piridossina cloridrato), Vitamina B2 (Riboflavina), Vitamina B1 (cloridrato di tiamina), Vitamina B12 (Cianocobalamina).",
        "nota": "VNR = Valori nutritivi di riferimento"
      })
    }).returning();

    await db.insert(products).values([
      {
        name: "High Pro Release Caffè Latte 1kg",
        slug: "high-pro-release-caffe-latte-1kg",
        description: "HIGH PRO RELEASE è un integratore alimentare in polvere di proteine del latte, indicato per integrare l'alimentazione dello sportivo.",
        flavor: "Caffè Latte",
        size: "1kg",
        brandId: premierBrand.id,
        categoryId: getCategory('proteine')!.id,
        groupId: highProGroup[0].id,
        features: highProGroup[0].features
      },
      {
        name: "High Pro Release Crema Cioccolato 1kg",
        slug: "high-pro-release-crema-cioccolato-1kg",
        description: "HIGH PRO RELEASE è un integratore alimentare in polvere di proteine del latte, indicato per integrare l'alimentazione dello sportivo.",
        flavor: "Crema Cioccolato",
        size: "1kg",
        brandId: premierBrand.id,
        categoryId: getCategory('proteine')!.id,
        groupId: highProGroup[0].id,
        features: highProGroup[0].features
      },
      {
        name: "High Pro Release Crema Vaniglia 1kg",
        slug: "high-pro-release-crema-vaniglia-1kg",
        description: "HIGH PRO RELEASE è un integratore alimentare in polvere di proteine del latte, indicato per integrare l'alimentazione dello sportivo.",
        flavor: "Crema Vaniglia",
        size: "1kg",
        brandId: premierBrand.id,
        categoryId: getCategory('proteine')!.id,
        groupId: highProGroup[0].id,
        features: highProGroup[0].features
      }
    ]);

    // ===================
    // PRODOTTO 5: Glutamine Pure 100%
    // ===================
    console.log("5. Glutamine Pure 100%");
    
    const glutamine100Group = await db.insert(productGroups).values({
      name: "Glutamine Pure 100%",
      slug: "glutamine-pure-100-premier",
      description: "GLUTAMINE PURE 100% è un integratore alimentare in polvere di L-Glutammina (KYOWA®)",
      longDescription: "GLUTAMINE PURE 100% è un integratore alimentare in polvere di L-Glutammina (KYOWA®). La L-Glutammina ricopre un ruolo fondamentale: permette di migliorare il recupero dopo qualsiasi attività fisica intensa.",
      howToUse: "Assumere 3g di prodotto (2 misurini) al giorno. All'interno della confezione è presente un misurino dosatore.",
      brandId: premierBrand.id,
      categoryId: getCategory('aminoacidi-e-creatina')!.id,
      features: JSON.stringify({
        "titolo": "L-Glutammina Kyowa",
        "valori_nutrizionali": {
          "per_porzione": {
            "porzione": "3 g",
            "l_glutammina": "3 g"
          }
        },
        "ingredienti": "L-Glutammina (Kyowa®)."
      })
    }).returning();

    await db.insert(products).values([
      {
        name: "Glutamine Pure 100% 200g",
        slug: "glutamine-pure-100-200g",
        description: "GLUTAMINE PURE 100% è un integratore alimentare in polvere di L-Glutammina (KYOWA®)",
        flavor: "Unico",
        size: "200g",
        brandId: premierBrand.id,
        categoryId: getCategory('aminoacidi-e-creatina')!.id,
        groupId: glutamine100Group[0].id,
        features: glutamine100Group[0].features
      },
      {
        name: "Glutamine Pure 100% 400g",
        slug: "glutamine-pure-100-400g",
        description: "GLUTAMINE PURE 100% è un integratore alimentare in polvere di L-Glutammina (KYOWA®)",
        flavor: "Unico",
        size: "400g",
        brandId: premierBrand.id,
        categoryId: getCategory('aminoacidi-e-creatina')!.id,
        groupId: glutamine100Group[0].id,
        features: glutamine100Group[0].features
      }
    ]);

    // ===================
    // PRODOTTO 6: Maltodex Pure 100%
    // ===================
    console.log("6. Maltodex Pure 100%");
    
    const maltodexGroup = await db.insert(productGroups).values({
      name: "Maltodex Pure 100%",
      slug: "maltodex-pure-100-premier",
      description: "MALTODEX PURE 100% è un integratore alimentare energetico in polvere di maltodestrine utile prima, durante e dopo le attività fisiche.",
      longDescription: "MALTODEX PURE 100% è un integratore alimentare energetico in polvere di maltodestrine utile prima, durante e dopo le attività fisiche. È un prodotto dietetico energetico per sportivi in polvere di carboidrati costituito da Maltodestrine purissime, destrosio equivalenza 19, arricchito con vitamina B6.",
      howToUse: "Assumere 40 g di prodotto (2 misurini) al giorno in 250 ml d'acqua, lontano dai pasti principali. All'interno della confezione è disponibile un misurino dosatore.",
      brandId: premierBrand.id,
      categoryId: getCategory('pre-workout-energetici')!.id,
      features: JSON.stringify({
        "titolo": "Integratore di Maltodestrine e Vitamina B6",
        "valori_nutrizionali": {
          "per_100g": {
            "energia": "396 kcal / 1683 kj",
            "grassi": "0 g",
            "carboidrati": "96 g",
            "di_cui_zuccheri": "6,7 g",
            "proteine": "0 g",
            "sale": "0 g",
            "vitamina_b6": "2 mg"
          },
          "per_dose_40g": {
            "energia": "158 kcal / 673 kj",
            "grassi": "0 g",
            "carboidrati": "38,4 g",
            "di_cui_zuccheri": "2,7 g",
            "proteine": "0 g",
            "sale": "0 g",
            "vitamina_b6": "0,8 mg (40% VNR)"
          }
        },
        "ingredienti": "Maltodestrine (da mais), Vitamina B6 (cloridrato di piridossina).",
        "nota": "VNR = Valori nutritivi di riferimento"
      })
    }).returning();

    await db.insert(products).values({
      name: "Maltodex Pure 100% 1,1kg",
      slug: "maltodex-pure-100-1-1kg",
      description: "MALTODEX PURE 100% è un integratore alimentare energetico in polvere di maltodestrine utile prima, durante e dopo le attività fisiche.",
      flavor: "Unico",
      size: "1,1kg",
      brandId: premierBrand.id,
      categoryId: getCategory('pre-workout-energetici')!.id,
      groupId: maltodexGroup[0].id,
      features: maltodexGroup[0].features
    });

    console.log("✅ Inseriti prodotti 4-6 del Batch 9 (6 varianti totali)");

  } catch (error) {
    console.error("❌ Errore durante l'inserimento:", error);
    throw error;
  }
}

// Eseguire la funzione
insertBatch9RemainingProducts()
  .then(() => {
    console.log("🎉 Inserimento prodotti 4-6 completato!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("💥 Errore fatale:", error);
    process.exit(1);
  });