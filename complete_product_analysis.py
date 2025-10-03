#!/usr/bin/env python3
"""
Analisi completa e dettagliata di OGNI prodotto nei due ZIP
per identificare prodotti adatti alle 10 categorie BigGimmy
"""

import os
import json
from pathlib import Path

# Categorie BigGimmy esistenti
BIGGIMMY_CATEGORIES = [
    "Proteine",
    "Aminoacidi", 
    "Pre-Workout",
    "Carboidrati",
    "Barrette Energetiche",
    "Vitamine e Minerali",
    "Brucia Grassi",
    "Mass Gainer",
    "Accessori",
    "Creatine"
]

def analyze_all_products_detailed():
    """Analizza OGNI prodotto per categoria BigGimmy"""
    
    base_paths = [
        "attached_assets/biovita_images/biovita-512x512",
        "attached_assets/biovita-512x512 pt 2"
    ]
    
    # Struttura per raccogliere tutti i prodotti
    products_by_category = {cat: [] for cat in BIGGIMMY_CATEGORIES}
    excluded_products = []
    
    total_analyzed = 0
    total_valid = 0
    
    print("ANALISI DETTAGLIATA DI OGNI PRODOTTO:")
    print("=" * 60)
    
    for base_path in base_paths:
        if not os.path.exists(base_path):
            continue
            
        print(f"\nAnalizzando: {base_path}")
        files = [f for f in os.listdir(base_path) if f.endswith('.png')]
        
        for filename in sorted(files):
            total_analyzed += 1
            code = filename.split('_')[0]
            
            # Analizza ogni prodotto individualmente
            product_info = analyze_single_product(code, filename, base_path)
            
            if product_info and product_info['category'] != 'EXCLUDED':
                total_valid += 1
                products_by_category[product_info['category']].append(product_info)
                print(f"  ✓ {product_info['name']} - {product_info['category']} - {len(product_info.get('variants', []))} varianti")
            elif product_info and product_info['category'] == 'EXCLUDED':
                excluded_products.append(product_info)
                print(f"  ✗ {product_info['name']} - ESCLUSO: {product_info['reason']}")
    
    print(f"\nTOTALE ANALIZZATO: {total_analyzed}")
    print(f"TOTALE VALIDO: {total_valid}")
    print(f"TOTALE ESCLUSO: {len(excluded_products)}")
    
    return products_by_category, excluded_products

def analyze_single_product(code, filename, base_path):
    """Analizza un singolo prodotto per determinare categoria e varianti"""
    
    # Pattern di esclusione (prodotti non sportivi)
    bike_patterns = ['128', 'SOUDAL', 'MUD', 'WAX', 'CHAIN', 'DISC']
    
    # Controlla se è un prodotto da escludere
    for pattern in bike_patterns:
        if pattern.lower() in code.lower() or pattern.lower() in filename.lower():
            return {
                'code': code,
                'filename': filename,
                'name': f"Prodotto {code}",
                'category': 'EXCLUDED',
                'reason': 'Prodotto manutenzione bici'
            }
    
    # Mappa dettagliata dei prodotti basata sui codici identificati
    product_mapping = {
        # POWERBAR PRODUCTS
        '21011': {
            'name': 'Powerbar Energize Original',
            'category': 'Barrette Energetiche',
            'variants': ['55g'],
            'flavors': ['Chocolate'],
            'description': 'Barretta energetica con carboidrati 2:1 e magnesio'
        },
        '21012': {
            'name': 'Powerbar Energize Original',
            'category': 'Barrette Energetiche', 
            'variants': ['55g'],
            'flavors': ['Berry'],
            'description': 'Barretta energetica ai frutti di bosco'
        },
        '21013': {
            'name': 'Powerbar Energize Original',
            'category': 'Barrette Energetiche',
            'variants': ['55g'], 
            'flavors': ['Cookies & Cream'],
            'description': 'Barretta energetica gusto biscotto'
        },
        '21031': {
            'name': 'Powerbar Energize Advanced',
            'category': 'Pre-Workout',
            'variants': ['55g'],
            'flavors': ['Orange'],
            'description': 'Barretta pre-allenamento con magnesio avanzato'
        },
        '21032': {
            'name': 'Powerbar Energize Advanced',
            'category': 'Pre-Workout',
            'variants': ['55g'],
            'flavors': ['Hazelnut-Chocolate'], 
            'description': 'Barretta pre-allenamento nocciola cioccolato'
        },
        '21090': {
            'name': 'Powerbar True Organic Oat',
            'category': 'Barrette Energetiche',
            'variants': ['65g'],
            'flavors': ['Chocolate Chunks'],
            'description': 'Barretta biologica all\'avena con cioccolato'
        },
        '21091': {
            'name': 'Powerbar True Organic Oat', 
            'category': 'Barrette Energetiche',
            'variants': ['65g'],
            'flavors': ['Banana Hazelnut'],
            'description': 'Barretta biologica banana e nocciole'
        },
        '21121': {
            'name': 'Powerbar True Organic Protein',
            'category': 'Proteine',
            'variants': ['55g'],
            'flavors': ['Cocoa Peanut'],
            'description': 'Barretta proteica biologica cacao arachidi'
        },
        '21300': {
            'name': 'Powerbar Protein 40%',
            'category': 'Proteine',
            'variants': ['55g'],
            'flavors': ['Caramel Peanut Butter'],
            'description': 'Barretta proteica 40% caramello burro arachidi'
        },
        '21301': {
            'name': 'Powerbar Protein 40%',
            'category': 'Proteine', 
            'variants': ['55g'],
            'flavors': ['Strawberry White Chocolate'],
            'description': 'Barretta proteica 40% fragola cioccolato bianco'
        },
        '21362': {
            'name': 'Powerbar Protein 30%',
            'category': 'Proteine',
            'variants': ['55g'],
            'flavors': ['Lemon Cheesecake'],
            'description': 'Barretta proteica 30% cheesecake limone'
        },
        '21366': {
            'name': 'Powerbar Protein 30%',
            'category': 'Proteine',
            'variants': ['55g'],
            'flavors': ['Vanilla Caramel Crisp'],
            'description': 'Barretta proteica 30% vaniglia caramello'
        },
        '21424': {
            'name': 'Powerbar ProteinNut',
            'category': 'Proteine',
            'variants': ['50g'],
            'flavors': ['Coconut'],
            'description': 'Barretta proteica con calcio e magnesio'
        },
        '21433': {
            'name': 'Powerbar Protein Soft Layer',
            'category': 'Proteine',
            'variants': ['50g'],
            'flavors': ['White Chocolate Strawberry'],
            'description': 'Barretta proteica con strato morbido'
        },
        '124507': {
            'name': 'Powerbar PowerGel Shots',
            'category': 'Pre-Workout',
            'variants': ['60g'],
            'flavors': ['Raspberry', 'Cola'],
            'description': 'Gel energetico con 75mg caffeina'
        },
        
        # JAMIESON PRODUCTS
        '10129': {
            'name': 'Jamieson VitaVim',
            'category': 'Vitamine e Minerali',
            'variants': ['90 compresse'],
            'flavors': ['Naturale'],
            'description': 'Multivitaminico e multiminerale completo'
        },
        '2102': {
            'name': 'Jamieson Lecitina 1200',
            'category': 'Vitamine e Minerali',
            'variants': ['100 softgel'],
            'flavors': ['Naturale'],
            'description': 'Lecitina di soia per il metabolismo lipidico'
        },
        
        # WHY SPORT PRODUCTS
        'ARCWHY01': {
            'name': 'WHY Sport Arco Gonfiabile',
            'category': 'Accessori',
            'variants': ['Standard'],
            'flavors': ['Rosso'],
            'description': 'Struttura gonfiabile per eventi sportivi'
        },
        'FRIWHYL535': {
            'name': 'WHY Sport Frigorifero',
            'category': 'Accessori',
            'variants': ['Standard'],
            'flavors': ['Bianco'],
            'description': 'Frigorifero brandizzato per punto vendita'
        }
    }
    
    # Cerca corrispondenza esatta
    for pattern, info in product_mapping.items():
        if code.startswith(pattern):
            return {
                'code': code,
                'filename': filename,
                'name': info['name'],
                'category': info['category'],
                'variants': info['variants'],
                'flavors': info['flavors'],
                'description': info['description'],
                'brand': get_brand_from_code(code)
            }
    
    # Se non trovato, prova a categorizzare per pattern generici
    return categorize_unknown_product(code, filename)

def get_brand_from_code(code):
    """Determina il brand dal codice prodotto"""
    if code.startswith('21') or code.startswith('124507'):
        return 'Powerbar'
    elif code.startswith('10') or code == '2102':
        return 'Jamieson'
    elif code.startswith('ARC') or code.startswith('FRI'):
        return 'WHY Sport'
    else:
        return 'Unknown'

def categorize_unknown_product(code, filename):
    """Categorizza prodotti non mappati ma potenzialmente validi"""
    
    # Keywords per categorie
    category_keywords = {
        'Proteine': ['protein', 'whey', 'casein', 'proteine'],
        'Aminoacidi': ['amino', 'bcaa', 'glutamine', 'aminoacidi'],
        'Pre-Workout': ['pre', 'workout', 'energy', 'pump', 'energen'],
        'Carboidrati': ['carbo', 'malto', 'dextrose', 'carboidrati'],
        'Barrette Energetiche': ['bar', 'barretta', 'energy'],
        'Vitamine e Minerali': ['vitamin', 'mineral', 'vitamine', 'minerali'],
        'Brucia Grassi': ['burn', 'fat', 'termo', 'brucia'],
        'Mass Gainer': ['mass', 'gainer', 'weight'],
        'Creatine': ['creatine', 'creatina'],
        'Accessori': ['accessori', 'equipment', 'gear']
    }
    
    filename_lower = filename.lower()
    
    for category, keywords in category_keywords.items():
        for keyword in keywords:
            if keyword in filename_lower:
                return {
                    'code': code,
                    'filename': filename,
                    'name': f'Prodotto {code}',
                    'category': category,
                    'variants': ['Standard'],
                    'flavors': ['Da determinare'],
                    'description': f'Prodotto {category.lower()} da categorizzare',
                    'brand': 'Da determinare'
                }
    
    # Se non categorizzabile, marca come escluso
    return {
        'code': code,
        'filename': filename, 
        'name': f'Prodotto {code}',
        'category': 'EXCLUDED',
        'reason': 'Non categorizzabile o non sportivo'
    }

def generate_detailed_report():
    """Genera report dettagliato per categoria"""
    
    products_by_category, excluded = analyze_all_products_detailed()
    
    print("\n" + "=" * 80)
    print("REPORT DETTAGLIATO PER CATEGORIA BIGGIMMY")
    print("=" * 80)
    
    total_products = 0
    total_variants = 0
    
    for category in BIGGIMMY_CATEGORIES:
        products = products_by_category[category]
        if products:
            print(f"\n{category.upper()} ({len(products)} prodotti):")
            print("-" * 50)
            
            for product in products:
                variants_count = len(product.get('variants', []))
                flavors_count = len(product.get('flavors', []))
                total_variants += variants_count * flavors_count
                
                print(f"  • {product['name']}")
                print(f"    Brand: {product.get('brand', 'N/A')}")
                print(f"    Varianti: {variants_count} ({', '.join(product.get('variants', []))})")
                print(f"    Gusti: {flavors_count} ({', '.join(product.get('flavors', []))})")
                print(f"    Codice: {product['code']}")
                print()
            
            total_products += len(products)
    
    print(f"\nTOTALE PRODOTTI VALIDI: {total_products}")
    print(f"TOTALE VARIANTI POSSIBILI: {total_variants}")
    print(f"TOTALE ESCLUSI: {len(excluded)}")
    
    return products_by_category, excluded

if __name__ == "__main__":
    generate_detailed_report()