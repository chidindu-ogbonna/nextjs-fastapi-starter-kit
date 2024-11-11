#! /usr/bin/env bash

set -e
set -x

# Let the DB start
python app/setup/backend_pre_start.py

# Run migrations
alembic upgrade head

# Create initial data in DB
python app/setup/initial_data.py
