#!/bin/bash

echo "🗄️ Setting up database for deployment..."

# Push schema changes
echo "📋 Pushing database schema..."
npm run db:push

echo "📦 Populating database with products..."

# Execute available migration scripts
echo "🏪 Running product migrations..."

# Check if migration scripts exist and run them
if [ -f "server/migrateMissingProteins.ts" ]; then
    echo "  - Running protein products migration..."
    npm run migrate:real-products
fi

echo "✅ Database setup completed!"
echo "🎯 Ready for deployment with populated database!"