#!/usr/bin/env bash
set -e

export PORT="${PORT:-10000}"

php artisan config:clear
php artisan route:clear
php artisan view:clear

php artisan storage:link || true
php artisan migrate --force

envsubst '${PORT}' < /etc/nginx/sites-available/default > /tmp/nginx.conf
cp /tmp/nginx.conf /etc/nginx/sites-available/default

php-fpm -D

nginx -g "daemon off;"