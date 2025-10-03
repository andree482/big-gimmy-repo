
-- Esempi di query per il database SQLite BigImmy Store

-- 1. Tutti i prodotti con brand e categoria
SELECT 
    p.name as prodotto,
    b.name as brand,
    c.name as categoria,
    p.description
FROM products p
JOIN brands b ON p.brand_id = b.id
JOIN product_categories c ON p.category_id = c.id
LIMIT 10;

-- 2. Prodotti per categoria
SELECT 
    c.name as categoria,
    COUNT(*) as totale_prodotti
FROM products p
JOIN product_categories c ON p.category_id = c.id
GROUP BY c.name
ORDER BY totale_prodotti DESC;

-- 3. Prodotti con immagini
SELECT 
    p.name,
    pi.src as immagine,
    pi.is_primary
FROM products p
JOIN product_images pi ON p.id = pi.product_id
WHERE pi.is_primary = 1
LIMIT 10;

-- 4. Prezzi prodotti
SELECT 
    p.name,
    ps.value || ' ' || ps.unit as formato,
    ps.price / 100.0 as prezzo_euro
FROM products p
JOIN product_sizes ps ON p.id = ps.product_id
ORDER BY ps.price DESC
LIMIT 10;

-- 5. Statistiche database
SELECT 
    'Brands' as tabella, COUNT(*) as records FROM brands
UNION ALL
SELECT 'Products', COUNT(*) FROM products
UNION ALL
SELECT 'Product Images', COUNT(*) FROM product_images
UNION ALL
SELECT 'Product Sizes', COUNT(*) FROM product_sizes
UNION ALL
SELECT 'Contacts', COUNT(*) FROM contacts;
