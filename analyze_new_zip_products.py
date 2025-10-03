#!/usr/bin/env python3
"""
Analisi dettagliata dei prodotti nei due nuovi ZIP files
"""

import os
import re
from pathlib import Path

def analyze_zip_products():
    """Analizza i prodotti nei due ZIP estratti"""
    
    zip1_path = "attached_assets/1"
    zip2_path = "attached_assets/2"
    
    # Categorie BigGimmy
    categories = {
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
    
    # Analizza ZIP 1
    print("ANALISI ZIP 1 (100 prodotti):")
    print("=" * 50)
    
    if os.path.exists(zip1_path):
        files = list(Path(zip1_path).glob("*.png")) + list(Path(zip1_path).glob("*.jpg"))
        for file_path in sorted(files):
            filename = file_path.name
            product_info = analyze_single_file(filename, "ZIP1")
            if product_info:
                categories[product_info['category']].append(product_info)
                print(f"✓ {product_info['name']} - {product_info['category']} - {product_info['brand']}")
    
    print(f"\nANALISI ZIP 2 (100 prodotti):")
    print("=" * 50)
    
    # Analizza ZIP 2
    if os.path.exists(zip2_path):
        files = list(Path(zip2_path).glob("*.png")) + list(Path(zip2_path).glob("*.jpg"))
        for file_path in sorted(files):
            filename = file_path.name
            product_info = analyze_single_file(filename, "ZIP2")
            if product_info:
                categories[product_info['category']].append(product_info)
                print(f"✓ {product_info['name']} - {product_info['category']} - {product_info['brand']}")
    
    # Riepilogo finale
    print(f"\nRIEPILOGO PRODOTTI IDENTIFICATI:")
    print("=" * 60)
    
    total_products = 0
    for category, products in categories.items():
        count = len(products)
        total_products += count
        if count > 0:
            print(f"{category}: {count} prodotti")
            # Mostra alcuni esempi
            for i, product in enumerate(products[:3]):
                print(f"  • {product['name']} ({product['brand']})")
            if count > 3:
                print(f"  ... e altri {count-3} prodotti")
    
    print(f"\nTOTALE PRODOTTI FITNESS: {total_products}")
    return categories, total_products

def analyze_single_file(filename, source):
    """Analizza un singolo file per determinare categoria e brand"""
    
    # Rimuovi estensioni
    clean_name = filename.replace('.png', '').replace('.jpg', '')
    
    # Identifica se è un prodotto fitness valido
    fitness_keywords = [
        'protein', 'whey', 'bcaa', 'creatine', 'amino', 'vitamin', 'mineral',
        'energy', 'pre', 'post', 'workout', 'mass', 'gainer', 'bar', 'shake',
        'supplement', 'carb', 'carbo', 'burn', 'fat', 'thermo', 'isolate',
        'concentrate', 'hydrolyzed', 'casein', 'glutamine', 'arginine',
        'beta', 'alanine', 'nitric', 'oxide', 'pump', 'focus', 'zma'
    ]
    
    # Check se contiene keywords fitness
    is_fitness = any(keyword in clean_name.lower() for keyword in fitness_keywords)
    
    # Categorizza per codice prodotto (basato sui pattern osservati)
    brand = identify_brand_from_code(clean_name)
    category = identify_category_from_code(clean_name)
    
    if is_fitness or category != "Sconosciuto":
        return {
            'name': clean_name,
            'brand': brand,
            'category': category,
            'source': source,
            'filename': filename
        }
    
    return None

def identify_brand_from_code(code):
    """Identifica il brand dal codice prodotto"""
    
    # Pattern per Powerbar (codici 21xxx, 22xxx, 23xxx, 24xxx)
    if re.match(r'^2[1-4]\d{4,6}', code):
        return "Powerbar"
    
    # Pattern per Jamieson (codici 12xxx, 128xxx)
    if re.match(r'^12\d{4,6}', code):
        return "Jamieson"
    
    # Pattern per WHY Sport (codici corti 2xxx)
    if re.match(r'^2\d{3}$', code):
        return "WHY Sport"
    
    # Default
    return "Sconosciuto"

def identify_category_from_code(code):
    """Identifica la categoria dal codice prodotto"""
    
    # Pattern Powerbar
    if code.startswith('210'):
        return "Barrette Energetiche"
    elif code.startswith('211'):
        return "Pre-Workout"
    elif code.startswith('213'):
        return "Carboidrati"
    elif code.startswith('214'):
        return "Proteine"
    elif code.startswith('220'):
        return "Vitamine e Minerali"
    elif code.startswith('221'):
        return "Aminoacidi"
    elif code.startswith('222'):
        return "Creatine"
    elif code.startswith('223'):
        return "Brucia Grassi"
    elif code.startswith('233'):
        return "Mass Gainer"
    elif code.startswith('234'):
        return "Accessori"
    elif code.startswith('247'):
        return "Proteine"
    
    # Pattern Jamieson
    elif code.startswith('124'):
        return "Vitamine e Minerali"
    elif code.startswith('128'):
        return "Vitamine e Minerali"
    
    # Pattern WHY Sport
    elif code.startswith('23'):
        return "Proteine"
    
    return "Sconosciuto"

if __name__ == "__main__":
    analyze_zip_products()