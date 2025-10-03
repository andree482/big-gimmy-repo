#!/usr/bin/env python3
"""
Analisi completa dei 246 prodotti Volchem/+WATT per categoria BigGimmy
"""

import os
import re
from pathlib import Path

def analyze_volchem_products():
    """Analizza tutti i prodotti Volchem per categoria"""
    
    base_path = "attached_assets"
    
    # Prodotti categorizzati per le 10 categorie BigGimmy
    products = {
        "Proteine": [],
        "Aminoacidi": [],
        "Pre-Workout": [],
        "Carboidrati": [],
        "Barrette Energetiche": [],
        "Vitamine e Minerali": [],
        "Brucia Grassi": [],
        "Mass Gainer": [],
        "Accessori": [],
        "Creatine": []
    }
    
    excluded = []
    
    # Pattern per identificare categorie dai nomi file
    category_patterns = {
        "Proteine": [
            "WHEYGHTY PROTEIN", "WHEY PROTEIN", "SAY PROTEIN", "SMART PROTEIN",
            "PROTEIN WAFER", "LIGHT PROTEIN", "PROMEAL", "Mirabol"
        ],
        "Aminoacidi": [
            "Aminotool", "AMINOACIDI", "BCAA", "GLUTAMINE", "ARGININE",
            "INTRA-PRO", "HIGH-BCAA"
        ],
        "Pre-Workout": [
            "ENERGY PUMP", "HARD-START", "ENERGEN", "ENERGY", "PUMP"
        ],
        "Carboidrati": [
            "LIQUID CARBO", "CARBO ENERGY", "CARBOWART", "MALTODEX"
        ],
        "Barrette Energetiche": [
            "BIGBAR", "BIG BAR", "Barrettone", "Low Sugar Bar", "LIGHT PROTEIN BAR"
        ],
        "Vitamine e Minerali": [
            "VITAMIN", "MINERAL", "B STRONG", "Ascocid", "FERRO", "Antiradical",
            "HEPAX", "JOINT-FLEX", "Comfort Vision", "BERBERINA", "ASHWAGANDHA",
            "ASTAXANTINA", "Collagene", "Bromelina", "D RIBOSIO"
        ],
        "Brucia Grassi": [
            "BURN OUT", "HARD-DREN", "ADVANCE CLA", "ADVANCE DEPUR"
        ],
        "Mass Gainer": [
            "MASS FORMULA", "MASSIVE-GAIN", "AVENA"
        ],
        "Creatine": [
            "CREATINA", "CREANIZED"
        ],
        "Accessori": [
            "Grissini", "FRUITFORCE"
        ]
    }
    
    # Analizza ogni file immagine
    image_files = []
    for ext in ['*.jpg', '*.png']:
        image_files.extend(Path(base_path).glob(ext))
    
    print(f"Analisi di {len(image_files)} immagini prodotti Volchem/+WATT:")
    print("=" * 70)
    
    for file_path in sorted(image_files):
        filename = file_path.name
        
        # Salta immagini non prodotto
        if any(skip in filename.lower() for skip in ['whatsapp', 'biovita', 'generated']):
            continue
        
        # Identifica categoria
        found_category = None
        for category, patterns in category_patterns.items():
            if any(pattern.upper() in filename.upper() for pattern in patterns):
                found_category = category
                break
        
        if found_category:
            # Estrai dettagli prodotto
            product_info = extract_product_details(filename, found_category)
            products[found_category].append(product_info)
            print(f"✓ {product_info['name']} - {found_category}")
            if product_info.get('variants'):
                print(f"  Varianti: {', '.join(product_info['variants'])}")
            if product_info.get('flavors'):
                print(f"  Gusti: {', '.join(product_info['flavors'])}")
        else:
            # Prodotto non categorizzato
            excluded.append({
                'filename': filename,
                'reason': 'Non identificato come prodotto fitness'
            })
    
    return products, excluded

def extract_product_details(filename, category):
    """Estrae dettagli prodotto dal nome file"""
    
    # Rimuovi estensioni e suffissi
    clean_name = filename.replace('_FRONTE.jpg', '').replace('_Fronte.jpg', '').replace(' FRONTE.jpg', '')
    clean_name = clean_name.replace('.jpg', '').replace('.png', '')
    
    # Estrai brand (principalmente +WATT/Volchem)
    brand = "+WATT"
    if "Powerbar" in clean_name or "PowerBar" in clean_name:
        brand = "Powerbar"
    elif "Jamieson" in clean_name:
        brand = "Jamieson"
    elif "Mirabol" in clean_name:
        brand = "Volchem"
    
    # Estrai nome prodotto base
    product_name = clean_name
    
    # Estrai varianti (formati/dimensioni)
    variants = []
    size_patterns = [
        r'(\d+\s*g)', r'(\d+\s*kg)', r'(\d+\s*ml)', r'(\d+\s*cpr)', 
        r'(\d+\s*compresse)', r'(\d+x\d+ml)', r'(\d+\s*capsule)',
        r'(\d+\s*softgel)', r'(\d+\s*dosi)'
    ]
    
    for pattern in size_patterns:
        matches = re.findall(pattern, clean_name, re.IGNORECASE)
        variants.extend(matches)
    
    if not variants:
        variants = ['Standard']
    
    # Estrai gusti/sapori
    flavors = []
    flavor_keywords = [
        'CACAO', 'CIOCCOLATO', 'CHOCOLATE', 'NOCCIOLA', 'VANILLA', 'VANIGLIA',
        'BANANA', 'FRAGOLA', 'STRAWBERRY', 'LIMONE', 'LEMON', 'ARANCIA', 'ORANGE',
        'CAPPUCCINO', 'COFFEE', 'COCCO', 'COCONUT', 'NATURAL', 'NEUTRO',
        'CARAMELLO', 'CARAMEL', 'BERRY', 'FRUTTI', 'COLA', 'LAMPONE'
    ]
    
    for flavor in flavor_keywords:
        if flavor in clean_name.upper():
            flavors.append(flavor.title())
    
    if not flavors:
        flavors = ['Naturale']
    
    # Genera descrizione basata su categoria
    descriptions = {
        "Proteine": f"Proteine del siero del latte ad alto valore biologico",
        "Aminoacidi": f"Integratore di aminoacidi essenziali per il recupero muscolare",
        "Pre-Workout": f"Integratore pre-allenamento per energia e performance",
        "Carboidrati": f"Carboidrati per energia immediata e recupero",
        "Barrette Energetiche": f"Barretta energetica per sportivi",
        "Vitamine e Minerali": f"Integratore vitaminico-minerale per il benessere",
        "Brucia Grassi": f"Integratore termogenico per il controllo del peso",
        "Mass Gainer": f"Integratore per l'aumento della massa muscolare",
        "Creatine": f"Creatina monoidrato per forza e potenza",
        "Accessori": f"Accessorio per l'integrazione sportiva"
    }
    
    return {
        'name': product_name,
        'brand': brand,
        'category': category,
        'variants': list(set(variants)),
        'flavors': list(set(flavors)),
        'description': descriptions.get(category, "Integratore sportivo"),
        'filename': filename
    }

def generate_complete_catalog():
    """Genera catalogo completo per BigGimmy"""
    
    products, excluded = analyze_volchem_products()
    
    print("\n" + "=" * 80)
    print("CATALOGO COMPLETO BIGGIMMY - ANALISI DETTAGLIATA")
    print("=" * 80)
    
    total_products = 0
    total_variants = 0
    
    for category, product_list in products.items():
        if product_list:
            print(f"\n{category.upper()} ({len(product_list)} prodotti):")
            print("-" * 60)
            
            for product in product_list:
                variant_count = len(product['variants'])
                flavor_count = len(product['flavors'])
                combinations = variant_count * flavor_count
                
                print(f"  • {product['name']}")
                print(f"    Brand: {product['brand']}")
                print(f"    Varianti: {variant_count} ({', '.join(product['variants'])})")
                print(f"    Gusti: {flavor_count} ({', '.join(product['flavors'])})")
                print(f"    Combinazioni possibili: {combinations}")
                print(f"    File: {product['filename']}")
                print()
                
                total_variants += combinations
            
            total_products += len(product_list)
    
    print(f"\n📊 RIEPILOGO FINALE:")
    print(f"   Prodotti base identificati: {total_products}")
    print(f"   Combinazioni varianti/gusti: {total_variants}")
    print(f"   Prodotti esclusi: {len(excluded)}")
    print(f"   Copertura categorie BigGimmy: {len([c for c in products.values() if c])}/10")
    
    return products, total_products, total_variants

if __name__ == "__main__":
    generate_complete_catalog()