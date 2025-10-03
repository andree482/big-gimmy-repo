#!/bin/bash

# Production start script with correct environment
echo "🚀 Starting server in production mode..."
NODE_ENV=production node dist/index.js