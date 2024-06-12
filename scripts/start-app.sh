#!/bin/bash

set -e

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
  echo "Node.js is not installed. Please install Node.js to run this application."
  exit 1
fi

# Check if Node.js version is at least 20.14.0
NODE_MAJOR_VERSION=$(node -v | cut -d. -f1 | sed 's/[^0-9]*//g')
NODE_MINOR_VERSION=$(node -v | cut -d. -f2 | sed 's/[^0-9]*//g')

if [ $NODE_MAJOR_VERSION -lt 20 ] || [ $NODE_MINOR_VERSION -lt 14 ]; then
  echo "Node.js version is too low. Please upgrade to at least version 20.14.0."
  exit 1
fi

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
  echo "pnpm is not installed. Installing pnpm..."
  curl -fsSL https://get.pnpm.io/install.sh | sh -

  if ! command -v pnpm &> /dev/null; then
    echo "pnpm installation failed. Please install pnpm manually."
    exit 1
  fi

  # Source the .bashrc or .zshrc file to add pnpm to the PATH
  if [ -f ~/.bashrc ]; then
    source ~/.bashrc
  elif [ -f ~/.zshrc ]; then
    source ~/.zshrc
  fi
fi

# Check if pnpm version is at least 9.3.0
PNPM_MAJOR_VERSION=$(pnpm -v | cut -d. -f1 | sed 's/[^0-9]*//g')
PNPM_MINOR_VERSION=$(pnpm -v | cut -d. -f2 | sed 's/[^0-9]*//g')

if [ $PNPM_MAJOR_VERSION -lt 9 ] || [ $PNPM_MINOR_VERSION -lt 3 ]; then
  echo "pnpm version is too low. Updating pnpm..."
  pnpm add -g pnpm@latest

  if [ $? -ne 0 ]; then
    echo "pnpm update failed. Exiting..."
    exit 1
  fi
fi

# Check if another package manager has been used
LOCKFILES=(bun.lockb package-lock.json yarn.lock)

for LOCKFILE in ${LOCKFILES[@]}; do
  if [ -f $LOCKFILE ]; then
    echo "Lock file $LOCKFILE found. Please use pnpm as the package manager for this application."
    rm -rf $LOCKFILE node_modules
  fi
done

# Check if .env file exists
if [ ! -f .env ]; then
  echo ".env file not found. Creating .env file..."
  cp .env.example .env

  if [ $? -ne 0 ]; then
    echo ".env file creation failed. Exiting..."
    exit 1
  fi
fi

# Install dependencies
pnpm install --frozen-lockfile

# Ask the user if they want to start the application in development mode or production mode
echo "Do you want to start the application in development mode or production mode? (default: development)"
read -p "Enter 'dev or 'prod': " MODE

if [ "$MODE" == "prod" ]; then
  echo "Starting the application in production mode..."
  pnpm run build
  pnpm run start
else
  echo "Starting the application in development mode..."
  pnpm run dev
fi