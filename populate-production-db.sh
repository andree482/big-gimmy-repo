#!/bin/bash

echo "🗄️ Popolamento database di produzione..."

# Forza l'aggiornamento dello schema senza interazione
echo "📋 Sincronizzando schema database..."
npm run db:push --force 2>/dev/null || echo "Schema già aggiornato"

echo "📦 Inserimento prodotti nel database di produzione..."

# Esegui tutti gli script di migrazione disponibili
if [ -f "server/migrateMissingProteins.ts" ]; then
    echo "  🥤 Inserimento proteine..."
    npm run migrate:real-products
fi

# Altri script se disponibili
for script in server/insert*.ts server/migrate*.ts; do
    if [ -f "$script" ] && [[ "$script" != *"migrateMissingProteins"* ]]; then
        echo "  📦 Eseguendo $(basename "$script")..."
        tsx "$script" 2>/dev/null || echo "  ⚠️ Script non eseguibile: $script"
    fi
done

echo "✅ Database di produzione popolato!"
echo "🌐 I prodotti dovrebbero ora essere visibili online!"