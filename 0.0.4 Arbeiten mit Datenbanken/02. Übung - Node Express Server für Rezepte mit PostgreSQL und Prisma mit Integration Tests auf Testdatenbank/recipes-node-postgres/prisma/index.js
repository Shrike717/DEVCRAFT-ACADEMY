// ********* Dieses File brauchen wir, um die Initialisierung des Prisma Client auszulagern. *********
// Hintergrund: wir müssen den Prisma Client später mocken können

const { PrismaClient } = require('@prisma/client');

exports.prisma = new PrismaClient();
