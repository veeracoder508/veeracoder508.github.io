#!/bin/bash

# Define variables for your project
PROJECT_DIR="/path/to/your/project"
VENV_DIR="/path/to/your/virtual/env" # Optional, but recommended
WSGI_APP_FILE="myproject.wsgi"
WSGI_APP_VARIABLE="application" # The variable name in your .wsgi file
HOST="127.0.0.1"
PORT="8000"

# --- Script Execution ---

# Navigate to the project directory
cd "$PROJECT_DIR" || { echo "Error: Project directory not found."; exit 1; }

# Activate the virtual environment if it exists
if [ -d "$VENV_DIR" ]; then
    echo "Activating virtual environment..."
    source "$VENV_DIR/bin/activate"
fi

# Start the Gunicorn server
echo "Starting Gunicorn server on http://$HOST:$PORT..."
gunicorn --bind "$HOST:$PORT" "$WSGI_APP_FILE:$WSGI_APP_VARIABLE"

# Deactivate the virtual environment (optional, but good practice)
if [ -d "$VENV_DIR" ]; then
    deactivate
fi

echo "Gunicorn server stopped."
