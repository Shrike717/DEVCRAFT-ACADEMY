// Importieren der benötigten Module
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

	// ***** Test Middleware Validation für POST /users Route *****
	describe('POST /users', () => {
		// Es soll ein 400-Fehler zurückgegeben werden, wenn der Name weniger als 3 Zeichen hat
		it('soll Error 400 zurückgeben, wenn der Name weniger als 3 Zeichen hat', async () => {
			const res = await request(app)
				.post('/users')
				.send({ name: 'ab', email: 'test@example.com' });
			expect(res.statusCode).toEqual(400);
			expect(res.body).toHaveProperty('errors');
		});

		// Es soll ein 400-Fehler zurückgegeben wird, wenn die E-Mail ungültig ist
		it('soll Error 400 zurückgeben, wenn die E-Mail ungültig ist', async () => {
			const res = await request(app)
				.post('/users')
				.send({ name: 'abc', email: 'nichtgültigeemail' });
			expect(res.statusCode).toEqual(400);
			expect(res.body).toHaveProperty('errors');
		});

		// Weitere Tests für erfolgreiche Anforderungen können hier hinzugefügt werden
	});
});
