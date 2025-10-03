
#!/bin/bash

# Crea directory di backup
mkdir -p database_backups

# Data attuale per il nome del file
DATE=$(date +%Y%m%d_%H%M%S)

echo "🔄 Avvio backup database..."

# Backup completo in SQL
pg_dump $DATABASE_URL > "database_backups/full_backup_$DATE.sql"

# Export delle singole tabelle in CSV
psql $DATABASE_URL -c "\COPY products TO 'database_backups/products_$DATE.csv' CSV HEADER;"
psql $DATABASE_URL -c "\COPY brands TO 'database_backups/brands_$DATE.csv' CSV HEADER;"
psql $DATABASE_URL -c "\COPY categories TO 'database_backups/categories_$DATE.csv' CSV HEADER;"
psql $DATABASE_URL -c "\COPY product_images TO 'database_backups/product_images_$DATE.csv' CSV HEADER;"
psql $DATABASE_URL -c "\COPY product_sizes TO 'database_backups/product_sizes_$DATE.csv' CSV HEADER;"
psql $DATABASE_URL -c "\COPY product_availability TO 'database_backups/product_availability_$DATE.csv' CSV HEADER;"
psql $DATABASE_URL -c "\COPY contacts TO 'database_backups/contacts_$DATE.csv' CSV HEADER;"

echo "✅ Backup completato in database_backups/"
echo "📁 File creati:"
ls -la database_backups/ | grep $DATE
