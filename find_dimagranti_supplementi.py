
#!/usr/bin/env python3
"""
Script per identificare prodotti dimagranti nella categoria Supplementi
"""

import sqlite3
import re

def find_dimagranti_products():
    """Trova prodotti dimagranti nella categoria supplementi"""
    
    # Connessione al database
    conn = sqlite3.connect('bigimmy_store.db')
    cursor = conn.cursor()
    
    # Keywords per identificare prodotti dimagranti
    dimagranti_keywords = [
        'brucia', 'burn', 'fat', 'dren', 'drenante', 'lipolitico',
        'termogenico', 'thermo', 'dimagrante', 'weight', 'slim',
        'cut', 'cutting', 'definizione', 'lean', 'cla', 'carnitina',
        'caffeina', 'te verde', 'caffè verde', 'garcinia', 'capsaicina',
        'cromo', 'picolinato', 'metabolismo', 'lipolisi'
    ]
    
    # Prima verifichiamo le categorie disponibili
    cursor.execute("SELECT id, name, slug FROM product_categories ORDER BY name")
    categories = cursor.fetchall()
    
    print("📂 CATEGORIE DISPONIBILI:")
    for cat_id, cat_name, cat_slug in categories:
        cursor.execute("SELECT COUNT(*) FROM products WHERE category_id = ?", (cat_id,))
        count = cursor.fetchone()[0]
        print(f"   {cat_name} (slug: {cat_slug}) - {count} prodotti")
    
    print("\n" + "=" * 80)
    
    # Query per ottenere tutti i prodotti della categoria supplementi
    query = """
    SELECT p.id, p.name, p.slug, p.description, p.long_description, 
           b.name as brand_name, pc.name as category_name, pc.slug as category_slug
    FROM products p
    JOIN brands b ON p.brand_id = b.id
    JOIN product_categories pc ON p.category_id = pc.id
    WHERE pc.slug = 'supplementi' OR pc.name LIKE '%supplementi%' OR pc.name LIKE '%Supplementi%'
    ORDER BY p.name
    """
    
    cursor.execute(query)
    products = cursor.fetchall()
    
    print(f"🔍 Analizzando {len(products)} prodotti nella categoria Supplementi...")
    print("=" * 80)
    
    dimagranti_found = []
    
    for product in products:
        product_id, name, slug, description, long_description, brand, category, category_slug = product
        
        # Combina tutti i testi per la ricerca
        search_text = f"{name} {description} {long_description or ''}".lower()
        
        # Verifica se contiene keywords dimagranti
        is_dimagrante = False
        found_keywords = []
        
        for keyword in dimagranti_keywords:
            if keyword.lower() in search_text:
                is_dimagrante = True
                found_keywords.append(keyword)
        
        if is_dimagrante:
            dimagranti_found.append({
                'id': product_id,
                'name': name,
                'slug': slug,
                'brand': brand,
                'description': description,
                'keywords': found_keywords
            })
            
            print(f"✅ DIMAGRANTE: {name}")
            print(f"   Brand: {brand}")
            print(f"   Keywords trovate: {', '.join(found_keywords)}")
            print(f"   Descrizione: {description[:100]}...")
            print(f"   Slug: {slug}")
            print("-" * 60)
    
    print(f"\n📊 RISULTATI:")
    print(f"   Totale prodotti supplementi: {len(products)}")
    print(f"   Prodotti dimagranti trovati: {len(dimagranti_found)}")
    if len(products) > 0:
        print(f"   Percentuale: {(len(dimagranti_found)/len(products)*100):.1f}%")
    else:
        print(f"   Percentuale: 0.0%")
    
    # Raggruppa per brand
    print(f"\n📈 DISTRIBUZIONE PER BRAND:")
    brand_counts = {}
    for product in dimagranti_found:
        brand = product['brand']
        brand_counts[brand] = brand_counts.get(brand, 0) + 1
    
    for brand, count in sorted(brand_counts.items(), key=lambda x: x[1], reverse=True):
        print(f"   {brand}: {count} prodotti")
    
    # Lista finale dei prodotti dimagranti
    print(f"\n📋 LISTA COMPLETA PRODOTTI DIMAGRANTI:")
    for i, product in enumerate(dimagranti_found, 1):
        print(f"{i:2d}. {product['name']} ({product['brand']})")
    
    conn.close()
    return dimagranti_found

if __name__ == "__main__":
    dimagranti = find_dimagranti_products()
