#!/bin/bash

set -e

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
  echo "Docker is not installed. Please install Docker to run this application."
  exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
  echo "Docker Compose is not installed. Please install Docker Compose to run this application."
  exit 1
fi

# Check if Docker is running
if ! docker info &> /dev/null; then
  echo "Docker is not running. Please start Docker to run this application."
  exit 1
fi

# Ask the user if they want to start the application in development mode or production mode
echo "Do you want to start the application in development mode or production mode? (default: development)"
read -p "Enter 'dev or 'prod': " MODE

if [ "$MODE" == "prod" ]; then
  echo "Starting the application in production mode..."
  # Build prod using new BuildKit engine
  COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose -f ./docker/production/docker-compose.yaml up --build -d
else
  echo "Starting the application in development mode..."
  pnpm install --frozen-lockfile
  # Build prod using new BuildKit engine
  COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose -f ./docker/development/docker-compose.yaml up --build -d
fi