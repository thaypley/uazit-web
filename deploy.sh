#!/usr/bin/env bash
# deploy.sh — build uazit-web and push to Hostinger VPS
# Usage: ./deploy.sh
# Set VPS_HOST, VPS_USER, VPS_PATH in your shell env or edit below.

set -euo pipefail

VPS_HOST="${VPS_HOST:-uazit.art}"
VPS_USER="${VPS_USER:-root}"
VPS_PATH="${VPS_PATH:-/var/www/uazit-web}"
PORT="${PORT:-3000}"

echo "▶ Building..."
node node_modules/next/dist/bin/next build

echo "▶ Syncing to ${VPS_USER}@${VPS_HOST}:${VPS_PATH} ..."
rsync -avz --delete \
  --exclude=".git" \
  --exclude="node_modules" \
  --exclude=".next/cache" \
  --exclude=".env.local" \
  ./ "${VPS_USER}@${VPS_HOST}:${VPS_PATH}/"

echo "▶ Installing deps on VPS..."
ssh "${VPS_USER}@${VPS_HOST}" "cd ${VPS_PATH} && npm install --production 2>/dev/null || pnpm install --prod 2>/dev/null || true"

echo "▶ Restarting PM2..."
ssh "${VPS_USER}@${VPS_HOST}" "cd ${VPS_PATH} && pm2 restart uazit-web 2>/dev/null || pm2 start 'node node_modules/next/dist/bin/next start -p ${PORT}' --name uazit-web"

echo "✓ Deployed → https://uazit.art"
