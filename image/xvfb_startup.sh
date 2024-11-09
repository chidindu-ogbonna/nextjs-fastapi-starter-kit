#!/bin/bash
set -e  # Exit on error

DPI=96
RES_AND_DEPTH=${WIDTH}x${HEIGHT}x24

# Function to check if Xvfb is already running
check_xvfb_running() {
    local display_num=$(echo $DISPLAY | sed 's/://g')
    if [ -e /tmp/.X${display_num}-lock ]; then
        echo ">> Found existing Xvfb process"
        # Kill existing Xvfb process
        local existing_pid=$(cat /tmp/.X${display_num}-lock)
        echo ">> Killing existing Xvfb process (PID: $existing_pid)"
        kill $existing_pid 2>/dev/null || true
        rm -f /tmp/.X${display_num}-lock
        sleep 1  # Give it time to cleanup
        echo ">> Cleanup completed"
        return 1  # Signal that we can start a new instance
    else
        return 1  # Xvfb is not running
    fi
}

# Function to check if Xvfb is ready
wait_for_xvfb() {
    local timeout=10
    local start_time=$(date +%s)
    while ! xdpyinfo >/dev/null 2>&1; do
        if [ $(($(date +%s) - start_time)) -gt $timeout ]; then
            echo "Xvfb failed to start within $timeout seconds" >&2
            return 1
        fi
        sleep 0.1
    done
    return 0
}

# Check if Xvfb is already running
if check_xvfb_running; then
    echo ">> Xvfb is already running on display ${DISPLAY}"
    exit 0
fi

# Start Xvfb
echo ">> Starting new Xvfb instance on display ${DISPLAY}"
Xvfb $DISPLAY -ac -screen 0 $RES_AND_DEPTH -retro -dpi $DPI -nolisten tcp -nolisten unix &
XVFB_PID=$!

# Wait for Xvfb to start
if wait_for_xvfb; then
    echo ">> Xvfb started successfully on display ${DISPLAY}"
    echo ">> Xvfb PID: $XVFB_PID"
else
    echo ">> ERROR: Xvfb failed to start"
    kill $XVFB_PID
    exit 1
fi
