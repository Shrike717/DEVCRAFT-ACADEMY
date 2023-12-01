#!/bin/bash

# Setzen Sie die DATABASE_URL auf die URL Ihrer Testdatenbank
export DATABASE_URL=postgresql://danielbauer:danielbauer@localhost:5432/recipes_node_postgres_test?schema=public

# Starten Sie Prisma Studio
npx prisma studio
