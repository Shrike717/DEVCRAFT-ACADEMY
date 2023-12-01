// const { PrismaClient } = require('@prisma/client');
// const { execSync } = require('child_process');
// const { join } = require('path');
// const { URL } = require('url');
// const { v4 } = require('uuid');

// const generateDatabaseURL = (schema) => {
// 	if (!process.env.DATABASE_URL) {
// 		throw new Error('please provide a database url');
// 	}
// 	const url = new URL(process.env.DATABASE_URL);
// 	url.searchParams.append('schema', schema);
// 	return url.toString();
// };

// const schemaId = `test-${v4()}`;
// const prismaBinary = join(
// 	__dirname,
// 	'..',
// 	'..',
// 	'node_modules',
// 	'.bin',
// 	'prisma'
// );

// const url = generateDatabaseURL(schemaId);
// process.env.DATABASE_URL = url;
// exports.prisma = new PrismaClient({
// 	datasources: { db: { url } },
// });

// beforeEach(() => {
// 	execSync(`${prismaBinary} db push`, {
// 		env: {
// 			...process.env,
// 			DATABASE_URL: generateDatabaseURL(schemaId),
// 		},
// 	});
// });
// afterEach(async () => {
// 	await prisma.$executeRawUnsafe(
// 		`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE;`
// 	);
// 	await prisma.$disconnect();
// });

const { execSync } = require('child_process');
const { PrismaClient } = require('@prisma/client');
const { generateDatabaseURL } = require('../utils/utils');

const prismaBinary = `"${process.cwd()}/node_modules/.bin/prisma"`;
const schemaId = 'test';

const url = generateDatabaseURL(schemaId);
process.env.DATABASE_URL = url;
const prisma = new PrismaClient({
	datasources: { db: { url } },
});

beforeEach(() => {
	execSync(`${prismaBinary} db push`, {
		env: {
			...process.env,
			DATABASE_URL: generateDatabaseURL(schemaId),
		},
	});
});

afterEach(async () => {
	await prisma.$executeRawUnsafe(
		`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE;`
	);
	await prisma.$disconnect();
});

exports.prisma = prisma;
