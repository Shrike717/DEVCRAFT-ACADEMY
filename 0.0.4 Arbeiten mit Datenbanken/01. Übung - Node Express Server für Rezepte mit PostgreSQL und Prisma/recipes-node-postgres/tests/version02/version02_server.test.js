const request = require('supertest');
// Wir importieren die app und start Funktionen aus unserer Hauptserverdatei.
const { app, start } = require('../../index.js');

const {
	getAllUsers,
	getUserById,
	createUser,
	updateUser,
	deleteUser,
} = require('../../controllers/userController.js');

// Mock the userModel module
jest.mock('../../models/userModel', () => {
	return {
		getAllUsers: jest.fn(),
		getUserById: jest.fn(),
		createUser: jest.fn(),
		updateUser: jest.fn(),
		deleteUser: jest.fn(),
		prisma: {
			user: {
				findMany: jest.fn(),
				findFirst: jest.fn(),
				create: jest.fn(),
				update: jest.fn(),
				delete: jest.fn(),
			},
		},
	};
});

// Wir simulieren das '@prisma/client' Paket, um die Datenbankoperationen in unseren Tests zu kontrollieren.
const { getAllUsers: mockGetAllUsers } = require('../../models/userModel.js');

// Wir definieren unsere Routen.
app.get('/users', getAllUsers);
app.get('/users/:userId', getUserById);
app.post('/users', createUser);
app.put('/users/:userId', updateUser);
app.delete('/users/:userId', deleteUser);

describe('Express Server Tests', () => {
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

	// ********* User Tests *********

	// Test GET /users Endpoint:
	describe('GET /users Endpoint Tests', () => {
		it('soll alle Benutzer laden', async () => {
			// Wir simulieren die Funktion aus dem Model, die alle Benutzer aus der Datenbank lädt.
			mockGetAllUsers.mockResolvedValueOnce([
				{ id: 1, username: 'User1', email: 'user1@example.com' },
			]);
			// Wir senden eine GET-Anfrage an den '/users' Endpunkt, um alle Benutzer zu laden.
			const response = await request(app).get('/users');

			expect(response.status).toBe(200);
			expect(response.body).toEqual([
				{ id: 1, username: 'User1', email: 'user1@example.com' },
			]);
		});
	});
});
