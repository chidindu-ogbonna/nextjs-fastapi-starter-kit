#!/bin/bash
set -e

# Start the virtual display and window manager
export DISPLAY=:${DISPLAY_NUM}
./xvfb_startup.sh
./tint2_startup.sh
./mutter_startup.sh
./x11vnc_startup.sh

# Start the FastAPI server
uvicorn computer_use.api:app --host 0.0.0.0 --port 8000
