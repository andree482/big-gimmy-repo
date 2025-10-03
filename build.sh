#!/bin/bash

# Deployment-compatible build script
echo "🚀 Starting deployment build..."

# Build the frontend
echo "📦 Building frontend with Vite..."
vite build

# Create the required directory structure for deployment
echo "📁 Creating dist/public directory structure..."
mkdir -p dist/public

# Move frontend build files to the expected location
echo "📂 Moving frontend files to dist/public/..."
if [ -f "dist/index.html" ]; then
    mv dist/index.html dist/public/
fi

if [ -d "dist/assets" ]; then
    mv dist/assets dist/public/
fi

# Copy any other static files
if [ -d "dist/images" ]; then
    mv dist/images dist/public/
fi

echo "📋 Copying files to server/public for deployment compatibility..."
# Remove old symlink if exists
rm -rf server/public
# Copy files to where server expects them
cp -r dist/public server/public

# Build the server
echo "🔧 Building server..."
esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist

echo "📊 Popolamento database per deployment..."
# Popola database di produzione con tutti i prodotti
./populate-production-db.sh

echo "✅ Build completed successfully!"
echo "📍 Frontend files location: dist/public/"
echo "📍 Server file location: dist/index.js"
echo "🎯 Ready for deployment!"