#!/bin/bash

# Replace these with your database name and user
DATABASE_NAME="recipes_node_postgres"
DATABASE_USER="danielbauer"

# Drop the database
psql -U "$DATABASE_USER" -c "DROP DATABASE IF EXISTS $DATABASE_NAME;"

# Create the database
psql -U "$DATABASE_USER" -c "CREATE DATABASE $DATABASE_NAME;"

# Run Prisma migrations
npx prisma migrate dev --preview-feature
