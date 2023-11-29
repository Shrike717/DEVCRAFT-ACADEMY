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

	// Wir beginnen eine Testgruppe für unsere Benutzer-Endpunkte.
	// ******** User Tests ********
	test('should create a new user', async () => {
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
});
