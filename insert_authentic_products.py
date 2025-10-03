#!/usr/bin/env python3
"""
Inserisce prodotti autentici basati su immagini reali analizzate
Solo prodotti con evidenza fotografica dalle 1370+ immagini
"""

import psycopg2
import os
from urllib.parse import urlparse

def get_db_connection():
    """Connessione al database PostgreSQL"""
    db_url = os.environ.get('DATABASE_URL')
    if not db_url:
        raise Exception("DATABASE_URL non trovata")
    
    return psycopg2.connect(db_url)

def get_brand_id(cursor, brand_name):
    """Ottieni ID brand esistente"""
    cursor.execute("SELECT id FROM brands WHERE name = %s", (brand_name,))
    result = cursor.fetchone()
    return result[0] if result else None

def get_category_id(cursor, category_name):
    """Ottieni ID categoria esistente"""
    cursor.execute("SELECT id FROM product_categories WHERE name = %s", (category_name,))
    result = cursor.fetchone()
    return result[0] if result else None

def insert_authentic_volchem_products():
    """Inserisce prodotti Volchem basati su immagini autentiche analizzate"""
    
    # Prodotti con evidenza fotografica diretta dalle immagini
    authentic_products = [
        # Whey Protein 90 - Varianti identificate dalle immagini
        ("Whey Protein 90 Banana 750g", "whey-protein-90-banana-750g", 
         "Proteine isolate del siero, gusto banana, formato 750g", "Volchem", "Proteine"),
        ("Whey Protein 90 Fragola 750g", "whey-protein-90-fragola-750g", 
         "Proteine isolate del siero, gusto fragola, formato 750g", "Volchem", "Proteine"),
        ("Whey Protein 90 Natural 750g", "whey-protein-90-natural-750g", 
         "Proteine isolate del siero, gusto naturale, formato 750g", "Volchem", "Proteine"),
        ("Whey Protein 90 Vaniglia 750g", "whey-protein-90-vaniglia-750g", 
         "Proteine isolate del siero, gusto vaniglia, formato 750g", "Volchem", "Proteine"),
        ("Whey Protein 90 Crema Nocciola 750g", "whey-protein-90-crema-nocciola-750g", 
         "Proteine isolate del siero, gusto crema nocciola, formato 750g", "Volchem", "Proteine"),
        ("Whey Protein 90 Fior di Latte 750g", "whey-protein-90-fior-di-latte-750g", 
         "Proteine isolate del siero, gusto fior di latte, formato 750g", "Volchem", "Proteine"),
        
        # Whey Protein 80 - Dalle immagini identificate
        ("Whey Protein 80 Cacao 750g", "whey-protein-80-cacao-750g", 
         "Proteine concentrate del siero, gusto cacao, formato 750g", "Volchem", "Proteine"),
        ("Whey Protein 80 Banana 750g", "whey-protein-80-banana-750g", 
         "Proteine concentrate del siero, gusto banana, formato 750g", "Volchem", "Proteine"),
        ("Whey Protein 80 Cappuccino 750g", "whey-protein-80-cappuccino-750g", 
         "Proteine concentrate del siero, gusto cappuccino, formato 750g", "Volchem", "Proteine"),
        ("Whey Protein 80 Nocciola 250g", "whey-protein-80-nocciola-250g", 
         "Proteine concentrate del siero, gusto nocciola, formato 250g", "Volchem", "Proteine"),
        ("Whey Protein 80 Cocco 750g", "whey-protein-80-cocco-750g", 
         "Proteine concentrate del siero, gusto cocco, formato 750g", "Volchem", "Proteine"),
        ("Whey Protein 80 Vaniglia 750g", "whey-protein-80-vaniglia-750g", 
         "Proteine concentrate del siero, gusto vaniglia, formato 750g", "Volchem", "Proteine"),
        ("Whey Protein 80 Cacao Menta 750g", "whey-protein-80-cacao-menta-750g", 
         "Proteine concentrate del siero, gusto cacao menta, formato 750g", "Volchem", "Proteine"),
        
        # Whey Protein Pocket - Identificate nelle immagini
        ("Whey Protein 90 Pocket Cacao 30g", "whey-protein-90-pocket-cacao-30g", 
         "Proteine isolate in formato pocket, gusto cacao, 30g", "Volchem", "Proteine"),
        ("Whey Protein 90 Pocket Vaniglia 30g", "whey-protein-90-pocket-vaniglia-30g", 
         "Proteine isolate in formato pocket, gusto vaniglia, 30g", "Volchem", "Proteine"),
        
        # Aminoacidi - Basati su immagini reali
        ("Aminotool EAA Lemon-Lime 252g", "aminotool-eaa-lemon-lime-252g", 
         "Aminoacidi essenziali, gusto limone-lime, formato 252g", "Volchem", "Aminoacidi"),
        ("Aminotool EAA Orange 252g", "aminotool-eaa-orange-252g", 
         "Aminoacidi essenziali, gusto arancia, formato 252g", "Volchem", "Aminoacidi"),
        ("Aminotool Aminoacidi Essenziali 120 cpr", "aminotool-aminoacidi-essenziali-120-cpr", 
         "Aminoacidi essenziali in compresse, 120 cpr", "Volchem", "Aminoacidi"),
        ("Aminotool 300 cpr", "aminotool-300-cpr", 
         "Pool aminoacidico completo, 300 compresse", "Volchem", "Aminoacidi"),
        
        # Vitamine - Dalle immagini autentiche
        ("Ascocid 1000 Vitamina C 60 cpr", "ascocid-1000-vitamina-c-60-cpr", 
         "Vitamina C 1000mg, 60 compresse", "Volchem", "Vitamine e Minerali"),
        ("Ascocid Vitamina C Lemon 300g", "ascocid-vitamina-c-lemon-300g", 
         "Vitamina C in polvere, gusto limone, 300g", "Volchem", "Vitamine e Minerali"),
        ("Ascocid Vitamina C Natural 300g", "ascocid-vitamina-c-natural-300g", 
         "Vitamina C in polvere, gusto naturale, 300g", "Volchem", "Vitamine e Minerali"),
        
        # Barrette - Evidenza fotografica
        ("Barrettone 2.0 Cacao 70g", "barrettone-2-cacao-70g", 
         "Barretta proteica al cacao, 70g", "Volchem", "Barrette Energetiche"),
        ("Barrettone 2.0 Vaniglia 70g", "barrettone-2-vaniglia-70g", 
         "Barretta proteica alla vaniglia, 70g", "Volchem", "Barrette Energetiche"),
        ("Barrettone 2.0 Burro di Arachidi 70g", "barrettone-2-burro-arachidi-70g", 
         "Barretta proteica al burro di arachidi, 70g", "Volchem", "Barrette Energetiche"),
        ("Big Bar Cookie Nocciola 80g", "big-bar-cookie-nocciola-80g", 
         "Barretta proteica cookie nocciola, 80g", "Volchem", "Barrette Energetiche"),
        ("Big Bar Cocco 30g", "big-bar-cocco-30g", 
         "Barretta proteica al cocco, 30g", "Volchem", "Barrette Energetiche"),
        ("Low Sugar Bar Brownie 50g", "low-sugar-bar-brownie-50g", 
         "Barretta proteica low sugar brownie, 50g", "Volchem", "Barrette Energetiche"),
        ("Low Sugar Bar Cookie Cream 50g", "low-sugar-bar-cookie-cream-50g", 
         "Barretta proteica low sugar cookie cream, 50g", "Volchem", "Barrette Energetiche"),
        ("Light Protein Bar Caramello 50g", "light-protein-bar-caramello-50g", 
         "Barretta proteica light al caramello, 50g", "Volchem", "Barrette Energetiche"),
        ("Light Protein Bar Cheesecake 50g", "light-protein-bar-cheesecake-50g", 
         "Barretta proteica light cheesecake, 50g", "Volchem", "Barrette Energetiche"),
        
        # Carboidrati - Dalle immagini
        ("Carbo Energy+ Agrumi", "carbo-energy-agrumi", 
         "Barretta energetica agli agrumi", "Volchem", "Carboidrati"),
        ("Carbo Energy+ Frutti di Bosco", "carbo-energy-frutti-bosco", 
         "Barretta energetica ai frutti di bosco", "Volchem", "Carboidrati"),
        ("Carbo Energy+ Mela Verde", "carbo-energy-mela-verde", 
         "Barretta energetica alla mela verde", "Volchem", "Carboidrati"),
        ("Carbo Energy+ Albicocca", "carbo-energy-albicocca", 
         "Barretta energetica all'albicocca", "Volchem", "Carboidrati"),
        ("Liquid Carbo+ FLASH80 Frutti di Bosco", "liquid-carbo-flash80-frutti-bosco", 
         "Carboidrati liquidi ai frutti di bosco", "Volchem", "Carboidrati"),
        ("Liquid Carbo Arancia", "liquid-carbo-arancia", 
         "Carboidrati liquidi all'arancia", "Volchem", "Carboidrati"),
        
        # Mass Gainer - Evidenza fotografica
        ("Mass Formula MCT Gainer Cacao", "mass-formula-mct-gainer-cacao", 
         "Mass gainer con MCT, gusto cacao", "Volchem", "Mass Gainer"),
        ("Mass Formula MCT Gainer Nocciola", "mass-formula-mct-gainer-nocciola", 
         "Mass gainer con MCT, gusto nocciola", "Volchem", "Mass Gainer"),
        
        # Creatina - Dalle immagini
        ("Creatina Extra Gold 100g", "creatina-extra-gold-100g", 
         "Creatina monoidrato micronizzata, 100g", "Volchem", "Creatina"),
        ("Creatina Extra Gold 350g", "creatina-extra-gold-350g", 
         "Creatina monoidrato micronizzata, 350g", "Volchem", "Creatina"),
        ("Creatina Compresse Extra Gold", "creatina-compresse-extra-gold", 
         "Creatina monoidrato in compresse", "Volchem", "Creatina"),
        ("Creanized Creatina Monoidrato", "creanized-creatina-monoidrato", 
         "Creatina monoidrato pura", "Volchem", "Creatina"),
        
        # Brucia Grassi - Dalle immagini
        ("Burn Out Lampone 500ml", "burn-out-lampone-500ml", 
         "Brucia grassi liquido gusto lampone, 500ml", "Volchem", "Brucia Grassi"),
        ("Burn Out Limone 500ml", "burn-out-limone-500ml", 
         "Brucia grassi liquido gusto limone, 500ml", "Volchem", "Brucia Grassi"),
        ("Dretox 450ml", "dretox-450ml", 
         "Detox drenante, 450ml", "Volchem", "Brucia Grassi"),
        
        # Energy Pump - Pre-workout identificato
        ("Energy Pump Limone", "energy-pump-limone-volchem", 
         "Pre-workout energizzante gusto limone", "Volchem", "Pre-Workout"),
        
        # Fluid Cramp - Dalle immagini
        ("Fluid Cramp Arancia", "fluid-cramp-arancia", 
         "Anti-crampi all'arancia", "Volchem", "Vitamine e Minerali"),
        
        # Electrolyte - Dalle immagini
        ("Electrolyte Arancia", "electrolyte-arancia-volchem", 
         "Elettroliti gusto arancia", "Volchem", "Vitamine e Minerali"),
        ("Electrolyte Limone", "electrolyte-limone-volchem", 
         "Elettroliti gusto limone", "Volchem", "Vitamine e Minerali"),
        
        # Altri prodotti identificati
        ("Ferro Ribes", "ferro-ribes", 
         "Integratore di ferro gusto ribes", "Volchem", "Vitamine e Minerali"),
        ("Fruitforce Ananas", "fruitforce-ananas", 
         "Bevanda energetica all'ananas", "Volchem", "Carboidrati"),
        ("Fruitforce Fragola", "fruitforce-fragola", 
         "Bevanda energetica alla fragola", "Volchem", "Carboidrati"),
        ("D-Ribosio", "d-ribosio", 
         "D-Ribosio puro per energia cellulare", "Volchem", "Carboidrati"),
        ("Collagene", "collagene-volchem", 
         "Collagene idrolizzato", "Volchem", "Vitamine e Minerali"),
        ("Comfort Vision", "comfort-vision", 
         "Integratore per la vista", "Volchem", "Vitamine e Minerali"),
        ("Enziplus Capsule", "enziplus-capsule", 
         "Enzimi digestivi in capsule", "Volchem", "Vitamine e Minerali"),
        ("Bromelina", "bromelina-volchem", 
         "Enzima bromelina da ananas", "Volchem", "Vitamine e Minerali"),
        ("B Strong", "b-strong", 
         "Complesso vitamine B", "Volchem", "Vitamine e Minerali"),
        ("Berberina 60 Capsule", "berberina-60-capsule", 
         "Berberina estratto puro, 60 capsule", "Volchem", "Vitamine e Minerali"),
        ("Ashwagandha Pura", "ashwagandha-pura", 
         "Ashwagandha estratto puro", "Volchem", "Vitamine e Minerali"),
        ("Astaxantina Softgel", "astaxantina-softgel", 
         "Astaxantina in softgel", "Volchem", "Vitamine e Minerali")
    ]
    
    conn = get_db_connection()
    cursor = conn.cursor()
    
    try:
        for product_data in authentic_products:
            name, slug, description, brand_name, category_name = product_data
            
            brand_id = get_brand_id(cursor, brand_name)
            category_id = get_category_id(cursor, category_name)
            
            if not brand_id or not category_id:
                print(f"Saltato {name}: brand {brand_name} o categoria {category_name} non trovati")
                continue
            
            # Inserisci prodotto
            cursor.execute("""
                INSERT INTO products (name, slug, description, brand_id, category_id)
                VALUES (%s, %s, %s, %s, %s)
                RETURNING id
            """, (name, slug, description, brand_id, category_id))
            
            product_id = cursor.fetchone()[0]
            print(f"Inserito: {name} (ID: {product_id})")
        
        conn.commit()
        print(f"\n✅ Inseriti {len(authentic_products)} prodotti autentici Volchem")
        
    except Exception as e:
        conn.rollback()
        print(f"Errore: {e}")
    finally:
        cursor.close()
        conn.close()

if __name__ == "__main__":
    insert_authentic_volchem_products()