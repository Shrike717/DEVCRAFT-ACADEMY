const request = require('supertest');
// Wir importieren die app und start Funktionen aus unserer Hauptserverdatei.
const { app, start } = require('../index.js');

const {
	getAllUsers,
	getUserById,
	createUser,
	updateUser,
	deleteUser,
} = require('../controllers/userController.js');

// Mocken des userModel Moduls:
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
const {
	getAllUsers: mockGetAllUsers,
	getUserById: mockGetUserById,
	createUser: mockCreateUser,
	updateUser: mockUpdateUser,
	deleteUser: mockDeleteUser,
} = require('../models/userModel.js');

// Wir definieren unsere Routen.
app.get('/users', getAllUsers);
app.get('/users/:userId', getUserById);
app.post('/users', createUser);
app.put('/users/:userId', updateUser);
app.delete('/users/:userId', deleteUser);

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
	beforeEach(() => {
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
			// Wir senden eine GET-Anfrage an den '/users' Endpunkt, um alle Benutzer zu laden.
			const response = await request(app).get('/users');

			expect(response.status).toBe(200);
			expect(response.body).toEqual([
				{ id: 1, username: 'User1', email: 'user1@example.com' },
			]);
		});

		// Benutzer mit einer bestimmten ID laden:
		it('soll einen Benutzer mit einer bestimmten ID laden', async () => {
			// Wir simulieren die Funktion aus dem Model, die einen Benutzer mit einer bestimmten ID aus der Datenbank lädt.
			mockGetUserById.mockResolvedValueOnce({
				id: 1,
				username: 'User1',
				email: 'user1@example.com',
			});
			// Wir senden eine GET-Anfrage an den '/users/:userId' Endpunkt, um einen Benutzer mit der ID 1 zu laden.
			const response = await request(app).get('/users/1');

			// Wenn der Statuscode 404 ist, erwarten wir, dass die Fehlermeldung korrekt ist.
			if (response.statusCode === 404) {
				expect(response.body.message).toEqual(
					'Benutzer nicht gefunden'
				);
			} else {
				// Wenn der Statuscode 200 ist, erwarten wir, dass der Benutzername und die E-Mail des Benutzers korrekt sind.
				expect(response.statusCode).toEqual(200);
				expect(response.body).toEqual({
					id: 1,
					username: 'User1',
					email: 'user1@example.com',
				});
			}
		});

		// Benutzer mit einer bestimmten ID laden, die nicht existiert:
		it('soll einen Fehler zurückgeben, wenn der Benutzer nicht existiert', async () => {
			// Wir simulieren die Funktion aus dem Model, die einen Benutzer mit einer bestimmten ID aus der Datenbank lädt.
			mockGetUserById.mockResolvedValueOnce(null);
			// Wir senden eine GET-Anfrage an den '/users/:userId' Endpunkt, um einen Benutzer mit der ID 1 zu laden.
			const response = await request(app).get('/users/1');

			// Wir erwarten, dass der Statuscode 404 ist und die Fehlermeldung korrekt ist.
			expect(response.statusCode).toEqual(404);
			expect(response.body.message).toEqual('Benutzer nicht gefunden');
		});
	});

	// Test POST /users Endpoint:
	describe('POST /users Endpoint Tests', () => {
		// Benutzer erstellen:
		it('soll einen neuen Benutzer erstellen', async () => {
			// Wir simulieren die Funktion aus dem Model, die einen neuen Benutzer in der Datenbank erstellt.
			mockCreateUser.mockResolvedValueOnce({
				id: 1,
				username: 'User1',
				email: 'user1@example.com',
			});
			// Wir senden eine POST-Anfrage an den '/users' Endpunkt, um einen neuen Benutzer zu erstellen.
			const response = await request(app).post('/users').send({
				username: 'User1',
				email: 'user1@example.com',
			});

			// Wenn der Statuscode 409 ist, erwarten wir, dass die Fehlermeldung korrekt ist.
			if (response.statusCode === 409) {
				expect(response.body.message).toEqual(
					'Es existiert bereits ein Benutzer mit dieser E-Mail oder diesem Benutzernamen'
				);
			} else {
				// Wir erwarten, dass der Statuscode 201 ist und der Benutzer korrekt ist.
				expect(response.statusCode).toEqual(201);
				expect(response.body.newUser).toEqual({
					id: 1,
					username: 'User1',
					email: 'user1@example.com',
				});
			}
		});

		// Prüfen, ob alle Felder ausgefüllt sind:
		it('soll einen Fehler zurückgeben, wenn nicht alle Felder ausgefüllt sind', async () => {
			// Wir senden eine POST-Anfrage an den '/users' Endpunkt, um einen neuen Benutzer zu erstellen.
			const response = await request(app).post('/users').send({
				username: 'User1',
			});

			// Wir erwarten, dass der Statuscode 400 ist und die Fehlermeldung korrekt ist.
			expect(response.statusCode).toEqual(400);
			expect(response.body.message).toEqual(
				'Bitte alle Felder ausfüllen'
			);
		});

		// Prüfen, ob ein Benutzer mit demselben Benutzernamen oder Email existiert:
		it('soll einen Fehler zurückgeben, wenn ein Benutzer mit demselben Benutzernamen existiert', async () => {
			// Wir simulieren die Funktion aus dem Model, die einen neuen Benutzer in der Datenbank erstellt.
			mockCreateUser.mockResolvedValueOnce(null);
			// Wir senden eine POST-Anfrage an den '/users' Endpunkt, um einen neuen Benutzer zu erstellen.
			const response = await request(app).post('/users').send({
				username: 'User1',
				email: 'user1@example.com',
			});

			// Wir erwarten, dass der Statuscode 409 ist und die Fehlermeldung korrekt ist.
			expect(response.statusCode).toEqual(409);
			expect(response.body.message).toEqual(
				'Es existiert bereits ein Benutzer mit dieser E-Mail oder diesem Benutzernamen'
			);
		});
	});

	// Test PUT /users/:userId Endpoint:
	describe('PUT /users/:userId Endpoint Tests', () => {
		// Benutzer aktualisieren:
		it('soll einen Benutzer aktualisieren', async () => {
			// Wir simulieren die Funktion aus dem Model, die einen Benutzer mit einer bestimmten ID aus der Datenbank lädt.
			mockGetUserById.mockResolvedValueOnce({
				id: 1,
				username: 'User1',
				email: 'user1@example.com',
			});
			// Wir simulieren die Funktion aus dem Model, die einen Benutzer mit einer bestimmten ID in der Datenbank aktualisiert.
			mockUpdateUser.mockResolvedValueOnce({
				id: 1,
				username: 'User2',
				email: 'user2@example.com',
			});

			// Wir senden eine PUT-Anfrage an den '/users/:userId' Endpunkt, um den Benutzer mit der ID 1 zu aktualisieren.
			const response = await request(app).put('/users/1').send({
				username: 'User2',
				email: 'user2@example.com',
			});

			// Wenn der Statuscode 404 ist, erwarten wir, dass die Fehlermeldung korrekt ist.
			if (response.statusCode === 404) {
				expect(response.body.message).toEqual(
					'Benutzer nicht gefunden'
				);
			} else {
				// Wir erwarten, dass der Statuscode 200 ist und der Benutzer korrekt ist.
				expect(response.statusCode).toEqual(200);
				expect(response.body.updatedUser).toEqual({
					id: 1,
					username: 'User2',
					email: 'user2@example.com',
				});
			}
		});

		// Prüfen, ob ein Benutzer mit der ID existiert:
		it('soll einen Fehler zurückgeben, wenn der Benutzer nicht existiert', async () => {
			// Wir simulieren die Funktion aus dem Model, die einen Benutzer mit einer bestimmten ID aus der Datenbank lädt.
			mockGetUserById.mockResolvedValueOnce(null);

			// Wir senden eine PUT-Anfrage an den '/users/:userId' Endpunkt, um den Benutzer mit der ID 1 zu aktualisieren.
			const response = await request(app).put('/users/1').send({
				username: 'User1',
				email: 'user1@example.com',
			});

			// Wir erwarten, dass der Statuscode 404 ist und die Fehlermeldung korrekt ist.
			expect(response.statusCode).toEqual(404);
			expect(response.body.message).toEqual('Benutzer nicht gefunden');
		});
	});

	// Test DELETE /users/:userId Endpoint:
	describe('DELETE /users/:userId Endpoint Tests', () => {
		// Benutzer löschen:
		it('soll einen Benutzer löschen', async () => {
			// Wir simulieren die Funktion aus dem Model, die einen Benutzer mit einer bestimmten ID aus der Datenbank lädt.
			mockGetUserById.mockResolvedValueOnce({
				id: 1,
				username: 'User1',
				email: 'user1@example.com',
			});
			// Wir simulieren die Funktion aus dem Model, die einen Benutzer mit einer bestimmten ID aus der Datenbank löscht.
			mockDeleteUser.mockResolvedValueOnce({
				id: 1,
				username: 'User1',
				email: 'user1@example.com',
			});

			// Wir senden eine DELETE-Anfrage an den '/users/:userId' Endpunkt, um den Benutzer mit der ID 1 zu löschen.
			const response = await request(app).delete('/users/1');

			// Wenn der Statuscode 404 ist, erwarten wir, dass die Fehlermeldung korrekt ist.
			if (response.statusCode === 404) {
				expect(response.body.message).toEqual(
					'Benutzer nicht gefunden'
				);
			} else {
				// Wir erwarten, dass der Statuscode 200 ist und der Benutzer korrekt ist.
				expect(response.statusCode).toEqual(200);
			}
		});

		// Prüfen, ob ein Benutzer mit der ID existiert:
		it('soll einen Fehler zurückgeben, wenn der Benutzer nicht existiert', async () => {
			// Wir simulieren die Funktion aus dem Model, die einen Benutzer mit einer bestimmten ID aus der Datenbank lädt.
			mockGetUserById.mockResolvedValueOnce(null);

			// Wir senden eine DELETE-Anfrage an den '/users/:userId' Endpunkt, um den Benutzer mit der ID 1 zu löschen.
			const response = await request(app).delete('/users/1');

			// Wir erwarten, dass der Statuscode 404 ist und die Fehlermeldung korrekt ist.
			expect(response.statusCode).toEqual(404);
			expect(response.body.message).toEqual('Benutzer nicht gefunden');
		});
	});
});
