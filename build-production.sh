#!/bin/bash

# Build the application
echo "Building frontend..."
vite build

echo "Creating public directory structure..."
mkdir -p dist/public

echo "Moving frontend files to public directory..."
# Move all frontend files to public directory
mv dist/*.html dist/public/ 2>/dev/null || true
mv dist/assets dist/public/ 2>/dev/null || true
[ -d "dist/images" ] && mv dist/images dist/public/ 2>/dev/null || true

echo "Building server..."
esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist

echo "Build completed successfully!"
echo "Frontend files are in: dist/public/"
echo "Server file is: dist/index.js"