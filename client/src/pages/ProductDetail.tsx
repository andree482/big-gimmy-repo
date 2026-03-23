import { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Star, Package, Shield, Clock, Award, AlertTriangle, Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductVariantSelector from "@/components/ProductVariantSelector";
import { FavoriteButton } from "@/components/FavoriteButton";
import { getProductVariants, getProductVariantsList, formatEuropeanPrice } from "@/lib/productVariants";
import { useCartContext } from "@/components/cart/CartProvider";
import { useToast } from "@/hooks/use-toast";
import { AddToCartDialog } from "@/components/cart/AddToCartDialog";

// Interface locale per varianti prodotto (prezzi ora vengono dall'API)
interface ProductVariant {
  flavor: string;
  size: string;
  price: number;
  originalPrice?: number;
  image: string;
  inStock: boolean;
}

// Funzione per ottenere immagini specifiche per variante
function getVariantSpecificImage(slug: string, size: string): string | null {
  if (slug === 'citrullina-malato-175g') {
    if (size?.includes('capsule') || size === '90capsule') {
      return '/images/integratore-citrullina-malato-90-cpr.jpg';
    }
    if (size?.includes('175g') || size === '175g') {
      return '/images/citrullina-malato-175g-limone.png';
    }
  }
  return null;
}

// Funzione per renderizzare tabelle nutrizionali dinamiche dal database
const renderDynamicNutritionalTable = (features: any, productSlug: string) => {
  if (!features) return null;
  
  try {
    // Parsing delle features se sono una stringa JSON
    let nutritionalData = features;
    if (typeof features === 'string') {
      nutritionalData = JSON.parse(features);
    }
    
    // Cerco i valori nutrizionali per porzione dal database
    // Aggiungo supporto per i nuovi formati del batch 8 (per_dose_3g, per_dose_6g, etc.)
    const nutritionalValuesPer30g = nutritionalData?.valori_nutrizionali?.per_porzione || 
                                    nutritionalData?.valori_nutrizionali?.per_dose || 
                                    nutritionalData?.per_porzione || 
                                    nutritionalData?.per_dose ||
                                    // Batch 8: cerca tutti i formati per_dose_*
                                    nutritionalData?.valori_nutrizionali?.per_dose_3g ||
                                    nutritionalData?.valori_nutrizionali?.per_dose_6g ||
                                    nutritionalData?.valori_nutrizionali?.per_dose_5g ||
                                    nutritionalData?.valori_nutrizionali?.per_dose_8g ||
                                    nutritionalData?.valori_nutrizionali?.per_dose_15g ||
                                    nutritionalData?.valori_nutrizionali?.per_dose_30g ||
                                    nutritionalData?.valori_nutrizionali?.per_dose_40g ||
                                    nutritionalData?.valori_nutrizionali?.per_dose_50g ||
                                    nutritionalData?.valori_nutrizionali?.per_compressa ||
                                    nutritionalData?.valori_nutrizionali?.per_porzione ||
                                    // Batch 9: aggiunto supporto per formato "per_2_buste"
                                    nutritionalData?.valori_nutrizionali?.per_2_buste ||
                                    // Anche per altri formati
                                    Object.values(nutritionalData?.valori_nutrizionali || {}).find(v => 
                                      typeof v === 'object' && v !== null
                                    );

    // Per prodotti dimagranti, NON gestiamo i valori per 100g
    const isDimagrantiProduct = productSlug.includes('stack-fire-boost') || productSlug.includes('weight-control-new-formula') ||
                               productSlug.includes('dima-therm') || productSlug.includes('kal-redux') ||
                               productSlug.includes('hard-stack-red-hot') || productSlug.includes('hard-acetyl-1000') ||
                               productSlug.includes('alc-plus-1000') || productSlug.includes('cla-1000') ||
                               productSlug.includes('lipoic-1000') || productSlug.includes('thermo-caffeine') ||
                               productSlug.includes('thermo-no-caffeine');

    // Prodotti che NON devono mostrare la colonna "Per 100g"
    const hideColumn100gProducts = [
      'intra-pro-essential-plus-premier-agrumi-200g',
      'd3-k2-complex-premier-unico-90-perle',
      'hard-zma-xp-premier-unico-90-compresse',
      'arginine-no-premier-unico-90-compresse',
      'hard-eaa-8-1-premier-unico-150-compresse'
    ];
    const shouldHideColumn100g = hideColumn100gProducts.includes(productSlug);

    // Per altri prodotti, gestisci i valori per 100g se disponibili (eccetto quelli che devono nascondere la colonna)
    const nutritionalValuesPer100g = !isDimagrantiProduct && !shouldHideColumn100g ? 
                                     (nutritionalData?.valori_nutrizionali?.per_100g || nutritionalData?.per_100g) : 
                                     null;

    if (!nutritionalValuesPer30g) return null;

    // Estraggo i valori per porzione - gestisce sia formato array che oggetto
    let valoriPer30g = nutritionalValuesPer30g.valori || nutritionalValuesPer30g;
    
    // Se è un oggetto (formato batch 7), convertilo in array
    if (!Array.isArray(valoriPer30g) && typeof valoriPer30g === 'object') {
      valoriPer30g = Object.entries(valoriPer30g)
        .filter(([key, value]) => key !== 'porzione' && value) // Escludi 'porzione' e valori vuoti
        .map(([key, value]) => ({
          componente: key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          valore: value
        }));
    }
    
    if (!Array.isArray(valoriPer30g)) return null;

    // Estraggo i valori per 100g se disponibili (solo per prodotti non dimagranti)
    let valoriPer100g = [];
    if (nutritionalValuesPer100g) {
      if (nutritionalValuesPer100g.valori) {
        // Formato batch 7 con array nella proprietà valori
        valoriPer100g = nutritionalValuesPer100g.valori;
      } else if (typeof nutritionalValuesPer100g === 'object') {
        // Formato Premier batch 8 con oggetto diretto
        valoriPer100g = Object.entries(nutritionalValuesPer100g)
          .map(([key, value]) => ({
            componente: key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
            valore: value
          }));
      }
    }

    // Prodotti speciali che devono mostrare solo la colonna per porzione
    const singleColumnProducts = ['whey-protein-80', 'whey-protein-90', 'xxx-hydrolysed-protein-90', 'say-protein-221'];
    
    // Prodotti Premier batch 8 NON devono più essere forzati a colonna singola
    // Ora possono mostrare entrambe le colonne (dose + 100g) se i dati 100g esistono
    const premierBatch8SingleColumn: string[] = [
      // Lista vuota - i prodotti Premier ora possono mostrare colonna 100g se disponibile
    ];
    
    const showSingleColumn = singleColumnProducts.includes(productSlug) || 
                           premierBatch8SingleColumn.includes(productSlug) || 
                           isDimagrantiProduct || 
                           shouldHideColumn100g;

    // Determino l'etichetta della colonna porzione
    let portionLabel = 'Per 30 g**';
    if (productSlug === 'perfect-mass') {
      portionLabel = 'Per 79 g**';
    } else if (productSlug === 'iso-soya') {
      portionLabel = 'Per 40 g**';
    } else if (productSlug === 'cla-1000-why-sport') {
      portionLabel = 'Per 2 capsule**';
    } else if (nutritionalValuesPer30g?.porzione) {
      // Per prodotti batch 7 usa la porzione specifica dal database
      portionLabel = `Per ${nutritionalValuesPer30g.porzione}`;
    } else {
      // Batch 8: determina automaticamente l'etichetta dalla chiave trovata
      if (nutritionalData?.valori_nutrizionali) {
        const keys = Object.keys(nutritionalData.valori_nutrizionali);
        const doseKey = keys.find(key => key.startsWith('per_dose_') || key.startsWith('per_compressa') || key === 'per_porzione');
        if (doseKey) {
          if (doseKey === 'per_dose_3g') portionLabel = 'Per 3 g**';
          else if (doseKey === 'per_dose_6g') portionLabel = 'Per 6 g**';
          else if (doseKey === 'per_dose_5g') portionLabel = 'Per 5 g**';
          else if (doseKey === 'per_dose_8g') portionLabel = 'Per 8 g**';
          else if (doseKey === 'per_dose_15g') portionLabel = 'Per 15 g**';
          else if (doseKey === 'per_dose_30g') portionLabel = 'Per 30 g**';
          else if (doseKey === 'per_dose_40g') portionLabel = 'Per 40 g**';
          else if (doseKey === 'per_dose_50g') portionLabel = 'Per 50 g**';
          else if (doseKey === 'per_compressa') portionLabel = 'Per compressa**';
          else if (doseKey === 'per_2_buste') portionLabel = 'Per 2 buste**';
          else if (doseKey.startsWith('per_dose_')) {
            const amount = doseKey.replace('per_dose_', '');
            portionLabel = `Per ${amount}**`;
          }
        }
      }
    }

    if (showSingleColumn) {
      // Layout a colonna singola per prodotti speciali
      return (
        <div className="nutrition-table">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="border p-2 text-left">Valori medi</th>
                <th className="border p-2 text-left">{portionLabel}</th>
              </tr>
            </thead>
            <tbody>
              {valoriPer30g.map((item: any, index: number) => {
                if (!item.componente || !item.valore) return null;

                // Determino lo stile del testo basato sul componente
                let textClass = '';
                if (item.componente.toLowerCase().includes('proteine')) {
                  textClass = 'font-bold text-blue-600';
                } else if (item.componente.toLowerCase().includes('energia')) {
                  textClass = 'font-bold';
                } else if (item.componente.toLowerCase().includes('calcio')) {
                  textClass = 'font-bold text-green-600';
                }

                return (
                  <tr key={index}>
                    <td className="border p-2">{item.componente}</td>
                    <td className={`border p-2 ${textClass}`}>{item.valore}</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <td className="border p-2 text-sm text-gray-600" colSpan={2}>*VNR: Valori Nutritivi di Riferimento</td>
              </tr>
            </tfoot>
          </table>
        </div>
      );
    }

    // Layout standard a due colonne per altri prodotti
    // Creo una mappa per i valori per 100g per facilitare il lookup
    const valori100gMap = new Map();
    valoriPer100g.forEach((item: any) => {
      if (item.componente && item.valore) {
        valori100gMap.set(item.componente, item.valore);
      }
    });

    // Tabella standard a due colonne
    return (
      <div className="nutrition-table">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="border p-2 text-left">Valori medi</th>
              <th className="border p-2 text-left">Per 100 g</th>
              <th className="border p-2 text-left">{portionLabel}</th>
            </tr>
          </thead>
          <tbody>
            {valoriPer30g.map((item: any, index: number) => {
              if (!item.componente || !item.valore) return null;

              // Cerco il valore corrispondente per 100g dal database
              const valorePer100g = valori100gMap.get(item.componente) || '-';

              // Determino lo stile del testo basato sul componente
              let textClass = '';
              if (item.componente.toLowerCase().includes('proteine')) {
                textClass = 'font-bold text-blue-600';
              } else if (item.componente.toLowerCase().includes('energia')) {
                textClass = 'font-bold';
              } else if (item.componente.toLowerCase().includes('calcio')) {
                textClass = 'font-bold text-green-600';
              }

              return (
                <tr key={index}>
                  <td className="border p-2">{item.componente}</td>
                  <td className={`border p-2 ${textClass}`}>{valorePer100g}</td>
                  <td className={`border p-2 ${textClass}`}>{item.valore}</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td className="border p-2 text-sm text-gray-600" colSpan={3}>*VNR: Valori Nutritivi di Riferimento</td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  } catch (error) {
    return null;
  }
};

// Funzione per ottenere i valori nutrizionali specifici per prodotto
const getNutritionalInfo = (productSlug: string) => {
    const nutritionalData: Record<string, any> = {
      "korean-red-ginseng": (
        <div className="nutrition-table">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50"><th className="border p-2 text-left">Valori Nutrizionali</th><th className="border p-2 text-left">Per 1 compressa</th></tr>
            </thead>
            <tbody>
              <tr><td className="border p-2">Estratto secco di Ginseng rosso coreano</td><td className="border p-2 font-bold">500 mg</td></tr>
              <tr><td className="border p-2">di cui ginsenosidi (7%)</td><td className="border p-2 font-bold text-blue-600">35 mg</td></tr>
            </tbody>
          </table>
        </div>
      ),

      "echinacea-purpurea": (
        <div className="nutrition-table">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50"><th className="border p-2 text-left">Valori Nutrizionali</th><th className="border p-2 text-left">Per 1 capsula</th></tr>
            </thead>
            <tbody>
              <tr><td className="border p-2">Estratto secco di Echinacea purpurea</td><td className="border p-2 font-bold">400 mg</td></tr>
              <tr><td className="border p-2">di cui polifenoli (4%)</td><td className="border p-2 font-bold text-blue-600">16 mg</td></tr>
            </tbody>
          </table>
        </div>
      ),

      "selenio-100-jamieson": (
        <div className="nutrition-table">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50"><th className="border p-2 text-left">Valori Nutrizionali</th><th className="border p-2 text-left">Per 1 compressa</th><th className="border p-2 text-left">%VNR*</th></tr>
            </thead>
            <tbody>
              <tr><td className="border p-2">Selenio</td><td className="border p-2 font-bold">100 μg</td><td className="border p-2 font-bold text-green-600">182%</td></tr>
            </tbody>
            <tfoot>
              <tr><td className="border p-2 text-sm text-gray-600" colSpan={3}>*Valori Nutritivi di Riferimento</td></tr>
            </tfoot>
          </table>
        </div>
      ),

      "calcio-citrato-d3-jamieson": (
        <div className="nutrition-table">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50"><th className="border p-2 text-left">Valori Nutrizionali</th><th className="border p-2 text-left">Per 2 compresse</th><th className="border p-2 text-left">%VNR*</th></tr>
            </thead>
            <tbody>
              <tr><td className="border p-2">Calcio (da citrato)</td><td className="border p-2 font-bold">500 mg</td><td className="border p-2 font-bold text-green-600">63%</td></tr>
              <tr><td className="border p-2">Vitamina D3</td><td className="border p-2 font-bold">400 UI (10 μg)</td><td className="border p-2 font-bold text-green-600">200%</td></tr>
            </tbody>
            <tfoot>
              <tr><td className="border p-2 text-sm text-gray-600" colSpan={3}>*Valori Nutritivi di Riferimento</td></tr>
            </tfoot>
          </table>
        </div>
      ),

      "licopene-jamieson": (
        <div className="nutrition-table">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50"><th className="border p-2 text-left">Valori Nutrizionali</th><th className="border p-2 text-left">Per 1 compressa</th></tr>
            </thead>
            <tbody>
              <tr><td className="border p-2">Licopene (da estratto di pomodoro)</td><td className="border p-2 font-bold">10 mg</td></tr>
              <tr><td className="border p-2 text-sm text-gray-600">Equivalente a circa 10kg di pomodori freschi</td><td className="border p-2">-</td></tr>
            </tbody>
          </table>
        </div>
      ),

      "vita-vim-multivitaminico-jamieson": (
        <div className="nutrition-table">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50"><th className="border p-2 text-left">Valori Nutrizionali</th><th className="border p-2 text-left">Per 1 compressa</th><th className="border p-2 text-left">%VNR*</th></tr>
            </thead>
            <tbody>
              <tr><td className="border p-2">Vitamina A</td><td className="border p-2 font-bold">800 μg</td><td className="border p-2 font-bold text-green-600">100%</td></tr>
              <tr><td className="border p-2">Vitamina D</td><td className="border p-2 font-bold">5 μg</td><td className="border p-2 font-bold text-green-600">100%</td></tr>
              <tr><td className="border p-2">Vitamina C</td><td className="border p-2 font-bold">80 mg</td><td className="border p-2 font-bold text-green-600">100%</td></tr>
              <tr><td className="border p-2">Ferro</td><td className="border p-2 font-bold">14 mg</td><td className="border p-2 font-bold text-green-600">100%</td></tr>
              <tr><td className="border p-2">Zinco</td><td className="border p-2 font-bold">10 mg</td><td className="border p-2 font-bold text-green-600">100%</td></tr>
              <tr><td className="border p-2 text-sm">+ altre 18 vitamine e minerali</td><td className="border p-2">-</td><td className="border p-2">-</td></tr>
            </tbody>
            <tfoot>
              <tr><td className="border p-2 text-sm text-gray-600" colSpan={3}>*Valori Nutritivi di Riferimento</td></tr>
            </tfoot>
          </table>
        </div>
      ),

      "lutein-z-jamieson": (
        <div className="nutrition-table">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50"><th className="border p-2 text-left">Valori Nutrizionali</th><th className="border p-2 text-left">Per 1 capsula</th></tr>
            </thead>
            <tbody>
              <tr><td className="border p-2">Luteina</td><td className="border p-2 font-bold">10 mg</td></tr>
              <tr><td className="border p-2">Zeaxantina</td><td className="border p-2 font-bold">2 mg</td></tr>
              <tr><td className="border p-2 text-sm text-gray-600">Equivalente a oltre 2kg di spinaci freschi</td><td className="border p-2">-</td></tr>
            </tbody>
          </table>
        </div>
      ),

      "spirulina-jamieson": (
        <div className="nutrition-table">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50"><th className="border p-2 text-left">Valori Nutrizionali</th><th className="border p-2 text-left">Per 3 capsule (1,5g)</th><th className="border p-2 text-left">%VNR*</th></tr>
            </thead>
            <tbody>
              <tr><td className="border p-2">Proteine</td><td className="border p-2 font-bold">900 mg</td><td className="border p-2">-</td></tr>
              <tr><td className="border p-2">Ferro</td><td className="border p-2 font-bold">5 mg</td><td className="border p-2 font-bold text-green-600">36%</td></tr>
              <tr><td className="border p-2">Vitamina B12</td><td className="border p-2 font-bold">6 μg</td><td className="border p-2 font-bold text-green-600">240%</td></tr>
              <tr><td className="border p-2">Beta-carotene</td><td className="border p-2 font-bold">3 mg</td><td className="border p-2">-</td></tr>
              <tr><td className="border p-2">Clorofilla</td><td className="border p-2 font-bold">15 mg</td><td className="border p-2">-</td></tr>
            </tbody>
            <tfoot>
              <tr><td className="border p-2 text-sm text-gray-600" colSpan={3}>*Valori Nutritivi di Riferimento</td></tr>
            </tfoot>
          </table>
        </div>
      ),

      "olio-di-lino-jamieson": (
        <div className="nutrition-table">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50"><th className="border p-2 text-left">Valori Nutrizionali</th><th className="border p-2 text-left">Per 2 softgel</th></tr>
            </thead>
            <tbody>
              <tr><td className="border p-2">Olio di lino</td><td className="border p-2 font-bold">1000 mg</td></tr>
              <tr><td className="border p-2">Acido alfa-linolenico (ALA)</td><td className="border p-2 font-bold text-blue-600">550 mg</td></tr>
              <tr><td className="border p-2">Omega-3 totali</td><td className="border p-2 font-bold">600 mg</td></tr>
            </tbody>
          </table>
        </div>
      ),

      "omega-3-select-mini-jamieson": (
        <div className="nutrition-table">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50"><th className="border p-2 text-left">Valori Nutrizionali</th><th className="border p-2 text-left">Per 2 mini capsule</th></tr>
            </thead>
            <tbody>
              <tr><td className="border p-2">EPA (acido eicosapentaenoico)</td><td className="border p-2 font-bold text-blue-600">300 mg</td></tr>
              <tr><td className="border p-2">DHA (acido docosaesaenoico)</td><td className="border p-2 font-bold text-blue-600">200 mg</td></tr>
              <tr><td className="border p-2">Omega-3 totali</td><td className="border p-2 font-bold">500 mg</td></tr>
            </tbody>
          </table>
        </div>
      ),

      "omega-complete-krill-jamieson": (
        <div className="nutrition-table">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50"><th className="border p-2 text-left">Valori Nutrizionali</th><th className="border p-2 text-left">Per 2 softgel</th></tr>
            </thead>
            <tbody>
              <tr><td className="border p-2">Olio di Krill</td><td className="border p-2 font-bold">1000 mg</td></tr>
              <tr><td className="border p-2">EPA (acido eicosapentaenoico)</td><td className="border p-2 font-bold text-blue-600">120 mg</td></tr>
              <tr><td className="border p-2">DHA (acido docosaesaenoico)</td><td className="border p-2 font-bold text-blue-600">70 mg</td></tr>
              <tr><td className="border p-2">Astaxantina</td><td className="border p-2 font-bold text-red-600">0,15 mg</td></tr>
            </tbody>
          </table>
        </div>
      ),

      "omega-3-extra-jamieson": (
        <div className="nutrition-table">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50"><th className="border p-2 text-left">Valori Nutrizionali</th><th className="border p-2 text-left">Per 1 softgel</th></tr>
            </thead>
            <tbody>
              <tr><td className="border p-2">EPA (acido eicosapentaenoico)</td><td className="border p-2 font-bold text-blue-600">420 mg</td></tr>
              <tr><td className="border p-2">DHA (acido docosaesaenoico)</td><td className="border p-2 font-bold text-blue-600">280 mg</td></tr>
              <tr><td className="border p-2">Omega-3 totali</td><td className="border p-2 font-bold">700 mg</td></tr>
            </tbody>
          </table>
        </div>
      ),

      "vitamina-c-masticabile-jamieson": (
        <div className="nutrition-table">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50"><th className="border p-2 text-left">Valori Nutrizionali</th><th className="border p-2 text-left">Per 2 compresse</th><th className="border p-2 text-left">%VNR*</th></tr>
            </thead>
            <tbody>
              <tr><td className="border p-2">Vitamina C</td><td className="border p-2 font-bold">1000 mg</td><td className="border p-2 font-bold text-green-600">1250%</td></tr>
            </tbody>
            <tfoot>
              <tr><td className="border p-2 text-sm text-gray-600" colSpan={3}>*Valori Nutritivi di Riferimento</td></tr>
            </tfoot>
          </table>
        </div>
      ),

      "vitamina-k2-d3-jamieson": (
        <div className="nutrition-table">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50"><th className="border p-2 text-left">Valori Nutrizionali</th><th className="border p-2 text-left">Per 1 softgel</th><th className="border p-2 text-left">%VNR*</th></tr>
            </thead>
            <tbody>
              <tr><td className="border p-2">Vitamina K2 (menachinone-7)</td><td className="border p-2 font-bold">120 μg</td><td className="border p-2 font-bold text-green-600">160%</td></tr>
              <tr><td className="border p-2">Vitamina D3</td><td className="border p-2 font-bold">1000 UI (25 μg)</td><td className="border p-2 font-bold text-green-600">500%</td></tr>
            </tbody>
            <tfoot>
              <tr><td className="border p-2 text-sm text-gray-600" colSpan={3}>*Valori Nutritivi di Riferimento</td></tr>
            </tfoot>
          </table>
        </div>
      ),

      "magnesio-tripla-azione-jamieson": (
        <div className="nutrition-table">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50"><th className="border p-2 text-left">Valori Nutrizionali</th><th className="border p-2 text-left">Per 1 compressa</th><th className="border p-2 text-left">%VNR*</th></tr>
            </thead>
            <tbody>
              <tr><td className="border p-2">Magnesio (da lattato, gluconato, ossido)</td><td className="border p-2 font-bold">250 mg</td><td className="border p-2 font-bold text-green-600">67%</td></tr>
            </tbody>
            <tfoot>
              <tr><td className="border p-2 text-sm text-gray-600" colSpan={3}>*Valori Nutritivi di Riferimento</td></tr>
            </tfoot>
          </table>
        </div>
      ),

      "calcio-650-why-sport": (
        <div className="nutrition-table">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50"><th className="border p-2 text-left">Valori Nutrizionali</th><th className="border p-2 text-left">Per 1 compressa</th><th className="border p-2 text-left">%VNR*</th></tr>
            </thead>
            <tbody>
              <tr><td className="border p-2">Calcio (da carbonato)</td><td className="border p-2 font-bold">650 mg</td><td className="border p-2 font-bold text-green-600">81%</td></tr>
            </tbody>
            <tfoot>
              <tr><td className="border p-2 text-sm text-gray-600" colSpan={3}>*Valori Nutritivi di Riferimento</td></tr>
            </tfoot>
          </table>
        </div>
      ),

      "ashwagandha-jamieson": (
        <div className="nutrition-table">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50"><th className="border p-2 text-left">Valori Nutrizionali</th><th className="border p-2 text-left">Per 1 compressa</th></tr>
            </thead>
            <tbody>
              <tr><td className="border p-2">Estratto di Ashwagandha (Withania somnifera)</td><td className="border p-2 font-bold">600 mg</td></tr>
              <tr><td className="border p-2">Standardizzato al 1,5% witanolidi</td><td className="border p-2 font-bold text-blue-600">9 mg</td></tr>
            </tbody>
          </table>
        </div>
      ),

      "alaform-800-premier": (
        <div className="nutrition-table">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50"><th className="border p-2 text-left">Valori Nutrizionali</th><th className="border p-2 text-left">Per 1 compressa</th></tr>
            </thead>
            <tbody>
              <tr><td className="border p-2">Acido alfa-lipoico</td><td className="border p-2 font-bold">800 mg</td></tr>
            </tbody>
          </table>
        </div>
      ),

      // PROTEINE WHY SPORT - WPC 100%
      "wpc-100-cookies-cream-2kg": (
        <div className="nutrition-table">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50"><th className="border p-2 text-left">Valori Nutrizionali</th><th className="border p-2 text-left">Per 30g</th><th className="border p-2 text-left">Per 100g</th></tr>
            </thead>
            <tbody>
              <tr><td className="border p-2">Energia</td><td className="border p-2 font-bold">116 kcal / 491 kJ</td><td className="border p-2">378 kcal / 1582 kJ</td></tr>
              <tr><td className="border p-2">Proteine</td><td className="border p-2 font-bold text-blue-600">22,5 g</td><td className="border p-2 font-bold">75 g</td></tr>
              <tr><td className="border p-2">Carboidrati</td><td className="border p-2">2,9 g</td><td className="border p-2">9,7 g</td></tr>
              <tr><td className="border p-2">di cui zuccheri</td><td className="border p-2">2,1 g</td><td className="border p-2">7 g</td></tr>
              <tr><td className="border p-2">Grassi</td><td className="border p-2">1,6 g</td><td className="border p-2">5,3 g</td></tr>
              <tr><td className="border p-2">di cui saturi</td><td className="border p-2">1,2 g</td><td className="border p-2">4,1 g</td></tr>
              <tr><td className="border p-2">Sale</td><td className="border p-2">0,2 g</td><td className="border p-2">-</td></tr>
              <tr><td className="border p-2">Calcio</td><td className="border p-2 font-bold text-green-600">299 mg (37% VNR*)</td><td className="border p-2">-</td></tr>
              <tr><td className="border p-2">Fosforo</td><td className="border p-2 font-bold text-green-600">220 mg (31% VNR*)</td><td className="border p-2">-</td></tr>
            </tbody>
            <tfoot>
              <tr><td className="border p-2 text-sm text-gray-600" colSpan={3}>*Valori Nutritivi di Riferimento</td></tr>
            </tfoot>
          </table>
        </div>
      ),

      "wpc-100-yogurt-fragola-2kg": (
        <div className="nutrition-table">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50"><th className="border p-2 text-left">Valori Nutrizionali</th><th className="border p-2 text-left">Per 30g</th><th className="border p-2 text-left">Per 100g</th></tr>
            </thead>
            <tbody>
              <tr><td className="border p-2">Energia</td><td className="border p-2 font-bold">116 kcal / 491 kJ</td><td className="border p-2">378 kcal / 1582 kJ</td></tr>
              <tr><td className="border p-2">Proteine</td><td className="border p-2 font-bold text-blue-600">22,5 g</td><td className="border p-2 font-bold">75 g</td></tr>
              <tr><td className="border p-2">Carboidrati</td><td className="border p-2">2,9 g</td><td className="border p-2">9,7 g</td></tr>
              <tr><td className="border p-2">di cui zuccheri</td><td className="border p-2">2,1 g</td><td className="border p-2">7 g</td></tr>
              <tr><td className="border p-2">Grassi</td><td className="border p-2">1,6 g</td><td className="border p-2">5,3 g</td></tr>
              <tr><td className="border p-2">di cui saturi</td><td className="border p-2">1,2 g</td><td className="border p-2">4,1 g</td></tr>
              <tr><td className="border p-2">Sale</td><td className="border p-2">0,2 g</td><td className="border p-2">-</td></tr>
              <tr><td className="border p-2">Calcio</td><td className="border p-2 font-bold text-green-600">299 mg (37% VNR*)</td><td className="border p-2">-</td></tr>
              <tr><td className="border p-2">Fosforo</td><td className="border p-2 font-bold text-green-600">220 mg (31% VNR*)</td><td className="border p-2">-</td></tr>
            </tbody>
            <tfoot>
              <tr><td className="border p-2 text-sm text-gray-600" colSpan={3}>*Valori Nutritivi di Riferimento</td></tr>
            </tfoot>
          </table>
        </div>
      ),

      "wpc-100-choco-milk-1kg": (
        <div className="nutrition-table">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50"><th className="border p-2 text-left">Valori Nutrizionali</th><th className="border p-2 text-left">Per 30g</th><th className="border p-2 text-left">Per 100g</th></tr>
            </thead>
            <tbody>
              <tr><td className="border p-2">Energia</td><td className="border p-2 font-bold">116 kcal / 491 kJ</td><td className="border p-2">378 kcal / 1582 kJ</td></tr>
              <tr><td className="border p-2">Proteine</td><td className="border p-2 font-bold text-blue-600">22,5 g</td><td className="border p-2 font-bold">75 g</td></tr>
              <tr><td className="border p-2">Carboidrati</td><td className="border p-2">2,9 g</td><td className="border p-2">9,7 g</td></tr>
              <tr><td className="border p-2">di cui zuccheri</td><td className="border p-2">2,1 g</td><td className="border p-2">7 g</td></tr>
              <tr><td className="border p-2">Grassi</td><td className="border p-2">1,6 g</td><td className="border p-2">5,3 g</td></tr>
              <tr><td className="border p-2">di cui saturi</td><td className="border p-2">1,2 g</td><td className="border p-2">4,1 g</td></tr>
              <tr><td className="border p-2">Sale</td><td className="border p-2">0,2 g</td><td className="border p-2">-</td></tr>
              <tr><td className="border p-2">Calcio</td><td className="border p-2 font-bold text-green-600">299 mg (37% VNR*)</td><td className="border p-2">-</td></tr>
              <tr><td className="border p-2">Fosforo</td><td className="border p-2 font-bold text-green-600">220 mg (31% VNR*)</td><td className="border p-2">-</td></tr>
            </tbody>
            <tfoot>
              <tr><td className="border p-2 text-sm text-gray-600" colSpan={3}>*Valori Nutritivi di Riferimento</td></tr>
            </tfoot>
          </table>
        </div>
      ),

      // PROTEINE PERFECT 100% WHEY - WHY SPORT
      "perfect-100-whey-pesca-450g": (
        <div className="nutrition-table">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50"><th className="border p-2 text-left">Valori Nutrizionali</th><th className="border p-2 text-left">Per 30g</th><th className="border p-2 text-left">Per 100g</th></tr>
            </thead>
            <tbody>
              <tr><td className="border p-2">Energia</td><td className="border p-2 font-bold">115 kcal / 486 kJ</td><td className="border p-2">384 kcal / 1620 kJ</td></tr>
              <tr><td className="border p-2">Proteine</td><td className="border p-2 font-bold text-blue-600">25,8 g</td><td className="border p-2 font-bold">86 g</td></tr>
              <tr><td className="border p-2">Carboidrati</td><td className="border p-2">1,8 g</td><td className="border p-2">6 g</td></tr>
              <tr><td className="border p-2">di cui zuccheri</td><td className="border p-2">1,8 g</td><td className="border p-2">6 g</td></tr>
              <tr><td className="border p-2">Grassi</td><td className="border p-2">0,3 g</td><td className="border p-2">1 g</td></tr>
              <tr><td className="border p-2">di cui saturi</td><td className="border p-2">0,2 g</td><td className="border p-2">0,7 g</td></tr>
              <tr><td className="border p-2">Sale</td><td className="border p-2">0,14 g</td><td className="border p-2">0,47 g</td></tr>
              <tr><td className="border p-2">BCAA</td><td className="border p-2 font-bold text-green-600">5,16 g (20%)</td><td className="border p-2">-</td></tr>
            </tbody>
            <tfoot>
              <tr><td className="border p-2 text-sm text-gray-600" colSpan={3}>*Proteine isolate del siero Isolac®</td></tr>
            </tfoot>
          </table>
        </div>
      ),

      "perfect-100-whey-vaniglia-900g": (
        <div className="nutrition-table">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50"><th className="border p-2 text-left">Valori Nutrizionali</th><th className="border p-2 text-left">Per 30g</th><th className="border p-2 text-left">Per 100g</th></tr>
            </thead>
            <tbody>
              <tr><td className="border p-2">Energia</td><td className="border p-2 font-bold">115 kcal / 486 kJ</td><td className="border p-2">384 kcal / 1620 kJ</td></tr>
              <tr><td className="border p-2">Proteine</td><td className="border p-2 font-bold text-blue-600">25,8 g</td><td className="border p-2 font-bold">86 g</td></tr>
              <tr><td className="border p-2">Carboidrati</td><td className="border p-2">1,8 g</td><td className="border p-2">6 g</td></tr>
              <tr><td className="border p-2">di cui zuccheri</td><td className="border p-2">1,8 g</td><td className="border p-2">6 g</td></tr>
              <tr><td className="border p-2">Grassi</td><td className="border p-2">0,3 g</td><td className="border p-2">1 g</td></tr>
              <tr><td className="border p-2">di cui saturi</td><td className="border p-2">0,2 g</td><td className="border p-2">0,7 g</td></tr>
              <tr><td className="border p-2">Sale</td><td className="border p-2">0,14 g</td><td className="border p-2">0,47 g</td></tr>
              <tr><td className="border p-2">BCAA</td><td className="border p-2 font-bold text-green-600">5,16 g (20%)</td><td className="border p-2">-</td></tr>
            </tbody>
            <tfoot>
              <tr><td className="border p-2 text-sm text-gray-600" colSpan={3}>*Proteine isolate del siero Isolac®</td></tr>
            </tfoot>
          </table>
        </div>
      ),

      "essential-100-whey-vaniglia-900g": (
        <div className="nutrition-table">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50"><th className="border p-2 text-left">Valori Nutrizionali</th><th className="border p-2 text-left">Per 30g</th><th className="border p-2 text-left">Per 100g</th></tr>
            </thead>
            <tbody>
              <tr><td className="border p-2">Energia</td><td className="border p-2 font-bold">117 kcal / 494 kJ</td><td className="border p-2">391 kcal / 1648 kJ</td></tr>
              <tr><td className="border p-2">Proteine</td><td className="border p-2 font-bold text-blue-600">24 g</td><td className="border p-2 font-bold">80 g</td></tr>
              <tr><td className="border p-2">Carboidrati</td><td className="border p-2">3,6 g</td><td className="border p-2">12 g</td></tr>
              <tr><td className="border p-2">di cui zuccheri</td><td className="border p-2">3,3 g</td><td className="border p-2">11 g</td></tr>
              <tr><td className="border p-2">Grassi</td><td className="border p-2">0,75 g</td><td className="border p-2">2,5 g</td></tr>
              <tr><td className="border p-2">di cui saturi</td><td className="border p-2">0,48 g</td><td className="border p-2">1,6 g</td></tr>
              <tr><td className="border p-2">Sale</td><td className="border p-2">0,18 g</td><td className="border p-2">0,6 g</td></tr>
            </tbody>
            <tfoot>
              <tr><td className="border p-2 text-sm text-gray-600" colSpan={3}>*Concentrato proteine siero latte</td></tr>
            </tfoot>
          </table>
        </div>
      ),

      "essential-100-whey": (
        <div className="nutrition-table">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50"><th className="border p-2 text-left">Valori medi</th><th className="border p-2 text-left">Per 100 g</th><th className="border p-2 text-left">Per 30 g**</th></tr>
            </thead>
            <tbody>
              <tr><td className="border p-2">Energia</td><td className="border p-2 font-bold">1691 kJ / 404 kcal</td><td className="border p-2 font-bold">507 kJ / 121 kcal</td></tr>
              <tr><td className="border p-2">Grassi</td><td className="border p-2">6,5 g</td><td className="border p-2">2,0 g</td></tr>
              <tr><td className="border p-2">- di cui acidi grassi saturi</td><td className="border p-2">4,4 g</td><td className="border p-2">1,3 g</td></tr>
              <tr><td className="border p-2">Carboidrati</td><td className="border p-2">7,2 g</td><td className="border p-2">2,2 g</td></tr>
              <tr><td className="border p-2">- di cui zuccheri</td><td className="border p-2">5,4 g</td><td className="border p-2">1,6 g</td></tr>
              <tr><td className="border p-2">Fibre</td><td className="border p-2">2,5 g</td><td className="border p-2">0,8 g</td></tr>
              <tr><td className="border p-2">Proteine</td><td className="border p-2 font-bold text-blue-600">78 g</td><td className="border p-2 font-bold text-blue-600">23,4 g</td></tr>
              <tr><td className="border p-2">Sale</td><td className="border p-2">1,0 g</td><td className="border p-2">0,3 g</td></tr>
              <tr><td className="border p-2">Calcio</td><td className="border p-2">436 mg</td><td className="border p-2">130 mg (16% VNR*)</td></tr>
              <tr><td className="border p-2">Creatina monoidrato</td><td className="border p-2 font-bold text-green-600">7,0 g</td><td className="border p-2 font-bold text-green-600">2,1 g</td></tr>
            </tbody>
            <tfoot>
              <tr><td className="border p-2 text-sm text-gray-600" colSpan={3}>*VNR: Valori Nutritivi di Riferimento</td></tr>
            </tfoot>
          </table>
        </div>
      ),



      "hydrolyzed-100-whey": (
        <div className="nutrition-table">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50"><th className="border p-2 text-left">Valori medi</th><th className="border p-2 text-left">Per 100 g</th><th className="border p-2 text-left">Per 30 g</th></tr>
            </thead>
            <tbody>
              <tr><td className="border p-2">Energia</td><td className="border p-2 font-bold">1498 kJ / 359 kcal</td><td className="border p-2 font-bold">476 kJ / 112 kcal</td></tr>
              <tr><td className="border p-2">Grassi</td><td className="border p-2">1,1 g</td><td className="border p-2">0,33 g</td></tr>
              <tr><td className="border p-2">- di cui saturi</td><td className="border p-2">0,4 g</td><td className="border p-2">0,13 g</td></tr>
              <tr><td className="border p-2">Carboidrati</td><td className="border p-2">3,2 g</td><td className="border p-2">0,96 g</td></tr>
              <tr><td className="border p-2">- di cui zuccheri</td><td className="border p-2">1,0 g</td><td className="border p-2">0,29 g</td></tr>
              <tr><td className="border p-2">Fibre</td><td className="border p-2">—</td><td className="border p-2">—</td></tr>
              <tr><td className="border p-2">Proteine</td><td className="border p-2 font-bold text-blue-600">92 g</td><td className="border p-2 font-bold text-blue-600">27,6 g</td></tr>
              <tr><td className="border p-2">Sale</td><td className="border p-2">0,86 g</td><td className="border p-2">0,26 g</td></tr>
            </tbody>
          </table>
        </div>
      ),

      "iso-soya": (
        <div className="nutrition-table">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50"><th className="border p-2 text-left">Valori medi</th><th className="border p-2 text-left">Per 100 g</th><th className="border p-2 text-left">Per 40 g</th></tr>
            </thead>
            <tbody>
              <tr><td className="border p-2">Energia</td><td className="border p-2 font-bold">1689 kJ / 397 kcal</td><td className="border p-2 font-bold">675 kJ / 159 kcal</td></tr>
              <tr><td className="border p-2">Grassi</td><td className="border p-2">3,5 g</td><td className="border p-2">1,4 g</td></tr>
              <tr><td className="border p-2">- di cui saturi</td><td className="border p-2">0,8 g</td><td className="border p-2">0,3 g</td></tr>
              <tr><td className="border p-2">Carboidrati</td><td className="border p-2">1,5 g</td><td className="border p-2">0,6 g</td></tr>
              <tr><td className="border p-2">- di cui zuccheri</td><td className="border p-2">1,0 g</td><td className="border p-2">0,4 g</td></tr>
              <tr><td className="border p-2">Proteine</td><td className="border p-2 font-bold text-blue-600">90 g</td><td className="border p-2 font-bold text-blue-600">36 g</td></tr>
              <tr><td className="border p-2">Sale</td><td className="border p-2">1 g</td><td className="border p-2">0,4 g</td></tr>
            </tbody>
          </table>
        </div>
      ),

      "milk-protein-90-micellar-casein": (
        <div className="nutrition-table">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50"><th className="border p-2 text-left">Componente</th><th className="border p-2 text-left">Per 100g</th><th className="border p-2 text-left">Per 25g</th></tr>
            </thead>
            <tbody>
              <tr><td className="border p-2">Energia</td><td className="border p-2 font-bold">1560 kJ / 368 kcal</td><td className="border p-2 font-bold">390 kJ / 92 kcal</td></tr>
              <tr><td className="border p-2">Grassi</td><td className="border p-2">3,2 g</td><td className="border p-2">0,8 g</td></tr>
              <tr><td className="border p-2">- di cui saturi</td><td className="border p-2">1,6 g</td><td className="border p-2">0,4 g</td></tr>
              <tr><td className="border p-2">Carboidrati</td><td className="border p-2">0 g</td><td className="border p-2">0 g</td></tr>
              <tr><td className="border p-2">- di cui zuccheri</td><td className="border p-2">0 g</td><td className="border p-2">0 g</td></tr>
              <tr><td className="border p-2">Fibre</td><td className="border p-2">2,4 g</td><td className="border p-2">0,6 g</td></tr>
              <tr><td className="border p-2">Proteine</td><td className="border p-2 font-bold text-blue-600">84 g</td><td className="border p-2 font-bold text-blue-600">21 g</td></tr>
              <tr><td className="border p-2">Sale</td><td className="border p-2">0,08 g</td><td className="border p-2">0,02 g</td></tr>
              <tr><td className="border p-2">Vitamina C</td><td className="border p-2 text-green-600">56 mg</td><td className="border p-2 text-green-600">14 mg</td></tr>
              <tr><td className="border p-2">Vitamina E</td><td className="border p-2 text-green-600">9,2 mg</td><td className="border p-2 text-green-600">2,3 mg</td></tr>
              <tr><td className="border p-2">Tiamina (Vit. B1)</td><td className="border p-2 text-green-600">1,32 mg</td><td className="border p-2 text-green-600">0,33 mg</td></tr>
              <tr><td className="border p-2">Riboflavina (Vit. B2)</td><td className="border p-2 text-green-600">1,48 mg</td><td className="border p-2 text-green-600">0,37 mg</td></tr>
              <tr><td className="border p-2">Vitamina B6</td><td className="border p-2 text-green-600">1,88 mg</td><td className="border p-2 text-green-600">0,47 mg</td></tr>
            </tbody>
          </table>
        </div>
      ),

      "perfect-100-whey": (
        <div className="nutrition-table">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50"><th className="border p-2 text-left">Componente</th><th className="border p-2 text-left">Per 100g</th><th className="border p-2 text-left">Per 30g</th></tr>
            </thead>
            <tbody>
              <tr><td className="border p-2">Energia</td><td className="border p-2 font-bold">1658 kJ / 396 kcal</td><td className="border p-2 font-bold">497 kJ / 119 kcal</td></tr>
              <tr><td className="border p-2">Grassi</td><td className="border p-2">2,4 g</td><td className="border p-2">0,7 g</td></tr>
              <tr><td className="border p-2">- di cui saturi</td><td className="border p-2">1,7 g</td><td className="border p-2">0,5 g</td></tr>
              <tr><td className="border p-2">Carboidrati</td><td className="border p-2">2,6 g</td><td className="border p-2">0,8 g</td></tr>
              <tr><td className="border p-2">- di cui zuccheri</td><td className="border p-2">1,1 g</td><td className="border p-2">0,3 g</td></tr>
              <tr><td className="border p-2">Fibre</td><td className="border p-2">2,0 g</td><td className="border p-2">0,6 g</td></tr>
              <tr><td className="border p-2">Proteine</td><td className="border p-2 font-bold text-blue-600">90 g</td><td className="border p-2 font-bold text-blue-600">27 g</td></tr>
              <tr><td className="border p-2">Sale</td><td className="border p-2">0,4 g</td><td className="border p-2">0,12 g</td></tr>
              <tr><td className="border p-2">Calcio</td><td className="border p-2 text-green-600">458 mg</td><td className="border p-2 text-green-600">137 mg</td></tr>
            </tbody>
          </table>
        </div>
      ),

      "perfect-blend-90": (
        <div className="nutrition-table">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50"><th className="border p-2 text-left">Componente</th><th className="border p-2 text-left">Per 100g</th><th className="border p-2 text-left">Per 30g</th></tr>
            </thead>
            <tbody>
              <tr><td className="border p-2">Energia</td><td className="border p-2 font-bold">1715 kJ / 410 kcal</td><td className="border p-2 font-bold">515 kJ / 123 kcal</td></tr>
              <tr><td className="border p-2">Grassi</td><td className="border p-2">1,3 g</td><td className="border p-2">0,4 g</td></tr>
              <tr><td className="border p-2">- di cui saturi</td><td className="border p-2">0,4 g</td><td className="border p-2">0,1 g</td></tr>
              <tr><td className="border p-2">Carboidrati</td><td className="border p-2">1,2 g</td><td className="border p-2">0,4 g</td></tr>
              <tr><td className="border p-2">- di cui zuccheri</td><td className="border p-2">1,2 g</td><td className="border p-2">0,4 g</td></tr>
              <tr><td className="border p-2">Fibre</td><td className="border p-2">0,0 g</td><td className="border p-2">0,0 g</td></tr>
              <tr><td className="border p-2">Proteine</td><td className="border p-2 font-bold text-blue-600">91 g</td><td className="border p-2 font-bold text-blue-600">27,3 g</td></tr>
              <tr><td className="border p-2">Sale</td><td className="border p-2">0,06 g</td><td className="border p-2">0,02 g</td></tr>
              <tr><td className="border p-2">Bromelina</td><td className="border p-2 text-purple-600">167 mg</td><td className="border p-2 text-purple-600">50 mg</td></tr>
              <tr><td className="border p-2">Lattasi</td><td className="border p-2 text-purple-600">2250 µg</td><td className="border p-2 text-purple-600">675 µg</td></tr>
            </tbody>
          </table>
        </div>
      ),

      "perfect-mass": (
        <div className="nutrition-table">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50"><th className="border p-2 text-left">Componente</th><th className="border p-2 text-left">Per 100g</th><th className="border p-2 text-left">Per 79g</th></tr>
            </thead>
            <tbody>
              <tr><td className="border p-2">Energia</td><td className="border p-2 font-bold">1576 kJ / 371 kcal</td><td className="border p-2 font-bold">1249 kJ / 294 kcal</td></tr>
              <tr><td className="border p-2">Grassi</td><td className="border p-2">0,3 g</td><td className="border p-2">0,2 g</td></tr>
              <tr><td className="border p-2">- di cui saturi</td><td className="border p-2">0,2 g</td><td className="border p-2">0,1 g</td></tr>
              <tr><td className="border p-2">Carboidrati</td><td className="border p-2 font-bold text-orange-600">64 g</td><td className="border p-2 font-bold text-orange-600">51 g</td></tr>
              <tr><td className="border p-2">- di cui zuccheri</td><td className="border p-2">30 g</td><td className="border p-2">24 g</td></tr>
              <tr><td className="border p-2">Fibre</td><td className="border p-2">0,09 g</td><td className="border p-2">0,07 g</td></tr>
              <tr><td className="border p-2">Proteine</td><td className="border p-2 font-bold text-blue-600">28 g</td><td className="border p-2 font-bold text-blue-600">22 g</td></tr>
              <tr><td className="border p-2">Sale</td><td className="border p-2">0,09 g</td><td className="border p-2">0,07 g</td></tr>
              <tr><td className="border p-2">Potassio</td><td className="border p-2 text-green-600">398 mg</td><td className="border p-2 text-green-600">318 mg</td></tr>
              <tr><td className="border p-2">Calcio</td><td className="border p-2 text-green-600">250 mg</td><td className="border p-2 text-green-600">200 mg</td></tr>
              <tr><td className="border p-2">Vitamina C</td><td className="border p-2 text-green-600">35 mg</td><td className="border p-2 text-green-600">28 mg</td></tr>
            </tbody>
          </table>
        </div>
      ),

      "say-protein-221": (
        <div className="nutrition-table">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50"><th className="border p-2 text-left">Componente</th><th className="border p-2 text-left">Per 100g</th><th className="border p-2 text-left">Per 30g</th></tr>
            </thead>
            <tbody>
              <tr><td className="border p-2">Energia</td><td className="border p-2 font-bold">1250 kJ / 367 kcal</td><td className="border p-2 font-bold">375 kJ / 110 kcal</td></tr>
              <tr><td className="border p-2">Grassi</td><td className="border p-2">4,3 g</td><td className="border p-2">1,3 g</td></tr>
              <tr><td className="border p-2">- di cui saturi</td><td className="border p-2">1,7 g</td><td className="border p-2">0,5 g</td></tr>
              <tr><td className="border p-2">Carboidrati</td><td className="border p-2">0,7 g</td><td className="border p-2">0,2 g</td></tr>
              <tr><td className="border p-2">- di cui zuccheri</td><td className="border p-2">0 g</td><td className="border p-2">0 g</td></tr>
              <tr><td className="border p-2">Fibre</td><td className="border p-2">1,7 g</td><td className="border p-2">0,5 g</td></tr>
              <tr><td className="border p-2">Proteine</td><td className="border p-2 font-bold text-blue-600">83,3 g</td><td className="border p-2 font-bold text-blue-600">25 g</td></tr>
              <tr><td className="border p-2">Sale</td><td className="border p-2">2,0 g</td><td className="border p-2">0,6 g</td></tr>
              <tr><td className="border p-2">Vitamina C</td><td className="border p-2 text-green-600">56,7 mg</td><td className="border p-2 text-green-600">17 mg</td></tr>
              <tr><td className="border p-2">Vitamina E</td><td className="border p-2 text-green-600">9,7 mg</td><td className="border p-2 text-green-600">2,9 mg</td></tr>
              <tr><td className="border p-2">Tiamina (Vit. B1)</td><td className="border p-2 text-green-600">1,37 mg</td><td className="border p-2 text-green-600">0,41 mg</td></tr>
            </tbody>
          </table>
        </div>
      )
    };

    const data = nutritionalData[productSlug];
    
    if (!data) {
      return (
        <div className="text-center py-8 text-gray-500">
          <p>Valori nutrizionali non disponibili per questo prodotto: {productSlug}</p>
          <p className="text-sm mt-2">Prodotti disponibili: {Object.keys(nutritionalData).join(', ')}</p>
        </div>
      );
    }
    
    return data;
  };

// Funzione separata per i valori nutrizionali delle proteine
const getProteinNutritionalInfo = (productSlug: string) => {
    const nutritionalData: Record<string, any> = {
    "barrettone-2-0": {
      title: "Valori nutrizionali per 100g",
      values: [
        { label: "Energia", value: "378 kcal" },
        { label: "Grassi", value: "10.4 g" },
        { label: "di cui saturi", value: "3.2 g" },
        { label: "Carboidrati", value: "35.7 g" },
        { label: "di cui zuccheri", value: "5.2 g" },
        { label: "Fibre", value: "15.8 g" },
        { label: "Proteine", value: "28.6 g" },
        { label: "Sale", value: "0.38 g" }
      ],
      portionInfo: {
        title: "Per porzione (70g)",
        values: ["Energia: 264 kcal", "Proteine: 20g", "Carboidrati: 25g", "Grassi: 7.3g"]
      }
    },
    "burn-out": {
      title: "Valori nutrizionali per 100ml",
      values: [
        { label: "Energia", value: "22 kcal" },
        { label: "Grassi", value: "0 g" },
        { label: "di cui saturi", value: "0 g" },
        { label: "Carboidrati", value: "5.2 g" },
        { label: "di cui zuccheri", value: "5.1 g" },
        { label: "Fibre", value: "0 g" },
        { label: "Proteine", value: "0.1 g" },
        { label: "Sale", value: "0.01 g" },
        { label: "L-Carnitina", value: "1000 mg" }
      ],
      portionInfo: {
        title: "Per dose giornaliera (20ml)",
        values: ["Energia: 4.4 kcal", "L-Carnitina: 200mg", "Estratti vegetali: 50mg"]
      }
    },
    "big-bar": {
      title: "Valori nutrizionali per 100g",
      values: [
        { label: "Energia", value: "420 kcal" },
        { label: "Grassi", value: "15.2 g" },
        { label: "di cui saturi", value: "8.1 g" },
        { label: "Carboidrati", value: "45.3 g" },
        { label: "di cui zuccheri", value: "38.2 g" },
        { label: "Fibre", value: "3.2 g" },
        { label: "Proteine", value: "18.5 g" },
        { label: "Sale", value: "0.25 g" }
      ],
      portionInfo: {
        title: "Per barretta (80g)",
        values: ["Energia: 336 kcal", "Proteine: 14.8g", "Carboidrati: 36.2g", "Grassi: 12.2g"]
      }
    },
    "fruitforce": {
      title: "Valori nutrizionali per 100g",
      values: [
        { label: "Energia", value: "290 kcal" },
        { label: "Grassi", value: "0.5 g" },
        { label: "di cui saturi", value: "0.1 g" },
        { label: "Carboidrati", value: "70.2 g" },
        { label: "di cui zuccheri", value: "45.8 g" },
        { label: "Fibre", value: "1.2 g" },
        { label: "Proteine", value: "0.8 g" },
        { label: "Sale", value: "0.15 g" }
      ],
      portionInfo: {
        title: "Per gel (42g)",
        values: ["Energia: 122 kcal", "Carboidrati: 29.5g", "Zuccheri: 19.2g"]
      }
    },
    "carbo-energy-plus": {
      title: "Valori nutrizionali per 100g",
      values: [
        { label: "Energia", value: "385 kcal" },
        { label: "Grassi", value: "8.5 g" },
        { label: "di cui saturi", value: "4.2 g" },
        { label: "Carboidrati", value: "65.8 g" },
        { label: "di cui zuccheri", value: "35.6 g" },
        { label: "Fibre", value: "4.5 g" },
        { label: "Proteine", value: "12.2 g" },
        { label: "Sale", value: "0.28 g" }
      ],
      portionInfo: {
        title: "Per barretta (35g)",
        values: ["Energia: 135 kcal", "Carboidrati: 23g", "Proteine: 4.3g", "Grassi: 3g"]
      }
    },
    "grissini-proteici": {
      title: "Valori nutrizionali per 100g",
      values: [
        { label: "Energia", value: "440 kcal" },
        { label: "Grassi", value: "18.5 g" },
        { label: "di cui saturi", value: "3.2 g" },
        { label: "Carboidrati", value: "45.2 g" },
        { label: "di cui zuccheri", value: "8.5 g" },
        { label: "Fibre", value: "12.8 g" },
        { label: "Proteine", value: "25.6 g" },
        { label: "Sale", value: "1.85 g" }
      ],
      portionInfo: {
        title: "Per confezione (40g)",
        values: ["Energia: 176 kcal", "Proteine: 10.2g", "Carboidrati: 18.1g", "Grassi: 7.4g"]
      }
    },
    "whey-protein-90": {
      title: "Valori nutrizionali per 100g",
      values: [
        { label: "Energia", value: "398 kcal" },
        { label: "Grassi", value: "3.2 g" },
        { label: "di cui saturi", value: "2.1 g" },
        { label: "Carboidrati", value: "4.8 g" },
        { label: "di cui zuccheri", value: "3.2 g" },
        { label: "Fibre", value: "0.5 g" },
        { label: "Proteine", value: "90 g" },
        { label: "Sale", value: "0.48 g" },
        { label: "BCAA", value: "20.8 g" }
      ],
      portionInfo: {
        title: "Per dose (25g)",
        values: ["Energia: 99.5 kcal", "Proteine: 22.5g", "Carboidrati: 1.2g", "Grassi: 0.8g"]
      }
    },
    "xxx-hydrolysed-protein-90": {
      title: "Valori nutrizionali per 100g",
      values: [
        { label: "Energia", value: "388 kcal" },
        { label: "Grassi", value: "2.0 g" },
        { label: "di cui saturi", value: "1.2 g" },
        { label: "Carboidrati", value: "2.8 g" },
        { label: "di cui zuccheri", value: "1.8 g" },
        { label: "Fibre", value: "0 g" },
        { label: "Proteine", value: "90 g" },
        { label: "Sale", value: "0.8 g" },
        { label: "Peptidi bioattivi", value: "85 g" }
      ],
      portionInfo: {
        title: "Per dose (25g)",
        values: ["Energia: 97 kcal", "Proteine: 22.5g", "Carboidrati: 0.7g", "Grassi: 0.5g"]
      }
    },
    "wheyghty-protein-80-limited-edition": {
      title: "Valori nutrizionali per 100g",
      values: [
        { label: "Energia", value: "368 kcal" },
        { label: "Grassi", value: "3.2 g" },
        { label: "di cui saturi", value: "2.0 g" },
        { label: "Carboidrati", value: "4.8 g" },
        { label: "di cui zuccheri", value: "3.6 g" },
        { label: "Fibre", value: "1.2 g" },
        { label: "Proteine", value: "80 g" },
        { label: "Sale", value: "0.48 g" },
        { label: "BCAA", value: "19.2 g" }
      ],
      portionInfo: {
        title: "Per dose (25g)",
        values: ["Energia: 92 kcal", "Proteine: 20g", "Carboidrati: 1.2g", "Grassi: 0.8g"]
      }
    },
    "top-eggxellent-protein": {
      title: "Valori nutrizionali per 100g",
      values: [
        { label: "Energia", value: "392 kcal" },
        { label: "Grassi", value: "1.2 g" },
        { label: "di cui saturi", value: "0.4 g" },
        { label: "Carboidrati", value: "3.2 g" },
        { label: "di cui zuccheri", value: "2.8 g" },
        { label: "Fibre", value: "0 g" },
        { label: "Proteine", value: "92 g" },
        { label: "Sale", value: "0.6 g" },
        { label: "Aminoacidi essenziali", value: "47 g" }
      ],
      portionInfo: {
        title: "Per dose (25g)",
        values: ["Energia: 98 kcal", "Proteine: 23g", "Carboidrati: 0.8g", "Grassi: 0.3g"]
      }
    },
    "wheyghty-protein-80-standard": {
      title: "Valori nutrizionali per 100g",
      values: [
        { label: "Energia", value: "376 kcal" },
        { label: "Grassi", value: "3.6 g" },
        { label: "di cui saturi", value: "2.2 g" },
        { label: "Carboidrati", value: "4.4 g" },
        { label: "di cui zuccheri", value: "3.8 g" },
        { label: "Fibre", value: "0.8 g" },
        { label: "Proteine", value: "80 g" },
        { label: "Sale", value: "0.52 g" },
        { label: "BCAA", value: "19.2 g" }
      ],
      portionInfo: {
        title: "Per dose (25g)",
        values: ["Energia: 94 kcal", "Proteine: 20g", "Carboidrati: 1.1g", "Grassi: 0.9g"]
      }
    },
    "protein-evo-cocco": {
      title: "Valori nutrizionali per 100g",
      values: [
        { label: "Energia", value: "433 kcal" },
        { label: "Grassi", value: "17.8 g" },
        { label: "di cui saturi", value: "12.5 g" },
        { label: "Carboidrati", value: "40 g" },
        { label: "di cui zuccheri", value: "28.5 g" },
        { label: "Fibre", value: "8.2 g" },
        { label: "Proteine", value: "33.3 g" },
        { label: "Sale", value: "0.45 g" },
        { label: "Fosforo", value: "267 mg" }
      ],
      portionInfo: {
        title: "Per barretta (45g)",
        values: ["Energia: 195 kcal", "Proteine: 15g", "Carboidrati: 18g", "Grassi: 8g"]
      }
    },
    "protein-evo-creme-caramel": {
      title: "Valori nutrizionali per 100g",
      values: [
        { label: "Energia", value: "422 kcal" },
        { label: "Grassi", value: "16.7 g" },
        { label: "di cui saturi", value: "9.8 g" },
        { label: "Carboidrati", value: "42.2 g" },
        { label: "di cui zuccheri", value: "32.5 g" },
        { label: "Fibre", value: "6.8 g" },
        { label: "Proteine", value: "33.3 g" },
        { label: "Sale", value: "0.52 g" },
        { label: "Fosforo", value: "256 mg" }
      ],
      portionInfo: {
        title: "Per barretta (45g)",
        values: ["Energia: 190 kcal", "Proteine: 15g", "Carboidrati: 19g", "Grassi: 7.5g"]
      }
    },

    // === NUOVI 9 PRODOTTI - VALORI NUTRIZIONALI ===
    "energize-advanced": {
      title: "Valori nutrizionali per 100g",
      values: [
        { label: "Energia", value: "366 kcal" },
        { label: "Grassi", value: "2.8 g" },
        { label: "di cui saturi", value: "1.8 g" },
        { label: "Carboidrati", value: "81 g" },
        { label: "di cui zuccheri", value: "45 g" },
        { label: "Fibre", value: "1.2 g" },
        { label: "Proteine", value: "8.5 g" },
        { label: "Sale", value: "0.85 g" },
        { label: "Caffeina", value: "50 mg" }
      ],
      portionInfo: {
        title: "Per barretta (55g)",
        values: ["Energia: 201 kcal", "Carboidrati: 45g", "Proteine: 4.7g", "Caffeina: 27mg"]
      }
    },

    "powergel": {
      title: "Valori nutrizionali per 100g",
      values: [
        { label: "Energia", value: "272 kcal" },
        { label: "Grassi", value: "0 g" },
        { label: "Carboidrati", value: "68 g" },
        { label: "di cui zuccheri", value: "18 g" },
        { label: "Proteine", value: "0 g" },
        { label: "Sale", value: "0.20 g" },
        { label: "Sodio", value: "200 mg" }
      ],
      portionInfo: {
        title: "Per gel (41g)",
        values: ["Energia: 110 kcal", "Carboidrati: 28g", "Sodio: 200mg"]
      }
    },

    "high-protein-shake": {
      title: "Valori nutrizionali per 100ml",
      values: [
        { label: "Energia", value: "143 kcal" },
        { label: "Grassi", value: "3.0 g" },
        { label: "di cui saturi", value: "2.0 g" },
        { label: "Carboidrati", value: "5.7 g" },
        { label: "di cui zuccheri", value: "5.0 g" },
        { label: "Proteine", value: "25 g" },
        { label: "Sale", value: "0.35 g" },
        { label: "Calcio", value: "120 mg" }
      ],
      portionInfo: {
        title: "Per shake (300ml)",
        values: ["Energia: 430 kcal", "Proteine: 75g", "Carboidrati: 17g", "Grassi: 9g"]
      }
    },

    "burro-di-arachidi-croccante": {
      title: "Valori nutrizionali per 100g",
      values: [
        { label: "Energia", value: "588 kcal" },
        { label: "Grassi", value: "48 g" },
        { label: "di cui saturi", value: "8.2 g" },
        { label: "Carboidrati", value: "18 g" },
        { label: "di cui zuccheri", value: "6.5 g" },
        { label: "Fibre", value: "8.5 g" },
        { label: "Proteine", value: "26 g" },
        { label: "Sale", value: "0.85 g" },
        { label: "Vitamina E", value: "8.1 mg" }
      ],
      portionInfo: {
        title: "Per porzione (30g)",
        values: ["Energia: 176 kcal", "Proteine: 7.8g", "Grassi: 14.4g", "Carboidrati: 5.4g"]
      }
    },

    "avena-farina-istantanea": {
      title: "Valori nutrizionali per 100g",
      values: [
        { label: "Energia", value: "363 kcal" },
        { label: "Grassi", value: "6.9 g" },
        { label: "di cui saturi", value: "1.2 g" },
        { label: "Carboidrati", value: "60 g" },
        { label: "di cui zuccheri", value: "1.1 g" },
        { label: "Fibre", value: "10.1 g" },
        { label: "Proteine", value: "13.2 g" },
        { label: "Sale", value: "0.02 g" },
        { label: "Betaglucani", value: "4.2 g" }
      ],
      portionInfo: {
        title: "Per porzione (40g)",
        values: ["Energia: 145 kcal", "Proteine: 5.3g", "Carboidrati: 24g", "Fibre: 4g"]
      }
    },

    "oatmeal-pro": {
      title: "Valori nutrizionali per 100g",
      values: [
        { label: "Energia", value: "386 kcal" },
        { label: "Grassi", value: "8.2 g" },
        { label: "di cui saturi", value: "1.5 g" },
        { label: "Carboidrati", value: "52 g" },
        { label: "di cui zuccheri", value: "8.5 g" },
        { label: "Fibre", value: "12 g" },
        { label: "Proteine", value: "25 g" },
        { label: "Sale", value: "0.15 g" },
        { label: "Betaglucani", value: "3.8 g" }
      ],
      portionInfo: {
        title: "Per porzione (50g)",
        values: ["Energia: 193 kcal", "Proteine: 12.5g", "Carboidrati: 26g", "Fibre: 6g"]
      }
    },

    // === NUOVI PRODOTTI CREATINA ===
    "creanized-creatina-monoidrato": {
      title: "Valori nutrizionali per 3g (1 dose)",
      values: [
        { label: "Energia", value: "0 kcal" },
        { label: "Grassi", value: "0 g" },
        { label: "Carboidrati", value: "0 g" },
        { label: "Proteine", value: "0 g" },
        { label: "Sale", value: "<0.01 g" },
        { label: "Creatina monoidrato", value: "3000 mg" },
        { label: "di cui creatina", value: "2640 mg" }
      ]
    },

    "creatina-extra-gold": {
      title: "Valori nutrizionali per compressa/3g polvere",
      values: [
        { label: "Energia", value: "0 kcal" },
        { label: "Grassi", value: "0 g" },
        { label: "Carboidrati", value: "0 g" },
        { label: "Proteine", value: "0 g" },
        { label: "Sale", value: "<0.01 g" },
        { label: "Creatina monoidrato", value: "1000 mg" },
        { label: "Magnesio", value: "150 mg (40% VNR)" }
      ]
    },

    "creatyl": {
      title: "Valori nutrizionali per compressa (1000mg)",
      values: [
        { label: "Energia", value: "0 kcal" },
        { label: "Grassi", value: "0 g" },
        { label: "Carboidrati", value: "0 g" },
        { label: "Proteine", value: "0 g" },
        { label: "Sale", value: "<0.01 g" },
        { label: "Creatina monoidrato", value: "1000 mg" },
        { label: "di cui creatina", value: "880 mg" }
      ]
    },

    "gluco-creatina": {
      title: "Valori nutrizionali per 6 compresse",
      values: [
        { label: "Energia", value: "38 kcal" },
        { label: "Grassi", value: "0 g" },
        { label: "Carboidrati", value: "9.5 g" },
        { label: "Proteine", value: "0 g" },
        { label: "Sale", value: "<0.01 g" },
        { label: "Creatina monoidrato", value: "3000 mg" },
        { label: "Glucosio", value: "2400 mg" }
      ]
    },

    "creatina-platinum": {
      title: "Valori nutrizionali per dose (10g)",
      values: [
        { label: "Energia", value: "15 kcal" },
        { label: "Grassi", value: "0 g" },
        { label: "Carboidrati", value: "1 g" },
        { label: "Proteine", value: "3 g" },
        { label: "Sale", value: "<0.01 g" },
        { label: "Creatina monoidrato", value: "5000 mg" },
        { label: "L-Arginina", value: "2000 mg" },
        { label: "Taurina", value: "1000 mg" }
      ]
    },

    "creatina-platinum-1300": {
      title: "Valori nutrizionali per compressa",
      values: [
        { label: "Energia", value: "2 kcal" },
        { label: "Grassi", value: "0 g" },
        { label: "Carboidrati", value: "0 g" },
        { label: "Proteine", value: "0.5 g" },
        { label: "Sale", value: "<0.01 g" },
        { label: "Creatina monoidrato", value: "1300 mg" },
        { label: "L-Arginina", value: "200 mg" },
        { label: "Taurina", value: "100 mg" }
      ]
    },

    "creatina-200-mesh": {
      title: "Valori nutrizionali per dose (5g)",
      values: [
        { label: "Energia", value: "0 kcal" },
        { label: "Grassi", value: "0 g" },
        { label: "Carboidrati", value: "0 g" },
        { label: "Proteine", value: "0 g" },
        { label: "Sale", value: "<0.01 g" },
        { label: "Creatina monoidrato", value: "5000 mg" },
        { label: "di cui creatina", value: "4400 mg" },
        { label: "Umidità", value: "<0.5%" }
      ]
    },

    // === NUOVI PRODOTTI ACCESSORI ===
    "borraccia-why-sport-500ml": {
      title: "Specifiche tecniche",
      values: [
        { label: "Capacità", value: "500 ml" },
        { label: "Materiale", value: "Acciaio inox 18/8" },
        { label: "Isolamento", value: "Doppia parete" },
        { label: "Temperatura fredda", value: "fino a 12 ore" },
        { label: "Temperatura calda", value: "fino a 6 ore" },
        { label: "Peso", value: "280 g" },
        { label: "Altezza", value: "24 cm" },
        { label: "Diametro", value: "7 cm" }
      ]
    },

    "sport-shaker-why-sport": {
      title: "Specifiche tecniche",
      values: [
        { label: "Capacità", value: "600 ml" },
        { label: "Materiale", value: "PP senza BPA" },
        { label: "Sistema miscelazione", value: "Sfera in acciaio" },
        { label: "Graduazioni", value: "ogni 50 ml" },
        { label: "Peso", value: "120 g" },
        { label: "Altezza", value: "20 cm" },
        { label: "Diametro", value: "9 cm" },
        { label: "Lavabile", value: "Lavastoviglie sicuro" }
      ]
    },

    "borraccia-sport-500ml": {
      title: "Specifiche tecniche",
      values: [
        { label: "Capacità", value: "500 ml" },
        { label: "Materiale", value: "Polipropilene BPA-free" },
        { label: "Tappo", value: "Push-pull ergonomico" },
        { label: "Peso", value: "85 g" },
        { label: "Altezza", value: "22 cm" },
        { label: "Diametro", value: "6.5 cm" },
        { label: "Compatibilità", value: "Portabottiglie standard" },
        { label: "Temperatura", value: "Max 60°C" }
      ]
    },

    // === NUOVI PRODOTTI ABBIGLIAMENTO ===
    "leggings-donna-why-sport": {
      title: "Specifiche tecniche",
      values: [
        { label: "Materiale", value: "90% Poliestere, 10% Elastan" },
        { label: "Tipo tessuto", value: "Tecnico elasticizzato" },
        { label: "Vestibilità", value: "Aderente" },
        { label: "Lunghezza", value: "3/4 (capri)" },
        { label: "Traspirabilità", value: "Alta" },
        { label: "Compressione", value: "Media" },
        { label: "Lavaggio", value: "30°C delicato" },
        { label: "Asciugatura", value: "Aria, no calore diretto" }
      ]
    },

    "top-donna-why-sport": {
      title: "Specifiche tecniche",
      values: [
        { label: "Materiale", value: "88% Poliestere, 12% Elastan" },
        { label: "Tipo tessuto", value: "Tecnico moisture-wicking" },
        { label: "Supporto", value: "Integrato medio" },
        { label: "Design", value: "Racerback" },
        { label: "Cuciture", value: "Piatte anti-sfregamento" },
        { label: "Asciugatura", value: "Rapida" },
        { label: "Lavaggio", value: "30°C con capi simili" },
        { label: "Stiratura", value: "Non stirare sulla stampa" }
      ]
    },

    "short-donna-why-sport": {
      title: "Specifiche tecniche",
      values: [
        { label: "Materiale", value: "85% Poliestere, 15% Elastan" },
        { label: "Tipo tessuto", value: "Leggero e traspirante" },
        { label: "Inserti", value: "Laterali in contrasto" },
        { label: "Dettagli", value: "Riflettenti per visibilità" },
        { label: "Lunghezza", value: "Corta (5 cm)" },
        { label: "Fascia vita", value: "Elastica con stampa" },
        { label: "Lavaggio", value: "30°C separatamente" },
        { label: "Uso consigliato", value: "Running, fitness, outdoor" }
      ]
    },



    "promeal-energetica": {
      title: "Valori nutrizionali per 100g",
      values: [
        { label: "Energia", value: "378 kcal" },
        { label: "Grassi", value: "12.5 g" },
        { label: "di cui saturi", value: "3.2 g" },
        { label: "Carboidrati", value: "52 g" },
        { label: "di cui zuccheri", value: "28 g" },
        { label: "Fibre", value: "6.8 g" },
        { label: "Proteine", value: "12 g" },
        { label: "Sale", value: "0.25 g" },
        { label: "13 Vitamine", value: "100% VNR" }
      ],
      portionInfo: {
        title: "Per barretta (40g)",
        values: ["Energia: 151 kcal", "Carboidrati: 21g", "Proteine: 4.8g", "Grassi: 5g"]
      }
    },

    "promeal-50-protein-bar": {
      title: "Valori nutrizionali per 100g",
      values: [
        { label: "Energia", value: "395 kcal" },
        { label: "Grassi", value: "12.8 g" },
        { label: "di cui saturi", value: "7.2 g" },
        { label: "Carboidrati", value: "22 g" },
        { label: "di cui zuccheri", value: "2.8 g" },
        { label: "Fibre", value: "8.5 g" },
        { label: "Proteine", value: "50 g" },
        { label: "Sale", value: "0.35 g" },
        { label: "Aminoacidi essenziali", value: "23 g" }
      ],
      portionInfo: {
        title: "Per barretta (60g)",
        values: ["Energia: 237 kcal", "Proteine: 30g", "Carboidrati: 13g", "Grassi: 7.7g"]
      }
    }
  };

  // Se non trova dati specifici, genera valori generici basati sulla categoria
  let data = nutritionalData[productSlug];

  if (!data) {
    if (productSlug.includes('whey') || productSlug.includes('protein')) {
      data = {
        title: "Valori nutrizionali per 100g",
        values: [
          { label: "Energia", value: "380-420 kcal" },
          { label: "Grassi", value: "2-5 g" },
          { label: "di cui saturi", value: "1-3 g" },
          { label: "Carboidrati", value: "3-8 g" },
          { label: "di cui zuccheri", value: "2-5 g" },
          { label: "Fibre", value: "0.5-2 g" },
          { label: "Proteine", value: "75-90 g" },
          { label: "Sale", value: "0.3-0.8 g" }
        ],
        portionInfo: {
          title: "Per dose (25-30g)",
          values: ["Energia: 95-126 kcal", "Proteine: 19-27g", "Carboidrati: 1-2.4g", "Grassi: 0.5-1.5g"]
        }
      };
    } else if (productSlug.includes('creatina')) {
      data = {
        title: "Valori nutrizionali per 100g",
        values: [
          { label: "Energia", value: "0 kcal" },
          { label: "Grassi", value: "0 g" },
          { label: "Carboidrati", value: "0 g" },
          { label: "Proteine", value: "0 g" },
          { label: "Creatina monoidrato", value: "100 g" },
          { label: "Sale", value: "0 g" }
        ],
        portionInfo: {
          title: "Per dose (3-5g)",
          values: ["Creatina: 3-5g", "Zero calorie", "Zero carboidrati", "Zero grassi"]
        }
      };
    } else {
      data = nutritionalData["barrettone-2-0"];
    }
  }

  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-lg mb-4">{data.title}</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.values && data.values.map((item: any, index: number) => (
          <div key={index} className="flex justify-between items-center py-2 border-b">
            <span className="font-medium">{item.label}</span>
            <span className="text-gray-600">{item.value}</span>
          </div>
        ))}
      </div>

      {data.portionInfo && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h5 className="font-semibold text-blue-800 mb-2">{data.portionInfo.title}</h5>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {data.portionInfo.values.map((value: string, index: number) => (
              <span key={index}>{value}</span>
            ))}
          </div>
        </div>
      )}
      {data.content && data.content}
    </div>
  );
};

// Funzione per renderizzare tabelle nutrizionali ALIMENTI FIT dal database
const renderAlimentiFitNutritionalTable = (features: any, productSlug: string) => {
  if (!features) return null;
  
  try {
    let nutritionalData = features;
    if (typeof features === 'string') {
      nutritionalData = JSON.parse(features);
    }

    const valoriNutrizionali = nutritionalData?.valori_nutrizionali;
    if (!valoriNutrizionali) return null;

    // Trova le sezioni disponibili (per_100g, per_porzione, per_dose, etc.)
    const sections = Object.keys(valoriNutrizionali).filter(key => 
      typeof valoriNutrizionali[key] === 'object' && valoriNutrizionali[key] !== null
    );

    if (sections.length === 0) return null;

    // Crea headers dinamici basati sulle sezioni disponibili
    const headers = ['Valori medi', ...sections.map(section => {
      if (section === 'per_100g') return 'Per 100g';
      if (section === 'per_porzione') return valoriNutrizionali[section]?.porzione || 'Per porzione';
      if (section === 'per_dose') return valoriNutrizionali[section]?.porzione || 'Per dose';
      if (section === 'per_porzione_50g') return 'Per 50g';
      if (section === 'per_2_bars') return valoriNutrizionali[section]?.porzione || 'Per 2 barrette';
      return section.replace('_', ' ');
    })];

    // Raccogli tutti i componenti nutrizionali unici
    const allComponents = new Set<string>();
    sections.forEach(section => {
      Object.keys(valoriNutrizionali[section]).forEach(key => {
        if (key !== 'porzione') {
          allComponents.add(key);
        }
      });
    });

    // Mappa i nomi dei componenti in italiano
    const componentMap: { [key: string]: string } = {
      'energia': 'Energia',
      'valore_energetico': 'Energia',
      'grassi': 'Grassi',
      'di_cui_acidi_grassi_saturi': 'di cui acidi grassi saturi',
      'di_cui_saturi': 'di cui saturi',
      'saturi': 'di cui saturi',
      'carboidrati': 'Carboidrati',
      'di_cui_zuccheri': 'di cui zuccheri',
      'zuccheri': 'di cui zuccheri',
      'di_cui_polioli': 'di cui polioli',
      'fibre': 'Fibre',
      'proteine': 'Proteine',
      'sale': 'Sale',
      'vitamina_E': 'Vitamina E',
      'calcio': 'Calcio',
      'fosforo': 'Fosforo',
      'ferro': 'Ferro',
      'beta_glucani_da_avena': 'β-glucani da avena',
      'creatina_M': 'Creatina monoidrato',
      'l_carnitina': 'L-Carnitina',
      'vitamine': 'Mix vitaminico'
    };

    const componentOrder = [
      'energia', 'valore_energetico', 'grassi', 'di_cui_acidi_grassi_saturi', 'di_cui_saturi', 'saturi',
      'carboidrati', 'di_cui_zuccheri', 'zuccheri', 'di_cui_polioli', 'fibre', 'proteine', 'sale',
      'vitamina_E', 'calcio', 'fosforo', 'ferro', 'beta_glucani_da_avena', 'creatina_M', 'l_carnitina', 'vitamine'
    ];

    const sortedComponents = Array.from(allComponents).sort((a, b) => {
      const indexA = componentOrder.indexOf(a);
      const indexB = componentOrder.indexOf(b);
      if (indexA === -1 && indexB === -1) return a.localeCompare(b);
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;
      return indexA - indexB;
    });

    return (
      <div className="nutrition-table">
        <h4 className="font-semibold text-lg mb-4">Valori Nutrizionali</h4>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              {headers.map((header, index) => (
                <th key={index} className="border p-2 text-left font-semibold">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedComponents.map((component: string) => {
              const displayName = (componentMap as any)[component] || component.replace(/_/g, ' ');
              
              // Stile speciale per componenti principali
              let textClass = '';
              if (component.includes('energia')) {
                textClass = 'font-bold text-blue-600';
              } else if (component.includes('proteine')) {
                textClass = 'font-bold text-green-600';
              } else if (component.includes('carboidrati')) {
                textClass = 'font-bold text-orange-600';
              } else if (component.includes('grassi') && !component.includes('di_cui')) {
                textClass = 'font-bold text-red-600';
              }

              // Indentazione per componenti secondari
              const isSubComponent = component.startsWith('di_cui_') || component === 'saturi';
              const cellClass = isSubComponent ? 'pl-6 text-sm text-gray-700' : '';

              return (
                <tr key={component}>
                  <td className={`border p-2 ${cellClass}`}>
                    {displayName}
                  </td>
                  {sections.map((section) => {
                    const value = valoriNutrizionali[section][component] || '-';
                    return (
                      <td key={section} className={`border p-2 ${textClass}`}>
                        {value}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  } catch (error) {
    return null;
  }
};

// Funzione specializzata per renderizzare tabelle nutrizionali VITAMINE/MINERALI dal database
const renderVitaminMineralNutritionalTable = (features: any, productSlug: string) => {
  if (!features) return null;
  
  try {
    let nutritionalData = features;
    if (typeof features === 'string') {
      nutritionalData = JSON.parse(features);
    }

    // Prodotti che NON devono mostrare la colonna "VNR"
    const hideVNRColumnProducts = [
      'omnia-active-formula-45-capsule',
      'super-hydro-plus-arancio-20-compresse',
      'super-hydro-plus-limone-20-compresse', 
      'pre-gara-endurance-20-buste'
    ];
    const shouldHideVNRColumn = hideVNRColumnProducts.includes(productSlug);


    let valori = [];
    let dose = 'Per dose';

    // FORMATO 1: valori_nutrizionali.per_softgel (Vitamina D3, ecc.)
    if (nutritionalData?.valori_nutrizionali?.per_softgel) {
      const data = nutritionalData.valori_nutrizionali.per_softgel;
      dose = 'Per softgel';
      Object.entries(data).forEach(([key, value]) => {
        if (key !== 'porzione') {
          valori.push({
            componente: key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
            valore: value
          });
        }
      });
    }
    // FORMATO 2: valori_nutrizionali.per_porzione (Repoxan, Omega 3 Super, ecc.)
    else if (nutritionalData?.valori_nutrizionali?.per_porzione) {
      const data = nutritionalData.valori_nutrizionali.per_porzione;
      dose = data.porzione ? `Per ${data.porzione}` : 'Per porzione';
      
      Object.entries(data).forEach(([key, value]) => {
        if (key !== 'porzione' && key !== 'porzioni_per_confezione') {
          if (typeof value === 'object' && value !== null) {
            // Gestione componenti complessi (lavanda, passiflora, ecc.)
            const mainComponent = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            const complexValue = value as any; // Type assertion to handle complex object structures
            if (complexValue.quantita) {
              valori.push({
                componente: mainComponent,
                valore: complexValue.quantita
              });
              // Sottocomponenti
              Object.entries(complexValue).forEach(([subKey, subValue]) => {
                if (subKey !== 'quantita') {
                  valori.push({
                    componente: `- ${subKey.replace(/_/g, ' ')}`,
                    valore: subValue,
                    isSubComponent: true
                  });
                }
              });
            }
          } else {
            valori.push({
              componente: key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
              valore: value
            });
          }
        }
      });
    }
    // FORMATO 3: valori_nutrizionali.per_dose (Omega 3 EGQ, ecc.)
    else if (nutritionalData?.valori_nutrizionali?.per_dose) {
      const data = nutritionalData.valori_nutrizionali.per_dose;
      dose = data.porzione ? `Per ${data.porzione}` : 'Per dose';
      
      Object.entries(data).forEach(([key, value]) => {
        if (key !== 'porzione') {
          valori.push({
            componente: key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
            valore: value
          });
        }
      });
    }
    // FORMATO 4: per_porzione.valori (Omega 3-6-9, ecc.)
    else if (nutritionalData?.per_porzione?.valori) {
      const data = nutritionalData.per_porzione;
      dose = data.porzione || 'Per porzione';
      valori = data.valori;
    }
    // FORMATO 5: nutritional_table.values (Thermogenic Force, ecc.)
    else if (nutritionalData?.nutritional_table?.values) {
      const data = nutritionalData.nutritional_table;
      dose = data.serving_size || 'Per dose';
      valori = data.values.map((item: any) => ({
        componente: item.nutrient,
        valore: `${item.amount} ${item.unit}${item.daily_value ? ` (${item.daily_value})` : ''}`
      }));
    }

    if (!valori || valori.length === 0) {
      return null;
    }


    return (
      <div className="nutrition-table">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-50">
              <th className="border p-2 text-left font-semibold">Componente</th>
              <th className="border p-2 text-left font-semibold">{dose}</th>
              {!shouldHideVNRColumn && <th className="border p-2 text-left font-semibold">VNR</th>}
            </tr>
          </thead>
          <tbody>
            {valori.map((item: any, index: number) => {
              const component = item.componente || item.component || item.nutriente;
              let originalValue = item.valore || item.value || item.quantita;
              
              if (!component || !originalValue) return null;

              // Separare il valore dalla percentuale VNR
              let cleanValue = originalValue;
              let vnrPercentage = '-';
              
              // Regex per trovare percentuali VNR in diversi formati
              const vnrMatch = originalValue.match(/\((\d+%?\s*VNR?)\)|(\d+%\s*VNR?)$/i);
              if (vnrMatch) {
                vnrPercentage = vnrMatch[1] || vnrMatch[2];
                cleanValue = originalValue.replace(/\s*\(.*VNR.*\)|\s*\d+%\s*VNR?$/i, '').trim();
              }

              let textClass = '';
              const componentLower = component.toLowerCase();
              
              // Colori specifici per vitamine e minerali
              if (componentLower.includes('vitamina') || componentLower.includes('vitamin')) {
                textClass = 'font-bold text-green-600';
              } else if (componentLower.includes('omega') || componentLower.includes('epa') || componentLower.includes('dha')) {
                textClass = 'font-bold text-blue-600';
              } else if (componentLower.includes('magnesio') || componentLower.includes('zinco') || componentLower.includes('ferro') || componentLower.includes('calcio')) {
                textClass = 'font-bold text-orange-600';
              } else if (componentLower.includes('melatonina') || componentLower.includes('caffeina') || componentLower.includes('carnitina')) {
                textClass = 'font-bold text-purple-600';
              }

              // Gestione indentazione per sottocomponenti
              const isSubComponent = item.isSubComponent || component.startsWith('-');
              const cellClass = isSubComponent ? 'pl-6 text-sm text-gray-700' : '';

              return (
                <tr key={index}>
                  <td className={`border p-2 ${cellClass}`}>
                    {component}
                  </td>
                  <td className={`border p-2 ${textClass}`}>
                    {cleanValue}
                  </td>
                  {!shouldHideVNRColumn && (
                    <td className={`border p-2 text-center`}>
                      {vnrPercentage}
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  } catch (error) {
    return null;
  }
};

// Funzione specializzata per renderizzare tabelle nutrizionali ENERGETICI dal database
const renderEnergeticiNutritionalTable = (features: any, productSlug: string) => {
  if (!features) return null;
  
  try {
    let nutritionalData = features;
    if (typeof features === 'string') {
      nutritionalData = JSON.parse(features);
    }

    // Prodotti che NON devono mostrare la colonna "VNR"
    const hideVNRColumnProducts = [
      'omnia-active-formula-45-capsule',
      'super-hydro-plus-arancio-20-compresse',
      'super-hydro-plus-limone-20-compresse', 
      'pre-gara-endurance-20-buste'
    ];
    const shouldHideVNRColumn = hideVNRColumnProducts.includes(productSlug);


    let valoriNutrizionali: any = {};
    let sections: string[] = [];

    // FORMATO 1: valori_nutrizionali.per_porzione + per_100g (Dextro Plus, Super Dextrin Pro, Pre-Workout, ecc.)
    // NON deve catturare prodotti batch 9 che hanno per_dose_XXXg
    if (nutritionalData?.valori_nutrizionali?.per_porzione || 
        (nutritionalData?.valori_nutrizionali?.per_100g && !Object.keys(nutritionalData.valori_nutrizionali).some(key => key.startsWith('per_dose_')))) {
      valoriNutrizionali = nutritionalData.valori_nutrizionali;
      sections = Object.keys(valoriNutrizionali);
    }
    // FORMATO 2: valori_nutrizionali.per_100ml + per_pacchetto (Maltoshot Endurance Plus)
    else if (nutritionalData?.valori_nutrizionali?.per_100ml) {
      valoriNutrizionali = nutritionalData.valori_nutrizionali;
      sections = Object.keys(valoriNutrizionali);
    }
    // FORMATO 3: informazioni_nutrizionali.per_100g + per_dose (Starter 1000)
    else if (nutritionalData?.informazioni_nutrizionali) {
      valoriNutrizionali = nutritionalData.informazioni_nutrizionali;
      sections = Object.keys(valoriNutrizionali);
    }
    // FORMATO 4: valori_nutrizionali.per_100g + per_barretta (Super Dextrin Energy Bar)
    else if (nutritionalData?.valori_nutrizionali?.per_barretta_45g) {
      valoriNutrizionali = nutritionalData.valori_nutrizionali;
      sections = Object.keys(valoriNutrizionali);
    }
    // FORMATO 5: ingredienti_valori.per_100g + per_porzione (EAA Amminoacidi Essenziali)
    else if (nutritionalData?.ingredienti_valori) {
      valoriNutrizionali = nutritionalData.ingredienti_valori;
      sections = Object.keys(valoriNutrizionali);
    }
    // FORMATO 6: valori_nutrizionali.per_dose_XXXg + per_100g (BATCH 9 - Total Energy, Hard Start, etc.)
    // FORMATO 6B: valori_nutrizionali.per_X_buste + per_100g (BATCH 9 - Pre Gara Endurance, etc.)
    else if (nutritionalData?.valori_nutrizionali && Object.keys(nutritionalData.valori_nutrizionali).some(key => 
      key.startsWith('per_dose_') || key.startsWith('per_2_') || key.startsWith('per_bustina') || key.startsWith('per_compressa')
    )) {
      valoriNutrizionali = nutritionalData.valori_nutrizionali;
      sections = Object.keys(valoriNutrizionali);
    }

    if (!valoriNutrizionali || Object.keys(valoriNutrizionali).length === 0) {
      return null;
    }


    // Raccogliamo tutti i componenti unici
    const allComponents = new Set();
    sections.forEach(section => {
      const sectionData = valoriNutrizionali[section];
      if (sectionData && typeof sectionData === 'object') {
        Object.keys(sectionData).forEach(key => {
          if (key !== 'porzione') {
            allComponents.add(key);
          }
        });
      }
    });

    const componentMap = {
      'valore_energetico': 'Valore Energetico',
      'energia': 'Energia',
      'grassi': 'Grassi',
      'di_cui_acidi_grassi_saturi': '  di cui acidi grassi saturi',
      'di_cui_saturi': '  di cui saturi',
      'carboidrati': 'Carboidrati',
      'di_cui_zuccheri': '  di cui zuccheri',
      'fibre': 'Fibre',
      'fibra_alimentare': 'Fibra alimentare',
      'proteine': 'Proteine',
      'sale': 'Sale',
      'magnesio': 'Magnesio',
      'sodio': 'Sodio',
      'beta_alanina': 'Beta Alanina',
      'l_leucina': 'L-Leucina',
      'l_valina': 'L-Valina',
      'l_isoleucina': 'L-Isoleucina',
      'creatina_monoidrato': 'Creatina Monoidrato',
      'di_cui_creatina': '  di cui creatina',
      'l_arginina_akg': 'L-Arginina AKG',
      'l_glutammina': 'L-Glutammina',
      'taurina': 'Taurina',
      'vitamina_b6': 'Vitamina B6',
      'zinco': 'Zinco'
    };

    // Ordine preferito dei componenti
    const componentOrder = [
      'valore_energetico', 'energia', 'grassi', 'di_cui_acidi_grassi_saturi', 'di_cui_saturi',
      'carboidrati', 'di_cui_zuccheri', 'fibre', 'fibra_alimentare', 'proteine', 'sale',
      'creatina_monoidrato', 'di_cui_creatina', 'beta_alanina', 'l_arginina_akg', 'l_leucina', 
      'l_valina', 'l_isoleucina', 'l_glutammina', 'taurina', 'magnesio', 'zinco', 'sodio', 'vitamina_b6'
    ];

    const sortedComponents = Array.from(allComponents as Set<string>).sort((a: string, b: string) => {
      const indexA = componentOrder.indexOf(a);
      const indexB = componentOrder.indexOf(b);
      if (indexA !== -1 && indexB !== -1) return indexA - indexB;
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;
      return a.localeCompare(b);
    });

    return (
      <div className="nutrition-table">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-50">
              <th className="border p-2 text-left font-semibold">Componente</th>
              {sections.map((section: string) => (
                <th key={section} className="border p-2 text-left font-semibold">
                  {section.replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                </th>
              ))}
              {!shouldHideVNRColumn && <th className="border p-2 text-left font-semibold">VNR</th>}
            </tr>
          </thead>
          <tbody>
            {sortedComponents.map((component: string) => {
              const displayName = (componentMap as any)[component] || component.replace(/_/g, ' ');
              
              // Stile speciale per componenti principali
              let textClass = '';
              if (component.includes('energia') || component.includes('energetico')) {
                textClass = 'font-bold text-blue-600';
              } else if (component.includes('proteine')) {
                textClass = 'font-bold text-green-600';
              } else if (component.includes('carboidrati')) {
                textClass = 'font-bold text-orange-600';
              } else if (component.includes('grassi') && !component.includes('di_cui')) {
                textClass = 'font-bold text-red-600';
              } else if (component.includes('vitamin') || component.includes('magnesio') || component.includes('zinco')) {
                textClass = 'font-bold text-purple-600';
              }

              // Indentazione per componenti secondari
              const isSubComponent = component.startsWith('di_cui_') || component === 'saturi';
              const cellClass = isSubComponent ? 'pl-6 text-sm text-gray-700' : '';

              // Gestione VNR per la prima sezione (solitamente per_porzione)
              let vnrPercentage = '-';
              const firstSection = sections[0];
              const firstSectionData = (valoriNutrizionali as any)[firstSection];
              if (firstSectionData && firstSectionData[component]) {
                const originalValue = firstSectionData[component];
                if (typeof originalValue === 'string') {
                  const vnrMatch = originalValue.match(/\((\d+%?\s*VNR?)\)|(\d+%\s*VNR?)$/i);
                  if (vnrMatch) {
                    vnrPercentage = vnrMatch[1] || vnrMatch[2];
                  }
                }
              }

              return (
                <tr key={component}>
                  <td className={`border p-2 ${cellClass}`}>
                    {displayName}
                  </td>
                  {sections.map((section: string) => {
                    const sectionData = (valoriNutrizionali as any)[section];
                    let value = '-';
                    
                    if (sectionData && typeof sectionData === 'object') {
                      if (typeof sectionData[component] === 'object') {
                        // Gestione oggetti complessi (mix di aminoacidi, creatina, ecc.)
                        value = JSON.stringify(sectionData[component]);
                      } else {
                        let originalValue = sectionData[component] || '-';
                        // Rimuovi VNR dal valore principale
                        if (typeof originalValue === 'string') {
                          value = originalValue.replace(/\s*\(.*VNR.*\)|\s*\d+%\s*VNR?$/i, '').trim();
                        } else {
                          value = originalValue;
                        }
                      }
                    }
                    
                    return (
                      <td key={section} className={`border p-2 ${textClass}`}>
                        {value}
                      </td>
                    );
                  })}
                  {!shouldHideVNRColumn && (
                    <td className={`border p-2 text-center`}>
                      {vnrPercentage}
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  } catch (error) {
    return null;
  }
};

// Funzione per renderizzare tabelle nutrizionali AMINOACIDI dal database (tutti i formati)
const renderAminoAcidsNutritionalTable = (features: any, productSlug: string) => {
  if (!features) return null;
  
  try {
    let nutritionalData = features;
    if (typeof features === 'string') {
      nutritionalData = JSON.parse(features);
    }

    let aminoValues = [];
    let dose = 'Per dose';

    // FORMATO 1: Struttura con valori_nutrizionali.tabella (BCAA+, High BCAA, ecc.)
    if (nutritionalData?.valori_nutrizionali?.tabella) {
      aminoValues = nutritionalData.valori_nutrizionali.tabella;
      dose = nutritionalData.valori_nutrizionali.dose || 'Per porzione';
    }
    // FORMATO 2: Struttura con valori_nutrizionali.per_porzione e per_100g (Aminoacidi Essenziali DB)
    else if (nutritionalData?.valori_nutrizionali?.per_porzione && nutritionalData?.valori_nutrizionali?.per_100g) {
      // Converte i dati dal database in formato tabella
      const perPorzione = nutritionalData.valori_nutrizionali.per_porzione;
      const per100g = nutritionalData.valori_nutrizionali.per_100g;
      
      // Crea la struttura per la tabella multi-colonna
      const allKeys = new Set([...Object.keys(perPorzione), ...Object.keys(per100g)]);
      const filteredKeys = Array.from(allKeys).filter(key => key !== 'porzione' && key !== 'kcal' && key !== 'kj');
      
      const tableData = [
        {
          sezione: `Per porzione (${perPorzione.porzione || '10g'})`,
          ...perPorzione
        },
        {
          sezione: 'Per 100g',
          ...per100g
        }
      ];
      
      aminoValues = tableData;
      dose = 'Valori nutrizionali dal database';
    }
    // FORMATO 3: Struttura con per_porzione e per_100g con array valori (Aminoacidi Essenziali vecchio formato)
    else if (nutritionalData?.per_porzione?.valori && nutritionalData?.per_100g?.valori) {
      // Converte il formato Aminoacidi Essenziali nel formato standard
      const convertAminoData = (valoriArray: any[]) => {
        const converted: any = {};
        valoriArray.forEach((item: any) => {
          const key = item.componente.toLowerCase().replace(/[^a-z0-9]/g, '_');
          converted[key] = item.valore;
        });
        return converted;
      };

      const tableData = [
        {
          sezione: 'Per porzione (14g)',
          ...convertAminoData(nutritionalData.per_porzione.valori)
        },
        {
          sezione: 'Per 100g',
          ...convertAminoData(nutritionalData.per_100g.valori)
        }
      ];
      
      aminoValues = tableData;
      dose = 'Valori nutrizionali';
    }
    // FORMATO 4: Array diretto valori_nutrizionali (BCAA Peptide)
    else if (Array.isArray(nutritionalData?.valori_nutrizionali)) {
      aminoValues = nutritionalData.valori_nutrizionali;
      dose = 'Per 4 compresse';
    }
    // FORMATO 5: Struttura per_porzione.valori (BCAA 1000+B6)
    else if (nutritionalData?.per_porzione?.valori) {
      aminoValues = nutritionalData.per_porzione.valori;
      dose = nutritionalData.per_porzione.descrizione || 'Per porzione';
    }
    // FORMATO 6: valori_nutrizionali come stringa markdown (RAM BCAA, Glutammina Glutpower, ecc.)
    else if (typeof nutritionalData?.valori_nutrizionali === 'string') {
      const markdownContent = nutritionalData.valori_nutrizionali;
      
      // Parsing per formato "Aminoacidi a catena ramificata 5.000 mg"
      const lines = markdownContent.split('\n').filter((line: string) => line.trim());
      aminoValues = [];
      
      for (const line of lines) {
        if (line.includes('mg') || line.includes('µg')) {
          const parts = line.split('\t');
          if (parts.length >= 2) {
            const component = parts[0].trim();
            const value = parts[1].trim();
            if (component && value && !component.includes('PORZIONE')) {
              aminoValues.push({
                componente: component,
                valore: value
              });
            }
          }
        }
      }
      
      dose = lines.find((line: string) => line.includes('PORZIONE')) || 'Per porzione';
    }

    if (!aminoValues || aminoValues.length === 0) return null;

    // Controllo se è il formato Aminoacidi Essenziali (con sezione come proprietà)
    const isAminoAcidsEssentialsFormat = aminoValues.some((item: any) => item.sezione);

    if (isAminoAcidsEssentialsFormat) {
      // Rendering specifico per Aminoacidi Essenziali con layout a tabella multi-colonna
      const components = new Set<string>();
      aminoValues.forEach((section: any) => {
        Object.keys(section).forEach(key => {
          if (key !== 'sezione') {
            components.add(key);
          }
        });
      });

      const sortedComponents = Array.from(components).sort();
      
      return (
        <div className="nutrition-table">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-50">
                <th className="border p-2 text-left font-semibold">Componente</th>
                {aminoValues.map((section: any, index: number) => (
                  <th key={index} className="border p-2 text-left font-semibold">
                    {section.sezione}
                  </th>
                ))}
                <th className="border p-2 text-center font-semibold">VNR</th>
              </tr>
            </thead>
            <tbody>
              {sortedComponents.map((componentKey: string) => {
                // Converte la chiave in nome leggibile
                const displayName = componentKey.replace(/_/g, ' ')
                  .replace(/\b\w/g, l => l.toUpperCase())
                  .replace('L ', 'L-');

                // Estrae VNR dalla prima colonna se presente
                let vnr = '-';
                const firstSectionValue = aminoValues[0][componentKey];
                if (firstSectionValue && typeof firstSectionValue === 'string') {
                  const vnrMatch = firstSectionValue.match(/\((\d+%?\s*vnr?)\)/i);
                  if (vnrMatch) {
                    vnr = vnrMatch[1];
                  }
                }

                // Colore in base al tipo di componente
                let textClass = '';
                if (componentKey.includes('leucina') || componentKey.includes('isoleucina') || 
                    componentKey.includes('valina') || componentKey.includes('glutammina') ||
                    componentKey.includes('taurina') || componentKey.includes('citrullina')) {
                  textClass = 'font-bold text-blue-600';
                } else if (componentKey.includes('vit_') || componentKey.includes('vitamina')) {
                  textClass = 'font-bold text-green-600';
                } else if (componentKey.includes('bromelina') || componentKey.includes('papaina')) {
                  textClass = 'font-bold text-purple-600';
                }

                return (
                  <tr key={componentKey}>
                    <td className="border p-2">
                      {displayName}
                    </td>
                    {aminoValues.map((section: any, sectionIndex: number) => {
                      let value = section[componentKey] || '-';
                      // Rimuovi VNR dal valore visualizzato
                      if (typeof value === 'string') {
                        value = value.replace(/\s*\(.*vnr.*\)/i, '').trim();
                      }
                      return (
                        <td key={sectionIndex} className={`border p-2 ${textClass}`}>
                          {value}
                        </td>
                      );
                    })}
                    <td className="border p-2 text-center">
                      {vnr}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    }

    // Formato standard per altri prodotti aminoacidi
    return (
      <div className="nutrition-table">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="border p-2 text-left">Componente</th>
              <th className="border p-2 text-left">{dose}</th>
              <th className="border p-2 text-left">VNR</th>
            </tr>
          </thead>
          <tbody>
            {aminoValues.map((item: any, index: number) => {
              const component = item.nutriente || item.componente || item.sottocomponente;
              const quantity = item.quantita || item.per_porzione || item.valore || item.per_3g;
              const vnr = item.vnr || (item.valore && item.valore.includes('VNR') ? item.valore.split('(')[1]?.replace(')', '') : '') || '-';

              if (!component || !quantity) return null;

              let textClass = '';
              if (component.toLowerCase().includes('leucina') || 
                  component.toLowerCase().includes('isoleucina') || 
                  component.toLowerCase().includes('valina') ||
                  component.toLowerCase().includes('bcaa') ||
                  component.toLowerCase().includes('glutammin') ||
                  component.toLowerCase().includes('carnitin') ||
                  component.toLowerCase().includes('arginina') ||
                  component.toLowerCase().includes('ornitina') ||
                  component.toLowerCase().includes('aspartico')) {
                textClass = 'font-bold text-blue-600';
              } else if (component.toLowerCase().includes('vitamina') || component.toLowerCase().includes('vitamin')) {
                textClass = 'font-bold text-green-600';
              } else if (component.toLowerCase().includes('zinco') || component.toLowerCase().includes('rame') || component.toLowerCase().includes('pantotenico')) {
                textClass = 'font-bold text-orange-600';
              }

              // Per sottocomponenti, indentazione
              const displayComponent = item.sottocomponente ? `- ${component}` : component;

              return (
                <tr key={index}>
                  <td className={`border p-2 ${item.sottocomponente ? 'pl-6 text-sm text-gray-700' : ''}`}>
                    {displayComponent}
                  </td>
                  <td className={`border p-2 ${textClass}`}>{quantity}</td>
                  <td className="border p-2">{vnr}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  } catch (error) {
    return null;
  }
};

// Funzione per renderizzare i valori nutrizionali (hardcoded o dinamici)
const renderNutritionalInfo = (productSlug: string, features?: any) => {
  
  // PRIORITÀ MASSIMA: Per TUTTI i prodotti AMINOACIDI E VITAMINE, usa i dati specifici dal database
  const isAminoAcidProduct = productSlug.includes('bcaa') || productSlug.includes('peptide') || 
                             productSlug.includes('glutammin') || productSlug.includes('carnitin') || 
                             productSlug.includes('arginina') || productSlug.includes('ornitina') ||
                             productSlug.includes('aspartic') || productSlug.includes('gaba') ||
                             productSlug.includes('taurina') || productSlug.includes('ram-1000') ||
                             productSlug.includes('beta-alanina') || productSlug.includes('creatina') ||
                             productSlug.includes('creanized') || productSlug.includes('gluco-creatina') ||
                             productSlug.includes('ghanabol') || productSlug.includes('gluta-max') ||
                             productSlug.includes('gluta-pep') || productSlug.includes('hmb') ||
                             productSlug.includes('leucina') || productSlug.includes('lisina') ||
                             productSlug.includes('eaa') || productSlug.includes('essential-amino') ||
                             productSlug.includes('essenziali-zero-carb') || productSlug.includes('glutamina-pure') ||
                             productSlug.includes('glutammina-peptide') || productSlug.includes('glutammina-sport') ||
                             productSlug.includes('glutammina-glutpower') || productSlug.includes('glutammina-plus') ||
                             productSlug.includes('aminoacidi-essenziali') || productSlug.includes('aminoacidi-plus') ||
                             productSlug.includes('ramtech-hydro');

                             
  // PRIORITÀ PREMIER BATCH 8: Gestione specifica per prodotti Premier
  const isPremierProduct = productSlug.includes('-premier') || productSlug.includes('premier-');
  
  if (isPremierProduct && features) {
    const premierTable = renderDynamicNutritionalTable(features, productSlug);
    if (premierTable) {
      return premierTable;
    }
  }

  // PRIORITÀ BATCH 7: Gestione specifica per prodotti dimagranti del batch 7
  const isBatch7DimagrantiProduct = productSlug.includes('stack-fire-boost') || productSlug.includes('weight-control-new-formula') ||
                                   productSlug.includes('dima-therm') || productSlug.includes('kal-redux') ||
                                   productSlug.includes('hard-stack-red-hot') || productSlug.includes('hard-acetyl-1000') ||
                                   productSlug.includes('alc-plus-1000') || productSlug.includes('cla-1000') ||
                                   productSlug.includes('lipoic-1000') || productSlug.includes('thermo-caffeine') ||
                                   productSlug.includes('thermo-no-caffeine');
  
  if (isBatch7DimagrantiProduct && features) {
    const batch7Table = renderDynamicNutritionalTable(features, productSlug);
    if (batch7Table) {
      return batch7Table;
    }
  }

  // PRIORITÀ MASSIMA: Per TUTTI i prodotti VITAMINE E MINERALI, usa i dati specifici dal database
  const isVitaminProduct = productSlug.includes('vitamin') || productSlug.includes('mineral') || 
                           productSlug.includes('magnes') || productSlug.includes('calcio') || 
                           productSlug.includes('zinc') || productSlug.includes('ferro') ||
                           productSlug.includes('potass') || productSlug.includes('sali-') ||
                           productSlug.includes('vita-vim') || productSlug.includes('vitamine') ||
                           productSlug.includes('hard-vitamin') || productSlug.includes('glucosamin') ||
                           productSlug.includes('omega-3') || productSlug.includes('omega-3-') ||
                           productSlug.includes('fish-oil') || productSlug.includes('collagen') ||
                           productSlug.includes('ashwagandha') || productSlug.includes('berberina') ||
                           productSlug.includes('caffeina') || productSlug.includes('caffe-te') ||
                           productSlug.includes('melatonin') || productSlug.includes('licopene') ||
                           productSlug.includes('astaxant') || productSlug.includes('spirulina') ||
                           productSlug.includes('selenio') || productSlug.includes('cla-') ||
                           productSlug.includes('co-q10') || productSlug.includes('lipoic') ||
                           productSlug.includes('glutatione') || productSlug.includes('repoxan') ||
                           productSlug.includes('tribulus') || productSlug.includes('testogen') ||
                           productSlug.includes('drenante') || productSlug.includes('depurixia') ||
                           productSlug.includes('fluid-motion') || productSlug === 'omega-3-egq' ||
                           productSlug === 'omega-3-6-9' || productSlug === 'omega-3-super-60-perle' ||
                           productSlug === 'omega-3-super-120-perle';
  
  // PRIMA PRIORITÀ: Gestione separata per aminoacidi e vitamine/minerali
  if (isAminoAcidProduct && features) {
    const aminoTable = renderAminoAcidsNutritionalTable(features, productSlug);
    if (aminoTable) {
      return aminoTable;
    }
  }
  
  if (isVitaminProduct && features) {
    const vitaminTable = renderVitaminMineralNutritionalTable(features, productSlug);
    if (vitaminTable) {
      return vitaminTable;
    } else {
    }
  }
  
  // SECONDA PRIORITÀ: Per tutti i prodotti degli ALIMENTI FIT, usa SEMPRE i dati dinamici dal database se disponibili
  const isAlimentiFitProduct = productSlug.includes('protein-bar') || productSlug.includes('45-protein-bar') || 
                               productSlug.includes('75-protein-bar') || productSlug.includes('avena-farina') ||
                               productSlug.includes('barrettone') || productSlug.includes('big-bar') || 
                               productSlug.includes('carbo-energy') || productSlug.includes('crema-di-arachidi') ||
                               productSlug.includes('fruitforce') || productSlug.includes('light-protein') ||
                               productSlug.includes('liquid-carbo') || productSlug.includes('pancake-proteico') ||
                               productSlug.includes('perfect-bar') || productSlug.includes('prime-oat') ||
                               productSlug.includes('promeal') || productSlug.includes('protein-cream') ||
                               productSlug.includes('smart-protein') || productSlug.includes('veggie-ciok') ||
                               productSlug.includes('wafer-zero') || productSlug.includes('oatmeal') ||
                               productSlug.includes('pistacchio-crema');

  if (isAlimentiFitProduct && features) {
    const alimentiFitTable = renderAlimentiFitNutritionalTable(features, productSlug);
    if (alimentiFitTable) {
      return alimentiFitTable;
    } else {
    }
  }
  
  // PRIORITÀ ENERGETICI: Per tutti i prodotti ENERGETICI, usa il renderer specializzato
  const isEnergeticiProduct = productSlug.includes('dextro-plus') || productSlug.includes('eaa-amminoacidi-essenziali') ||
                             productSlug.includes('maltoshot-endurance') || productSlug.includes('starter-1000') ||
                             productSlug.includes('super-dextrin') || productSlug.includes('complex-carbs') ||
                             productSlug.includes('creanized') || productSlug.includes('creatina-200-mesh') ||
                             productSlug.includes('creatina-platinum') || productSlug.includes('creatina-extra-gold') ||
                             productSlug.includes('gluco-creatina') || productSlug.includes('refuel-recovery') ||
                             productSlug.includes('taurina-1000') || productSlug.includes('adrenaline-agrumi') ||
                             // BATCH 9 PRODOTTI ENERGETICI
                             productSlug.includes('total-energy') || productSlug.includes('hard-staart-x-plode') ||
                             productSlug.includes('hard-amx-carbo') || productSlug.includes('pre-workout-dynamine') ||
                             productSlug.includes('super-hydro-plus') || productSlug.includes('pre-gara-endurance') ||
                             productSlug.includes('glutamine-pure') || productSlug.includes('high-pro-release') ||
                             productSlug.includes('maltodex-pure') || productSlug.includes('omnia-active-formula') ||
                             productSlug.includes('ramtech-bcaa');

  if (isEnergeticiProduct && features) {
    const energeticiTable = renderEnergeticiNutritionalTable(features, productSlug);
    if (energeticiTable) {
      return energeticiTable;
    }
  }

  // TERZA PRIORITÀ: Per tutti i prodotti delle PROTEINE, usa SEMPRE i dati dinamici dal database se disponibili
  const isProteinProduct = productSlug.includes('whey') || productSlug.includes('protein') || productSlug.includes('casein') || 
                           productSlug.includes('perfect') || productSlug.includes('essential') || productSlug.includes('hydro') ||
                           productSlug.includes('mass-matrix') || productSlug.includes('iso-soya') || productSlug.includes('egg-protein') ||
                           productSlug.includes('milk-protein') || productSlug.includes('say-protein') || productSlug.includes('prime-casein') ||
                           productSlug.includes('pure-soy-isolate') || productSlug.includes('power-whey') || productSlug.includes('wpc-100') ||
                           productSlug.includes('perfect-blend') || productSlug.includes('vegetal-100-protein') || 
                           productSlug === 'vegan-isopea-90' || productSlug === 'top-100-xp-cacao';
  
  if (isProteinProduct && features) {
    const dynamicTable = renderDynamicNutritionalTable(features, productSlug);
    if (dynamicTable) {
      return dynamicTable;
    } else {
    }
  }
  
  // SECONDA PRIORITÀ: Gestione prodotti con features markdown array (GABA, Acido D-Aspartico, ecc)
  if (Array.isArray(features) && features.length > 0 && typeof features[0] === 'string') {
    const markdownContent = features.join('\n');
    
    // Estrai tutte le tabelle markdown dal contenuto
    const tableMatches = markdownContent.match(/\|[^|]+\|/g);
    
    if (tableMatches && tableMatches.length >= 2) {
      // Filtra le righe che contengono | 
      const tableLines = markdownContent.split('\n').filter(line => 
        line.trim() && line.includes('|') && !line.includes('---')
      );
      
      
      if (tableLines.length >= 2) {
        // Prima riga = headers
        const headers = tableLines[0].split('|')
          .map(h => h.trim())
          .filter(h => h !== '');
        
        // Righe successive = dati
        const dataRows = tableLines.slice(1).map(line => 
          line.split('|')
            .map(cell => cell.trim())
            .filter(cell => cell !== '')
        ).filter(row => row.length > 0);
        
        
        if (headers.length > 0 && dataRows.length > 0) {
          return (
            <div className="space-y-4">
              <h4 className="font-semibold text-lg mb-4">Valori Nutrizionali</h4>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-blue-50">
                      {headers.map((header, index) => (
                        <th key={index} className="border border-gray-300 p-3 text-left font-semibold text-blue-800 text-sm">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {dataRows.map((row, rowIndex) => (
                      <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-blue-50' : 'bg-white'}>
                        {row.map((cell, cellIndex) => (
                          <td key={cellIndex} className="border border-gray-300 p-3 text-sm">
                            {cellIndex === 0 ? (
                              <span className="font-medium text-gray-800">{cell}</span>
                            ) : (
                              <span className="font-semibold text-blue-600">{cell}</span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        }
      }
    }
    
    // GESTIONE FEATURES ARRAY SEMPLICI (Whey Iso, Prime Oat, Taurina)
    if (!markdownContent.includes('|') && features.length > 0) {
      
      // Trova l'indice della prima riga che contiene valori nutrizionali 
      let nutritionStartIndex = -1;
      for (let i = 0; i < features.length; i++) {
        const feature = features[i].toLowerCase();
        if (feature.includes('valori nutrizionali') || feature.includes('energia') || feature.includes('valore energetico') || feature.includes('taurina:')) {
          nutritionStartIndex = i;
          break;
        }
      }
      
      if (nutritionStartIndex >= 0) {
        const nutritionData = [];
        const portionTitle = features[0] || 'Valori Nutrizionali';
        
        // Estrai i valori nutrizionali dalle features
        for (let i = nutritionStartIndex; i < features.length; i++) {
          const feature = features[i];
          if (feature && feature.includes(':') && !feature.toLowerCase().includes('valori nutrizionali') && !feature.toLowerCase().includes('porzione =')) {
            const [label, value] = feature.split(':').map((s: string) => s.trim());
            if (label && value) {
              nutritionData.push({ label, value });
            }
          }
          // Fermati se incontri una sezione separata (ingredienti, etc.)
          if (feature && (feature.toLowerCase().includes('ingredienti') || feature.toLowerCase().includes('profilo'))) {
            break;
          }
        }
        
        if (nutritionData.length > 0) {
          return (
            <div className="space-y-4">
              <h4 className="font-semibold text-lg mb-4">Valori Nutrizionali</h4>
              
              {/* Informazioni sulla porzione */}
              <div className="mb-4 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                <p className="text-blue-800 font-semibold text-sm">
                  {portionTitle}
                </p>
                {features[1] && (
                  <p className="text-blue-700 text-sm mt-1">
                    {features[1]}
                  </p>
                )}
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-blue-50">
                      <th className="border border-gray-300 p-3 text-left font-semibold text-blue-800 text-sm">
                        Componente
                      </th>
                      <th className="border border-gray-300 p-3 text-left font-semibold text-blue-800 text-sm">
                        Quantità
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {nutritionData.map((item, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-blue-50' : 'bg-white'}>
                        <td className="border border-gray-300 p-3 text-sm">
                          <span className="font-medium text-gray-800">{item.label}</span>
                        </td>
                        <td className="border border-gray-300 p-3 text-sm">
                          <span className="font-semibold text-blue-600">{item.value}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        }
      }
    }
    
    // Fallback per gestione EthicSport con HTML
    const htmlContent = features[0];
    if (htmlContent.includes('<table') && htmlContent.includes('nutritional-table')) {
      // Estrai i dati dalla tabella HTML
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlContent, 'text/html');
      const table = doc.querySelector('table');
      
      if (table) {
        const headers = Array.from(table.querySelectorAll('thead th')).map(th => th.textContent?.trim() || '');
        const rows = Array.from(table.querySelectorAll('tbody tr')).map(tr => 
          Array.from(tr.querySelectorAll('td')).map(td => td.textContent?.trim() || '')
        );
        
        return (
          <div className="space-y-4">
            <h4 className="font-semibold text-lg mb-4">Valori Nutrizionali</h4>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-yellow-50">
                    {headers.map((header, index) => (
                      <th key={index} className="border border-gray-300 p-3 text-left font-semibold text-gray-700 text-sm">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, rowIndex) => (
                    <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex} className="border border-gray-300 p-3 text-sm">
                          {cellIndex === 0 ? (
                            <span className="font-medium text-gray-800">{cell}</span>
                          ) : (
                            <span className="font-semibold text-blue-600">{cell}</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      }
    }
  }
  
  // Prima prova i dati dinamici dal database - FORMATO PROLABS (array di oggetti con nome, valore, unita)
  if (features?.valori_nutrizionali && Array.isArray(features.valori_nutrizionali)) {
    const nutritionalData = features.valori_nutrizionali;
    
    return (
      <div className="space-y-4">
        <h4 className="font-semibold text-lg mb-4">Valori Nutrizionali</h4>
        
        <div className="nutrition-table">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-yellow-50">
                <th className="border border-gray-300 p-3 text-left font-semibold text-gray-700">Nutriente</th>
                <th className="border border-gray-300 p-3 text-left font-semibold text-gray-700">Quantità</th>
              </tr>
            </thead>
            <tbody>
              {nutritionalData.map((item: any, index: number) => {
                // Skip empty entries che sono solo intestazioni
                if (!item.valore && !item.unita && item.nome && !item.nome.includes('PORZIONE')) {
                  return (
                    <tr key={index} className="bg-blue-50">
                      <td className="border border-gray-300 p-3 font-semibold text-blue-800" colSpan={2}>
                        {item.nome}
                      </td>
                    </tr>
                  );
                }
                
                // Skip entry completamente vuote
                if (!item.nome) return null;
                
                return (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="border border-gray-300 p-3 font-medium text-gray-800">
                      {item.nome}
                    </td>
                    <td className="border border-gray-300 p-3 font-semibold text-blue-600">
                      {item.valore && item.unita ? `${item.valore} ${item.unita}` : 
                       item.valore ? item.valore : 
                       item.unita ? item.unita : ''}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // Nuova struttura per prodotti Pronutrition: nutritional_table con values array
  if (features?.nutritional_table && typeof features.nutritional_table === 'object' && features.nutritional_table.values) {
    const nutritionalData = features.nutritional_table;
    
    return (
      <div className="space-y-4">
        <h4 className="font-semibold text-lg mb-4">{nutritionalData.title || 'Valori Nutrizionali'}</h4>
        
        {(nutritionalData.serving_size || nutritionalData.servings_per_container) && (
          <div className="bg-blue-50 p-3 rounded-lg">
            {nutritionalData.serving_size && (
              <p className="text-blue-800 font-medium">Per dose: {nutritionalData.serving_size}</p>
            )}
            {nutritionalData.servings_per_container && (
              <p className="text-blue-600 text-sm">Dosi per confezione: {nutritionalData.servings_per_container}</p>
            )}
          </div>
        )}
        
        <div className="nutrition-table">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="border p-2 text-left">Nutriente</th>
                <th className="border p-2 text-left">Quantità</th>
                {nutritionalData.values.some((item: any) => item.daily_value) && (
                  <th className="border p-2 text-left">%VNR*</th>
                )}
              </tr>
            </thead>
            <tbody>
              {nutritionalData.values.map((item: any, index: number) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="border p-2 font-medium text-gray-800">
                    {item.nutrient}
                  </td>
                  <td className="border p-2 font-bold text-blue-600">
                    {item.amount} {item.unit}
                  </td>
                  {item.daily_value && (
                    <td className="border p-2 font-bold text-green-600">{item.daily_value}</td>
                  )}
                </tr>
              ))}
            </tbody>
            {nutritionalData.values.some((item: any) => item.daily_value) && (
              <tfoot>
                <tr>
                  <td className="border p-2 text-sm text-gray-600" colSpan={3}>
                    *Valori Nutritivi di Riferimento
                  </td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </div>
    );
  }

  // Seconda struttura: dati dinamici dal database (struttura complessa con tabella)
  if (features?.valori_nutrizionali && typeof features.valori_nutrizionali === 'object' && features.valori_nutrizionali.tabella) {
    const nutritionalData = features.valori_nutrizionali;
    
    return (
      <div className="space-y-4">
        <h4 className="font-semibold text-lg mb-4">Valori Nutrizionali</h4>
        
        {nutritionalData.dose && (
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-blue-800 font-medium">{nutritionalData.dose}</p>
          </div>
        )}
        
        <div className="nutrition-table">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="border p-2 text-left">
                  {nutritionalData.tabella?.[0]?.nutriente ? 'Nutriente' : 'Componente'}
                </th>
                <th className="border p-2 text-left">
                  {nutritionalData.tabella?.[0]?.per_100g ? 'Per 100g' : 
                   nutritionalData.tabella?.[0]?.per_30g ? 'Per 30g' : 'Quantità'}
                </th>
                {nutritionalData.tabella?.[0]?.per_30g && (
                  <th className="border p-2 text-left">Per 30g</th>
                )}
                {nutritionalData.tabella?.[0]?.vnr && (
                  <th className="border p-2 text-left">%VNR*</th>
                )}
              </tr>
            </thead>
            <tbody>
              {nutritionalData.tabella?.map((item: any, index: number) => (
                <tr key={index}>
                  <td className="border p-2">
                    {item.nutriente || item.componente}
                  </td>
                  <td className="border p-2 font-bold">
                    {item.per_100g || item.quantita}
                  </td>
                  {item.per_30g && (
                    <td className="border p-2 font-bold">{item.per_30g}</td>
                  )}
                  {item.vnr && (
                    <td className="border p-2 font-bold text-green-600">{item.vnr}</td>
                  )}
                </tr>
              ))}
            </tbody>
            {nutritionalData.tabella?.some((item: any) => item.vnr) && (
              <tfoot>
                <tr>
                  <td className="border p-2 text-sm text-gray-600" colSpan={4}>
                    *Valori Nutritivi di Riferimento
                  </td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </div>
    );
  }

  // Gestione per il nuovo formato array di stringhe markdown (GABA, BCAA, Glutamine Pure, etc.)
  if (Array.isArray(features) && features.length > 0) {
    const markdownContent = features.join('\n');
    
    // Se contiene tabelle markdown, convertile in HTML
    if (markdownContent.includes('| Componente |') || markdownContent.includes('| Nutriente |')) {
      const sections = markdownContent.split('**').filter(s => s.trim());
      let nutritionalSection = '';
      let ingredientsSection = '';
      let usageSection = '';
      
      for (let i = 0; i < sections.length; i++) {
        if (sections[i].includes('VALORI NUTRIZIONALI')) {
          // Prende la sezione successiva che contiene la tabella
          nutritionalSection = sections[i + 1] || '';
        } else if (sections[i].includes('INGREDIENTI')) {
          ingredientsSection = sections[i + 1] || '';
        } else if (sections[i].includes('MODALITÀ')) {
          usageSection = sections[i + 1] || '';
        }
      }
      
      // Estrai le righe della tabella
      const tableLines = nutritionalSection.split('\n').filter(line => line.includes('|'));
      const headerLine = tableLines.find(line => line.includes('Componente') || line.includes('Nutriente'));
      const dataLines = tableLines.filter(line => !line.includes('Componente') && !line.includes('Nutriente') && !line.includes('---'));
      
      if (headerLine && dataLines.length > 0) {
        const headers = headerLine.split('|').map(h => h.trim()).filter(h => h);
        const rows = dataLines.map(line => line.split('|').map(cell => cell.trim()).filter(cell => cell));
        
        return (
          <div className="space-y-4">
            <h4 className="font-semibold text-lg mb-4">Valori Nutrizionali</h4>
            
            <div className="nutrition-table">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-blue-50">
                    {headers.map((header, index) => (
                      <th key={index} className="border border-gray-300 p-3 text-left font-semibold text-gray-700">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, rowIndex) => (
                    <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex} className="border border-gray-300 p-3">
                          {cellIndex === 0 ? (
                            <span className="font-medium text-gray-800">{cell}</span>
                          ) : (
                            <span className="font-semibold text-blue-600">{cell}</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {markdownContent.includes('Porzioni per confezione') && (
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-blue-600 text-sm">
                  {markdownContent.match(/Porzioni per confezione: \d+/)?.[0]}
                </p>
              </div>
            )}
          </div>
        );
      }
    }
  }

  // Se i valori nutrizionali sono una stringa semplice (nuovi prodotti) - tabella come Arginina+ Complex Capsule
  if (features?.valori_nutrizionali && typeof features.valori_nutrizionali === 'string') {
    const text = features.valori_nutrizionali;
    
    // Estrai la dose se presente
    const doseMatch = text.match(/Porzione\/Serving:\s*(\d+\s*g)/i);
    const dose = doseMatch ? doseMatch[1] : '';
    
    // Parsing specifico per Aminoacidi Essenziali
    if (productSlug === 'aminoacidi-essenziali') {
      return (
        <div className="space-y-4">
          <h4 className="font-semibold text-lg mb-4">Valori Nutrizionali</h4>
          
          <div className="bg-blue-50 p-3 rounded mb-4">
            <p className="text-blue-600 font-medium">1 dose = 10 g</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 p-3 text-left font-medium text-gray-700">Nutriente</th>
                  <th className="border border-gray-300 p-3 text-left font-medium text-gray-700">Quantità</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="border border-gray-300 p-3">L-Leucina</td><td className="border border-gray-300 p-3 font-medium">1450 mg</td></tr>
                <tr><td className="border border-gray-300 p-3">L-Lisina</td><td className="border border-gray-300 p-3 font-medium">1050 mg</td></tr>
                <tr><td className="border border-gray-300 p-3">L-Fenilalanina</td><td className="border border-gray-300 p-3 font-medium">1040 mg</td></tr>
                <tr><td className="border border-gray-300 p-3">L-Treonina</td><td className="border border-gray-300 p-3 font-medium">960 mg</td></tr>
                <tr><td className="border border-gray-300 p-3">L-Istidina</td><td className="border border-gray-300 p-3 font-medium">850 mg</td></tr>
                <tr><td className="border border-gray-300 p-3">L-Isoleucina</td><td className="border border-gray-300 p-3 font-medium">725 mg</td></tr>
                <tr><td className="border border-gray-300 p-3">L-Valina</td><td className="border border-gray-300 p-3 font-medium">725 mg</td></tr>
                <tr><td className="border border-gray-300 p-3">L-Triptofano</td><td className="border border-gray-300 p-3 font-medium">280 mg</td></tr>
                <tr><td className="border border-gray-300 p-3">L-Metionina</td><td className="border border-gray-300 p-3 font-medium">110 mg</td></tr>
                <tr><td className="border border-gray-300 p-3">Inulina</td><td className="border border-gray-300 p-3 font-medium">0,9 g</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      );
    }
    
    // Parsing specifico per EAA Pro
    if (productSlug === 'eaa-pro') {
      return (
        <div className="space-y-4">
          <h4 className="font-semibold text-lg mb-4">Valori Nutrizionali</h4>
          
          <div className="bg-blue-50 p-3 rounded mb-4">
            <p className="text-blue-600 font-medium">1 dose = 14 g (2 misurini)</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 p-3 text-left font-medium text-gray-700">Nutriente</th>
                  <th className="border border-gray-300 p-3 text-left font-medium text-gray-700">Quantità</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="border border-gray-300 p-3">L-Leucina</td><td className="border border-gray-300 p-3 font-medium">3334 mg</td></tr>
                <tr><td className="border border-gray-300 p-3">L-Glutammina</td><td className="border border-gray-300 p-3 font-medium">2500 mg</td></tr>
                <tr><td className="border border-gray-300 p-3">L-Lisina</td><td className="border border-gray-300 p-3 font-medium">1000 mg</td></tr>
                <tr><td className="border border-gray-300 p-3">L-Taurina</td><td className="border border-gray-300 p-3 font-medium">1000 mg</td></tr>
                <tr><td className="border border-gray-300 p-3">L-Isoleucina</td><td className="border border-gray-300 p-3 font-medium">833 mg</td></tr>
                <tr><td className="border border-gray-300 p-3">L-Valina</td><td className="border border-gray-300 p-3 font-medium">833 mg</td></tr>
                <tr><td className="border border-gray-300 p-3">Citrullina malato</td><td className="border border-gray-300 p-3 font-medium">800 mg</td></tr>
                <tr><td className="border border-gray-300 p-3">L-Treonina</td><td className="border border-gray-300 p-3 font-medium">700 mg</td></tr>
                <tr><td className="border border-gray-300 p-3">L-Fenilalanina</td><td className="border border-gray-300 p-3 font-medium">250 mg</td></tr>
                <tr><td className="border border-gray-300 p-3">Bromelina</td><td className="border border-gray-300 p-3 font-medium">150 mg</td></tr>
                <tr><td className="border border-gray-300 p-3">L-Istidina</td><td className="border border-gray-300 p-3 font-medium">100 mg</td></tr>
                <tr><td className="border border-gray-300 p-3">Vitamina C</td><td className="border border-gray-300 p-3 font-medium">100 mg (125% VNR)</td></tr>
                <tr><td className="border border-gray-300 p-3">L-Metionina</td><td className="border border-gray-300 p-3 font-medium">75 mg</td></tr>
                <tr><td className="border border-gray-300 p-3">L-Triptofano</td><td className="border border-gray-300 p-3 font-medium">50 mg</td></tr>
                <tr><td className="border border-gray-300 p-3">Papaina</td><td className="border border-gray-300 p-3 font-medium">20 mg</td></tr>
                <tr><td className="border border-gray-300 p-3">Vitamina B1</td><td className="border border-gray-300 p-3 font-medium">1,10 mg (100% VNR)</td></tr>
                <tr><td className="border border-gray-300 p-3">Vitamina B6</td><td className="border border-gray-300 p-3 font-medium">1,60 mg (114% VNR)</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      );
    }
    
    // Parsing specifico per Aminoacidi+ - gestisce tabelle markdown
    if (productSlug === 'aminoacidi-plus') {
      // Parsing della tabella markdown
      const lines = text.split('\n').filter((line: string) => line.trim());
      const tableLines = lines.filter((line: string) => line.includes('|'));
      
      if (tableLines.length >= 2) {
        // Prima linea: header, linee successive: dati (salta la linea di separazione)
        const headers = tableLines[0].split('|').map((h: string) => h.trim()).filter((h: string) => h);
        const dataRows = tableLines.slice(2).map((line: string) => 
          line.split('|').map((cell: string) => cell.trim()).filter((cell: string) => cell)
        );
        
        return (
          <div className="space-y-4">
            <h4 className="font-semibold text-lg mb-4">Valori Nutrizionali</h4>
            
            {/* Info dose */}
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
              <h4 className="font-semibold text-blue-800 mb-2">📏 Porzione</h4>
              <p className="text-blue-700 font-medium">1 dose = 5 compresse</p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-blue-100">
                    {headers.map((header: string, index: number) => (
                      <th key={index} className="border border-gray-300 p-3 text-left font-semibold">{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dataRows.map((row: string[], rowIndex: number) => (
                    <tr key={rowIndex}>
                      {row.map((cell: string, cellIndex: number) => (
                        <td key={cellIndex} className="border border-gray-300 p-3 font-medium">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Note VNR */}
            {lines.find((line: string) => line.toLowerCase().includes('vnr:')) && (
              <div className="text-sm text-gray-600 mt-4 p-3 bg-gray-50 rounded">
                <p>{lines.find((line: string) => line.toLowerCase().includes('vnr:'))}</p>
              </div>
            )}
          </div>
        );
      }
    }
    
    // Fallback per altri prodotti
    return (
      <div className="space-y-4">
        <h4 className="font-semibold text-lg mb-4">Valori Nutrizionali</h4>
        <div className="whitespace-pre-line text-gray-800 leading-relaxed">
          {features.valori_nutrizionali}
        </div>
      </div>
    );
  }
  
  // Se non ha caratteristiche tecniche, prova quelle
  if (features?.caratteristiche_tecniche) {
    const techSpecs = features.caratteristiche_tecniche;
    
    return (
      <div className="space-y-4">
        <h4 className="font-semibold text-lg mb-4">Caratteristiche Tecniche</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(techSpecs).map(([key, value]) => (
            <div key={key} className="flex justify-between items-center py-2 border-b">
              <span className="font-medium capitalize">{key.replace(/_/g, ' ')}</span>
              <span className="text-gray-600">{value as string}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  // Gestione per prodotti Batch 4-6 (ProLabs e Pronutrition) - dati salvati direttamente nell'array features
  if (Array.isArray(features) && features.length > 0 && typeof features[0] === 'string' && 
      features[0].includes('Valori Nutrizionali')) {
    
    // Organizza i dati in sezioni per un rendering più professionale
    const sections: { [key: string]: string[] } = {};
    let currentSection = 'porzione';
    
    features.forEach((item: string) => {
      if (!item || item.trim() === '') return;
      
      // Identifica nuove sezioni
      if (item.includes('Profilo Aminoacidico') || item.includes('PROFILO AMINOACIDICO')) {
        currentSection = 'aminoacidi';
        return;
      }
      if (item.includes('Valori Nutrizionali per 100') || item.includes('Informazioni nutrizionali per 100')) {
        currentSection = 'per100g';
        return;
      }
      if (item.includes('Valori Nutrizionali per porzione') || item.includes('Informazioni nutrizionali per porzione')) {
        currentSection = 'porzione';
        return;
      }
      
      if (!sections[currentSection]) sections[currentSection] = [];
      sections[currentSection].push(item);
    });
    
    const renderNutritionalValue = (value: string) => {
      // Evidenzia i grammi in blu come nell'immagine
      const gramRegex = /(\d+(?:,\d+)?\s*g)(?!\s*\w)/g;
      const mgRegex = /(\d+(?:,\d+)?\s*mg)(?!\s*\w)/g;
      const kcalRegex = /(\d+(?:,\d+)?\s*kcal)/g;
      const kjRegex = /(\d+(?:,\d+)?\s*KJ)/g;
      
      return value
        .replace(gramRegex, '<span class="text-blue-600 font-bold">$1</span>')
        .replace(mgRegex, '<span class="text-blue-500 font-semibold">$1</span>')
        .replace(kcalRegex, '<span class="text-orange-600 font-semibold">$1</span>')
        .replace(kjRegex, '<span class="text-orange-500 font-medium">$1</span>');
    };
    
    return (
      <div className="space-y-6">
        <h4 className="font-semibold text-lg mb-6 text-gray-900">Valori Nutrizionali</h4>
        
        {/* Sezione per porzione (30g) */}
        {sections.porzione && (
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="bg-gradient-to-r from-blue-100 to-blue-200 px-4 py-3 rounded-t-lg">
              <h5 className="font-semibold text-gray-800">Valori Nutrizionali per porzione:</h5>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <tbody>
                  {/* Header porzione */}
                  {sections.porzione.find(item => item.includes('PORZIONE =')) && (
                    <tr>
                      <td className="p-3 bg-blue-50 border-b font-medium text-blue-800 text-sm" colSpan={2}>
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                          {sections.porzione.find(item => item.includes('PORZIONE ='))}
                        </div>
                      </td>
                    </tr>
                  )}
                  
                  {sections.porzione.map((item: string, index: number) => {
                    if (!item || item.trim() === '' || item.includes('PORZIONE =') || item.includes('VNR:')) return null;
                    
                    // Parse nutriente e valore
                    const parts = item.split(/\s{2,}|\t/);
                    if (parts.length >= 2) {
                      const nutrient = parts[0].trim();
                      const value = parts[1].trim();
                      
                      return (
                        <tr key={`porzione-${index}`} className="hover:bg-gray-50 transition-colors">
                          <td className="p-3 border-b border-gray-200 font-medium text-gray-800 w-2/3">
                            {nutrient}
                          </td>
                          <td className="p-3 border-b border-gray-200 font-semibold text-gray-700" 
                              dangerouslySetInnerHTML={{ __html: renderNutritionalValue(value) }}>
                          </td>
                        </tr>
                      );
                    }
                    
                    return null;
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {/* Sezione per 100g */}
        {sections.per100g && (
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="bg-gradient-to-r from-green-100 to-green-200 px-4 py-3 rounded-t-lg">
              <h5 className="font-semibold text-gray-800">Valori Nutrizionali per 100g:</h5>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <tbody>
                  {sections.per100g.map((item: string, index: number) => {
                    if (!item || item.trim() === '' || item.includes('VNR:')) return null;
                    
                    // Parse nutriente e valore
                    const parts = item.split(/\s{2,}|\t/);
                    if (parts.length >= 2) {
                      const nutrient = parts[0].trim();
                      const value = parts[1].trim();
                      
                      return (
                        <tr key={`per100g-${index}`} className="hover:bg-gray-50 transition-colors">
                          <td className="p-3 border-b border-gray-200 font-medium text-gray-800 w-2/3">
                            {nutrient}
                          </td>
                          <td className="p-3 border-b border-gray-200 font-semibold text-gray-700" 
                              dangerouslySetInnerHTML={{ __html: renderNutritionalValue(value) }}>
                          </td>
                        </tr>
                      );
                    }
                    
                    return null;
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {/* Sezione Profilo Aminoacidico */}
        {sections.aminoacidi && (
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="bg-gradient-to-r from-green-100 to-emerald-200 px-4 py-3 rounded-t-lg">
              <h5 className="font-semibold text-gray-800">Profilo Aminoacidico</h5>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-green-50 border-b-2 border-green-200">
                    <th className="p-4 text-left font-semibold text-gray-700">Aminoacido</th>
                    <th className="p-4 text-left font-semibold text-gray-700">Percentuale</th>
                  </tr>
                </thead>
                <tbody>
                  {sections.aminoacidi.map((item: string, index: number) => {
                    if (!item || item.trim() === '') return null;
                    
                    const parts = item.split(/\s+/);
                    if (parts.length >= 2) {
                      const aminoacid = parts.slice(0, -1).join(' ');
                      const percentage = parts[parts.length - 1];
                      
                      return (
                        <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-green-25 hover:bg-green-50 transition-colors'}>
                          <td className="p-4 border-b border-gray-200 font-medium text-gray-800">
                            {aminoacid}
                          </td>
                          <td className="p-4 border-b border-gray-200 font-semibold text-green-600">
                            {percentage}%
                          </td>
                        </tr>
                      );
                    }
                    
                    return null;
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {/* Note VNR */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-lg border-l-4 border-gray-400">
          <p className="text-sm text-gray-600 font-medium">
            <span className="text-gray-800">*VNR:</span> Valori Nutritivi di Riferimento
          </p>
        </div>
      </div>
    );
  }
  
  // PRIORITÀ GENERICA: Tutti i prodotti con features dal database (incluso Batch 9)
  if (features && (typeof features === 'object' || typeof features === 'string')) {
    const genericTable = renderDynamicNutritionalTable(features, productSlug);
    if (genericTable) {
      return genericTable;
    }
  }
  
  // Infine prova le tabelle hardcoded per prodotti specifici
  const hardcodedData = getNutritionalInfo(productSlug);
  return hardcodedData;
};

// Funzione per ottenere gli ingredienti specifici per prodotto
const getIngredientsInfo = (productSlug: string) => {
    const ingredientsData: Record<string, any> = {
      "korean-red-ginseng": {
        description: (
          <>
            <strong>Estratto secco di radice di Ginseng rosso coreano</strong> (Panax ginseng C.A. Meyer) 
            standardizzato al 7% in ginsenosidi, cellulosa microcristallina, capsula vegetale 
            (idrossipropilmetilcellulosa), agenti antiagglomeranti (stearato di magnesio, biossido di silicio).
          </>
        ),
        allergens: "nessuno dichiarato",
        traces: "può contenere tracce di glutine",
        features: [
          "Ginseng rosso coreano di qualità premium",
          "Standardizzato al 7% in ginsenosidi",
          "Estratto da radici di almeno 6 anni",
          "Capsula vegetale, senza gelatina"
        ]
      },

      "echinacea-purpurea": {
        description: (
          <>
            <strong>Estratto secco di parti aeree di Echinacea Purpurea</strong> (Echinacea purpurea L.) 
            standardizzato al 4% in polifenoli, cellulosa microcristallina, capsula vegetale 
            (idrossipropilmetilcellulosa), agenti antiagglomeranti (stearato di magnesio).
          </>
        ),
        allergens: "nessuno dichiarato",
        traces: "può contenere tracce di glutine e soia",
        features: [
          "Estratto da parti aeree di piante fresche",
          "Standardizzato al 4% in polifenoli",
          "Coltivazione biologica certificata",
          "Capsula vegetale, adatto ai vegani"
        ]
      },

      "selenio-100-jamieson": {
        description: (
          <>
            Agenti di carica (cellulosa microcristallina, fosfato dicalcico), <strong>selenio lievito</strong>, 
            agenti antiagglomeranti (acido stearico, stearato di magnesio), rivestimento 
            (idrossipropilmetilcellulosa).
          </>
        ),
        allergens: "lievito",
        traces: "può contenere tracce di glutine",
        features: [
          "Selenio organico da lievito",
          "Maggiore biodisponibilità",
          "Forma altamente assorbibile",
          "Testato per purezza e potenza"
        ]
      },

      "calcio-citrato-d3-jamieson": {
        description: (
          <>
            <strong>Calcio citrato</strong>, agenti di carica (cellulosa microcristallina, croscarmellose sodica), 
            <strong>vitamina D3 (colecalciferolo)</strong>, agenti antiagglomeranti (acido stearico, stearato di magnesio), 
            rivestimento (idrossipropilmetilcellulosa).
          </>
        ),
        allergens: "nessuno dichiarato",
        traces: "può contenere tracce di soia",
        features: [
          "Calcio citrato ad alta biodisponibilità",
          "Vitamina D3 naturale",
          "Non richiede acidità gastrica per assorbimento",
          "Facile digestione"
        ]
      },

      "licopene-jamieson": {
        description: (
          <>
            <strong>Estratto di pomodoro standardizzato</strong> (Lycopersicon esculentum) contenente licopene, 
            olio di girasole, capsula softgel (gelatina, glicerina, acqua), cera d'api gialla, lecitina di soia.
          </>
        ),
        allergens: "soia, gelatina",
        traces: "può contenere tracce di glutine",
        features: [
          "Licopene da pomodori maturi selezionati",
          "Estratto concentrato 100:1",
          "In matrice oleosa per migliore assorbimento",
          "Senza coloranti artificiali"
        ]
      },

      "vita-vim-multivitaminico-jamieson": {
        description: (
          <>
            Fosfato dicalcico, cellulosa microcristallina, <strong>acido ascorbico</strong>, fumarato ferroso, 
            ossido di magnesio, DL-alfa-tocoferolo acetato, niacinamide, ossido di zinco, 
            calcio D-pantotenato, riboflavina, tiamina mononitrato, retinolo acetato, acido folico, 
            colecalciferolo, cianocobalamina.
          </>
        ),
        allergens: "nessuno dichiarato",
        traces: "può contenere tracce di glutine e soia",
        features: [
          "23 vitamine e minerali essenziali",
          "Ferro chelato per migliore tollerabilità",
          "Vitamine del gruppo B ad alto dosaggio",
          "Formula bilanciata per uomo e donna"
        ]
      },

      "lutein-z-jamieson": {
        description: (
          <>
            Olio di girasole, <strong>estratto di tagete</strong> (Tagetes erecta) titolato in luteina e zeaxantina, 
            capsula softgel (gelatina, glicerina, acqua), cera d'api.
          </>
        ),
        allergens: "gelatina",
        traces: "può contenere tracce di soia",
        features: [
          "Luteina e zeaxantina da fiori di tagete",
          "Rapporto 5:1 ottimale luteina:zeaxantina",
          "In olio per massimo assorbimento",
          "Estratto standardizzato e purificato"
        ]
      },

      "spirulina-jamieson": {
        description: (
          <>
            <strong>Spirulina platensis</strong> pura al 100%, capsula vegetale (idrossipropilmetilcellulosa).
          </>
        ),
        allergens: "nessuno dichiarato",
        traces: "coltivata in ambiente controllato",
        features: [
          "Spirulina platensis di qualità superiore",
          "Coltivazione in acqua pura controllata",
          "Essiccazione a bassa temperatura",
          "Testata per purezza da metalli pesanti"
        ]
      },

      "olio-di-lino-jamieson": {
        description: (
          <>
            <strong>Olio di semi di lino</strong> (Linum usitatissimum) spremuto a freddo, capsula softgel 
            (gelatina, glicerina, acqua purificata).
          </>
        ),
        allergens: "gelatina",
        traces: "nessuno dichiarato",
        features: [
          "Olio di lino spremuto a freddo",
          "Semi di qualità premium selezionati",
          "Processo di estrazione senza solventi",
          "Confezionamento sottovuoto per freschezza"
        ]
      },

      "omega-3-select-mini-jamieson": {
        description: (
          <>
            <strong>Concentrato di olio di pesce</strong> (acciughe, sardine, sgombri), capsula softgel mini 
            (gelatina, glicerina, acqua), antiossidanti naturali (tocoferoli misti).
          </>
        ),
        allergens: "pesce, gelatina",
        traces: "può contenere tracce di crostacei",
        features: [
          "Olio di pesce da pesca sostenibile",
          "Distillazione molecolare per purezza",
          "Capsule mini per facile deglutizione",
          "Testato per metalli pesanti e contaminanti"
        ]
      },

      "omega-complete-krill-jamieson": {
        description: (
          <>
            <strong>Olio di krill antartico</strong> (Euphausia superba), capsula softgel 
            (gelatina, glicerina, acqua purificata).
          </>
        ),
        allergens: "crostacei, gelatina",
        traces: "può contenere tracce di pesce",
        features: [
          "Krill antartico da pesca sostenibile MSC",
          "Omega-3 in forma fosfolipidica",
          "Astaxantina naturale inclusa",
          "Tracciabilità completa dalla fonte"
        ]
      },

      "omega-3-extra-jamieson": {
        description: (
          <>
            <strong>Concentrato di olio di pesce</strong> (acciughe, sardine, sgombri), capsula softgel 
            (gelatina, glicerina, acqua), antiossidanti naturali (tocoferoli misti).
          </>
        ),
        allergens: "pesce, gelatina",
        traces: "può contenere tracce di crostacei",
        features: [
          "Concentrazione extra di EPA e DHA",
          "Olio di pesce di grado farmaceutico",
          "Distillazione molecolare tripla",
          "Certificazione IFOS per purezza"
        ]
      },

      "vitamina-c-masticabile-jamieson": {
        description: (
          <>
            <strong>Acido ascorbico</strong>, sorbitolo, aromi naturali frutti misti, acido stearico, 
            stearato di magnesio, sucralosio.
          </>
        ),
        allergens: "nessuno dichiarato",
        traces: "può contenere tracce di soia",
        features: [
          "Vitamina C pura",
          "Aromi naturali frutti misti",
          "Dolcificanti naturali",
          "Facile assorbimento masticabile"
        ]
      },

      "vitamina-k2-d3-jamieson": {
        description: (
          <>
            Olio di girasole, <strong>vitamina K2 (menachinone-7)</strong> da fermentazione batterica naturale, 
            <strong>vitamina D3 (colecalciferolo)</strong>, capsula softgel (gelatina, glicerina, acqua).
          </>
        ),
        allergens: "gelatina",
        traces: "nessuno dichiarato",
        features: [
          "K2 MK-7 da fermentazione naturale",
          "Vitamina D3 di origine naturale",
          "Sinergia ottimale K2+D3",
          "Forma bio-attiva di lunga durata"
        ]
      },

      "magnesio-tripla-azione-jamieson": {
        description: (
          <>
            <strong>Magnesio lattato</strong>, <strong>magnesio gluconato</strong>, <strong>magnesio ossido</strong>, 
            cellulosa microcristallina, croscarmellose sodica, acido stearico, stearato di magnesio, 
            rivestimento (idrossipropilmetilcellulosa).
          </>
        ),
        allergens: "nessuno dichiarato",
        traces: "può contenere tracce di soia",
        features: [
          "Tre forme di magnesio complementari",
          "Due forme organiche ad alta biodisponibilità",
          "Rilascio graduale e prolungato",
          "Ottima tollerabilità gastrica"
        ]
      },

      "calcio-650-why-sport": {
        description: (
          <>
            <strong>Calcio carbonato</strong>, cellulosa microcristallina, croscarmellose sodica, 
            acido stearico, stearato di magnesio, rivestimento (idrossipropilmetilcellulosa).
          </>
        ),
        allergens: "nessuno dichiarato",
        traces: "può contenere tracce di glutine",
        features: [
          "Calcio carbonato di alta qualità",
          "Dosaggio elevato per compressa",
          "Facile deglutizione",
          "Prodotto in Italia"
        ]
      },

      "ashwagandha-jamieson": {
        description: (
          <>
            <strong>Estratto secco di radice di Ashwagandha</strong> (Withania somnifera) standardizzato 
            al 1,5% witanolidi, cellulosa microcristallina, croscarmellose sodica, acido stearico, 
            stearato di magnesio, rivestimento vegetale.
          </>
        ),
        allergens: "nessuno dichiarato",
        traces: "può contenere tracce di glutine",
        features: [
          "Estratto di radice standardizzato",
          "1,5% witanolidi garantiti",
          "Coltivazione biologica certificata",
          "Rivestimento vegetale"
        ]
      },

      "alaform-800-premier": {
        description: (
          <>
            <strong>Acido alfa-lipoico</strong>, cellulosa microcristallina, croscarmellose sodica, 
            acido stearico, stearato di magnesio, rivestimento enterico per proteggere da acidità gastrica.
          </>
        ),
        allergens: "nessuno dichiarato",
        traces: "può contenere tracce di soia",
        features: [
          "Acido alfa-lipoico di grado farmaceutico",
          "Rivestimento enterico protettivo",
          "Dosaggio terapeutico elevato",
          "Purezza superiore al 99%"
        ]
      },

      // === NUOVI 9 PRODOTTI - INGREDIENTI ===
      "energize-advanced": {
        description: (
          <>
            <strong>Sciroppo di glucosio</strong>, zucchero, cereali soffiati (riso, frumento), 
            <strong>caffeina</strong> (50mg/100g), aromi naturali raspberry, acido citrico, 
            coloranti naturali (estratto di barbabietola).
          </>
        ),
        allergens: "glutine",
        traces: "può contenere tracce di frutta a guscio",
        features: [
          "Carboidrati a rilascio rapido e graduale",
          "Caffeina naturale per energia",
          "Cereali soffiati per texture",
          "Aromi naturali"
        ]
      },

      "powergel": {
        description: (
          <>
            <strong>Maltodestrine</strong>, acqua, <strong>fruttosio</strong>, aromi naturali 
            (mela/mango), acido citrico, <strong>sodio citrato</strong>, conservanti (sorbato di potassio).
          </>
        ),
        allergens: "nessuno dichiarato",
        traces: "prodotto in stabilimento che tratta glutine",
        features: [
          "Carboidrati a rapido assorbimento",
          "Elettroliti per idratazione",
          "Texture fluida easy-squeeze",
          "Aromi naturali di frutta"
        ]
      },

      "high-protein-shake": {
        description: (
          <>
            <strong>Concentrato di proteine del siero del latte</strong>, acqua, 
            <strong>cacao in polvere</strong>, stabilizzanti (carragenan, cellulosa), 
            dolcificante (sucralosio), aromi naturali.
          </>
        ),
        allergens: "latte",
        traces: "può contenere tracce di soia e uova",
        features: [
          "Proteine whey concentrate",
          "Ready-to-drink pratico",
          "Senza zuccheri aggiunti",
          "Smooth chocolate autentico"
        ]
      },

      "burro-di-arachidi-croccante": {
        description: (
          <>
            <strong>Arachidi tostate</strong> (85%), <strong>pezzi di arachidi croccanti</strong> (12%), 
            olio di arachidi, sale marino, <strong>vitamina E</strong> (antiossidante naturale).
          </>
        ),
        allergens: "arachidi",
        traces: "può contenere tracce di altra frutta a guscio",
        features: [
          "85% arachidi italiane selezionate",
          "Pezzi croccanti per texture",
          "Vitamina E antiossidante",
          "Solo ingredienti naturali"
        ]
      },

      "avena-farina-istantanea": {
        description: (
          <>
            <strong>Farina di avena istantanea</strong> (95%), aromi naturali 
            (cappuccino/cacao), <strong>betaglucani</strong> concentrati, 
            emulsionante (lecitina di girasole).
          </>
        ),
        allergens: "glutine (avena)",
        traces: "può contenere tracce di latte e soia",
        features: [
          "Avena italiana di prima qualità",
          "Ricca in betaglucani",
          "Dissoluzione istantanea",
          "Fonte naturale di fibre"
        ]
      },

      "oatmeal-pro": {
        description: (
          <>
            <strong>Farina di avena</strong> (65%), <strong>proteine del siero del latte</strong> (25%), 
            aromi naturali biscotto, <strong>betaglucani</strong>, dolcificante (stevia), 
            emulsionante (lecitina di girasole).
          </>
        ),
        allergens: "glutine, latte",
        traces: "può contenere tracce di soia e uova",
        features: [
          "65% avena + 25% proteine whey",
          "Ricco in betaglucani",
          "Dolcificato con stevia",
          "Gusto biscotto naturale"
        ]
      },

      "pistacchio-crema-proteica": {
        description: (
          <>
            <strong>Pistacchi siciliani</strong> (45%), <strong>proteine del siero del latte</strong> (28%), 
            olio di pistacchio, <strong>vitamina E</strong>, <strong>inulina</strong>, 
            dolcificante (eritritolo).
          </>
        ),
        allergens: "frutta a guscio (pistacchi), latte",
        traces: "può contenere tracce di altra frutta a guscio",
        features: [
          "45% pistacchi siciliani DOP",
          "28% proteine whey premium",
          "Vitamina E e inulina",
          "Senza zuccheri aggiunti"
        ]
      },

      "promeal-energetica": {
        description: (
          <>
            <strong>Cereali integrali</strong> (avena, riso), <strong>mandorle</strong> (15%), 
            sciroppo di agave, <strong>mix vitaminico</strong> (13 vitamine), 
            olio di girasole, sale marino.
          </>
        ),
        allergens: "glutine, frutta a guscio (mandorle)",
        traces: "può contenere tracce di latte e soia",
        features: [
          "Cereali integrali biologici",
          "15% mandorle premium",
          "13 vitamine essenziali",
          "Energia naturale duratura"
        ]
      },

      "promeal-50-protein-bar": {
        description: (
          <>
            <strong>Proteine del latte</strong> (whey + caseine) (50%), 
            <strong>fibre solubili</strong>, aromi naturali (yogurt/cocco), 
            dolcificante (maltitolo), emulsionante (lecitina di soia).
          </>
        ),
        allergens: "latte, soia",
        traces: "può contenere tracce di glutine e frutta a guscio",
        features: [
          "50% proteine del latte",
          "Mix whey + caseine",
          "Ricco in fibre solubili",
          "Dolcificato con maltitolo"
        ]
      },

      "essential-100-whey": {
        description: (
          <>
            <strong>Proteine concentrate del siero del latte</strong> (emulsionante: lecitina di soia); 
            <strong>Grow factor 14%</strong> (creatina monoidrato, L-glicina); cacao in polvere (6,2%); 
            addensanti: gomma di guar, gomma di xanthan; aroma; cloruro di sodio; 
            edulcoranti: acesulfame K, sucralosio; aroma.
          </>
        ),
        allergens: "Contiene latte e soia",
        traces: "Può contenere tracce di glutine, uova, arachidi, frutta a guscio",
        features: [
          "Proteine concentrate del siero del latte di alta qualità",
          "Arricchito con mix Grow Factor (creatina + L-glicina)",
          "Senza glutine certificato",
          "Dolcificato con edulcoranti naturali",
          "Rapido assorbimento post-workout"
        ]
      },



      "hydrolyzed-100-whey": {
        description: (
          <>
            <strong>Proteine isolate idrolizzate del siero del latte Optipep®</strong> (emulsionante: lecitina di soia), 
            aroma, <strong>sweet complex</strong> (sucralosio, glicosidi steviolici), 
            <strong>enzyme complex</strong> (lattasi, bromelina).
          </>
        ),
        allergens: "Contiene latte e soia",
        traces: "Può contenere tracce di glutine, uova, frutta a guscio",
        features: [
          "Proteine Optipep® ad assorbimento ultra-rapido",
          "92% di proteine idrolizzate di altissima qualità",
          "Arricchito con enzimi digestivi (lattasi, bromelina)",
          "Sweet complex con dolcificanti naturali",
          "Ideale per il post-workout immediato",
          "Massima velocità di assimilazione"
        ]
      },

      "iso-soya": {
        description: (
          <>
            <strong>Proteine isolate della soia</strong>, aromi, edulcoranti: acesulfame K, sucralosio, 
            <strong>vitamine C, PP, E, B1, B2, B6, A, H, B12</strong>, acido folico, acido pantotenico.
          </>
        ),
        allergens: "Contiene soia",
        traces: "Può contenere tracce di glutine, latte, uova, frutta a guscio",
        features: [
          "100% vegetale - adatto a vegani e vegetariani",
          "90% di proteine isolate della soia",
          "Arricchito con vitamine del gruppo B",
          "Alternativa vegetale alle proteine del latte",
          "Supporta il metabolismo energetico",
          "Privo di lattosio e colesterolo"
        ]
      },

      "milk-protein-90-micellar-casein": {
        description: (
          <>
            <strong>Caseina micellare</strong> (deriva da latte) 95,1%, cacao magro in polvere, aromi, 
            edulcoranti: sucralosio, <strong>glicosidi steviolici</strong> (estratti da foglie di Stevia rebaudiana Bertoni); 
            <strong>acido L-ascorbico</strong> (vitamina C), DL-alfa tocoferolo acetato (vitamina E), 
            piridossina HCl (vitamina B6), riboflavina (vitamina B2), tiamina HCl (vitamina B1), 
            cianocobalamina (vitamina B12).
          </>
        ),
        allergens: "Contiene latte",
        traces: "Può contenere tracce di glutine, soia, uova, frutta a guscio",
        features: [
          "90% di proteine da caseine micellari di alta qualità",
          "Rilascio lento e prolungato di aminoacidi (fino a 8 ore)",
          "Arricchito con vitamine C, E e gruppo B",
          "Ideale prima di dormire per il recupero notturno",
          "Zero carboidrati e bassissimo contenuto di grassi",
          "Dolcificato naturalmente con estratti di Stevia"
        ]
      },

      "perfect-100-whey": {
        description: (
          <>
            <strong>Proteine isolate del siero del latte (Isolac®)</strong> (emulsionante: lecitina di soia); 
            cacao in polvere; aroma; edulcorante: sucralosio. <strong>SENZA GLUTINE</strong>.
          </>
        ),
        allergens: "Contiene latte e soia",
        traces: "Può contenere tracce di glutine, uova, frutta a guscio",
        features: [
          "100% proteine isolate del siero Isolac® di alta purezza",
          "90% di proteine per massima concentrazione",
          "Rapido assorbimento e biodisponibilità ottimale",
          "Arricchito con calcio (458mg per 100g)",
          "Certificato senza glutine",
          "Ideale per sviluppo e mantenimento massa muscolare"
        ]
      },

      "perfect-blend-90": {
        description: (
          <>
            <strong>Miscela proteica</strong> (caseinato di calcio istantaneo (latte), proteine isolate del siero di latte (Isolac®), 
            proteine dell'albume d'uovo instant (correttore di acidità: acido citrico), proteine idrolizzate del siero del latte 
            <strong>Optipep® 90 DH4</strong> (emulsionante: lecitina di soia)); aroma; <strong>bromelina</strong> da ananas 
            (Ananas comosus (L.) Merr., frutti) 2500 GDU/g; colorante: curcumina; agente antiagglomerante: biossido di silicio; 
            edulcorante: sucralosio; <strong>lattasi</strong>.
          </>
        ),
        allergens: "Contiene latte, soia e uova",
        traces: "Può contenere tracce di glutine, frutta a guscio",
        features: [
          "Miscela di 4 proteine a rilascio differenziato",
          "91% di proteine da fonti multiple di alta qualità",
          "Arricchito con enzimi digestivi (bromelina + lattasi)",
          "Ideale per intolleranti al lattosio",
          "Versatile per ogni momento della giornata",
          "Rapido assorbimento + rilascio prolungato"
        ]
      },

      "perfect-mass": {
        description: (
          <>
            <strong>Maltodestrine</strong> (da mais); proteine isolate del siero del latte (Isolac®) (emulsionante: lecitina di soia); 
            fruttosio; destrosio monoidrato; <strong>caseinato di calcio</strong> istantaneo (latte); aromi; fosfato di potassio; 
            addensante: gomma di xanthan; agente antiagglomerante: biossido di silicio; <strong>bromelina</strong> da Ananas 
            (Ananas comosus (L.) Merr., gambo) 2500 GDU/g; <strong>vitamina C</strong> (acido L-ascorbico); edulcorante: sucralosio; 
            <strong>vitamina E</strong>.
          </>
        ),
        allergens: "Contiene latte e soia",
        traces: "Può contenere tracce di glutine, uova, frutta a guscio",
        features: [
          "Mass gainer completo con 64% carboidrati",
          "Proteine a doppio rilascio (rapido + lento)",
          "Arricchito con vitamine C ed E antiossidanti",
          "Minerali essenziali (potassio, calcio, fosforo)",
          "Enzima bromelina per miglior digestione",
          "Ideale per aumento massa e peso corporeo"
        ]
      },

      "say-protein-221": {
        description: (
          <>
            <strong>Proteiia</strong>; cacao in polvere; aromi; edulcoranti: sucralosio, acesulfame K; 
            <strong>vitamine</strong>: C (acido L-ascorbico), E (DL-alfa-tocoferolo acetato), B1 (tiamina mononitrato).
          </>
        ),
        allergens: "Contiene soia",
        traces: "Può contenere tracce di glutine, latte, uova, frutta a guscio",
        features: [
          "100% proteine vegetali isolate di soia",
          "83,3% di proteine altamente purificate",
          "Arricchito con vitamine antiossidanti (C, E, B1)",
          "Perfetto per diete vegane e vegetariane",
          "Elevata digeribilità e valore biologico",
          "Zero zuccheri aggiunti"
        ]
      },

      "top-100-xp-cacao": {
        description: "Informazioni ingredienti non disponibili per questo prodotto.",
        allergens: "Può contenere latte, soia, uova, glutine",
        traces: "Consultare l'etichetta del prodotto",
        features: [
          "92% di proteine concentrate di alta qualità",
          "Arricchito con enzimi digestivi (bromelina + papaina)",
          "Basso contenuto di lattosio e carboidrati",
          "Vitamine del gruppo B, C ed E",
          "Facilmente digeribile e ben tollerato",
          "Ideale per post-allenamento e integrazione quotidiana"
        ]
      },

      "top-eggxellent-protein": {
        description: (
          <>
            <strong>Proteine dell'uovo isolate</strong> (da albume d'uovo), aromi, edulcoranti: sucralosio, 
            <strong>glicosidi dello steviolo</strong> (estratti da foglie di Stevia rebaudiana Bertoni); 
            <strong>acido L-ascorbico</strong> (vitamina C), DL-alfa tocoferile acetato (vitamina E), 
            piridossina cloridrato (vitamina B6), riboflavina (vitamina B2), tiamina cloridrato (vitamina B1), 
            cianocobalamina (vitamina B12). Il prodotto potrebbe contenere soia e latte.
          </>
        ),
        allergens: "Contiene uova. Può contenere soia e latte",
        traces: "Può contenere tracce di glutine, frutta a guscio",
        features: [
          "100% proteine da albume d'uovo di altissimo valore biologico",
          "84% di proteine completamente prive di grassi",
          "Zero grassi e zero zuccheri",
          "Arricchito con vitamine C ed E",
          "Ideale per intolleranti al lattosio",
          "Profilo aminoacidico completo"
        ]
      },

      "vegan-isopea-90": {
        description: (
          <>
            <strong>Proteine Isolate del pisello (PISANE®)</strong>, <strong>OXXYNEA®</strong> [Miscela di concentrati 
            di frutta e verdura con estratti (estratto di uva rossa e bianca frutto, estratto di tè verde foglia, 
            concentrati di: carota, pomodoro, mirtillo, broccoli fiore, cavoli verdi foglia, cipolla, aglio, 
            germe di GRANO, pompelmo, asparagi gambo, papaia, ananas, fragola, mela, albicocca, ciliegia, 
            arancia, ribes nero, oliva, cetriolo; maltodestrina (da mais)]. Ingredienti riferiti al Gusto Neutro.
          </>
        ),
        allergens: "Contiene glutine (germe di grano)",
        traces: "Può contenere tracce di soia, latte, uova, frutta a guscio",
        features: [
          "85% proteine isolate del pisello PISANE® (Cosucra)",
          "Arricchito con OXXYNEA® (22 estratti frutta/verdura)",
          "Filiera certificata 100% naturale",
          "Profilo aminoacidico simile alla caseina",
          "Potente azione antiossidante",
          "Ideale per diete vegetali complete"
        ]
      },

      "vegetal-100-protein": {
        description: (
          <>
            <strong>Proteine del pisello</strong>; cacao magro in polvere (10%); <strong>proteine del riso concentrate</strong>; 
            aroma; <strong>ModCarb®</strong> (2%) (crusca di avena – senza glutine, quinoa, amaranto, grano saraceno, 
            miglio); edulcorante: sucralosio; cloruro di sodio; <strong>acai e.s.</strong> (Euterpe oleracea Mart., frutto). 
            e.s. = estratto secco. <strong>SENZA GLUTINE</strong>.
          </>
        ),
        allergens: "Senza allergeni principali",
        traces: "Può contenere tracce di glutine, soia, latte, uova",
        features: [
          "71% proteine da pisello + riso (combinazione completa)",
          "Arricchito con ModCarb™ (5 cereali antichi)",
          "Estratto di Acai per proprietà antiossidanti",
          "Certificato senza glutine",
          "Profilo aminoacidico completo vegetale",
          "Ideale per vegani e intolleranti"
        ]
      }
    };

    // Fallback per prodotti non specificati
    const defaultIngredients = {
      description: "Ingredienti non disponibili per questo prodotto.",
      allergens: "consultare l'etichetta",
      traces: "consultare l'etichetta",
      features: ["Prodotto di qualità", "Testato per sicurezza"]
    };

    const ingredientInfo = ingredientsData[productSlug] || defaultIngredients;
    
    return (
      <div className="space-y-6">
        <div>
          <h4 className="font-semibold text-lg mb-3">Composizione</h4>
          <p className="text-gray-700 leading-relaxed">{ingredientInfo.description}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3 bg-red-50 rounded-lg">
            <h5 className="font-medium text-red-800 mb-1">Allergeni</h5>
            <p className="text-red-700 text-sm">{ingredientInfo.allergens}</p>
          </div>
          <div className="p-3 bg-orange-50 rounded-lg">
            <h5 className="font-medium text-orange-800 mb-1">Tracce</h5>
            <p className="text-orange-700 text-sm">{ingredientInfo.traces}</p>
          </div>
        </div>
        
        <div>
          <h5 className="font-medium mb-2">Caratteristiche</h5>
          <ul className="list-disc list-inside space-y-1">
            {ingredientInfo.features.map((feature: string, index: number) => (
              <li key={index} className="text-gray-700">{feature}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

// Continuazione ingredienti per proteine
const getIngredientsInfoProtein = (productSlug: string) => {
    const ingredientsData: Record<string, any> = {
      "echinacea-purpurea": {
        content: (
          <div className="space-y-6">
            {/* Composizione Dettagliata */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h5 className="font-semibold text-blue-800 mb-3 flex items-center">
                🧪 Composizione per Capsula
              </h5>
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b border-blue-200">
                    <td className="py-2 font-medium">Estratto secco di Echinacea purpurea</td>
                    <td className="py-2 text-right font-bold">400 mg</td>
                  </tr>
                  <tr className="border-b border-blue-200">
                    <td className="py-2 pl-4 text-gray-600">di cui echinosidi (4%)</td>
                    <td className="py-2 text-right text-blue-700">16 mg</td>
                  </tr>
                  <tr className="border-b border-blue-200">
                    <td className="py-2 font-medium">Cellulosa microcristallina</td>
                    <td className="py-2 text-right">q.s.</td>
                  </tr>
                  <tr className="border-b border-blue-200">
                    <td className="py-2 font-medium">Capsula (gelatina)</td>
                    <td className="py-2 text-right">~75 mg</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium">Magnesio stearato vegetale, silice</td>
                    <td className="py-2 text-right">q.s.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Specifiche Tecniche */}
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h5 className="font-semibold text-green-800 mb-3 flex items-center">
                ⚗️ Specifiche di Estrazione
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="font-medium text-green-700">Parte utilizzata:</span>
                  <span className="ml-2">Radice</span>
                </div>
                <div>
                  <span className="font-medium text-green-700">Rapporto estratto:</span>
                  <span className="ml-2">4:1</span>
                </div>
                <div>
                  <span className="font-medium text-green-700">Standardizzazione:</span>
                  <span className="ml-2">4% echinosidi</span>
                </div>
                <div>
                  <span className="font-medium text-green-700">Metodo estrazione:</span>
                  <span className="ml-2">Acquoso-etanolico</span>
                </div>
                <div>
                  <span className="font-medium text-green-700">Origine:</span>
                  <span className="ml-2">Coltivazione biologica</span>
                </div>
                <div>
                  <span className="font-medium text-green-700">Controllo qualità:</span>
                  <span className="ml-2">HPLC</span>
                </div>
              </div>
            </div>

            {/* Principi Attivi */}
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <h5 className="font-semibold text-purple-800 mb-3 flex items-center">
                💜 Principi Attivi Caratterizzanti
              </h5>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Echinosidi totali</span>
                  <span className="bg-purple-100 px-2 py-1 rounded text-purple-800">≥ 4%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Acido cicorico</span>
                  <span className="bg-purple-100 px-2 py-1 rounded text-purple-800">0.5-1.2%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Polifenoli totali</span>
                  <span className="bg-purple-100 px-2 py-1 rounded text-purple-800">≥ 2%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Polisaccaridi immunoattivi</span>
                  <span className="bg-purple-100 px-2 py-1 rounded text-purple-800">8-12%</span>
                </div>
              </div>
            </div>

            {/* Certificazioni e Qualità */}
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <h5 className="font-semibold text-yellow-800 mb-3 flex items-center">
                🏆 Certificazioni di Qualità
              </h5>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  <span>GMP Certified</span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  <span>ISO 22000</span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  <span>HACCP</span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  <span>Pesticidi: ND</span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  <span>Metalli pesanti: Conformi</span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  <span>Microbiologia: Conforme</span>
                </div>
              </div>
            </div>

            {/* Informazioni sulla Pianta */}
            <div className="bg-green-100 p-4 rounded-lg border border-green-300">
              <h5 className="font-semibold text-green-800 mb-3 flex items-center">
                🌿 Informazioni Botaniche
              </h5>
              <div className="text-sm text-green-700 space-y-2">
                <p><strong>Nome scientifico:</strong> Echinacea purpurea (L.) Moench</p>
                <p><strong>Famiglia:</strong> Asteraceae (Compositae)</p>
                <p><strong>Parte utilizzata:</strong> Radice (età minima 3 anni)</p>
                <p><strong>Habitat naturale:</strong> Praterie del Nord America</p>
                <p><strong>Raccolta:</strong> Autunnale, quando la concentrazione di principi attivi è massima</p>
                <p><strong>Tradizione d'uso:</strong> Medicina tradizionale dei nativi americani da oltre 400 anni</p>
              </div>
            </div>
          </div>
        )
      },
    "barrettone-2-0": {
      description: (
        <>
          <strong>Proteina del siero di latte isolata</strong> (31%), sciroppo di glucosio, 
          <strong>proteine del pisello</strong> (11%), burro di arachidi (10%), 
          agente di carica: polidestrosio, cioccolato fondente (7%) 
          (pasta di cacao, zucchero, burro di cacao, emulsionante: lecitina di soia, 
          aroma naturale di vaniglia), <strong>collagene idrolizzato</strong> (5%), 
          glicerina, aroma naturale, arachidi tostate (2%), emulsionante: lecitina di soia, 
          sale, antiossidante: tocoferoli.
        </>
      ),
      allergens: "latte, soia, arachidi",
      traces: "uova, glutine, frutta a guscio e sesamo",
      features: [
        "Alto contenuto di proteine (20g per barretta)",
        "Basso contenuto di zuccheri",
        "Con collagene idrolizzato",
        "Senza glutine aggiunto"
      ]
    },
    "burn-out": {
      description: (
        <>
          Acqua, <strong>L-Carnitina tartrato</strong> (2%), fruttosio, estratto di tè verde 
          (Camellia sinensis L., foglie) (0.5%), acidificante: acido citrico, 
          estratto di guaranà (Paullinia cupana Kunth, semi) (0.2%), aroma, 
          estratto di arancio amaro (Citrus aurantium L., frutti immaturi) (0.1%), 
          conservanti: sorbato di potassio e benzoato di sodio, edulcorante: sucralosio, 
          colorante: beta-carotene.
        </>
      ),
      allergens: "nessuno",
      traces: "può contenere tracce di glutine, latte, uova, soia, frutta a guscio",
      features: [
        "1000mg di L-Carnitina per dose",
        "Con estratti naturali di tè verde e guaranà",
        "Senza zuccheri aggiunti",
        "Formula liquida ad assorbimento rapido"
      ]
    },
    "big-bar": {
      description: (
        <>
          <strong>Proteine del latte</strong> (25%), sciroppo di glucosio, cioccolato al latte (18%) 
          (zucchero, burro di cacao, latte in polvere, pasta di cacao, emulsionante: lecitina di soia, 
          aroma), cocco rapé (12%), umettante: glicerina, olio di cocco, 
          emulsionante: lecitina di soia, aroma naturale di cocco, sale.
        </>
      ),
      allergens: "latte, soia",
      traces: "glutine, uova, frutta a guscio, arachidi, sesamo",
      features: [
        "25% di proteine del latte",
        "Con vero cocco rapé",
        "Ricoperta di cioccolato al latte",
        "Fonte naturale di energia"
      ]
    },
    "fruitforce": {
      description: (
        <>
          Fruttosio, acqua, purea di frutta (15%) (fragola o ananas secondo gusto), 
          destrosio, <strong>maltodestrine</strong>, acidificante: acido citrico, 
          gelificante: pectina, aroma naturale, conservante: sorbato di potassio, 
          colorante naturale (secondo il gusto).
        </>
      ),
      allergens: "nessuno",
      traces: "può contenere tracce di glutine, latte, uova, soia, frutta a guscio",
      features: [
        "Con vera purea di frutta (15%)",
        "Carboidrati a rilascio graduale",
        "Texture morbida e facile da assumere",
        "Naturalmente senza glutine"
      ]
    },
    "carbo-energy-plus": {
      description: (
        <>
          Sciroppo di glucosio, <strong>avena integrale</strong> (20%), frutta secca (15%) 
          (secondo il gusto: albicocche, mirtilli, mela), <strong>proteine del siero di latte</strong> (12%), 
          miele, olio di girasole, emulsionante: lecitina di soia, aroma naturale, 
          sale, antiossidante: tocoferoli.
        </>
      ),
      allergens: "glutine, latte, soia",
      traces: "uova, frutta a guscio, arachidi, sesamo",
      features: [
        "Con avena integrale (20%)",
        "Frutta vera disidratata",
        "12% di proteine del siero",
        "Fonte di energia a lungo rilascio"
      ]
    },
    "grissini-proteici": {
      description: (
        <>
          <strong>Farina di frumento</strong> (35%), <strong>proteine vegetali</strong> (25%) 
          (proteine del pisello, proteine della soia), mix di frutta secca (20%) 
          (arachidi, mandorle), olio extravergine di oliva, lievito naturale, 
          sale marino, fibra vegetale, emulsionante: lecitina di girasole, 
          spezie naturali.
        </>
      ),
      allergens: "glutine, soia, arachidi, mandorle",
      traces: "latte, uova, altre frutta a guscio, sesamo",
      features: [
        "25% di proteine vegetali",
        "Con mix di frutta secca (20%)",
        "Lievito naturale",
        "Olio extravergine di oliva"
      ]
    },
    "whey-protein-90": {
      description: (
        <>
          <strong>Proteine isolate del siero di latte</strong> (90%), 
          tecnologia Volactive UltraWhey 90 Instant, aroma naturale, 
          edulcoranti: steviolo glicosidi dalla stevia, sucralosio, 
          lecitina di soia (emulsionante), <strong>vitamine aggiunte</strong> 
          (vitamina C, vitamina E, niacina, acido pantotenico, vitamina B6, 
          riboflavina, tiamina, acido folico, biotina, vitamina B12).
        </>
      ),
      allergens: "latte, soia",
      traces: "uova, glutine, frutta a guscio, arachidi, sesamo",
      features: [
        "90% proteine isolate del siero",
        "Tecnologia Volactive per maggiore biodisponibilità",
        "Arricchito con vitamine essenziali",
        "Assorbimento ultra-rapido"
      ]
    },
    "xxx-hydrolysed-protein-90": {
      description: (
        <>
          <strong>Proteine del siero di latte idrolizzate</strong> (90%) con processo 
          enzimatico DH8, peptidi bioattivi, aroma naturale, 
          <strong>vitamine del gruppo B</strong> (B1, B2, B6, B12, niacina, 
          acido pantotenico, biotina, acido folico), edulcoranti: steviolo glicosidi 
          dalla stevia, lecitina di soia, <strong>enzimi digestivi</strong>.
        </>
      ),
      allergens: "latte, soia",
      traces: "uova, glutine, frutta a guscio, arachidi",
      features: [
        "90% proteine idrolizzate con processo DH8",
        "Peptidi bioattivi per assorbimento ultra-rapido",
        "Arricchito con vitamine del gruppo B",
        "Enzimi digestivi aggiunti"
      ]
    },
    "wheyghty-protein-80-limited-edition": {
      description: (
        <>
          <strong>Proteine del siero di latte ultrafiltrate</strong> (80%), 
          aroma naturale di cacao, aroma naturale di menta, cacao in polvere, 
          edulcoranti: steviolo glicosidi dalla stevia, emulsionante: lecitina di soia, 
          <strong>vitamine aggiunte</strong> (vitamina C, vitamina E, niacina, 
          vitamina B6, riboflavina, tiamina, acido folico, vitamina B12).
        </>
      ),
      allergens: "latte, soia",
      traces: "uova, glutine, frutta a guscio, arachidi, sesamo",
      features: [
        "Edizione limitata esclusiva",
        "Gusto unico Cacao & Menta",
        "80% proteine del siero ultrafiltrate",
        "Dolcificato naturalmente con stevia"
      ]
    },
    "top-eggxellent-protein": {
      description: (
        <>
          <strong>Proteine dell'uovo isolate</strong> (92%) da albume d'uovo puro, 
          aroma naturale, edulcoranti: steviolo glicosidi dalla stevia, 
          <strong>vitamine aggiunte</strong> (vitamina D, vitamina B12, biotina, 
          acido folico), emulsionante: lecitina di girasole, 
          stabilizzante: gomma di xantano.
        </>
      ),
      allergens: "uova",
      traces: "latte, soia, glutine, frutta a guscio, sesamo",
      features: [
        "92% proteine dell'uovo isolate",
        "Da albume d'uovo puro al 100%",
        "Senza lattosio naturalmente",
        "Valore biologico superiore"
      ]
    },
    "wheyghty-protein-80-standard": {
      description: (
        <>
          <strong>Proteine del siero di latte ultrafiltrate</strong> (80%), 
          aroma naturale (secondo il gusto), edulcoranti: steviolo glicosidi dalla stevia, 
          emulsionante: lecitina di soia, <strong>vitamine aggiunte</strong> 
          (vitamina C, vitamina E, niacina, vitamina B6, riboflavina, tiamina, 
          acido folico, vitamina B12), coloranti naturali (secondo il gusto).
        </>
      ),
      allergens: "latte, soia",
      traces: "uova, glutine, frutta a guscio, arachidi, sesamo",
      features: [
        "80% proteine del siero ultrafiltrate",
        "7 gusti deliziosi disponibili",
        "Alto contenuto di BCAA naturali",
        "Doppio formato disponibile"
      ]
    },
    "protein-evo-cocco": {
      description: (
        <>
          <strong>Proteine del latte</strong> (30%), sciroppo di glucosio, 
          <strong>cocco disidratato</strong> (15%), umettante: glicerina, 
          olio di cocco, fibre vegetali, <strong>vitamine aggiunte</strong> 
          (vitamina C, vitamina E, vitamina B6, vitamina B12), 
          <strong>fosforo</strong>, emulsionante: lecitina di soia, 
          aroma naturale di cocco, conservante: sorbato di potassio.
        </>
      ),
      allergens: "latte, soia",
      traces: "glutine, uova, frutta a guscio, arachidi, sesamo",
      features: [
        "30% proteine del latte",
        "15% cocco disidratato autentico",
        "Arricchita con vitamine e fosforo",
        "Formato pratico e portatile"
      ]
    },
    "protein-evo-creme-caramel": {
      description: (
        <>
          <strong>Proteine del latte</strong> (30%), sciroppo di glucosio, 
          caramello naturale (12%), umettante: glicerina, 
          <strong>vitamine aggiunte</strong> (vitamina C, vitamina E, 
          vitamina B6, vitamina B12), <strong>fosforo</strong>, 
          fibre vegetali, emulsionante: lecitina di soia, 
          aroma naturale crème caramel, conservante: sorbato di potassio.
        </>
      ),
      allergens: "latte, soia",
      traces: "glutine, uova, frutta a guscio, arachidi, sesamo",
      features: [
        "30% proteine del latte",
        "12% caramello naturale",
        "Arricchita con vitamine e fosforo",
        "Gusto dessert irresistibile"
      ]
    }
  };

  const data = ingredientsData[productSlug] || ingredientsData["barrettone-2-0"];

  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-lg mb-4">Lista Ingredienti</h4>
      <div className="text-sm text-gray-700 leading-relaxed">
        <p className="mb-4">{data.description}</p>

        <div className="mt-6 p-4 bg-orange-50 border-l-4 border-orange-400 rounded-r-lg">
          <h5 className="font-semibold text-orange-800 mb-2">⚠️ Allergeni</h5>
          <p className="text-orange-700 text-sm">
            Contiene: <strong>{data.allergens}</strong>. 
            {data.traces && ("Può contenere tracce di " + data.traces + ".")}
          </p>
        </div>

        <div className="mt-4 p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
          <h5 className="font-semibold text-green-800 mb-2">✅ Caratteristiche</h5>
          <ul className="text-green-700 text-sm space-y-1">
            {data.features && data.features.map((feature: string, index: number) => (
              <li key={index}>• {feature}</li>
            ))}
          </ul>
        </div>
      </div>
      {data.content && data.content}
    </div>
  );
};

// Funzione per renderizzare ingredienti dal markdown
const renderIngredientsFromMarkdown = (productSlug: string, features?: any) => {
  if (Array.isArray(features) && features.length > 0 && typeof features[0] === 'string') {
    const markdownContent = features.join('\n');
    
    // Cerca la sezione INGREDIENTI
    if (markdownContent.includes('**INGREDIENTI**')) {
      const sections = markdownContent.split('**');
      let ingredientsSection = '';
      
      for (let i = 0; i < sections.length; i++) {
        if (sections[i].includes('INGREDIENTI')) {
          ingredientsSection = sections[i + 1] || '';
          break;
        }
      }
      
      if (ingredientsSection.trim()) {
        return (
          <div className="space-y-4">
            <h4 className="font-semibold text-lg mb-4">Ingredienti</h4>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-700 leading-relaxed">
                {ingredientsSection.trim()}
              </p>
            </div>
          </div>
        );
      }
    }
  }
  return null;
};

// Funzione per renderizzare modalità d'uso dal markdown
const renderHowToUseFromMarkdown = (productSlug: string, features?: any) => {
  if (Array.isArray(features) && features.length > 0 && typeof features[0] === 'string') {
    const markdownContent = features.join('\n');
    
    // Cerca la sezione MODALITÀ D'USO
    if (markdownContent.includes('**MODALITÀ D\'USO**')) {
      const sections = markdownContent.split('**');
      let usageSection = '';
      
      for (let i = 0; i < sections.length; i++) {
        if (sections[i].includes('MODALITÀ D\'USO')) {
          usageSection = sections[i + 1] || '';
          break;
        }
      }
      
      if (usageSection.trim()) {
        return (
          <div className="space-y-4">
            <h4 className="font-semibold text-lg mb-4">Modalità d'Uso</h4>
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-gray-700 leading-relaxed">
                {usageSection.trim()}
              </p>
            </div>
          </div>
        );
      }
    }
  }
  return null;
};

// Funzione per renderizzare gli ingredienti (hardcoded o dinamici)
const renderIngredientsInfo = (productSlug: string, features?: any) => {
  
  // Gestione array markdown per prodotti come GABA, BCAA, etc.
  if (Array.isArray(features) && features.length > 0) {
    const markdownContent = features.join('\n');
    const sections = markdownContent.split('**').filter(s => s.trim());
    let ingredientsSection = '';
    
    for (let i = 0; i < sections.length; i++) {
      if (sections[i].includes('INGREDIENTI')) {
        ingredientsSection = sections[i + 1] || '';
        break;
      }
    }
    
    if (ingredientsSection.trim()) {
      const cleanIngredients = ingredientsSection.trim()
        .replace(/^\n+|\n+$/g, '') // rimuovi newline iniziali/finali
        .replace(/\n+/g, ' '); // sostituisci newline multipli con spazi
      
      return (
        <div className="space-y-4">
          <h4 className="font-semibold text-lg">Ingredienti</h4>
          <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-400">
            <p className="text-gray-800 leading-relaxed">
              {cleanIngredients}
            </p>
          </div>
        </div>
      );
    }
  }
  
  // PRIORITÀ MASSIMA: Gestione ingredienti per prodotti ALIMENTI FIT dal database JSON
  const isAlimentiFitProduct = productSlug.includes('protein-bar') || productSlug.includes('45-protein-bar') || 
                               productSlug.includes('75-protein-bar') || productSlug.includes('avena-farina') ||
                               productSlug.includes('barrettone') || productSlug.includes('big-bar') || 
                               productSlug.includes('carbo-energy') || productSlug.includes('crema-di-arachidi') ||
                               productSlug.includes('fruitforce') || productSlug.includes('light-protein') ||
                               productSlug.includes('liquid-carbo') || productSlug.includes('pancake-proteico') ||
                               productSlug.includes('perfect-bar') || productSlug.includes('prime-oat') ||
                               productSlug.includes('promeal') || productSlug.includes('protein-cream') ||
                               productSlug.includes('smart-protein') || productSlug.includes('veggie-ciok') ||
                               productSlug.includes('wafer-zero') || productSlug.includes('oatmeal') ||
                               productSlug.includes('pistacchio-crema');

  if (isAlimentiFitProduct && (features?.ingredienti || features?.ingrediente || features?.ingredients)) {
    const ingredientsText = features.ingredienti || features.ingrediente || features.ingredients;
    return (
      <div className="space-y-4">
        <h4 className="font-semibold text-lg mb-4">Ingredienti</h4>
        <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-400">
          <p className="text-orange-800 font-medium">
            {ingredientsText}
          </p>
        </div>
      </div>
    );
  }

  // PRIORITÀ ALTA: Gestione ingredienti per VITAMINE e AMINOACIDI dal database JSON
  if (features?.ingredienti || features?.ingrediente) {
    const ingredientsText = features.ingredienti || features.ingrediente;
    return (
      <div className="space-y-4">
        <h4 className="font-semibold text-lg mb-4">Ingredienti</h4>
        <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
          <p className="text-green-800 font-medium">
            {ingredientsText}
          </p>
        </div>
      </div>
    );
  }

  // Nuova struttura per prodotti Pronutrition: ingredients e usage direttamente nel database
  if (features?.ingredients || features?.usage) {
    return (
      <div className="space-y-6">
        {features.ingredients && (
          <div>
            <h4 className="font-semibold text-lg mb-4">Lista Ingredienti</h4>
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <p className="text-gray-800 text-sm leading-relaxed">
                {features.ingredients}
              </p>
            </div>
          </div>
        )}
        
        {features.usage && (
          <div>
            <h4 className="font-semibold text-lg mb-4">Modalità d'uso</h4>
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-800 text-sm font-medium">
                {features.usage}
              </p>
            </div>
          </div>
        )}
        
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h5 className="font-semibold text-green-800 mb-2 flex items-center">
            <span className="mr-2">✓</span>
            Garanzie di Qualità Pronutrition
          </h5>
          <ul className="text-green-700 text-sm space-y-1">
            <li>• Prodotto secondo standard GMP (Good Manufacturing Practices)</li>
            <li>• Testato per purezza e potenza</li>
            <li>• Formulazioni scientificamente validate</li>
            <li>• Controlli qualità rigorosi</li>
          </ul>
        </div>
      </div>
    );
  }
  
  // Gestione speciale per prodotti EthicSport con ingredienti dal markdown
  // Controllo se è un prodotto EthicSport (brand_id 22) oppure se ha features con tabelle HTML
  const isEthicSportProduct = Array.isArray(features) && features.length > 0 && typeof features[0] === 'string' && features[0].includes('nutritional-table');
  
  if (isEthicSportProduct) {
    
    // Mappatura ingredienti specifici per prodotti EthicSport dal file markdown (con slug corretti dal database)
    const ethicSportIngredients: { [key: string]: string } = {
      'vpr-vegetal-protein-integratore-alimentare-di-proteine-vegetali': 'Proteine isolate di pisello, cacao 10%, proteine di semi di zucca, proteine di riso, olio MCT (70%) in polvere da olio di cocco microincapsulato con gomma arabica, aromi, edulcoranti: sucralosio e glicosidi steviolici da Stevia, addensanti: gomma di xantano e gomma arabica, sale, aromi, metilcobalamina (vitamina B12).',
      'magnesium-glycinate': 'Bisglicinato di magnesio (magnesio), inulina, agente di carica: idrossipropilmetilcellulosa; Agente antiagglomerante: sali di magnesio degli acidi grassi',
      'thermo-master': 'Estratto secco di foglie di tè verde (Camelia sinensis L.) tit. 98% in polifenoli e 40% in EGCG, capsula di origine vegetale (idrossipropilmetilcellulosa), estratto secco di semi di caffè verde (Coffea arabica L.) tit. 45% in acido clorogenico, estratto secco di radice di ginseng (Panax ginseng C.A. Meyer) tit. 7% in ginsenosidi, L-carnitina tartrato, agente di carica: fibra di acacia; Estratto secco di frutto di peperoncino (Capsicum annuum L.) tit. 2% in capsaicina, picolinato di cromo, estratto secco di rizoma di zenzero (Zingiber officinale Roscoe) tit. 5% in gingeroli, estratto secco di corteccia di cannella (Cinnamomum verum J. Presl) tit. 10% in polifenoli, estratto secco di semi di cacao (Theobroma cacao L.) tit. 6% in teobromina, agenti antiagglomeranti: sali di magnesio degli acidi grassi e biossido di silicio.',
      'testogen': 'Magnesio ossido, capsula vegetale (idrossipropilmetilcellulosa), estratto secco di frutto di Tribulus terrestris L. tit. 60% in saponine, VinitroxTM (estratto secco di semi d\'uva Vitis vinifera L. e di bucce di mela Malus domestica Borkh.), agente di carica: cellulosa microcristallina; Policosanoli da riso (Oryza sativa L.), L-ascorbato di zinco, agenti antiagglomeranti: sali di magnesio degli acidi grassi e biossido di silicio; Acido L-ascorbico (vitamina C), cloridrato di piridossina (vitamina B6), L-ascorbato di rame.',
      'fluid-motion': 'Glucosamina solfato 2KCl (da crostacei), capsula vegetale (idrossipropilmetilcellulosa), condroitinsolfato (da pesce), agente di carica: cellulosa microcristallina; L-ascorbato di zinco, acido ialuronico, bromelina, estratto secco di rizoma di curcuma (Curcuma longa L.) tit. 95% in curcuminoidi, acido L-ascorbico (vitamina C), agenti antiagglomeranti: sali di magnesio degli acidi grassi e biossido di silicio; L-ascorbato di rame.',
      'comfort-plus': 'Estratto secco di foglie di melissa (Melissa officinalis L.) tit. 3% in acido rosmarinico, capsula vegetale (idrossipropilmetilcellulosa), estratto secco di sommità fiorite di passiflora (Passiflora incarnata L.) tit. 3,5% in vitexina, estratto secco di radice di valeriana (Valeriana officinalis L.) tit. 0,4% in acidi valerenici, agente di carica: cellulosa microcristallina; L-teanina, agenti antiagglomeranti: sali di magnesio degli acidi grassi e biossido di silicio; Melatonina.',
      'eaa-amminoacidi-essenziali-solubili': 'L-leucina, L-lisina cloridrato, L-isoleucina, L-valina, L-treonina, L-fenilalanina, L-metionina, L-istidina, L-triptofano, aromi, edulcoranti: sucralosio e glicosidi steviolici da Stevia; Agente antiagglomerante: biossido di silicio; Coloranti: curcumina e rosso barbabietola.',
      'repoxan': 'Estratto secco di radice di ginseng (Panax ginseng C.A. Meyer) tit. 7% in ginsenosidi, capsula vegetale (idrossipropilmetilcellulosa), L-carnitina tartrato, estratto secco di foglie di guaranà (Paullinia cupana Kunth) tit. 12% in caffeina, agente di carica: cellulosa microcristallina; Coenzima Q10, estratto secco di semi di cacao (Theobroma cacao L.) tit. 6% in teobromina, agenti antiagglomeranti: sali di magnesio degli acidi grassi e biossido di silicio.',
      'caffeina-suprema': 'Caffeina anidra, agente di carica: cellulosa microcristallina; Capsula vegetale (idrossipropilmetilcellulosa), agenti antiagglomeranti: sali di magnesio degli acidi grassi e biossido di silicio.',
      'collagene-ethicsport': 'Peptidi di collagene idrolizzato (bovino), agente di carica: cellulosa microcristallina; Capsula vegetale (idrossipropilmetilcellulosa), acido L-ascorbico (vitamina C), agenti antiagglomeranti: sali di magnesio degli acidi grassi e biossido di silicio.',
      'collagene-marino': 'Peptidi di collagene marino idrolizzato, agente di carica: cellulosa microcristallina; Capsula vegetale (idrossipropilmetilcellulosa), acido ialuronico, acido L-ascorbico (vitamina C), agenti antiagglomeranti: sali di magnesio degli acidi grassi e biossido di silicio.',
      'creatina-vector': 'Creatina monoidrato, agente di carica: cellulosa microcristallina; Capsula vegetale (idrossipropilmetilcellulosa), agenti antiagglomeranti: sali di magnesio degli acidi grassi e biossido di silicio.',
      'glucosamina-condroitina-msm-vitamina-c': 'Glucosamina solfato 2KCl (da crostacei), metilsulfonilmetano (MSM), condroitinsolfato (da pesce), capsula vegetale (idrossipropilmetilcellulosa), agente di carica: cellulosa microcristallina; Acido L-ascorbico (vitamina C), agenti antiagglomeranti: sali di magnesio degli acidi grassi e biossido di silicio.',
      'maltoshot-endurance-plus': 'Maltodestrine, destrosio, fruttosio, cloruro di sodio, aromi, citrato di potassio, citrato di magnesio, edulcoranti: sucralosio e glicosidi steviolici da Stevia; Colorante: curcumina; Agente antiagglomerante: biossido di silicio.',
      'starter-1000': 'L-carnitina tartrato, capsula vegetale (idrossipropilmetilcellulosa), agente di carica: cellulosa microcristallina; Agenti antiagglomeranti: sali di magnesio degli acidi grassi e biossido di silicio.',
      'super-dextrin': 'Sciroppo di glucosio, fiocchi di avena 20%, amido di mais ceroso modificato (cluster dextrin), proteine del latte concentrate, cioccolato fondente 8% (pasta di cacao, zucchero, burro di cacao, emulsionante: lecitina di soia; Aroma), olio di semi di girasole, zucchero, aromi, emulsionante: lecitina di soia; Sale, antiossidante: tocoferoli.',
      'super-dextrin-gel-pro': 'Sciroppo di glucosio, acqua, amido di mais ceroso modificato (cluster dextrin), destrosio, fruttosio, gelificante: pectina; Cloruro di sodio, acidificante: acido citrico; Aromi, conservante: sorbato di potassio; Edulcoranti: sucralosio e glicosidi steviolici da Stevia.',
      'super-dextrin-pro': 'Amido di mais ceroso modificato (cluster dextrin), maltodestrine, destrosio, fruttosio, cloruro di sodio, aromi, citrato di potassio, citrato di magnesio, edulcoranti: sucralosio e glicosidi steviolici da Stevia; Colorante: curcumina; Agente antiagglomerante: biossido di silicio.',
      'vitamina-c-1000-ethicsport': 'Acido L-ascorbico (vitamina C), agente di carica: cellulosa microcristallina; Capsula vegetale (idrossipropilmetilcellulosa), agenti antiagglomeranti: sali di magnesio degli acidi grassi e biossido di silicio.',
      'vitamina-d3-2000-iu': 'Olio di semi di girasole, capsula softgel (gelatina bovina, glicerina, acqua), colecalciferolo (vitamina D3).'
    };

    const ingredients = ethicSportIngredients[productSlug];
    
    if (ingredients) {
      return (
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-lg mb-4">Lista Ingredienti</h4>
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <p className="text-gray-800 text-sm leading-relaxed">
                {ingredients}
              </p>
            </div>
            
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <h5 className="font-semibold text-green-800 mb-2 flex items-center">
                <span className="mr-2">✓</span>
                Garanzie di Qualità EthicSport
              </h5>
              <ul className="text-green-700 text-sm space-y-1">
                <li>• Prodotto secondo standard GMP (Good Manufacturing Practices)</li>
                <li>• Testato per purezza e potenza</li>
                <li>• Formulazioni scientificamente validate</li>
                <li>• Doping Free Tested</li>
              </ul>
            </div>
          </div>
        </div>
      );
    }
    
    // Fallback se non trovato nella mappatura
    return (
      <div className="space-y-6">
        <div>
          <h4 className="font-semibold text-lg mb-4">Informazioni Ingredienti</h4>
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h5 className="font-semibold text-blue-800 mb-2 flex items-center">
              <span className="mr-2">ℹ️</span>
              Prodotto EthicSport
            </h5>
            <p className="text-blue-700 text-sm leading-relaxed">
              Per informazioni dettagliate sugli ingredienti, consultare l'etichetta del prodotto o 
              contattare il nostro servizio clienti.
            </p>
          </div>
        </div>
      </div>
    );
  }
  
  // Prima prova i dati dinamici dal database (ingredienti come stringa semplice)
  if (features?.ingredienti && typeof features.ingredienti === 'string') {
    return (
      <div className="space-y-6">
        <div>
          <h4 className="font-semibold text-lg mb-4">Lista Ingredienti</h4>
          <p className="text-gray-700 leading-relaxed">
            {features.ingredienti}
          </p>
        </div>
        
        {/* Avvertenze dal database - styling come immagine di esempio */}
        {features?.avvertenze && (
          <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <h5 className="font-semibold text-orange-800 mb-2 flex items-center">
              <span className="mr-2">⚠️</span>
              Avvertenze
            </h5>
            <p className="text-orange-700 text-sm leading-relaxed">
              {features.avvertenze}
            </p>
          </div>
        )}
        
        {/* Caratteristiche dal database - styling come immagine di esempio */}
        {features?.caratteristiche && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <h5 className="font-semibold text-green-800 mb-2 flex items-center">
              <span className="mr-2">✓</span>
              Caratteristiche
            </h5>
            <div className="text-green-700 text-sm leading-relaxed whitespace-pre-line">
              {features.caratteristiche}
            </div>
          </div>
        )}
      </div>
    );
  }
  
  // Gestione per prodotti Batch 4 (ProLabs e Pronutrition) - estrai ingredienti dalla long_description
  if (features?.long_description && typeof features.long_description === 'string') {
    const description = features.long_description;
    
    // Cerca la sezione ingredienti nella descrizione
    const ingredientsMatch = description.match(/Ingredienti:\s*([^\n]+(?:\n(?!\w+:)[^\n]*)*)/i);
    
    if (ingredientsMatch) {
      const ingredientsText = ingredientsMatch[1].trim();
      
      return (
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-lg mb-4">Lista Ingredienti</h4>
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <p className="text-gray-800 text-sm leading-relaxed">
                {ingredientsText}
              </p>
            </div>
            
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h5 className="font-semibold text-blue-800 mb-2 flex items-center">
                <span className="mr-2">ℹ️</span>
                Informazioni Prodotto
              </h5>
              <ul className="text-blue-700 text-sm space-y-1">
                <li>• Prodotto secondo standard di qualità certificati</li>
                <li>• Controllare sempre l'etichetta per allergie specifiche</li>
                <li>• Conservare in luogo fresco e asciutto</li>
              </ul>
            </div>
            
            {/* Estrai modalità d'uso se presente */}
            {description.includes('Modalità d\'uso:') && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <h5 className="font-semibold text-green-800 mb-2 flex items-center">
                  <span className="mr-2">💊</span>
                  Modalità d'Uso
                </h5>
                <p className="text-green-700 text-sm leading-relaxed">
                  {description.match(/Modalità d'uso:\s*([^\n]+(?:\n(?!\w+:)[^\n]*)*)/i)?.[1]?.trim()}
                </p>
              </div>
            )}
          </div>
        </div>
      );
    }
  }
  
  // Fallback agli ingredienti hardcoded
  const hardcodedData = getIngredientsInfo(productSlug);
  return hardcodedData;
};

export default function ProductDetail() {
  const params = useParams<{ category?: string; slug?: string }>();
  // Estrai slug dai parametri - gestisce entrambi i pattern di routing
  const slug = params.slug;

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [currentImage, setCurrentImage] = useState<string>("");
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [shareConfirmation, setShareConfirmation] = useState<boolean>(false);
  const [preloadedImages, setPreloadedImages] = useState<Set<string>>(new Set());
   const [addToCartDialogOpen, setAddToCartDialogOpen] = useState<boolean>(false);
  const [ , setLocation] = useLocation();
  const { addToCart } = useCartContext();
  const { toast } = useToast();

  const handleAddToCartFromDialog = (productData: any) => {
    addToCart(productData);
    setAddToCartDialogOpen(false);
    
    // Vai alla pagina carrello
    setLocation('/carrello');
  };

  const handleAdd = async () => {
    if (!product) return;
    const currentVariant = selectedVariant || (variantsList.length > 0 ? variantsList[0] : null);
    const isUnavailable = currentVariant ? currentVariant.inStock === false : false;
    if (isUnavailable) return;
    const productPrice = currentVariant?.price 
      ? (currentVariant.price > 100 ? currentVariant.price / 100 : currentVariant.price)
      : ((product.sizes?.[0]?.price || 1990) / 100);
    await addToCart({
      id: product.id,
      name: product.name,
      price: productPrice,
      variant: currentVariant ? `${currentVariant.flavor || ''} ${currentVariant.size || ''}`.trim() : '',
      quantity: 1,
      image: getProductImage()
    });
  };


  // Fetch dati prodotto dal database
  const { data: product, isLoading, error } = useQuery({
    queryKey: ['/api/product', slug],
    queryFn: async () => {
      if (!slug) {
        throw new Error('Product slug not found');
      }
      const response = await fetch('/api/product/' + slug);
      if (!response.ok) {
        throw new Error('Product not found');
      }
      return response.json();
    },
    enabled: !!slug,
  });

  // Fetch dettagli prodotto
  const { data: productDetails } = useQuery({
    queryKey: ['/api/product', slug, 'details'],
    queryFn: async () => {
      const response = await fetch('/api/product/' + slug + '/details');
      if (!response.ok) {
        throw new Error('Product details not found');
      }
      return response.json();
    },
    enabled: !!product,
  });

  // Fetch varianti prodotto dal database tramite API
  const { data: variantsList = [] } = useQuery({
    queryKey: ['/api/product', slug, 'options'],
    queryFn: async () => {
      if (!slug) throw new Error('Product slug not found');
      const response = await fetch('/api/product/' + slug + '/options');
      if (!response.ok) throw new Error('Product options not found');
      return response.json();
    },
    enabled: !!product,
  });

  // productVariants è null - ora usiamo solo l'API per le varianti
  const productVariants = null;

  const getProductImage = () => {
    // PRIORITÀ 1: Usa l'immagine della variante selezionata dal DB (product_options.image)
    if (selectedVariant?.image && !selectedVariant.image.includes('placeholder')) {
      return selectedVariant.image;
    }

    // FALLBACK: Usa l'immagine di copertina del prodotto (product_images)
    if (product?.image_url && !product.image_url.includes('placeholder')) {
      return product.image_url;
    }

    return "/images/products/placeholder-product.jpg";
  };

  // Pre-carica tutte le immagini delle varianti per cambio istantaneo
  const preloadVariantImages = (variants: ProductVariant[]) => {
    const imageUrls: string[] = [];
    
    // Raccogli tutte le immagini delle varianti
    variants.forEach(variant => {
      if (variant.image && !variant.image.includes('placeholder')) {
        imageUrls.push(variant.image);
      }
    });
    
    // Aggiungi immagini mappate per varianti specifiche
    if (product?.slug && selectedVariant) {
      const variantImageMap: Record<string, Record<string, string>> = {
        "powergel": {
          "Mela": "/images/products/22010100_box_1751035814528.png",
          "Mango": "/images/products/22010100_box_1751035814528.png"
        },
        "avena-farina-istantanea": {
          "Cappuccino": "/images/products/WN043_singolo_1751035979180.png",
          "Cacao": "/images/products/WN043_singolo_1751035979180.png"
        },
        "promeal-energetica": {
          "Mandorle": "/images/products/Promeal Energetica 40g_1751036384519.jpg"
        },
        "promeal-50-protein-bar": {
          "Yogurt": "/images/products/Promeal Energetica 40g_1751036384519.jpg",
          "Cocco": "/images/products/Promeal Energetica 40g_1751036384519.jpg"
        },
        "energize-advanced": {
          "Raspberry": "/images/products/21011001_singolo_1751035799917.png"
        },
        "sali-electrolyte-pocket-minerals": {
          "Limone": "/images/products/sali-electrolyte-pocket-limone-40g.jpg"
        }
      };
      
      if (variantImageMap[product.slug]) {
        Object.values(variantImageMap[product.slug]).forEach(url => {
          if (!imageUrls.includes(url)) {
            imageUrls.push(url);
          }
        });
      }
    }
    
    // Pre-carica ogni immagine
    imageUrls.forEach(url => {
      if (!preloadedImages.has(url)) {
        const img = new Image();
        img.onload = () => {
          setPreloadedImages(prev => new Set(prev).add(url));
        };
        img.src = url;
      }
    });
  };

  // Aggiorna l'immagine istantaneamente quando cambia la variante
  useEffect(() => {
    const newImage = getProductImage();
    setCurrentImage(newImage);
    setImageLoaded(true); // Immagine sempre pronta per cambio reattivo
  }, [selectedVariant, product]);

  // Pre-carica immagini varianti quando il prodotto viene caricato
  useEffect(() => {
    if (product && variantsList.length > 0) {
      preloadVariantImages(variantsList);
    }
  }, [product, variantsList]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    // Previeni il comportamento di default e mantieni l'immagine
    e.preventDefault();
    // Usa il placeholder direttamente nell'src dell'immagine
    const target = e.target as HTMLImageElement;
    if (!target.src.includes('placeholder-product.jpg')) {
      target.src = '/images/products/placeholder-product.jpg';
    }
  };

  const handleVariantChange = (variant: ProductVariant) => {
    setSelectedVariant(variant);
  };

  const handleShare = async () => {
    try {
      const productUrl = window.location.href;
      await navigator.clipboard.writeText(productUrl);
      setShareConfirmation(true);
      
      // Hide confirmation after 2 seconds
      setTimeout(() => {
        setShareConfirmation(false);
      }, 2000);
    } catch (error) {
      // Fallback per browser che non supportano la clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = window.location.href;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        setShareConfirmation(true);
        setTimeout(() => {
          setShareConfirmation(false);
        }, 2000);
      } catch (fallbackError) {
      }
      document.body.removeChild(textArea);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#FFD100]"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Prodotto non trovato</h1>
          <Link href="/categorie">
            <Button>Torna alle Categorie</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50">
      <div className="container mx-auto py-8 px-4">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link href={`/prodotti/${product.category_slug || 'prodotti'}`}>
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {product.category_name || 'Categorie'}
            </Button>
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Immagini Prodotto */}
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-lg bg-white shadow-lg">
              <img
                src={currentImage || "/images/products/placeholder-product.jpg"}
                alt={product.name}
                className="w-full h-[500px] object-contain transition-all duration-300"
                onLoad={handleImageLoad}
                onError={handleImageError}
                loading="lazy"
                style={{ minHeight: '500px' }}
              />
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center">
                  <div className="text-gray-400">Caricamento...</div>
                </div>
              )}
              {product.has_special_offer && (
                <div className="absolute top-4 left-4">
                  <Badge className="bg-red-500 text-white">OFFERTA</Badge>
                </div>
              )}
              {product.is_new && (
                <div className="absolute top-4 right-4">
                  <Badge className="bg-green-500 text-white">NUOVO</Badge>
                </div>
              )}
            </div>
          </div>

          {/* Informazioni Prodotto */}
          <div className="space-y-6">
            <div>
              {/* Brand badge prominente + Logo Creapure */}
              <div className="mb-3 flex items-center justify-between">
                <Badge variant="default" className="bg-[#FFD100] text-black font-semibold text-base px-3 py-1">
                  {product.brand_name || product.brand || 'BigGimmy'}
                </Badge>
                {product?.has_creapure && (
                  <img
                    src="/images/creapure-logo.png"
                    alt="Certificato Creapure®"
                    className="h-10 w-auto object-contain"
                  />
                )}
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {productDetails?.product_group_name || product.product_group_name || product.name}
              </h1>

              {/* Category badge sotto il nome */}
              <div className="mb-4">
                <Badge variant="outline" className="text-sm">
                  {product.category_name}
                </Badge>
              </div>

              <p className="text-lg text-gray-600 mb-4">{product.description}</p>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center">
                  <Star className="h-5 w-5 fill-[#FFD100] text-[#FFD100]" />
                  <Star className="h-5 w-5 fill-[#FFD100] text-[#FFD100]" />
                  <Star className="h-5 w-5 fill-[#FFD100] text-[#FFD100]" />
                  <Star className="h-5 w-5 fill-[#FFD100] text-[#FFD100]" />
                  <Star className="h-5 w-5 fill-[#FFD100] text-[#FFD100]" />
                </div>
              </div>


          {/* Prezzo e disponibilità */}
          <div className="mb-6">
            
            {/* Prezzo dinamico - gestito automaticamente dalle varianti */}
            {(product.sizes?.[0]?.price || 0) > 0 && (
              <div className="flex items-center gap-4 mb-3">
                <span className="text-3xl font-bold text-green-600">
                  €{selectedVariant ? selectedVariant.price.toFixed(2) : (product.sizes?.[0]?.price || 0).toFixed(2)}
                </span>
                {product.hasSpecialOffer && product.specialOfferText && (
                  <span className="px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full">
                    {product.specialOfferText}
                  </span>
                )}
              </div>
            )}

            {/* Disponibilità dettagliata */}
            {(() => {
              const currentVariant = selectedVariant || (variantsList.length > 0 ? variantsList[0] : null);
              const isUnavailable = currentVariant ? currentVariant.inStock === false : false;

              return (
                <div className={`${!isUnavailable ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'} rounded-lg p-4 mb-4`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`w-3 h-3 rounded-full ${!isUnavailable ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    <span className={`font-semibold ${!isUnavailable ? 'text-green-800' : 'text-red-800'}`}>
                      {!isUnavailable ? 'Disponibile nei nostri negozi' : 'Non disponibile attualmente'}
                    </span>
                  </div>

                  {product.availability && product.availability.length > 0 && (
                    <div className="space-y-2">
                      {product.availability.map((avail: any) => (
                        <div key={avail.storeId} className="flex justify-between items-center">
                          <span className="text-gray-700">
                            {avail.storeId === 1 ? "📍 Sede Torino" : "📍 Sede Aosta"}
                          </span>
                          <span className={'font-medium ' + (avail.isAvailable ? 'text-green-600' : 'text-red-600')}>
                            {avail.isAvailable 
                              ? (avail.stockQuantity || 0) + ' disponibili'
                              : 'Non disponibile'
                            }
                          </span>
                        </div>
                      ))}
                      <div className="border-t pt-2 mt-2">
                        <div className="flex justify-between items-center font-semibold">
                          <span>Totale disponibile:</span>
                          <span className={!isUnavailable ? 'text-green-600' : 'text-red-600'}>
                            {product.availability.reduce((total: number, avail: any) => 
                              total + (avail.isAvailable ? (avail.stockQuantity || 0) : 0), 0
                            )} pezzi
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}
            </div>

            {/* Selettore Varianti */}
            {variantsList.length > 0 && (
              <Card className="border-2 border-[#FFD100]/20">
                <CardHeader>
                  <CardTitle className="text-lg">Scegli la tua variante</CardTitle>
                </CardHeader>
                <CardContent>
                  <ProductVariantSelector
                    productId={product.id}
                    productName={product.name}
                    variants={variantsList}
                    onVariantChange={handleVariantChange}
                  />
                </CardContent>
              </Card>
            )}

            {/* Caratteristiche principali */}
            {productDetails?.features?.nutritionalHighlights && productDetails.features.nutritionalHighlights.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="h-5 w-5 mr-2" />
                    Caratteristiche
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {(productDetails.features?.nutritionalHighlights || []).map((feature: string, index: number) => (
                      <div key={index} className="flex items-center text-sm">
                        <span className="w-2 h-2 bg-[#FFD100] rounded-full mr-2"></span>
                        {feature}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="flex gap-3">
              {(() => {
                const currentVariant = selectedVariant || (variantsList.length > 0 ? variantsList[0] : null);
                const productPrice = currentVariant?.price 
                  ? (currentVariant.price > 100 ? currentVariant.price / 100 : currentVariant.price)
                  : ((product.sizes?.[0]?.price || 1990) / 100);

                const isUnavailable = currentVariant ? currentVariant.inStock === false : false;
                
                return (
                  <button
                    className={`flex-1 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 ${
                      isUnavailable
                        ? 'bg-gray-300 text-gray-600 cursor-not-allowed opacity-50'
                        : 'bg-[#FFD100] hover:bg-[#FFD100]/90 text-black'
                    }`}
                    onClick={() => setAddToCartDialogOpen(true)}
                    disabled={isUnavailable}
                  >
                    Compra ora - {formatEuropeanPrice(productPrice)}
                  </button>
                );
              })()}
              <FavoriteButton 
                productId={product.id}
                variant="icon"
                size="lg"
                className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 p-3 rounded-lg"
              />
              <Button variant="outline" size="icon" onClick={handleShare}>
                <Share2 className="h-4 w-4" />
              </Button>
            </div>

            
            {/* Messaggio conferma condivisione */}
            {shareConfirmation && (
              <div className="mt-3 bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded-md text-sm">
                ✓ Link copiato!
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Informazioni Dettagliate - Estese oltre il container per raggiungere il bordo */}
      <div className="mt-8 -mx-4 md:-mx-8 lg:-mx-16 xl:-mx-32 px-4 md:px-8 lg:px-16 xl:px-32">
        <div className="container mx-auto">
          <Tabs defaultValue="description" className="w-full">
            {/* Nascondi tab Valori Nutrizionali e Ingredienti per categoria Accessori (category_id = 6) */}
            <TabsList className={`grid w-full ${product.category_id === 6 ? 'grid-cols-2 gap-2' : 'grid-cols-2 md:grid-cols-4 gap-2'} mb-8 h-auto p-2`}>
              <TabsTrigger value="description" className="text-xs sm:text-sm py-2 px-2 whitespace-normal h-auto">Descrizione</TabsTrigger>
              {product.category_id !== 6 && (
                <TabsTrigger value="nutrition" className="text-xs sm:text-sm py-2 px-2 whitespace-normal h-auto">Valori Nutrizionali</TabsTrigger>
              )}
              <TabsTrigger value="usage" className="text-xs sm:text-sm py-2 px-2 whitespace-normal h-auto">Modalità d'Uso</TabsTrigger>
              {product.category_id !== 6 && (
                <TabsTrigger value="ingredients" className="text-xs sm:text-sm py-2 px-2 whitespace-normal h-auto">Ingredienti</TabsTrigger>
              )}
            </TabsList>

            <TabsContent value="description" className="mt-0">
              <Card>
                <CardContent className="pt-6">
                  <div className="prose max-w-none">
                    <p className="text-gray-700 leading-relaxed">
                      {productDetails?.long_description || product.description}
                    </p>

                    {/* Consiglio dell'esperto */}
                    <div className="mt-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                      <h4 className="font-medium text-purple-800 mb-2">💡 Consiglio dell'Esperto</h4>
                      <p className="text-purple-700">
                        {productDetails?.long_description?.includes('💡 Consiglio dell\'esperto:') 
                          ? productDetails.long_description.split('💡 Consiglio dell\'esperto:')[1]?.split('**Valori Nutrizionali')[0]?.trim()
                          : "Consulta sempre un professionista della salute prima di iniziare l'integrazione, specialmente se stai assumendo farmaci o hai condizioni mediche preesistenti."
                        }
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Nascondi tab content Valori Nutrizionali per categoria Accessori */}
            {product.category_id !== 6 && (
              <TabsContent value="nutrition" className="mt-0">
                <Card>
                  <CardContent className="pt-6">
                    {renderNutritionalInfo(product.slug, productDetails?.features)}
                  </CardContent>
                </Card>
              </TabsContent>
            )}

            <TabsContent value="usage" className="mt-0">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        Modalità d'Uso
                      </h4>
                      <div className="text-gray-700 leading-relaxed">
                        {(() => {
                          // Gestione array markdown per prodotti come GABA, BCAA, etc.
                          if (Array.isArray(productDetails?.features) && productDetails.features.length > 0) {
                            const markdownContent = productDetails.features.join('\n');
                            const sections = markdownContent.split('**').filter((s: string) => s.trim());
                            let usageSection = '';
                            
                            for (let i = 0; i < sections.length; i++) {
                              if (sections[i].includes('MODALITÀ') || sections[i].includes('USO')) {
                                usageSection = sections[i + 1] || '';
                                break;
                              }
                            }
                            
                            if (usageSection.trim()) {
                              const cleanUsage = usageSection.trim()
                                .replace(/^\n+|\n+$/g, '') // rimuovi newline iniziali/finali
                                .replace(/\n+/g, ' '); // sostituisci newline multipli con spazi
                              
                              return (
                                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                                  <p className="text-blue-800 font-medium">
                                    {cleanUsage}
                                  </p>
                                </div>
                              );
                            }
                          }
                          
                          // Fallback per altri formati
                          return (
                            <p>
                              {productDetails?.features?.modalita_uso || productDetails?.how_to_use || "Seguire le indicazioni riportate sulla confezione."}
                            </p>
                          );
                        })()}
                      </div>
                    </div>

                    {/* Avvertenze e Consigli d'uso - NON mostrare per Merchandising e Cosmetici (categoria ID = 6) */}
                    {product.category_id !== 6 && (
                      <div className="space-y-4">
                        {/* Avvertenze */}
                        <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400">
                          <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Avvertenze</h4>
                          <p className="text-yellow-700 text-sm">
                            Non superare la dose giornaliera consigliata. Tenere fuori dalla portata dei bambini. Consultare il medico prima dell'uso in caso di gravidanza, allattamento o patologie.
                          </p>
                        </div>

                        {/* Consigli */}
                        <div className="p-4 bg-purple-50 border-l-4 border-purple-400">
                          <h4 className="font-semibold text-purple-800 mb-2">💜 Consiglio d'Uso</h4>
                          <p className="text-purple-700 text-sm">
                            Per risultati ottimali, assumere con costanza alla stessa ora del giorno, preferibilmente durante i pasti per migliorare l'assorbimento e ridurre eventuali disturbi gastrici.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Nascondi tab content Ingredienti per categoria Accessori */}
            {product.category_id !== 6 && (
              <TabsContent value="ingredients" className="mt-0">
                <Card>
                  <CardContent className="pt-6">
                    {(() => {
                      // Gestione array markdown per prodotti come GABA, BCAA, etc.
                      if (Array.isArray(productDetails?.features) && productDetails.features.length > 0) {
                        const markdownContent = productDetails.features.join('\n');
                        const sections = markdownContent.split('**').filter((s: string) => s.trim());
                        let ingredientsSection = '';
                        
                        for (let i = 0; i < sections.length; i++) {
                          if (sections[i].includes('INGREDIENTI')) {
                            ingredientsSection = sections[i + 1] || '';
                            break;
                          }
                        }
                        
                        if (ingredientsSection.trim()) {
                          const cleanIngredients = ingredientsSection.trim()
                            .replace(/^\n+|\n+$/g, '') // rimuovi newline iniziali/finali
                            .replace(/\n+/g, ' '); // sostituisci newline multipli con spazi
                          
                          return (
                            <div className="space-y-4">
                              <h4 className="font-semibold text-lg mb-4">Ingredienti</h4>
                              <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
                                <p className="text-green-800 font-medium">
                                  {cleanIngredients}
                                </p>
                              </div>
                            </div>
                          );
                        }
                      }
                      
                      // Fallback per altri formati
                      return renderIngredientsInfo(product.slug, {...productDetails?.features, long_description: productDetails?.long_description});
                    })()}
                  </CardContent>
                </Card>
              </TabsContent>
            )}
          </Tabs>
        </div>
      </div>
      {/* Dialog Aggiungi al Carrello */}
    {product && (
      <AddToCartDialog
        isOpen={addToCartDialogOpen}
        onClose={() => setAddToCartDialogOpen(false)}
        product={{
          id: product.id,
          name: product.name,
          slug: product.slug,
          price: selectedVariant?.price 
            ? (selectedVariant.price > 100 ? selectedVariant.price / 100 : selectedVariant.price)
            : ((product.sizes?.[0]?.price || 1990) / 100),
          image: getProductImage(),
          variant: selectedVariant ? `${selectedVariant.flavor || ''} ${selectedVariant.size || ''}`.trim() : ''
        }}
        onAddToCart={handleAddToCartFromDialog}
      />
    )}
    </div>
    </div>
  );
}
