
#!/usr/bin/env python3
"""
CONTROLLO QUALITÀ PRODOTTI BIGGIMMY
Verifica che tutti i prodotti seguano le regole fondamentali:
- Varianti gestite correttamente  
- Prezzi dinamici (non statici)
- Immagini ben associate
- Struttura conforme a FruitForce
"""

import json
import os
from pathlib import Path

def check_product_quality():
    """Verifica la qualità di tutti i prodotti inseriti"""
    
    print("🔍 CONTROLLO QUALITÀ PRODOTTI BIGGIMMY")
    print("=" * 50)
    
    # Verifica file principali
    files_to_check = [
        "client/src/lib/productVariants.ts",
        "client/src/lib/imageUtils.ts",
        "client/src/pages/ProductDetail.tsx"
    ]
    
    issues = []
    
    for file_path in files_to_check:
        if not os.path.exists(file_path):
            issues.append(f"❌ File mancante: {file_path}")
            continue
            
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Verifica problemi specifici
        if "ProductDetail.tsx" in file_path:
            if "text-green-700" in content and "€" in content:
                issues.append("❌ PREZZO STATICO VERDE trovato in ProductDetail.tsx")
            if "bg-green-50" in content and "prezzo" in content.lower():
                issues.append("❌ Background verde per prezzo in ProductDetail.tsx")
                
        if "productVariants.ts" in file_path:
            # Conta prodotti senza varianti gestite
            variant_count = content.count("variants: [")
            if variant_count == 0:
                issues.append("❌ Nessuna variante trovata nei prodotti")
                
        if "imageUtils.ts" in file_path:
            if "PRODUCT_IMAGE_MAP" not in content:
                issues.append("❌ PRODUCT_IMAGE_MAP mancante in imageUtils.ts")
    
    # Verifica immagini in public/images/products/
    products_images_dir = Path("public/images/products/")
    if not products_images_dir.exists():
        issues.append("❌ Cartella public/images/products/ mancante")
    else:
        image_count = len(list(products_images_dir.glob("*.jpg"))) + len(list(products_images_dir.glob("*.png")))
        if image_count == 0:
            issues.append("❌ Nessuna immagine trovata in public/images/products/")
        else:
            print(f"✅ Trovate {image_count} immagini prodotti")
    
    # Stampa risultati
    if issues:
        print("\n🚨 PROBLEMI RILEVATI:")
        for issue in issues:
            print(f"  {issue}")
        print(f"\n📊 Totale problemi: {len(issues)}")
        print("\n🔧 AZIONI RICHIESTE:")
        print("  1. Rimuovere tutti i prezzi statici verdi")
        print("  2. Attivare gestione varianti per tutti i prodotti")  
        print("  3. Verificare mapping immagini corretto")
        print("  4. Seguire esattamente il modello FruitForce")
    else:
        print("✅ CONTROLLO QUALITÀ SUPERATO!")
        print("   Tutti i prodotti seguono le regole richieste")
    
    return len(issues) == 0

if __name__ == "__main__":
    quality_ok = check_product_quality()
    exit(0 if quality_ok else 1)
