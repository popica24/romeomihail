#!/bin/bash
set -e

echo "==> Ensuring directories exist with proper permissions..."
mkdir -p /app/staticfiles /app/media
chmod -R 755 /app/staticfiles /app/media 2>/dev/null || true

echo "==> Waiting for database..."
while ! nc -z ${DB_HOST} ${DB_PORT:-5432}; do
  sleep 0.5
done
echo "==> Database is available"

echo "==> Running migrations..."
python manage.py migrate --noinput

echo "==> Collecting static files..."
python manage.py collectstatic --noinput --clear

echo "==> Starting Gunicorn..."
exec gunicorn photos.wsgi:application \
    --bind 0.0.0.0:8000 \
    --workers ${GUNICORN_WORKERS:-4} \
    --threads ${GUNICORN_THREADS:-2} \
    --worker-class gthread \
    --worker-tmp-dir /dev/shm \
    --log-level ${LOG_LEVEL:-info} \
    --access-logfile - \
    --error-logfile - \
    --timeout 120 \
    --graceful-timeout 30 \
    --keep-alive 5