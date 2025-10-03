
#!/usr/bin/env python3
import sqlite3
import os

def test_sqlite_database():
    """Testa il database SQLite creato"""
    
    db_path = "bigimmy_store.db"
    if not os.path.exists(db_path):
        print("❌ Database SQLite non trovato! Esegui prima convert_to_sqlite.py")
        return
    
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    print("🔍 Test del database SQLite")
    print("=" * 40)
    
    # Test 1: Verifica tabelle
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table'")
    tables = cursor.fetchall()
    print(f"📊 Tabelle trovate: {len(tables)}")
    for table in tables:
        print(f"   • {table[0]}")
    
    print()
    
    # Test 2: Conta records per tabella
    test_tables = ['brands', 'products', 'product_images', 'product_sizes', 'contacts']
    for table in test_tables:
        try:
            cursor.execute(f"SELECT COUNT(*) FROM {table}")
            count = cursor.fetchone()[0]
            print(f"📈 {table}: {count} records")
        except:
            print(f"⚠️  Tabella {table} non trovata")
    
    print()
    
    # Test 3: Alcuni prodotti esempio
    print("🛍️  Primi 5 prodotti:")
    cursor.execute("""
        SELECT 
            p.name as prodotto,
            b.name as brand,
            c.name as categoria
        FROM products p
        JOIN brands b ON p.brand_id = b.id
        JOIN product_categories c ON p.category_id = c.id
        LIMIT 5
    """)
    
    products = cursor.fetchall()
    for i, (nome, brand, categoria) in enumerate(products, 1):
        print(f"   {i}. {nome} ({brand} - {categoria})")
    
    conn.close()
    print("\n✅ Test completato!")

if __name__ == "__main__":
    test_sqlite_database()
