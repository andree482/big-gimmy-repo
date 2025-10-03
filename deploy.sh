#!/bin/bash

echo "🚀 Preparing for deployment..."

# Use our corrected build script
./build.sh

# Verify the structure is correct
echo "🔍 Verifying build structure..."
if [ -f "dist/public/index.html" ] && [ -d "dist/public/assets" ] && [ -f "dist/index.js" ]; then
    echo "✅ Build structure is correct!"
    echo "📍 Frontend files: dist/public/"
    echo "📍 Server file: dist/index.js"
    echo "🎯 Ready for deployment!"
else
    echo "❌ Build structure is incorrect. Please check the build process."
    exit 1
fi