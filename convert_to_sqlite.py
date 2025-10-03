
import sqlite3
import psycopg2
import os
from urllib.parse import urlparse
import json

def convert_postgres_to_sqlite():
    # Connessione al database PostgreSQL
    database_url = os.environ.get('DATABASE_URL')
    if not database_url:
        print("❌ DATABASE_URL non trovata")
        return
    
    # Parse dell'URL del database
    url = urlparse(database_url)
    
    pg_conn = psycopg2.connect(
        host=url.hostname,
        database=url.path[1:],  # rimuove il primo "/"
        user=url.username,
        password=url.password,
        port=url.port
    )
    
    # Connessione al database SQLite
    sqlite_conn = sqlite3.connect('bigimmy_store.db')
    sqlite_cursor = sqlite_conn.cursor()
    
    try:
        print("🔄 Creazione tabelle SQLite...")
        
        # Elimina tabelle esistenti se presenti
        tables = ['product_availability', 'product_images', 'product_sizes', 'user_favorites', 
                 'products', 'product_groups', 'product_categories', 'brands', 'stores', 'contacts', 'users']
        
        for table in tables:
            sqlite_cursor.execute(f"DROP TABLE IF EXISTS {table}")
        
        # Crea tabelle con schema completo
        sqlite_cursor.execute('''
            CREATE TABLE users (
                id INTEGER PRIMARY KEY,
                password TEXT NOT NULL,
                email TEXT NOT NULL,
                first_name TEXT,
                last_name TEXT,
                phone TEXT,
                address TEXT,
                city TEXT,
                postal_code TEXT,
                province TEXT,
                country TEXT DEFAULT 'Italia',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        sqlite_cursor.execute('''
            CREATE TABLE product_categories (
                id INTEGER PRIMARY KEY,
                name TEXT NOT NULL UNIQUE,
                slug TEXT NOT NULL UNIQUE,
                description TEXT,
                image TEXT
            )
        ''')
        
        sqlite_cursor.execute('''
            CREATE TABLE brands (
                id INTEGER PRIMARY KEY,
                name TEXT NOT NULL UNIQUE,
                slug TEXT NOT NULL UNIQUE,
                description TEXT,
                logo TEXT,
                website TEXT
            )
        ''')
        
        sqlite_cursor.execute('''
            CREATE TABLE stores (
                id INTEGER PRIMARY KEY,
                name TEXT NOT NULL,
                address TEXT NOT NULL,
                phone TEXT NOT NULL,
                email TEXT,
                hours TEXT NOT NULL,
                map_link TEXT,
                is_new BOOLEAN DEFAULT 0
            )
        ''')
        
        sqlite_cursor.execute('''
            CREATE TABLE product_groups (
                id INTEGER PRIMARY KEY,
                slug TEXT NOT NULL UNIQUE,
                name TEXT NOT NULL,
                brand_id INTEGER NOT NULL,
                category_id INTEGER NOT NULL,
                description TEXT NOT NULL,
                long_description TEXT,
                features TEXT,  -- JSON come TEXT
                how_to_use TEXT,
                warnings TEXT,
                special_offer_text TEXT,
                is_new BOOLEAN DEFAULT 0,
                is_best_seller BOOLEAN DEFAULT 0,
                has_special_offer BOOLEAN DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (brand_id) REFERENCES brands (id),
                FOREIGN KEY (category_id) REFERENCES product_categories (id)
            )
        ''')
        
        sqlite_cursor.execute('''
            CREATE TABLE products (
                id INTEGER PRIMARY KEY,
                slug TEXT NOT NULL UNIQUE,
                name TEXT NOT NULL,
                brand_id INTEGER NOT NULL,
                category_id INTEGER NOT NULL,
                description TEXT NOT NULL,
                long_description TEXT,
                features TEXT,  -- JSON come TEXT
                how_to_use TEXT,
                warnings TEXT,
                special_offer_text TEXT,
                is_new BOOLEAN DEFAULT 0,
                is_best_seller BOOLEAN DEFAULT 0,
                has_special_offer BOOLEAN DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                group_id INTEGER,
                flavor TEXT,
                size TEXT,
                quantity TEXT,
                FOREIGN KEY (brand_id) REFERENCES brands (id),
                FOREIGN KEY (category_id) REFERENCES product_categories (id),
                FOREIGN KEY (group_id) REFERENCES product_groups (id)
            )
        ''')
        
        sqlite_cursor.execute('''
            CREATE TABLE product_images (
                id INTEGER PRIMARY KEY,
                product_id INTEGER NOT NULL,
                src TEXT NOT NULL,
                alt TEXT NOT NULL,
                is_primary BOOLEAN DEFAULT 0,
                FOREIGN KEY (product_id) REFERENCES products (id)
            )
        ''')
        
        sqlite_cursor.execute('''
            CREATE TABLE product_sizes (
                id INTEGER PRIMARY KEY,
                product_id INTEGER NOT NULL,
                value TEXT NOT NULL,
                unit TEXT NOT NULL,
                price INTEGER NOT NULL,
                FOREIGN KEY (product_id) REFERENCES products (id)
            )
        ''')
        
        sqlite_cursor.execute('''
            CREATE TABLE product_availability (
                id INTEGER PRIMARY KEY,
                product_id INTEGER NOT NULL,
                store_id INTEGER NOT NULL,
                is_available BOOLEAN DEFAULT 1,
                stock_quantity INTEGER,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (product_id) REFERENCES products (id),
                FOREIGN KEY (store_id) REFERENCES stores (id)
            )
        ''')
        
        sqlite_cursor.execute('''
            CREATE TABLE contacts (
                id INTEGER PRIMARY KEY,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                phone TEXT,
                message TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        sqlite_cursor.execute('''
            CREATE TABLE user_favorites (
                id INTEGER PRIMARY KEY,
                user_id INTEGER NOT NULL,
                product_id INTEGER NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users (id),
                FOREIGN KEY (product_id) REFERENCES products (id)
            )
        ''')
        
        print("✅ Tabelle SQLite create")
        
        # Funzione per convertire JSON PostgreSQL in JSON string per SQLite
        def convert_json_field(value):
            if value is None:
                return None
            if isinstance(value, str):
                return value
            return json.dumps(value)
        
        # Migra i dati dalle tabelle PostgreSQL
        pg_cursor = pg_conn.cursor()
        
        # Migra users
        print("📥 Migrazione users...")
        pg_cursor.execute("""
            SELECT id, password, email, first_name, last_name, phone, address, 
                   city, postal_code, province, country, created_at, updated_at 
            FROM users
        """)
        users_data = pg_cursor.fetchall()
        sqlite_cursor.executemany("""
            INSERT INTO users (id, password, email, first_name, last_name, phone, 
                             address, city, postal_code, province, country, created_at, updated_at) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, users_data)
        print(f"✅ Migrati {len(users_data)} users")
        
        # Migra product_categories
        print("📥 Migrazione product_categories...")
        pg_cursor.execute("SELECT id, name, slug, description, image FROM product_categories")
        categories_data = pg_cursor.fetchall()
        sqlite_cursor.executemany("INSERT INTO product_categories (id, name, slug, description, image) VALUES (?, ?, ?, ?, ?)", categories_data)
        print(f"✅ Migrate {len(categories_data)} categorie")
        
        # Migra brands
        print("📥 Migrazione brands...")
        pg_cursor.execute("SELECT id, name, slug, description, logo, website FROM brands")
        brands_data = pg_cursor.fetchall()
        sqlite_cursor.executemany("INSERT INTO brands (id, name, slug, description, logo, website) VALUES (?, ?, ?, ?, ?, ?)", brands_data)
        print(f"✅ Migrati {len(brands_data)} brands")
        
        # Migra stores
        print("📥 Migrazione stores...")
        pg_cursor.execute("SELECT id, name, address, phone, email, hours, map_link, is_new FROM stores")
        stores_data = pg_cursor.fetchall()
        sqlite_cursor.executemany("INSERT INTO stores (id, name, address, phone, email, hours, map_link, is_new) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", stores_data)
        print(f"✅ Migrati {len(stores_data)} stores")
        
        # Migra product_groups
        print("📥 Migrazione product_groups...")
        pg_cursor.execute("""
            SELECT id, slug, name, brand_id, category_id, description, long_description, 
                   features, how_to_use, warnings, special_offer_text, is_new, is_best_seller, 
                   has_special_offer, created_at
            FROM product_groups
        """)
        groups_data = []
        for row in pg_cursor.fetchall():
            row_list = list(row)
            # Converti il campo features da JSON a stringa
            if row_list[7] is not None:  # features
                row_list[7] = convert_json_field(row_list[7])
            groups_data.append(tuple(row_list))
        
        sqlite_cursor.executemany("""
            INSERT INTO product_groups (id, slug, name, brand_id, category_id, description, 
                                      long_description, features, how_to_use, warnings, 
                                      special_offer_text, is_new, is_best_seller, has_special_offer, 
                                      created_at) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, groups_data)
        print(f"✅ Migrati {len(groups_data)} product_groups")
        
        # Migra products (con TUTTE le colonne)
        print("📥 Migrazione products...")
        pg_cursor.execute("""
            SELECT id, slug, name, brand_id, category_id, description, long_description, 
                   features, how_to_use, warnings, special_offer_text, is_new, is_best_seller, 
                   has_special_offer, created_at, group_id, flavor, size, quantity
            FROM products
        """)
        
        products_data = []
        for row in pg_cursor.fetchall():
            row_list = list(row)
            # Converti il campo features da JSON a stringa
            if row_list[7] is not None:  # features
                row_list[7] = convert_json_field(row_list[7])
            products_data.append(tuple(row_list))
        
        sqlite_cursor.executemany("""
            INSERT INTO products (id, slug, name, brand_id, category_id, description, 
                                long_description, features, how_to_use, warnings, 
                                special_offer_text, is_new, is_best_seller, has_special_offer, 
                                created_at, group_id, flavor, size, quantity) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, products_data)
        print(f"✅ Migrati {len(products_data)} prodotti")
        
        # Migra product_images
        print("📥 Migrazione product_images...")
        pg_cursor.execute("SELECT id, product_id, src, alt, is_primary FROM product_images")
        images_data = pg_cursor.fetchall()
        sqlite_cursor.executemany("INSERT INTO product_images (id, product_id, src, alt, is_primary) VALUES (?, ?, ?, ?, ?)", images_data)
        print(f"✅ Migrate {len(images_data)} immagini")
        
        # Migra product_sizes
        print("📥 Migrazione product_sizes...")
        pg_cursor.execute("SELECT id, product_id, value, unit, price FROM product_sizes")
        sizes_data = pg_cursor.fetchall()
        sqlite_cursor.executemany("INSERT INTO product_sizes (id, product_id, value, unit, price) VALUES (?, ?, ?, ?, ?)", sizes_data)
        print(f"✅ Migrate {len(sizes_data)} varianti prezzo")
        
        # Migra product_availability
        print("📥 Migrazione product_availability...")
        pg_cursor.execute("SELECT id, product_id, store_id, is_available, stock_quantity, updated_at FROM product_availability")
        availability_data = pg_cursor.fetchall()
        sqlite_cursor.executemany("INSERT INTO product_availability (id, product_id, store_id, is_available, stock_quantity, updated_at) VALUES (?, ?, ?, ?, ?, ?)", availability_data)
        print(f"✅ Migrata {len(availability_data)} disponibilità")
        
        # Migra contacts
        print("📥 Migrazione contacts...")
        pg_cursor.execute("SELECT id, name, email, phone, message, created_at FROM contacts")
        contacts_data = pg_cursor.fetchall()
        sqlite_cursor.executemany("INSERT INTO contacts (id, name, email, phone, message, created_at) VALUES (?, ?, ?, ?, ?, ?)", contacts_data)
        print(f"✅ Migrati {len(contacts_data)} contatti")
        
        # Migra user_favorites
        print("📥 Migrazione user_favorites...")
        pg_cursor.execute("SELECT id, user_id, product_id, created_at FROM user_favorites")
        favorites_data = pg_cursor.fetchall()
        sqlite_cursor.executemany("INSERT INTO user_favorites (id, user_id, product_id, created_at) VALUES (?, ?, ?, ?)", favorites_data)
        print(f"✅ Migrati {len(favorites_data)} preferiti")
        
        sqlite_conn.commit()
        print("\n🎉 Migrazione completata con successo!")
        print("📂 Database SQLite salvato come: bigimmy_store.db")
        
        # Stampa statistiche finali
        sqlite_cursor.execute("SELECT COUNT(*) FROM products")
        total_products = sqlite_cursor.fetchone()[0]
        
        sqlite_cursor.execute("SELECT COUNT(*) FROM products WHERE features IS NOT NULL")
        products_with_features = sqlite_cursor.fetchone()[0]
        
        sqlite_cursor.execute("SELECT COUNT(*) FROM products WHERE long_description IS NOT NULL")
        products_with_long_desc = sqlite_cursor.fetchone()[0]
        
        print(f"\n📊 Statistiche finali:")
        print(f"• Totale prodotti: {total_products}")
        print(f"• Prodotti con features: {products_with_features}")
        print(f"• Prodotti con descrizione lunga: {products_with_long_desc}")
        
    except Exception as e:
        print(f"❌ Errore durante la migrazione: {e}")
        sqlite_conn.rollback()
    finally:
        pg_conn.close()
        sqlite_conn.close()

if __name__ == "__main__":
    convert_postgres_to_sqlite()
