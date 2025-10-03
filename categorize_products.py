#!/usr/bin/env python3
"""
Categorizzazione automatica dei 528 prodotti per identificare:
- Prodotti sportivi/fitness (adatti per BigGimmy)
- Prodotti manutenzione bici (da escludere)
- Brand e varianti di ogni categoria
"""

import os
import json

def analyze_brands_and_categories():
    base_path = "attached_assets/biovita_images/biovita-512x512"
    
    # Campiona 50 prodotti per identificare pattern
    files = [f for f in os.listdir(base_path) if f.endswith('_singolo.png')][:50]
    
    print(f"Analizzando {len(files)} prodotti campione per identificare brand...")
    
    # Brand patterns identificati finora dall'analisi visiva
    fitness_brands = {
        'powerbar': [],  # Barrette energetiche, gel
        'jamieson': [],  # Vitamine e integratori
        'unknown_fitness': []  # Altri brand fitness da identificare
    }
    
    bike_maintenance = {
        'soudal': [],  # Prodotti manutenzione bici
        'unknown_bike': []
    }
    
    other_products = []
    
    # Esamina i file per pattern nei nomi
    print("\nCampione codici prodotto per analisi:")
    sample_codes = []
    
    for filename in files[:20]:
        code = filename.split('_')[0]
        sample_codes.append(code)
        print(f"  {code} -> {filename}")
    
    # Analisi pattern codici
    code_ranges = {
        '10xxx': [c for c in sample_codes if c.startswith('10')],
        '12xxx': [c for c in sample_codes if c.startswith('12')],
        '128xxx': [c for c in sample_codes if c.startswith('128')],
        '21xxx': [c for c in sample_codes if c.startswith('21')],
        'altri': [c for c in sample_codes if not any(c.startswith(p) for p in ['10', '12', '21'])]
    }
    
    print(f"\nPattern codici identificati:")
    for pattern, codes in code_ranges.items():
        if codes:
            print(f"  {pattern}: {len(codes)} prodotti (es: {codes[0] if codes else 'nessuno'})")
    
    # Basandoci sull'analisi visiva precedente:
    analysis_result = {
        "fitness_supplements": {
            "powerbar_energy": {
                "description": "Barrette energetiche e gel Powerbar",
                "estimated_products": "30-50",
                "sample_codes": ["21031001", "21032001", "21300001"],
                "variants": ["Energize Original", "Energize Advanced", "Protein 40%"]
            },
            "jamieson_vitamins": {
                "description": "Vitamine e integratori Jamieson", 
                "estimated_products": "10-20",
                "sample_codes": ["10129"],
                "variants": ["VitaVim Multivitaminico"]
            }
        },
        "bike_maintenance": {
            "soudal_products": {
                "description": "Prodotti manutenzione biciclette Soudal",
                "estimated_products": "20-30", 
                "sample_codes": ["128363", "128366", "128368", "130525"],
                "variants": ["Mud Remover", "Dry Wax", "Silicone Paste", "Chain Cleaner"]
            }
        },
        "unknown_categories": {
            "description": "Prodotti da categorizzare ulteriormente",
            "estimated_products": "400+",
            "needs_analysis": True
        }
    }
    
    return analysis_result

def recommend_next_steps():
    print("\n" + "="*60)
    print("RACCOMANDAZIONI PER PROCEDERE:")
    print("="*60)
    
    print("\n1. FILTRARE PRODOTTI FITNESS/SPORTIVI:")
    print("   - Focus su brand: Powerbar, Jamieson")
    print("   - Escludere: Soudal (manutenzione bici)")
    print("   - Stimati prodotti adatti: 40-70 su 528")
    
    print("\n2. ANALISI DETTAGLIATA NECESSARIA:")
    print("   - Scansione completa dei 528 prodotti")
    print("   - Identificazione brand sconosciuti")
    print("   - Categorizzazione automatica")
    
    print("\n3. PROCESSO CONSIGLIATO:")
    print("   - Creare filtro automatico per brand fitness")
    print("   - Raggruppare varianti dello stesso prodotto")
    print("   - Generare report finale dei prodotti selezionati")
    
    return True

if __name__ == "__main__":
    result = analyze_brands_and_categories()
    
    print(f"\nRESULTATO ANALISI:")
    print(f"Prodotti fitness stimati: 40-70")
    print(f"Prodotti manutenzione bici: 20-30") 
    print(f"Prodotti da analizzare: 400+")
    
    recommend_next_steps()