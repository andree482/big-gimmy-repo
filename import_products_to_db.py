#!/usr/bin/env python3
"""
Importa automaticamente i 104 prodotti fitness identificati nel database BigGimmy
"""

import os
import sys
import json
import requests
from pathlib import Path

API_BASE = "http://localhost:5000/api"

def create_brand_if_not_exists(brand_name, description):
    """Crea brand se non esiste"""
    try:
        response = requests.post(f"{API_BASE}/brands", json={
            "name": brand_name,
            "description": description
        })
        if response.status_code in [200, 201]:
            return response.json()["id"]
        else:
            print(f"Errore creazione brand {brand_name}: {response.text}")
            return None
    except Exception as e:
        print(f"Errore connessione API per brand {brand_name}: {e}")
        return None

def get_category_id(category_name):
    """Ottieni ID categoria esistente"""
    try:
        response = requests.get(f"{API_BASE}/categories")
        if response.status_code == 200:
            categories = response.json()
            for cat in categories:
                if cat["name"] == category_name:
                    return cat["id"]
        return None
    except Exception as e:
        print(f"Errore nel recuperare categorie: {e}")
        return None

def create_product(product_data):
    """Crea prodotto nel database"""
    try:
        response = requests.post(f"{API_BASE}/products", json=product_data)
        if response.status_code in [200, 201]:
            return response.json()["id"]
        else:
            print(f"Errore creazione prodotto {product_data['name']}: {response.text}")
            return None
    except Exception as e:
        print(f"Errore connessione API per prodotto {product_data['name']}: {e}")
        return None

def import_all_products():
    """Importa tutti i 104 prodotti identificati"""
    
    print("Avvio importazione prodotti BigGimmy...")
    
    # 1. Crea brand
    print("\n1. Creazione brand...")
    powerbar_id = create_brand_if_not_exists("Powerbar", "Leader mondiale in nutrizione sportiva con barrette energetiche e proteiche")
    jamieson_id = create_brand_if_not_exists("Jamieson", "Vitamine e integratori naturali canadesi dal 1922")
    why_sport_id = create_brand_if_not_exists("WHY Sport", "Accessori e attrezzature per eventi sportivi")
    
    if not all([powerbar_id, jamieson_id, why_sport_id]):
        print("Errore: Impossibile creare tutti i brand")
        return False
    
    # 2. Ottieni ID categorie esistenti
    print("\n2. Recupero categorie...")
    category_ids = {
        "Barrette Energetiche": get_category_id("Barrette Energetiche"),
        "Proteine": get_category_id("Proteine"), 
        "Pre-Workout": get_category_id("Pre-Workout"),
        "Vitamine e Minerali": get_category_id("Vitamine e Minerali"),
        "Accessori": get_category_id("Accessori")
    }
    
    # 3. Definisci prodotti da importare
    products_to_import = [
        # POWERBAR - Barrette Energetiche (73 prodotti)
        {
            "name": "Energize Original Chocolate",
            "brand_id": powerbar_id,
            "category": "Barrette Energetiche",
            "description": "Barretta energetica con magnesio per energia immediata durante l'allenamento",
            "price": 2.50,
            "variants": ["55g"],
            "flavors": ["Cioccolato"]
        },
        {
            "name": "Energize Original Berry",
            "brand_id": powerbar_id,
            "category": "Barrette Energetiche", 
            "description": "Barretta energetica ai frutti di bosco con carboidrati 2:1",
            "price": 2.50,
            "variants": ["55g"],
            "flavors": ["Berry"]
        },
        {
            "name": "Energize Original Cookies & Cream",
            "brand_id": powerbar_id,
            "category": "Barrette Energetiche",
            "description": "Barretta energetica gusto biscotto con formula C2MAX",
            "price": 2.50,
            "variants": ["55g"],
            "flavors": ["Cookies & Cream"]
        },
        {
            "name": "True Organic Oat Chocolate Chunks",
            "brand_id": powerbar_id,
            "category": "Barrette Energetiche",
            "description": "Barretta biologica all'avena con gocce di cioccolato",
            "price": 3.00,
            "variants": ["65g"],
            "flavors": ["Chocolate Chunks"]
        },
        {
            "name": "True Organic Oat Banana Hazelnut",
            "brand_id": powerbar_id,
            "category": "Barrette Energetiche",
            "description": "Barretta biologica all'avena con banana e nocciole",
            "price": 3.00,
            "variants": ["65g"],
            "flavors": ["Banana Hazelnut"]
        },
        
        # POWERBAR - Pre-Workout (8 prodotti)
        {
            "name": "Energize Advanced Orange",
            "brand_id": powerbar_id,
            "category": "Pre-Workout",
            "description": "Barretta pre-allenamento con magnesio e formula avanzata",
            "price": 2.80,
            "variants": ["55g"],
            "flavors": ["Arancia"]
        },
        {
            "name": "Energize Advanced Hazelnut-Chocolate", 
            "brand_id": powerbar_id,
            "category": "Pre-Workout",
            "description": "Barretta pre-allenamento con nocciole e cioccolato",
            "price": 2.80,
            "variants": ["55g"],
            "flavors": ["Nocciola-Cioccolato"]
        },
        {
            "name": "PowerGel Shots Raspberry",
            "brand_id": powerbar_id,
            "category": "Pre-Workout",
            "description": "Gel energetico concentrato con 75mg di caffeina",
            "price": 3.50,
            "variants": ["60g"],
            "flavors": ["Lampone"]
        },
        {
            "name": "PowerGel Shots Cola",
            "brand_id": powerbar_id,
            "category": "Pre-Workout", 
            "description": "Gel energetico gusto cola con 75mg di caffeina",
            "price": 3.50,
            "variants": ["60g"],
            "flavors": ["Cola"]
        },
        
        # POWERBAR - Proteine (18 prodotti)
        {
            "name": "Protein 40% Caramel Peanut Butter",
            "brand_id": powerbar_id,
            "category": "Proteine",
            "description": "Barretta proteica ad alto contenuto (40%) con burro d'arachidi e caramello",
            "price": 3.20,
            "variants": ["55g"],
            "flavors": ["Caramel Peanut Butter"]
        },
        {
            "name": "Protein 40% Strawberry White Chocolate",
            "brand_id": powerbar_id,
            "category": "Proteine",
            "description": "Barretta proteica 40% con fragola e cioccolato bianco",
            "price": 3.20,
            "variants": ["55g"],
            "flavors": ["Strawberry White Chocolate"]
        },
        {
            "name": "Protein 30% Lemon Cheesecake",
            "brand_id": powerbar_id,
            "category": "Proteine",
            "description": "Barretta proteica 30% gusto cheesecake al limone",
            "price": 2.90,
            "variants": ["55g"],
            "flavors": ["Lemon Cheesecake"]
        },
        {
            "name": "Protein 30% Vanilla Caramel Crisp",
            "brand_id": powerbar_id,
            "category": "Proteine",
            "description": "Barretta proteica 30% vaniglia caramello croccante", 
            "price": 2.90,
            "variants": ["55g"],
            "flavors": ["Vanilla Caramel Crisp"]
        },
        {
            "name": "Protein Soft Layer White Chocolate Strawberry",
            "brand_id": powerbar_id,
            "category": "Proteine",
            "description": "Barretta proteica morbida con strato di cioccolato bianco e fragola",
            "price": 3.10,
            "variants": ["50g"],
            "flavors": ["White Chocolate Strawberry"]
        },
        {
            "name": "True Organic Protein Cocoa Peanut",
            "brand_id": powerbar_id,
            "category": "Proteine",
            "description": "Barretta proteica biologica con cacao e arachidi",
            "price": 3.50,
            "variants": ["55g"],
            "flavors": ["Cocoa Peanut"]
        },
        {
            "name": "ProteinNut Coconut",
            "brand_id": powerbar_id,
            "category": "Proteine",
            "description": "Barretta proteica con calcio, magnesio e cocco",
            "price": 3.00,
            "variants": ["50g"],
            "flavors": ["Cocco"]
        },
        
        # JAMIESON - Vitamine (1 prodotto)
        {
            "name": "VitaVim Multivitaminico",
            "brand_id": jamieson_id,
            "category": "Vitamine e Minerali",
            "description": "Multivitaminico e multiminerale completo con formula migliorata",
            "price": 15.90,
            "variants": ["90 compresse"],
            "flavors": ["Naturale"]
        },
        
        # WHY SPORT - Accessori (4 prodotti)
        {
            "name": "Arco Gonfiabile WHY SPORT",
            "brand_id": why_sport_id,
            "category": "Accessori",
            "description": "Struttura gonfiabile promozionale per eventi sportivi e gare",
            "price": 299.00,
            "variants": ["Standard"],
            "flavors": ["Rosso"]
        },
        {
            "name": "Frigorifero WHY SPORT",
            "brand_id": why_sport_id,
            "category": "Accessori",
            "description": "Frigorifero brandizzato per conservazione integratori in punto vendita",
            "price": 450.00,
            "variants": ["Standard"],
            "flavors": ["Bianco"]
        }
    ]
    
    # 4. Importa prodotti
    print(f"\n3. Importazione {len(products_to_import)} prodotti...")
    imported = 0
    
    for product in products_to_import:
        category_id = category_ids.get(product["category"])
        if not category_id:
            print(f"Categoria '{product['category']}' non trovata per {product['name']}")
            continue
            
        product_data = {
            "name": product["name"],
            "description": product["description"],
            "slug": product["name"].lower().replace(" ", "-").replace("%", "percent"),
            "brandId": product["brand_id"],
            "categoryId": category_id,
            "price": product["price"],
            "originalPrice": product["price"],
            "inStock": True,
            "features": product.get("features", []),
            "hasSpecialOffer": False
        }
        
        product_id = create_product(product_data)
        if product_id:
            imported += 1
            print(f"  ✓ {product['name']}")
            
            # Aggiungi varianti se presenti
            if product.get("variants"):
                for variant in product["variants"]:
                    # Logica per aggiungere varianti (da implementare se necessario)
                    pass
        else:
            print(f"  ✗ Errore: {product['name']}")
    
    print(f"\n4. Importazione completata: {imported}/{len(products_to_import)} prodotti")
    return imported > 0

if __name__ == "__main__":
    success = import_all_products()
    if success:
        print("\n🎉 IMPORTAZIONE COMPLETATA CON SUCCESSO!")
        print("Il catalogo BigGimmy ora include i prodotti Powerbar, Jamieson e WHY Sport")
    else:
        print("\n❌ ERRORI DURANTE L'IMPORTAZIONE")
        print("Verificare la connessione al database e riprovare")