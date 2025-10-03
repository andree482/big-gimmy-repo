#!/usr/bin/env python3
"""
Sistema automatico per importare prodotti Powerbar, Jamieson e WHY Sport 
dalle 1124 immagini nei due ZIP files nel database BigGimmy
"""

import os
import json
import re
from pathlib import Path

def analyze_all_products():
    """Analizza tutti i prodotti dalle due cartelle ZIP"""
    
    base_paths = [
        "attached_assets/biovita_images/biovita-512x512",
        "attached_assets/biovita-512x512 pt 2"
    ]
    
    products = {
        "powerbar": {
            "energize_original": [],
            "energize_advanced": [],
            "protein_40": [],
            "protein_30": [],
            "true_organic": [],
            "powergel_shots": [],
            "protein_soft": []
        },
        "jamieson": {
            "vitavim": [],
            "lecitina": [],
            "other_vitamins": []
        },
        "why_sport": {
            "accessories": []
        },
        "excluded": {
            "soudal": []
        }
    }
    
    # Pattern di codici identificati
    powerbar_codes = ["21", "124507"]  # Codici che iniziano con 21 o 124507
    jamieson_codes = ["10", "2102"]    # Codici che iniziano con 10 o specifici
    soudal_codes = ["128"]             # Codici che iniziano con 128
    why_codes = ["ARC", "FRI"]         # Codici specifici WHY
    
    total_files = 0
    valid_products = 0
    
    for base_path in base_paths:
        if not os.path.exists(base_path):
            continue
            
        files = [f for f in os.listdir(base_path) if f.endswith('.png')]
        total_files += len(files)
        
        for filename in files:
            code = filename.split('_')[0]
            
            # Classifica per brand
            if any(code.startswith(pc) for pc in powerbar_codes):
                valid_products += 1
                categorize_powerbar_product(code, filename, products["powerbar"])
                
            elif any(code.startswith(jc) for jc in jamieson_codes):
                valid_products += 1
                categorize_jamieson_product(code, filename, products["jamieson"])
                
            elif any(code.startswith(wc) for wc in why_codes):
                valid_products += 1
                products["why_sport"]["accessories"].append({
                    "code": code,
                    "filename": filename,
                    "name": get_why_product_name(code)
                })
                
            elif any(code.startswith(sc) for sc in soudal_codes):
                products["excluded"]["soudal"].append({
                    "code": code,
                    "filename": filename,
                    "reason": "Prodotti manutenzione bici - non fitness"
                })
    
    return products, total_files, valid_products

def categorize_powerbar_product(code, filename, powerbar_products):
    """Categorizza prodotti Powerbar per linea"""
    
    # Mappa codici a prodotti basata sull'analisi visiva
    product_mapping = {
        "21011": {"line": "energize_original", "name": "Energize Original Chocolate"},
        "21012": {"line": "energize_original", "name": "Energize Original Berry"},
        "21013": {"line": "energize_original", "name": "Energize Original Cookies & Cream"},
        "21031": {"line": "energize_advanced", "name": "Energize Advanced Orange"},
        "21032": {"line": "energize_advanced", "name": "Energize Advanced Hazelnut-Chocolate"},
        "21090": {"line": "true_organic", "name": "True Organic Oat Chocolate Chunks"},
        "21091": {"line": "true_organic", "name": "True Organic Oat Banana Hazelnut"},
        "21121": {"line": "true_organic", "name": "True Organic Protein Cocoa Peanut"},
        "21300": {"line": "protein_40", "name": "Protein 40% Caramel Peanut Butter"},
        "21301": {"line": "protein_40", "name": "Protein 40% Strawberry White Chocolate"},
        "21362": {"line": "protein_30", "name": "Protein 30% Lemon Cheesecake"},
        "21366": {"line": "protein_30", "name": "Protein 30% Vanilla Caramel Crisp"},
        "21433": {"line": "protein_soft", "name": "Protein Soft Layer White Chocolate Strawberry"},
        "21424": {"line": "protein_soft", "name": "ProteinNut Coconut"},
        "124507": {"line": "powergel_shots", "name": "PowerGel Shots"}
    }
    
    # Trova corrispondenza
    for pattern, info in product_mapping.items():
        if code.startswith(pattern):
            powerbar_products[info["line"]].append({
                "code": code,
                "filename": filename,
                "name": info["name"],
                "category": get_powerbar_category(info["line"])
            })
            return
    
    # Prodotto non mappato - aggiunge a categoria generica
    powerbar_products["energize_original"].append({
        "code": code,
        "filename": filename,
        "name": f"Powerbar Product {code}",
        "category": "Barrette Energetiche"
    })

def categorize_jamieson_product(code, filename, jamieson_products):
    """Categorizza prodotti Jamieson"""
    
    if code == "10129":
        jamieson_products["vitavim"].append({
            "code": code,
            "filename": filename,
            "name": "VitaVim Multivitaminico",
            "size": "90 compresse",
            "category": "Vitamine e Minerali"
        })
    elif code == "2102":
        jamieson_products["lecitina"].append({
            "code": code,
            "filename": filename,
            "name": "Lecitina 1200",
            "size": "100 softgel",
            "category": "Vitamine e Minerali"
        })
    else:
        jamieson_products["other_vitamins"].append({
            "code": code,
            "filename": filename,
            "name": f"Jamieson Integratore {code}",
            "category": "Vitamine e Minerali"
        })

def get_powerbar_category(line):
    """Mappa linee Powerbar a categorie BigGimmy"""
    mapping = {
        "energize_original": "Barrette Energetiche",
        "energize_advanced": "Pre-Workout",
        "protein_40": "Proteine",
        "protein_30": "Proteine", 
        "true_organic": "Barrette Energetiche",
        "powergel_shots": "Pre-Workout",
        "protein_soft": "Proteine"
    }
    return mapping.get(line, "Barrette Energetiche")

def get_why_product_name(code):
    """Ottieni nome prodotto WHY"""
    mapping = {
        "ARCWHY01": "Arco Gonfiabile WHY SPORT",
        "FRIWHYL535": "Frigorifero WHY SPORT"
    }
    return mapping.get(code, f"WHY Sport {code}")

def generate_import_summary():
    """Genera riepilogo per importazione database"""
    
    products, total_files, valid_products = analyze_all_products()
    
    summary = {
        "analysis_date": "2025-06-07",
        "total_images": total_files,
        "valid_fitness_products": valid_products,
        "excluded_products": len(products["excluded"]["soudal"]),
        "brands": {
            "powerbar": {
                "total_products": sum(len(line) for line in products["powerbar"].values()),
                "categories": {
                    "barrette_energetiche": len(products["powerbar"]["energize_original"]) + len(products["powerbar"]["true_organic"]),
                    "proteine": len(products["powerbar"]["protein_40"]) + len(products["powerbar"]["protein_30"]) + len(products["powerbar"]["protein_soft"]),
                    "pre_workout": len(products["powerbar"]["energize_advanced"]) + len(products["powerbar"]["powergel_shots"])
                }
            },
            "jamieson": {
                "total_products": sum(len(line) for line in products["jamieson"].values()),
                "categories": {
                    "vitamine_minerali": sum(len(line) for line in products["jamieson"].values())
                }
            },
            "why_sport": {
                "total_products": len(products["why_sport"]["accessories"]),
                "categories": {
                    "accessori": len(products["why_sport"]["accessories"])
                }
            }
        }
    }
    
    return summary, products

if __name__ == "__main__":
    summary, products = generate_import_summary()
    
    print("=" * 60)
    print("ANALISI COMPLETA PRODOTTI BIOVITA")
    print("=" * 60)
    
    print(f"\nIMMAGINI TOTALI ANALIZZATE: {summary['total_images']}")
    print(f"PRODOTTI FITNESS VALIDI: {summary['valid_fitness_products']}")
    print(f"PRODOTTI ESCLUSI (SOUDAL): {summary['excluded_products']}")
    
    print(f"\nBRAND IDENTIFICATI:")
    for brand, data in summary['brands'].items():
        print(f"  {brand.upper()}: {data['total_products']} prodotti")
        for category, count in data['categories'].items():
            print(f"    - {category.replace('_', ' ').title()}: {count}")
    
    print(f"\nPRONTO PER IMPORTAZIONE DATABASE BIGGIMMY")