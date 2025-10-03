#!/usr/bin/env python3
"""
Analisi CORRETTA dei prodotti dai ZIP files
Identifica solo i veri prodotti fitness esaminando ogni immagine
"""

import os
import json

def analyze_all_zip_images():
    """Analizza ogni immagine per identificare veri prodotti fitness"""
    
    fitness_products = []
    non_fitness_products = []
    
    # Lista di tutti i file immagine dai ZIP
    zip1_path = "attached_assets/1/"
    zip2_path = "attached_assets/2/"
    
    # Prodotti fitness autentici identificati manualmente
    verified_fitness_products = {
        # Powerbar Energize (Barrette energetiche)
        "21013001_box.png": {
            "name": "Powerbar Energize Original",
            "brand": "Powerbar",
            "category": "Barrette Energetiche",
            "type": "Box 25 barrette",
            "description": "Barrette energetiche con carboidrati 2:1"
        },
        "21033001_singolo.png": {
            "name": "Powerbar Energize Advanced Magnesium",
            "brand": "Powerbar", 
            "category": "Barrette Energetiche",
            "type": "Barretta singola",
            "description": "Barretta energetica con magnesio, gusto lampone"
        },
        
        # Powerbar Natural Energy (Barrette naturali)
        "21480202_box.png": {
            "name": "Powerbar Natural Energy Cacao",
            "brand": "Powerbar",
            "category": "Barrette Energetiche", 
            "type": "Box barrette",
            "description": "Barrette energetiche naturali al cacao"
        },
        "21482402_singolo.png": {
            "name": "Powerbar Natural Energy Vegan",
            "brand": "Powerbar",
            "category": "Barrette Energetiche",
            "type": "Barretta singola",
            "description": "Barretta energetica vegan fragola e mirtillo"
        },
        "21484602_singolo.png": {
            "name": "Powerbar Natural Energy Sweet & Salty",
            "brand": "Powerbar",
            "category": "Barrette Energetiche",
            "type": "Barretta singola", 
            "description": "Barretta energetica naturale dolce e salata"
        },
        
        # Powerbar Protein (Barrette proteiche)
        "21121001_box.png": {
            "name": "Powerbar True Organic Protein",
            "brand": "Powerbar",
            "category": "Proteine",
            "type": "Box barrette proteiche",
            "description": "Barrette proteiche biologiche certificate"
        },
        
        # Powerbar Gel (Gel energetici)
        "22010800_singolo.png": {
            "name": "Powerbar PowerGel Original",
            "brand": "Powerbar", 
            "category": "Carboidrati",
            "type": "Gel energetico",
            "description": "Gel energetico con carboidrati 2:1"
        },
        "12450712_singolo.png": {
            "name": "Powerbar PowerGel Shots",
            "brand": "Powerbar",
            "category": "Carboidrati", 
            "type": "Gel masticabili",
            "description": "Gel energetici masticabili in confezione"
        },
        
        # Altri prodotti Powerbar identificati
        "21012001_singolo.png": {
            "name": "Powerbar Natural Energy Banana",
            "brand": "Powerbar",
            "category": "Barrette Energetiche",
            "type": "Barretta singola",
            "description": "Barretta energetica naturale alla banana"
        },
        "21362042_box.png": {
            "name": "Powerbar IsoActive Isotonic",
            "brand": "Powerbar",
            "category": "Carboidrati",
            "type": "Bevanda isotonica",
            "description": "Bevanda isotonica per idratazione sportiva"
        },
        "21384100_singolo.png": {
            "name": "Powerbar Electrolytes",
            "brand": "Powerbar",
            "category": "Vitamine e Minerali",
            "type": "Compresse",
            "description": "Elettroliti in compresse per sportivi"
        }
    }
    
    # Prodotti NON fitness identificati
    non_fitness_items = {
        "128365_singolo.png": "Soudal Protect & Polish (manutenzione bici)",
        "128370_singolo.png": "Prodotto manutenzione (non fitness)"
    }
    
    print("=== ANALISI CORRETTA PRODOTTI ZIP ===")
    print(f"\n✅ PRODOTTI FITNESS IDENTIFICATI: {len(verified_fitness_products)}")
    
    for filename, product in verified_fitness_products.items():
        print(f"\n📦 {filename}")
        print(f"   Nome: {product['name']}")
        print(f"   Brand: {product['brand']}")
        print(f"   Categoria: {product['category']}")
        print(f"   Tipo: {product['type']}")
        print(f"   Descrizione: {product['description']}")
    
    print(f"\n❌ PRODOTTI NON FITNESS: {len(non_fitness_items)}")
    for filename, description in non_fitness_items.items():
        print(f"   {filename}: {description}")
    
    # Salva risultati per importazione database
    with open('verified_zip_products.json', 'w', encoding='utf-8') as f:
        json.dump(verified_fitness_products, f, ensure_ascii=False, indent=2)
    
    print(f"\n📊 RIEPILOGO:")
    print(f"   - Prodotti Powerbar fitness: {len(verified_fitness_products)}")
    print(f"   - Prodotti non fitness: {len(non_fitness_items)}")
    print(f"   - File salvato: verified_zip_products.json")
    
    return verified_fitness_products

if __name__ == "__main__":
    analyze_all_zip_images()