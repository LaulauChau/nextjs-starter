#!/bin/bash

# Comment this if you don't want to use docker for the database

# Check if docker-compose is installed
echo "Checking if docker-compose is installed..."

if ! command -v docker-compose &> /dev/null
then
    echo "docker-compose could not be found. Please install docker-compose."
    exit 1
else
    echo "Starting the database..."
    docker-compose up -d

    if [ $? -ne 0 ]; then
        echo "Database start failed. Exiting..."
        exit 1
    fi
fi

# Function to clean up the database
clean_up() {
  echo "Stopping the database..."
  docker-compose down

  if [ $? -ne 0 ]; then
    echo "Database stop failed. Exiting..."
    exit 1
  fi

  echo "Exiting..."
  exit 1
}

# Trap the SIGINT signal
trap clean_up SIGINT

# Check if the node version is at least 20
echo "Checking node version..."
NODE_VERSION=$(node -v | cut -c 2- | cut -d '.' -f 1)

if [ $NODE_VERSION -lt 20 ]; then
  echo "Node version is too low. Please upgrade to at least version 20."
  exit 1
else
  echo "Node version is sufficient."
fi

# Check if pnpm is installed
echo "Checking if pnpm is installed..."

if ! command -v pnpm &> /dev/null
then
    echo "pnpm could not be found. Installing pnpm..."
    curl -fsSL https://get.pnpm.io/install.sh | sh -

    if [ $? -ne 0 ]; then
        echo "pnpm installation failed. Exiting..."
        exit 1
    elif ! command -v pnpm &> /dev/null
    then
        echo "pnpm installation failed. Please install pnpm manually."
        exit 1
    fi
else
    echo "pnpm is installed."
fi

# Check if pnpm version is at least 9
echo "Checking pnpm version..."
PNPM_VERSION=$(pnpm -v | cut -c 1)

if [ $PNPM_VERSION -lt 9 ]; then
  echo "pnpm version is too low. Updating pnpm..."
  pnpm add -g pnpm@latest

  if [ $? -ne 0 ]; then
    echo "pnpm update failed. Exiting..."
    exit 1
  fi
else
  echo "pnpm version is sufficient."
fi

# Check if another package manager has been used
echo "Checking for lock files..."
LOCK_FILE=$(ls | grep -E "yarn.lock|package-lock.json")

if [ -n "$LOCK_FILE" ]; then
  echo "Another package manager has been used. Removing lock file..."
  rm $LOCK_FILE

  if [ $? -ne 0 ]; then
    echo "Lock file removal failed. Exiting..."
    exit 1
  fi
else
  echo "No lock files found."
fi

# Install dependencies
echo "Installing dependencies..."
pnpm install --frozen-lockfile

if [ $? -ne 0 ]; then
  echo "Dependency installation failed. Exiting..."
  exit 1
fi

# Check if .env file exists
echo "Checking for .env file..."

if [ ! -f .env ]; then
  echo ".env file not found. Creating .env file..."
  cp .env.example .env

  if [ $? -ne 0 ]; then
    echo ".env file creation failed. Exiting..."
    exit 1
  fi
else
  echo ".env file found."
fi

# Ask the user if he wants to start the app in development mode or production mode
echo "Do you want to start the app in development mode or production mode? (DEV/prod)"
read -r MODE

# Convert the user's input to lowercase for case-insensitive comparison
MODE_LOWERCASE=$(echo "$MODE" | tr '[:upper:]' '[:lower:]')

if [ "$MODE_LOWERCASE" == "prod" ]; then
  echo "Starting the app in production mode..."
  pnpm run build

  if [ $? -ne 0 ]; then
    echo "Build failed. Exiting..."
    exit 1
  fi

  pnpm start

  if [ $? -ne 0 ]; then
    echo "App start failed. Exiting..."
    exit 1
  fi
else
  echo "Starting the app in development mode..."
  pnpm dev

  if [ $? -ne 0 ]; then
    echo "App start failed. Exiting..."
    exit 1
  fi
fi