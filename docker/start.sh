#!/usr/bin/env bash
set -e

php artisan config:clear
php artisan route:clear
php artisan view:clear

php artisan storage:link || true
php artisan migrate --force

php-fpm -D

nginx -g "daemon off;"
