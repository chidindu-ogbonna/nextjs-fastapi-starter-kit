#! /usr/bin/env bash
set -e
set -x

python app/setup/tests_pre_start.py

bash scripts/test.sh "$@"