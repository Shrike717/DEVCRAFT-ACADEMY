// Wir importieren den PrismaClient aus dem Prisma-Client-Paket.
const { PrismaClient } = require('@prisma/client');
// Wir importieren das supertest-Paket, um HTTP-Anfragen an unseren Server zu senden.
const request = require('supertest');
// Wir importieren die app und start Funktionen aus unserer Hauptserverdatei.
const { app, start } = require('../index.js');

// Wir simulieren das '@prisma/client' Paket, um die Datenbankoperationen in unseren Tests zu kontrollieren.
jest.mock('@prisma/client');

// Wir beginnen eine Testgruppe für unseren Express-Server.
describe('Express Server Tests', () => {
	let server; // Wir definieren eine Variable für unseren Server.
	const port = 3001; // Wir definieren den Port, auf dem unser Server läuft.

	// Bevor alle Tests ausgeführt werden, starten wir unseren Server auf dem definierten Port.
	beforeAll(() => {
		server = start(port);
	});

	// Nachdem alle Tests ausgeführt wurden, schließen wir unseren Server.
	afterAll((done) => {
		server.close(done);
	});

	// Vor jedem Test setzen wir alle simulierten Funktionen zurück.
	beforeEach(() => {
		jest.resetAllMocks();
	});

	// ******** User Tests ********

	// POST /users Endpoint Tests:

	describe('POST /users Endpoint Tests', () => {
		// Anlegen eines neuen Benutzers:
		test('sollte einen neuen Benutzer anlegen', async () => {
			// Wir senden eine POST-Anfrage an den '/users' Endpunkt, um einen neuen Benutzer zu erstellen.
			const res = await request(app).post('/users').send({
				username: 'Testuser',
				email: 'testuser@example.com',
			});

			// Wenn der Statuscode 409 ist, erwarten wir, dass die Fehlermeldung korrekt ist.
			if (res.statusCode === 409) {
				expect(res.body.message).toEqual(
					'Es existiert bereits ein Benutzer mit dieser E-Mail oder diesem Benutzernamen'
				);
			} else {
				// Wenn der Statuscode 201 ist, erwarten wir, dass der Benutzername und die E-Mail des neuen Benutzers korrekt sind.
				expect(res.statusCode).toEqual(201);
				expect(res.body.newUser.username).toEqual('Testuser');
				expect(res.body.newUser.email).toEqual('testuser@example.com');
			}
		});

		// Anlegen eines neuen Benutzers mit fehlenden Feldern:
		test('sollte einen Fehler zurückgeben, wenn Felder fehlen', async () => {
			// Wir senden eine POST-Anfrage an den '/users' Endpunkt, um einen neuen Benutzer zu erstellen.
			const res = await request(app).post('/users').send({
				username: 'Testuser',
			});

			// Wir erwarten, dass der Statuscode 400 ist und die Fehlermeldung korrekt ist.
			expect(res.statusCode).toEqual(400);
			expect(res.body.message).toEqual('Bitte alle Felder ausfüllen');
		});

		// Anlegen eines neuen Benutzers mit bereits existierendem Benutzernamen:
		test('sollte einen Fehler zurückgeben, wenn der Benutzername bereits existiert', async () => {
			// Wir senden eine POST-Anfrage an den '/users' Endpunkt, um einen neuen Benutzer zu erstellen.
			const res = await request(app).post('/users').send({
				username: 'Testuser',
				email: 'testuser@example.com',
			});

			// Wir erwarten, dass der Statuscode 409 ist und die Fehlermeldung korrekt ist.
			expect(res.statusCode).toEqual(409);
			expect(res.body.message).toEqual(
				'Es existiert bereits ein Benutzer mit dieser E-Mail oder diesem Benutzernamen'
			);
		});
	});

	// GET /users Endpoint Tests:

	describe('GET /users Endpoint Tests', () => {
		// Abrufen aller Benutzer:
		test('sollte alle Benutzer zurückgeben', async () => {
			// Wir senden eine GET-Anfrage an den '/users' Endpunkt, um alle Benutzer abzurufen.
			const res = await request(app).get('/users');

			// Wir erwarten, dass der Statuscode 200 ist und die Benutzer korrekt sind.
			expect(res.statusCode).toEqual(200);
			expect(res.body).toEqual([
				{
					id: 1,
					username: 'Testuser',
					email: 'testuser@example.com',
				},
			]);
		});
	});
});
