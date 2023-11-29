const { PrismaClient } = require('@prisma/client');
const { execSync } = require('child_process');
const request = require('supertest');
const { app, start } = require('../index.js');

describe('Express Server Tests', () => {
	let prisma;
	let server;
	const port = process.env.NODE_ENV === 'test' ? 3001 : 3000;

	beforeAll(async () => {
		// Use the main database
		process.env.DATABASE_URL = process.env.DATABASE_URL;

		// Run Prisma migrations on the main database and log the result
		const result = execSync('npx prisma migrate dev --preview-feature', {
			encoding: 'utf8',
		});
		console.log(result);

		prisma = new PrismaClient();
		server = start(port);
	});

	afterAll((done) => {
		// Disconnect the Prisma client
		prisma.$disconnect();

		// Close the server and pass the done callback
		server.close(done);
	});

	// ******** User Tests ********
	describe('User Tests', () => {
		// Teste POST /users mit korrekten Feldern
		describe('POST /users', () => {
			it('should create a new user', async () => {
				const res = await request(app).post('/users').send({
					username: 'Testuser',
					email: 'testuser@example.com',
				});
				expect(res.statusCode).toEqual(201);
				expect(res.body.newUser.username).toEqual('Testuser');
				expect(res.body.newUser.email).toEqual('testuser@example.com');
			});
		});

		// Teste POST /users mit fehlenden Feldern
		describe('POST /users', () => {
			it('should return error message', async () => {
				const res = await request(app).post('/users').send({
					username: 'Testuser',
				});
				expect(res.statusCode).toEqual(400);
				expect(res.body.message).toEqual('Bitte alle Felder ausfüllen');
			});
		});

		// Teste GET /users
		describe('GET /users', () => {
			it('should return all users', async () => {
				const res = await request(app).get('/users');
				expect(res.statusCode).toEqual(200);
				expect(res.body.length).toBeGreaterThanOrEqual(1);
			});
		});

		// Teste GET /users/:userId mit korrekter ID
		describe('GET /users/:userId', () => {
			it('should return a single user', async () => {
				const res = await request(app).get('/users/1');
				expect(res.statusCode).toEqual(200);
				expect(res.body.id).toEqual(1);
			});
		});

		// Teste GET /users/:userId mit falscher ID
		describe('GET /users/:userId', () => {
			it('should return error message', async () => {
				const res = await request(app).get('/users/100');
				expect(res.statusCode).toEqual(404);
				expect(res.body.message).toEqual('Benutzer nicht gefunden');
			});
		});

		// Teste PUT /users/:userId
		describe('PUT /users/:userId', () => {
			it('should update a user', async () => {
				const res = await request(app).put('/users/1').send({
					username: 'Testuser Updated!',
					email: 'testuser@example.com Updated!',
				});
				expect(res.statusCode).toEqual(200);
				expect(res.body.updatedUser.username).toEqual(
					'Testuser Updated!'
				);
				expect(res.body.updatedUser.email).toEqual(
					'testuser@example.com Updated!'
				);
			});
		});

		// Teste DELETE /users/:userId mit korrekter ID
		describe('DELETE /users/:userId', () => {
			it('should delete a user', async () => {
				const res = await request(app).delete('/users/1');
				expect(res.statusCode).toEqual(200);
				expect(res.body.message).toEqual(
					'Benutzer erfolgreich gelöscht'
				);
			});
		});

		// Teste DELETE /users/:userId mit falscher ID
		describe('DELETE /users/:userId', () => {
			it('should return error message', async () => {
				const res = await request(app).delete('/users/100');
				expect(res.statusCode).toEqual(404);
				expect(res.body.message).toEqual('Benutzer nicht gefunden');
			});
		});
	});
});
