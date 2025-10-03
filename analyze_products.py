#!/usr/bin/env python3
"""
Analisi automatica delle 596 immagini prodotti per identificare:
- Brand e nomi prodotti
- Categorie (proteine, vitamine, energia, etc.)
- Varianti e gusti
- Raggruppamento automatico
"""

import os
import json
from collections import defaultdict

def analyze_product_images():
    base_path = "attached_assets/biovita_images/biovita-512x512"
    
    if not os.path.exists(base_path):
        print("❌ Cartella immagini non trovata")
        return
    
    files = [f for f in os.listdir(base_path) if f.endswith(('.png', '.jpg', '.jpeg'))]
    print(f"📊 Analizzando {len(files)} immagini...")
    
    # Raggruppa per codice prodotto
    products = defaultdict(lambda: {"box": [], "singolo": []})
    
    for filename in files:
        # Estrai codice prodotto (parte prima di _)
        code = filename.split('_')[0]
        
        if '_box.' in filename:
            products[code]["box"].append(filename)
        elif '_singolo.' in filename:
            products[code]["singolo"].append(filename)
    
    print(f"🔍 Trovati {len(products)} codici prodotto distinti")
    
    # Analizza alcuni campioni per identificare brand
    sample_analysis = []
    
    # Prendi i primi 20 prodotti per analisi manuale
    for i, (code, files_dict) in enumerate(list(products.items())[:20]):
        analysis = {
            "code": code,
            "has_box": len(files_dict["box"]) > 0,
            "has_singolo": len(files_dict["singolo"]) > 0,
            "total_images": len(files_dict["box"]) + len(files_dict["singolo"]),
            "files": files_dict
        }
        sample_analysis.append(analysis)
    
    # Stampa report campione
    print("\n📋 REPORT CAMPIONE (primi 20 prodotti):")
    print("=" * 60)
    for item in sample_analysis:
        print(f"Codice: {item['code']}")
        print(f"  📦 Box: {len(item['files']['box'])} | 📱 Singolo: {len(item['files']['singolo'])}")
        if item['files']['singolo']:
            print(f"  🖼️  File: {item['files']['singolo'][0]}")
        print()
    
    # Statistiche generali
    total_with_box = sum(1 for p in products.values() if p["box"])
    total_with_singolo = sum(1 for p in products.values() if p["singolo"])
    
    print(f"\n📈 STATISTICHE GENERALI:")
    print(f"   Prodotti totali: {len(products)}")
    print(f"   Con immagine box: {total_with_box}")
    print(f"   Con immagine singolo: {total_with_singolo}")
    print(f"   Solo box: {total_with_box - sum(1 for p in products.values() if p['box'] and p['singolo'])}")
    print(f"   Solo singolo: {total_with_singolo - sum(1 for p in products.values() if p['box'] and p['singolo'])}")
    
    return products, sample_analysis

if __name__ == "__main__":
    products, sample = analyze_product_images()