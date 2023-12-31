// ****** Dieser Code hat funktioniert mit der existierenden Testdatenbank. ******

// const request = require('supertest');
// const { app, start } = require('../index');
// const { prisma } = require('../prisma/index');

// // Import der User Modell Funktionen:
// const {
// 	getAllUsers,
// 	getUserById,
// 	createUser,
// 	updateUser,
// 	deleteUser,
// } = require('../models/userModel');

// describe('User Tests', () => {
// 	let server;
// 	const port = 3001;

// 	// Bevor alle Tests ausgeführt werden, starten wir unseren Server auf dem definierten Port.
// 	beforeAll(() => {
// 		server = start(port);
// 	});

// 	// Nachdem alle Tests ausgeführt wurden, schließen wir unseren Server.
// 	afterAll((done) => {
// 		server.close(done);
// 	});

// 	// Test GET /users Endpoint:
// 	describe('soll alle User laden', () => {
// 		// Wir erstellen zuerst einen Test User:
// 		beforeEach(async () => {
// 			user = await prisma.user.create({
// 				data: {
// 					id: 1,
// 					username: 'User1',
// 					email: 'user1@example.com',
// 				},
// 			});
// 		});

// 		it('soll alle User laden', async () => {
// 			// Wir senden eine GET-Anfrage an den '/users' Endpunkt, um alle Benutzer zu laden.
// 			const response = await request(app).get('/users');

// 			expect(response.status).toBe(200);
// 			expect(response.body).toEqual([
// 				{ id: 1, username: 'User1', email: 'user1@example.com' },
// 			]);
// 		});
// 	});
// });

// ******** Ende des Codes, der funktioniert hat. ********

// ********* Dieser  Code ist für die Tests mit der zufälligen Testdatenbank. *********

const request = require('supertest');
const { app, start } = require('../index');
const {
	prisma,
	schemaId,
	prismaBinary,
	generateDatabaseURL,
} = require('../prisma/index');
const { execSync } = require('child_process');

// Import der User Modell Funktionen:
const {
	getAllUsers,
	getUserById,
	createUser,
	updateUser,
	deleteUser,
} = require('../models/userModel');

describe('User Tests', () => {
	let server;
	const port = 3001;

	// Bevor alle Tests ausgeführt werden, starten wir unseren Server auf dem definierten Port.
	beforeAll(() => {
		server = start(port);
	});

	// Nachdem alle Tests ausgeführt wurden, schließen wir unseren Server.
	afterAll((done) => {
		server.close(done);
	});

	// Test GET /users Endpoint:
	describe('soll alle User laden', () => {
		// Wir erstellen zuerst einen Test User:
		beforeEach(async () => {
			execSync(`${prismaBinary} db push`, {
				env: {
					...process.env,
					DATABASE_URL: generateDatabaseURL(schemaId),
				},
			});
			user = await prisma.user.create({
				data: {
					id: 1,
					username: 'User1',
					email: 'user1@example.com',
				},
			});
		});

		afterEach(async () => {
			await prisma.$executeRawUnsafe(
				`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE;`
			);
			await prisma.$disconnect();
		});

		it('soll alle User laden', async () => {
			// Wir senden eine GET-Anfrage an den '/users' Endpunkt, um alle Benutzer zu laden.
			const response = await request(app).get('/users');

			expect(response.status).toBe(200);
			expect(response.body).toEqual([
				{ id: 1, username: 'User1', email: 'user1@example.com' },
			]);
		});
	});
});
