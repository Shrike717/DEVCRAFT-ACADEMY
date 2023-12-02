const request = require('supertest');
const { app, start } = require('../../index.js');

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
	describe('POST /users', () => {
		it('creates a new user', async () => {
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
	});
});
