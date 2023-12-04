const request = require('supertest');
const { app, start } = require('../../index.js');
const bcrypt = require('bcrypt');

const saltRounds = 10;

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

	// ******+ ACHTUNG: Wenn ich it.only verwende, werden nur diese Tests ausgeführt. ******

	// TODO: Tests für Login schreiben

	describe('GET /users', () => {
		// Alle Benutzer zurückgeben:
		it('soll alle Benutzer zurückgeben', async () => {
			// Erstelle 3 Benutzer
			let users = [
				{
					name: 'User 1',
					email: 'user1@example.com',
					password: 'user1',
				},
				{
					name: 'User 2',
					email: 'user2@example.com',
					password: 'user1',
				},
				{
					name: 'User 3',
					email: 'user3@example.com',
					password: 'user3',
				},
			];
			// Wir verschlüsseln die Passwörter, da wir in der Datenbank die Passwörter verschlüsselt speichern
			// Dann verwenden wir Promise.all, um auf alle diese Promises zu warten, bevor wir fortfahren.
			// Das resultierende users Array enthält die Benutzerobjekte mit den gehashten Passwörtern.
			users = await Promise.all(
				users.map(async (user) => {
					const salt = await bcrypt.genSalt(saltRounds);
					user.password = await bcrypt.hash(user.password, salt);
					user.salt = salt;
					return user;
				})
			);

			await prisma.user.createMany({
				data: users,
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
			let user = {
				name: 'User 1',
				email: 'user1@example.com',
				password: 'user1',
			};

			const salt = await bcrypt.genSalt(saltRounds);
			user.password = await bcrypt.hash(user.password, salt);
			user.salt = salt;

			await prisma.user.create({
				data: user,
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

	describe('POST /auth/signup', () => {
		// Einen neuen Benutzer mit Signup erstellen:
		it('soll einen neuen Benutzer mit Signup erstellen', async () => {
			const res = await request(app).post('/auth/signup').send({
				name: 'User 1',
				email: 'user1@example.com',
				password: 'user1',
			});

			expect(res.statusCode).toEqual(201);
			expect(res.body).toEqual({
				message: 'Benutzer wurde erfolgreich erstellt',
				newUser: {
					id: 1,
					name: 'User 1',
					email: 'user1@example.com',
				},
				token: expect.any(String), // Wir können nicht genau vorhersagen, wie der Token aussieht, aber wir wissen, dass er ein String ist.
			});
		});

		// Versuch einen neuen Benutzer erstellen, wenn der Benutzername schon existiert:
		it('soll einen Fehler zurückgeben, wenn der Benutzername schon existiert', async () => {
			// Erstelle einen Benutzer
			let user = {
				name: 'User 1',
				email: 'user1@example.com',
				password: 'user1',
			};

			const salt = await bcrypt.genSalt(saltRounds);
			user.password = await bcrypt.hash(user.password, salt);
			user.salt = salt;

			await prisma.user.create({
				data: user,
			});
			const res = await request(app).post('/auth/signup').send({
				name: 'User 1',
				email: 'user1@example.com',
				password: 'user1',
			});

			expect(res.statusCode).toEqual(409);
			expect(res.body).toEqual({
				message:
					'Es existiert bereits ein Benutzer mit dieser E-Mail oder diesem Benutzernamen',
			});
		});
	});

	describe('POST /auth/login', () => {
		// Einen Benutzer mit Login einloggen:
		it('soll einen Benutzer mit Login einloggen', async () => {
			// Erstelle einen Benutzer
			let user = {
				name: 'User 1',
				email: 'user1@example.com',
				password: 'user1',
			};

			const salt = await bcrypt.genSalt(saltRounds);
			user.password = await bcrypt.hash(user.password, salt);
			user.salt = salt;

			await prisma.user.create({
				data: user,
			});
			const res = await request(app).post('/auth/login').send({
				email: 'user1@example.com',
				password: 'user1',
			});
			console.log('Integration Test, res.body:', res.body);
			expect(res.statusCode).toEqual(200);
			expect(res.body).toEqual({
				message: 'Login erfolgreich',
				user: {
					id: 1,
					name: 'User 1',
					email: 'user1@example.com',
				},
				token: expect.any(String), // Wir können nicht genau vorhersagen, wie der Token aussieht, aber wir wissen, dass er ein String ist.
			});
		});
	});

	describe('PUT /users', () => {
		// Einen Benutzer aktualisieren:
		it('soll einen Benutzer aktualisieren', async () => {
			// Erstelle einen Benutzer
			let user = {
				name: 'User 1',
				email: 'user1@example.com',
				password: 'user1',
			};

			const salt = await bcrypt.genSalt(saltRounds);
			user.password = await bcrypt.hash(user.password, salt);
			user.salt = salt;

			await prisma.user.create({
				data: user,
			});
			const res = await request(app).put('/users/1').send({
				name: 'User 2',
				email: 'user2@example.com',
				password: 'user2',
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
				password: 'user2',
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
			let user = {
				name: 'User 1',
				email: 'user1@example.com',
				password: 'user1',
			};

			const salt = await bcrypt.genSalt(saltRounds);
			user.password = await bcrypt.hash(user.password, salt);
			user.salt = salt;

			await prisma.user.create({
				data: user,
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
