import { db } from './db.js';
import { productGroups, products, productSizes, productImages, brands, productCategories } from '../shared/schema.js';
import { eq } from 'drizzle-orm';

async function insertBatch9CorrectPart2() {
  console.log('🚀 INSERIMENTO BATCH 9 CORRETTO - PARTE 2 (Prodotti 3-6)...');

  try {
    const premierBrand = await db.select().from(brands).where(eq(brands.name, 'Premier'));
    const premierBrandId = premierBrand[0].id;

    const aminoacidiCategory = await db.select().from(productCategories).where(eq(productCategories.slug, 'aminoacidi-e-creatina'));
    const proteineCategory = await db.select().from(productCategories).where(eq(productCategories.slug, 'proteine'));
    const supplementiCategory = await db.select().from(productCategories).where(eq(productCategories.slug, 'supplementi'));

    // ===================
    // PRODOTTO 3: Glutamine Pure 1000 (PREZZI CORRETTI)
    // ===================
    console.log('3. Inserendo Glutamine Pure 1000 (prezzi corretti €24,90 e €36,90)...');
    
    const glutamine1000Features = [{
      "titolo": "L-Glutammina Integratore",
      "valori_nutrizionali": {
        "per_porzione": {
          "porzione": "3 compresse",
          "l_glutammina": "3 g"
        }
      },
      "ingredienti": "L-Glutammina (Kyowa®), agente di carica: cellulosa microcristallina; amido di mais, stabilizzanti: sali di magnesio degli acidi grassi, biossido di silicio."
    }];

    const [glutamine1000Group] = await db.insert(productGroups).values({
      slug: "glutamine-pure-1000",
      name: "Glutamine Pure 1000",
      description: "GLUTAMINE PURE 1000 è un integratore alimentare di La L-Glutammina (Kyowa®) in compresse. La L-Glutammina è l'aminoacido più presente nel corpo umano, fondamentale quando il corpo è sottoposto a stress psico-fisici. Ideale nei periodi di allenamento intenso per recuperare, potenziare il sistema immunitario e ridurre i rischi di sovrallenamento.",
      longDescription: "GLUTAMINE PURE 1000 è un integratore alimentare di La L-Glutammina (Kyowa®) in compresse. La L-Glutammina è l'aminoacido più presente nel corpo umano, fondamentale quando il corpo è sottoposto a stress psico-fisici. Ideale nei periodi di allenamento intenso per recuperare, potenziare il sistema immunitario e ridurre i rischi di sovrallenamento. La L-Glutammina è l'aminoacido più presente nel corpo umano naturalmente prodotto dal nostro organismo, fondamentale quando il corpo è sottoposto a stress psico-fisici.",
      features: glutamine1000Features,
      howToUse: "Assumere 3 compresse al giorno.",
      brandId: premierBrandId,
      categoryId: aminoacidiCategory[0].id,
      isNew: false
    }).returning();

    // Variante 1: 150 compresse - €24,90
    const [glutamine150Product] = await db.insert(products).values({
      slug: "glutamine-pure-1000-150-compresse",
      name: "Glutamine Pure 1000 150 compresse",
      groupId: glutamine1000Group.id,
      brandId: premierBrandId,
      categoryId: aminoacidiCategory[0].id,
      description: "GLUTAMINE PURE 1000 è un integratore alimentare di L-Glutammina (Kyowa®) in compresse.",
      flavor: "Unico",
      size: "150 compresse",
      isNew: false
    }).returning();

    await db.insert(productSizes).values({
      productId: glutamine150Product.id,
      value: "150",
      unit: "compresse",
      price: 2490 // €24,90 (CORRETTO dal file .md)
    });

    await db.insert(productImages).values({
      productId: glutamine150Product.id,
      src: "GLUTAMINE-PURE-1000-SITO.png",
      alt: "Glutamine Pure 1000 150 compresse",
      isPrimary: true
    });

    // Variante 2: 300 compresse - €36,90
    const [glutamine300Product] = await db.insert(products).values({
      slug: "glutamine-pure-1000-300-compresse",
      name: "Glutamine Pure 1000 300 compresse",
      groupId: glutamine1000Group.id,
      brandId: premierBrandId,
      categoryId: aminoacidiCategory[0].id,
      description: "GLUTAMINE PURE 1000 è un integratore alimentare di L-Glutammina (Kyowa®) in compresse.",
      flavor: "Unico",
      size: "300 compresse",
      isNew: false
    }).returning();

    await db.insert(productSizes).values({
      productId: glutamine300Product.id,
      value: "300",
      unit: "compresse",
      price: 3690 // €36,90 (CORRETTO dal file .md)
    });

    await db.insert(productImages).values({
      productId: glutamine300Product.id,
      src: "GLUTAMINE-PURE-1000-SITO.png",
      alt: "Glutamine Pure 1000 300 compresse",
      isPrimary: true
    });

    // ===================
    // PRODOTTO 4: High Pro Release (PREZZO CORRETTO €58,50)
    // ===================
    console.log('4. Inserendo High Pro Release (prezzo corretto €58,50)...');
    
    const highProFeatures = [{
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
          "citrullina": "0,4 g",
          "miscela_di_enzimi_digezyme": {
            "alpha_amilasi": "17,7 mg",
            "proteasi": "9,3 mg",
            "lipasi": "240 mcg",
            "cellulasi": "4,3 mg"
          }
        }
      },
      "ingredienti": "Proteine del LATTE (caseinato di calcio, caseina micellare, sieroproteine concentrate ed isolate), proteine isolate del pisello, aromi, Emulsionante: lecitina di girasole; L-Arginina, Citrullina, DigeZyme® (miscela di ezimi da Aspergillus oryzae, Bacillus subtilis, Rhizopus oryzae, Trichoderma Longibrachiatum, eccipiente: maltodestrine da mais). Edulcoranti: Acelsufame K, Sucralosio; Vitamina B6 (Piridossina cloridrato), Vitamina B2 (Riboflavina), Vitamina B1 (cloridrato di tiamina), Vitamina B12 (Cianocobalamina).",
      "nota": "VNR = Valori nutritivi di riferimento"
    }];

    const [highProGroup] = await db.insert(productGroups).values({
      slug: "high-pro-release",
      name: "High Pro Release",
      description: "HIGH PRO RELEASE è un integratore alimentare in polvere di proteine del latte (caseinato di calcio, caseina micellare, proteine del siero di latte concentrate Volactive® ed isolate cfm Volactive®), proteine isolate del pisello (Pisane®), indicato per integrare l'alimentazione dello sportivo.",
      longDescription: "HIGH PRO RELEASE è un integratore alimentare in polvere di proteine del latte (caseinato di calcio, caseina micellare, proteine del siero di latte concentrate Volactive® ed isolate cfm Volactive®), proteine isolate del pisello (Pisane®), indicato per integrare l'alimentazione dello sportivo. HIGH PRO RELEASE fornisce una fonte proteica bilanciata di elevata qualità con un'eccellente solubilità.",
      features: highProFeatures,
      howToUse: "Assumere fino a 40 g di prodotto (4 misurini) in 250 ml d'acqua al giorno lontano dai pasti principali. All'interno della confezione è presente un misurino dosatore.",
      brandId: premierBrandId,
      categoryId: proteineCategory[0].id,
      isNew: false
    }).returning();

    // TUTTE LE VARIANTI DEVONO AVERE PREZZO €58,50 secondo il file .md
    const flavors = ['Caffè Latte', 'Crema Cioccolato', 'Crema Vaniglia'];
    
    for (const flavor of flavors) {
      const [highProProduct] = await db.insert(products).values({
        slug: `high-pro-release-${flavor.toLowerCase().replace(/\s+/g, '-')}-1kg`,
        name: `High Pro Release ${flavor} 1kg`,
        groupId: highProGroup.id,
        brandId: premierBrandId,
        categoryId: proteineCategory[0].id,
        description: `HIGH PRO RELEASE è un integratore alimentare in polvere di proteine del latte e del pisello, gusto ${flavor}.`,
        flavor: flavor,
        size: "1kg",
        isNew: false
      }).returning();

      await db.insert(productSizes).values({
        productId: highProProduct.id,
        value: "1",
        unit: "kg",
        price: 5850 // €58,50 (CORRETTO dal file .md)
      });

      await db.insert(productImages).values({
        productId: highProProduct.id,
        src: "HIGH-PRO-RELEASE-SITO.png",
        alt: `High Pro Release ${flavor} 1kg`,
        isPrimary: true
      });
    }

    console.log('✅ Prodotti 3-4 inseriti con prezzi corretti!');
    console.log('📊 Riepilogo prezzi corretti:');
    console.log('  • Glutamine Pure 1000: €24,90 e €36,90 ✓');
    console.log('  • High Pro Release: €58,50 ✓');

  } catch (error) {
    console.error('💥 Errore durante l\'inserimento Parte 2:', error);
    throw error;
  }
}

insertBatch9CorrectPart2()
  .then(() => {
    console.log("🎉 Parte 2 inserimento Batch 9 corretto completata!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("💥 Errore fatale:", error);
    process.exit(1);
  });