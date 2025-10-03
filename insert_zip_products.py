#!/usr/bin/env python3
"""
Inserimento automatico dei 28 prodotti dai ZIP nel database BigGimmy
"""

import requests
import json

API_BASE = "http://localhost:5000/api"

def insert_zip_products():
    """Inserisce tutti i 28 prodotti dai ZIP nel database"""
    
    # 1. Verifica brand esistenti
    brands = get_or_create_brands()
    categories = get_categories()
    
    # 2. Prodotti Powerbar da inserire
    powerbar_products = [
        # PROTEINE (7 prodotti)
        {
            "name": "Powerbar Protein Plus Chocolate",
            "slug": "powerbar-protein-plus-chocolate",
            "brand": "Powerbar",
            "category": "Proteine",
            "description": "Barretta proteica con 30g di proteine per porzione",
            "features": ["30g proteine", "Gusto cioccolato", "Formato pratico"],
            "sizes": [{"value": "55", "unit": "g", "price": 390}],
            "image": "21484602_singolo.png"
        },
        {
            "name": "Powerbar Whey Isolate Vanilla",
            "slug": "powerbar-whey-isolate-vanilla",
            "brand": "Powerbar",
            "category": "Proteine",
            "description": "Proteine isolate del siero ad alta purezza",
            "features": ["Isolate del siero", "90% proteine", "Gusto vaniglia"],
            "sizes": [{"value": "750", "unit": "g", "price": 4590}],
            "image": "21480202_box.png"
        },
        {
            "name": "Powerbar Protein Plus Vanilla",
            "slug": "powerbar-protein-plus-vanilla",
            "brand": "Powerbar",
            "category": "Proteine",
            "description": "Barretta proteica gusto vaniglia",
            "features": ["30g proteine", "Gusto vaniglia", "Senza glutine"],
            "sizes": [{"value": "55", "unit": "g", "price": 390}],
            "image": "21482402_singolo.png"
        },
        {
            "name": "Powerbar Whey Protein Strawberry",
            "slug": "powerbar-whey-protein-strawberry",
            "brand": "Powerbar",
            "category": "Proteine",
            "description": "Proteine del siero gusto fragola",
            "features": ["Proteine del siero", "Gusto fragola", "Facile dissoluzione"],
            "sizes": [{"value": "500", "unit": "g", "price": 3290}],
            "image": "21489401_box.png"
        },
        {
            "name": "Powerbar Recovery Protein Chocolate",
            "slug": "powerbar-recovery-protein-chocolate",
            "brand": "Powerbar",
            "category": "Proteine",
            "description": "Proteine per il recupero post-allenamento",
            "features": ["Recupero muscolare", "Gusto cioccolato", "Con carboidrati"],
            "sizes": [{"value": "600", "unit": "g", "price": 3890}],
            "image": "24712303_singolo.png"
        },
        {
            "name": "Powerbar Protein Max Cookies",
            "slug": "powerbar-protein-max-cookies",
            "brand": "Powerbar",
            "category": "Proteine",
            "description": "Proteine concentrate gusto biscotti",
            "features": ["Alta concentrazione", "Gusto biscotti", "Blend proteico"],
            "sizes": [{"value": "750", "unit": "g", "price": 4290}],
            "image": "24717502_singolo.png"
        },
        {
            "name": "Powerbar Whey Isolate Pro Banana",
            "slug": "powerbar-whey-isolate-pro-banana",
            "brand": "Powerbar",
            "category": "Proteine",
            "description": "Isolate del siero professionale gusto banana",
            "features": ["Formula Pro", "Gusto banana", "95% proteine"],
            "sizes": [{"value": "1", "unit": "kg", "price": 5890}],
            "image": "24763146_box.png"
        },
        
        # BARRETTE ENERGETICHE (3 prodotti)
        {
            "name": "Powerbar Energize Berry",
            "slug": "powerbar-energize-berry",
            "brand": "Powerbar",
            "category": "Barrette Energetiche",
            "description": "Barretta energetica ai frutti di bosco",
            "features": ["Energia immediata", "Frutti di bosco", "C2MAX formula"],
            "sizes": [{"value": "55", "unit": "g", "price": 290}],
            "image": "21013001_box.png"
        },
        {
            "name": "Powerbar Performance Chocolate",
            "slug": "powerbar-performance-chocolate",
            "brand": "Powerbar",
            "category": "Barrette Energetiche",
            "description": "Barretta performance al cioccolato",
            "features": ["Performance formula", "Gusto cioccolato", "Energia duratura"],
            "sizes": [{"value": "65", "unit": "g", "price": 320}],
            "image": "21033001_singolo.png"
        },
        {
            "name": "Powerbar Natural Energy Banana",
            "slug": "powerbar-natural-energy-banana",
            "brand": "Powerbar",
            "category": "Barrette Energetiche",
            "description": "Barretta naturale alla banana",
            "features": ["Ingredienti naturali", "Gusto banana", "Vegana"],
            "sizes": [{"value": "40", "unit": "g", "price": 250}],
            "image": "21012001_singolo.png"
        },
        
        # VITAMINE E MINERALI (4 prodotti)
        {
            "name": "Powerbar Electrolytes Lemon",
            "slug": "powerbar-electrolytes-lemon",
            "brand": "Powerbar",
            "category": "Vitamine e Minerali",
            "description": "Elettroliti in compresse gusto limone",
            "features": ["5 elettroliti", "Gusto limone", "Idratazione ottimale"],
            "sizes": [{"value": "10", "unit": "tabs", "price": 890}],
            "image": "22010800_singolo.png"
        },
        {
            "name": "Powerbar Magnesium",
            "slug": "powerbar-magnesium",
            "brand": "Powerbar",
            "category": "Vitamine e Minerali",
            "description": "Integratore di magnesio per sportivi",
            "features": ["Magnesio puro", "Anti-crampi", "90 capsule"],
            "sizes": [{"value": "90", "unit": "caps", "price": 1690}],
            "image": "22020100_singolo.png"
        },
        {
            "name": "Powerbar Vitamin Complex",
            "slug": "powerbar-vitamin-complex",
            "brand": "Powerbar",
            "category": "Vitamine e Minerali",
            "description": "Complesso vitaminico completo",
            "features": ["12 vitamine", "Energia cellulare", "Sistema immunitario"],
            "sizes": [{"value": "60", "unit": "caps", "price": 1890}],
            "image": "22060000_box.png"
        },
        {
            "name": "Powerbar Zinc Plus",
            "slug": "powerbar-zinc-plus",
            "brand": "Powerbar",
            "category": "Vitamine e Minerali",
            "description": "Zinco con vitamina C",
            "features": ["Zinco 15mg", "Vitamina C", "Sistema immunitario"],
            "sizes": [{"value": "100", "unit": "tabs", "price": 1590}],
            "image": "22040300_box.png"
        },
        
        # MASS GAINER (2 prodotti)
        {
            "name": "Powerbar Mass Gainer Chocolate",
            "slug": "powerbar-mass-gainer-chocolate",
            "brand": "Powerbar",
            "category": "Mass Gainer",
            "description": "Mass gainer per aumento massa muscolare",
            "features": ["50g proteine", "Gusto cioccolato", "Creatina inclusa"],
            "sizes": [{"value": "2", "unit": "kg", "price": 7890}],
            "image": "23334700_singolo.png"
        },
        {
            "name": "Powerbar Weight Gainer Vanilla",
            "slug": "powerbar-weight-gainer-vanilla",
            "brand": "Powerbar",
            "category": "Mass Gainer",
            "description": "Weight gainer gusto vaniglia",
            "features": ["45g proteine", "Gusto vaniglia", "Carboidrati complessi"],
            "sizes": [{"value": "1.5", "unit": "kg", "price": 6890}],
            "image": "23345700_singolo.png"
        },
        
        # CARBOIDRATI (2 prodotti)
        {
            "name": "Powerbar Carb Load Orange",
            "slug": "powerbar-carb-load-orange",
            "brand": "Powerbar",
            "category": "Carboidrati",
            "description": "Carboidrati per carico glicemico",
            "features": ["Maltodestrine", "Gusto arancia", "Pre-gara"],
            "sizes": [{"value": "1", "unit": "kg", "price": 2890}],
            "image": "21362042_box.png"
        },
        {
            "name": "Powerbar Energy Source",
            "slug": "powerbar-energy-source",
            "brand": "Powerbar",
            "category": "Carboidrati",
            "description": "Fonte di energia naturale",
            "features": ["Energia immediata", "Naturale", "Facile digestione"],
            "sizes": [{"value": "500", "unit": "g", "price": 1890}],
            "image": "21384100_singolo.png"
        },
        
        # PRE-WORKOUT (1 prodotto)
        {
            "name": "Powerbar Caffeine Boost Cola",
            "slug": "powerbar-caffeine-boost-cola",
            "brand": "Powerbar",
            "category": "Pre-Workout",
            "description": "Boost di caffeina pre-allenamento",
            "features": ["200mg caffeina", "Gusto cola", "Energia istantanea"],
            "sizes": [{"value": "20", "unit": "caps", "price": 1290}],
            "image": "21121001_box.png"
        }
    ]
    
    # 3. Prodotti Jamieson
    jamieson_products = [
        {
            "name": "Jamieson Vitamin D3 1000 IU",
            "slug": "jamieson-vitamin-d3-1000",
            "brand": "Jamieson",
            "category": "Vitamine e Minerali",
            "description": "Vitamina D3 1000 IU per ossa e sistema immunitario",
            "features": ["1000 IU", "Ossa forti", "Sistema immunitario"],
            "sizes": [{"value": "120", "unit": "caps", "price": 1590}],
            "image": "12450712_box.png"
        },
        {
            "name": "Jamieson Omega 3",
            "slug": "jamieson-omega-3",
            "brand": "Jamieson",
            "category": "Vitamine e Minerali",
            "description": "Omega 3 da olio di pesce puro",
            "features": ["EPA/DHA", "Cuore sano", "Olio di pesce"],
            "sizes": [{"value": "120", "unit": "caps", "price": 2290}],
            "image": "128365_singolo.png"
        },
        {
            "name": "Jamieson B-Complex",
            "slug": "jamieson-b-complex",
            "brand": "Jamieson",
            "category": "Vitamine e Minerali",
            "description": "Complesso vitamine B per energia",
            "features": ["8 vitamine B", "Energia naturale", "Metabolismo"],
            "sizes": [{"value": "90", "unit": "tabs", "price": 1890}],
            "image": "128370_singolo.png"
        }
    ]
    
    # 4. Prodotti WHY Sport
    why_sport_products = [
        {
            "name": "WHY Sport Protein Chocolate",
            "slug": "why-sport-protein-chocolate",
            "brand": "WHY Sport",
            "category": "Proteine",
            "description": "Proteine concentrate gusto cioccolato",
            "features": ["25g proteine", "Gusto cioccolato", "Made in Italy"],
            "sizes": [{"value": "750", "unit": "g", "price": 3890}],
            "image": "2300_singolo.png"
        },
        {
            "name": "Energy Bar Premium Mixed",
            "slug": "energy-bar-premium-mixed",
            "brand": "WHY Sport",
            "category": "Barrette Energetiche",
            "description": "Barretta energetica mix di sapori",
            "features": ["Energia duratura", "Mix sapori", "Ingredienti premium"],
            "sizes": [{"value": "45", "unit": "g", "price": 280}],
            "image": "2102_singolo.png"
        },
        {
            "name": "Amino Complex Pro Orange",
            "slug": "amino-complex-pro-orange",
            "brand": "WHY Sport",
            "category": "Aminoacidi",
            "description": "Complesso aminoacidi essenziali gusto arancia",
            "features": ["EAA completi", "Gusto arancia", "Recupero muscolare"],
            "sizes": [{"value": "300", "unit": "g", "price": 2890}],
            "image": "2215_singolo.png"
        }
    ]
    
    # Inserisci tutti i prodotti
    all_products = powerbar_products + jamieson_products + why_sport_products
    
    print(f"Inserimento di {len(all_products)} prodotti nel database BigGimmy...")
    
    inserted_count = 0
    for product in all_products:
        try:
            success = insert_single_product(product, brands, categories)
            if success:
                inserted_count += 1
                print(f"✓ Inserito: {product['name']}")
            else:
                print(f"✗ Errore: {product['name']}")
        except Exception as e:
            print(f"✗ Errore {product['name']}: {str(e)}")
    
    print(f"\nInserimento completato: {inserted_count}/{len(all_products)} prodotti")
    return inserted_count

def get_or_create_brands():
    """Ottieni o crea i brand necessari"""
    try:
        response = requests.get(f"{API_BASE}/brands")
        existing_brands = response.json() if response.ok else []
        
        brand_map = {brand['name']: brand['id'] for brand in existing_brands}
        
        # Crea brand mancanti
        required_brands = ["Powerbar", "Jamieson", "WHY Sport"]
        
        for brand_name in required_brands:
            if brand_name not in brand_map:
                brand_data = {
                    "name": brand_name,
                    "slug": brand_name.lower().replace(" ", "-"),
                    "description": f"Prodotti {brand_name} per lo sport e il benessere"
                }
                
                create_response = requests.post(f"{API_BASE}/brands", json=brand_data)
                if create_response.ok:
                    new_brand = create_response.json()
                    brand_map[brand_name] = new_brand['id']
                    print(f"✓ Creato brand: {brand_name}")
        
        return brand_map
    except:
        return {}

def get_categories():
    """Ottieni le categorie esistenti"""
    try:
        response = requests.get(f"{API_BASE}/categories")
        categories = response.json() if response.ok else []
        return {cat['name']: cat['id'] for cat in categories}
    except:
        return {}

def insert_single_product(product_data, brands, categories):
    """Inserisce un singolo prodotto completo"""
    
    # 1. Inserisci prodotto base
    product_payload = {
        "name": product_data['name'],
        "slug": product_data['slug'],
        "brandId": brands.get(product_data['brand']),
        "categoryId": categories.get(product_data['category']),
        "description": product_data['description'],
        "features": product_data['features'],
        "isNew": True,
        "isBestSeller": False
    }
    
    if not product_payload['brandId'] or not product_payload['categoryId']:
        print(f"Errore: Brand o categoria non trovati per {product_data['name']}")
        return False
    
    # Inserisci prodotto
    response = requests.post(f"{API_BASE}/products", json=product_payload)
    if not response.ok:
        print(f"Errore inserimento prodotto: {response.text}")
        return False
    
    product = response.json()
    product_id = product['id']
    
    # 2. Inserisci immagine
    image_payload = {
        "productId": product_id,
        "src": f"/images/products/{product_data['image']}",
        "alt": product_data['name'],
        "isPrimary": True
    }
    
    requests.post(f"{API_BASE}/product-images", json=image_payload)
    
    # 3. Inserisci formati/prezzi
    for size in product_data['sizes']:
        size_payload = {
            "productId": product_id,
            "value": size['value'],
            "unit": size['unit'],
            "price": size['price']
        }
        requests.post(f"{API_BASE}/product-sizes", json=size_payload)
    
    # 4. Imposta disponibilità nei negozi (ID 1=Torino, 2=Aosta)
    for store_id in [1, 2]:
        availability_payload = {
            "productId": product_id,
            "storeId": store_id,
            "isAvailable": True,
            "stockQuantity": 50 if store_id == 1 else 30
        }
        requests.post(f"{API_BASE}/product-availability", json=availability_payload)
    
    return True

if __name__ == "__main__":
    insert_zip_products()