const request = require('supertest');
const { app, start } = require('../../index.js');

// Importieren des Prisma-Clients
const { PrismaClient } = require('../../prisma/src/models/generated/client');
const prisma = new PrismaClient();

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

	// Vor jedem Test leeren wir die Datenbank
	beforeEach(async () => {
		await prisma.user.deleteMany(); // Löscht alle User-Einträge
		// Setzt die Auto-Inkrementierung der ID zurück. Das geht nur mit einem rohen SQL-Befehl.
		await prisma.$executeRaw`ALTER SEQUENCE "User_id_seq" RESTART WITH 1`;
	});

	// ******* DATENBANK TEST *******
	describe('Datenbank', () => {
		it('sollte eine Verbindung zur Datenbank herstellen', async () => {
			try {
				// Führt eine einfache Abfrage aus, um die Datenbankverbindung zu testen
				const result = await prisma.$queryRaw`SELECT 1;`;

				// Überprüfen, ob die Abfrage erfolgreich war
				expect(result).toEqual([{ '?column?': 1 }]);
			} catch (error) {
				// Wenn ein Fehler auftritt, schlägt der Test fehl
				throw new Error('Verbindung zur Datenbank fehlggeschlagen.');
			}
		});
	});

	// ******* IINTEGRATION TESTS USER *******

	describe('GET /users', () => {
		// Alle Benutzer zurückgeben:
		it('soll alle Benutzer zurückgeben', async () => {
			// Erstelle 3 Benutzer
			await prisma.user.createMany({
				data: [
					{
						name: 'User 1',
						email: 'user1@example.com',
					},
					{
						name: 'User 2',
						email: 'user2@example.com',
					},
					{
						name: 'User 3',
						email: 'user3@example.com',
					},
				],
			});
			// Wir senden den Request:
			const res = await request(app).get('/users');

			// Wir erwarten, dass der Status-Code 200 ist:
			expect(res.statusCode).toEqual(200);
			// Wir erwarten, dass die Anzahl der Benutzer 3 ist:
			expect(res.body.length).toEqual(3);
			// Wir erwarten, dass die Benutzer die richtigen Daten haben:
			expect(res.body).toEqual([
				{
					id: 1,
					name: 'User 1',
					email: 'user1@example.com',
				},
				{
					id: 2,
					name: 'User 2',
					email: 'user2@example.com',
				},
				{
					id: 3,
					name: 'User 3',
					email: 'user3@example.com',
				},
			]);
		});
		// Einen Benutzer zurückgeben:
		it('soll einen Benutzer zurückgeben', async () => {
			// Erstelle einen Benutzer
			await prisma.user.create({
				data: {
					name: 'User 1',
					email: 'user1@example.com',
				},
			});
			// Wir senden den Request:
			const res = await request(app).get('/users/1');

			// Wir erwarten, dass der Status-Code 200 ist:
			expect(res.statusCode).toEqual(200);
			// Wir erwarten, dass der Benutzer die richtigen Daten hat:
			expect(res.body).toEqual({
				id: 1,
				name: 'User 1',
				email: 'user1@example.com',
			});
		});
		// Einen Benutzer zurückgeben, der nicht existiert:
		it('soll einen Fehler zurückgeben, wenn der Benutzer nicht existiert', async () => {
			// Wir senden den Request:
			const res = await request(app).get('/users/100');

			// Wir erwarten, dass der Status-Code 404 ist:
			expect(res.statusCode).toEqual(404);
			// Wir erwarten, dass der Fehler die richtige Nachricht hat:
			expect(res.body).toEqual({
				message: 'Benutzer nicht gefunden',
			});
		});
	});

	describe('POST /users', () => {
		// Einen neuen Benutzer erstellen:
		it('soll einen neuen Benutzer erstellen', async () => {
			const res = await request(app).post('/users').send({
				name: 'User 1',
				email: 'user1@example.com',
			});

			expect(res.statusCode).toEqual(201);
			expect(res.body).toEqual({
				message: 'Benutzer wurde erfolgreich erstellt',
				newUser: {
					id: 1,
					name: 'User 1',
					email: 'user1@example.com',
				},
			});
		});
		// Einen neuen Benutzer erstellen, wenn ein Feld leer ist:
		it('soll einen Fehler zurückgeben, wenn ein Feld fehlt', async () => {
			const res = await request(app).post('/users').send({
				name: 'User 1',
			});

			expect(res.statusCode).toEqual(400);
			expect(res.body).toEqual({
				message: 'Bitte alle Felder ausfüllen',
			});
		});
		// Einen neuen Benutzer erstellen, wenn der Benutzername schon existiert:
		it('soll einen Fehler zurückgeben, wenn der Benutzername schon existiert', async () => {
			// Erstelle einen Benutzer
			await prisma.user.create({
				data: {
					name: 'User 1',
					email: 'user1@example.com',
				},
			});
			const res = await request(app).post('/users').send({
				name: 'User 1',
				email: 'user1@example.com',
			});

			expect(res.statusCode).toEqual(409);
			expect(res.body).toEqual({
				message:
					'Es existiert bereits ein Benutzer mit dieser E-Mail oder diesem Benutzernamen',
			});
		});
	});

	describe('PUT /users', () => {
		// Einen Benutzer aktualisieren:
		it('soll einen Benutzer aktualisieren', async () => {
			// Erstelle einen Benutzer
			await prisma.user.create({
				data: {
					name: 'User 1',
					email: 'user1@example.com',
				},
			});
			const res = await request(app).put('/users/1').send({
				name: 'User 2',
				email: 'user2@example.com',
			});

			expect(res.statusCode).toEqual(200);
			expect(res.body).toEqual({
				message: 'Benutzer wurde erfolgreich aktualisiert',
				updatedUser: {
					id: 1,
					name: 'User 2',
					email: 'user2@example.com',
				},
			});
		});
		// Einen Benutzer aktualisieren, der nicht existiert:
		it('soll einen Fehler zurückgeben, wenn der Benutzer nicht existiert', async () => {
			const res = await request(app).put('/users/2').send({
				name: 'User 2',
				email: 'user2@example.com',
			});

			expect(res.statusCode).toEqual(404);
			expect(res.body).toEqual({
				message: 'Benutzer nicht gefunden',
			});
		});
	});

	describe('DELETE /users', () => {
		// Einen Benutzer löschen:
		it('soll einen Benutzer löschen', async () => {
			// Erstelle einen Benutzer
			await prisma.user.create({
				data: {
					name: 'User 1',
					email: 'user1@example.com',
				},
			});

			const res = await request(app).delete('/users/1');

			expect(res.statusCode).toEqual(200);
			expect(res.body).toEqual({
				message: 'Benutzer wurde erfolgreich gelöscht',
				deletedUser: {
					id: 1,
					name: 'User 1',
					email: 'user1@example.com',
				},
			});
		});

		// Einen Benutzer löschen, der nicht existiert:
		it('soll einen Fehler zurückgeben, wenn der Benutzer nicht existiert', async () => {
			const res = await request(app).delete('/users/2');

			expect(res.statusCode).toEqual(404);
			expect(res.body).toEqual({
				message: 'Benutzer nicht gefunden',
			});
		});
	});
});
