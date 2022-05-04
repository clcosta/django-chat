#!/bin/sh

set -e

python manage.py collectstatic --noinput

make migrate
gunicorn --bind 0.0.0.0:8000 ws_chat.wsgi