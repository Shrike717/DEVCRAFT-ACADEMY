const request = require('supertest'); // Für HTTP-Anfragen in Tests
// Wir importieren die app und start Funktionen aus unserer Hauptserverdatei.
const { app, start } = require('../../index.js');

jest.mock('@prisma/client', () => {
	const prisma = {
		user: {
			findMany: jest
				.fn()
				.mockResolvedValue([
					{ id: 1, username: 'User1', email: 'user1@example.com' },
				]),
		},
	};

	return {
		PrismaClient: jest.fn().mockImplementation(() => prisma),
	};
});

jest.mock('@prisma/client'); // Mocken des Prisma Clients

// Definieren Sie die Funktion mockGetAllUsers
const mockGetAllUsers = jest.fn();

// ********* User Tests *********

describe('User Server Tests', () => {
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

	// Vor jedem Test setzen wir alle simulierten Funktionen zurück.
	afterEach(() => {
		jest.resetAllMocks();
		// jest.clearAllMocks();
	});

	// Test GET /users Endpoint:
	describe('GET /users Endpoint Tests', () => {
		// Alle Benutzer laden:
		it('soll alle Benutzer laden', async () => {
			// Wir simulieren die Funktion aus dem Model, die alle Benutzer aus der Datenbank lädt.
			mockGetAllUsers.mockResolvedValueOnce([
				{ id: 1, username: 'User1', email: 'user1@example.com' },
			]);
			// Überprüfen Sie den Rückgabewert der gemockten Funktion.
			console.log(
				'[GET /users]mockGetAllUsers:',
				await mockGetAllUsers()
			);
			// Wir senden eine GET-Anfrage an den '/users' Endpunkt, um alle Benutzer zu laden.
			const response = await request(app).get('/users');

			// Loggen Sie die tatsächliche Antwort des Servers.
			console.log('[GET /users]response.body:', response.body);

			expect(response.status).toBe(200);
			expect(response.body).toEqual([
				{ id: 1, username: 'User1', email: 'user1@example.com' },
			]);
		});
	});
});
