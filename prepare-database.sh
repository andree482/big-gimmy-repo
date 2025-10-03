#!/bin/bash

echo "🗄️ Preparing database for deployment..."

# Force push database schema without manual prompts
echo "📋 Syncing database schema (automatic)..."
echo "+ username create column" | npm run db:push --force

# Check if we have products in database
echo "🔍 Checking database contents..."
PRODUCT_COUNT=$(node -e "
const { db } = require('./dist/db.js');
const { products } = require('./dist/shared/schema.js');
db.select().from(products).then(result => {
  console.log(result.length);
  process.exit(0);
}).catch(() => {
  console.log(0);
  process.exit(0);
});
")

echo "📊 Current products in database: $PRODUCT_COUNT"

if [ "$PRODUCT_COUNT" -eq "0" ]; then
  echo "📦 Database is empty, populating with products..."
  npm run migrate:real-products
else
  echo "✅ Database already contains products"
fi

echo "🎯 Database ready for deployment!"