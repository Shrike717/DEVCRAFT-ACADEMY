// const request = require('supertest');
// const app = require('../../index');

// describe('POST /users', () => {
// 	it('creates a new user', async () => {
// 		const res = await request(app).post('/users').send({
// 			name: 'John Doe',
// 			email: 'john.doe@example.com',
// 		});

// 		expect(res.statusCode).toEqual(200);
// 		expect(res.body).toHaveProperty('id');
// 		expect(res.body.name).toEqual('John Doe');
// 		expect(res.body.email).toEqual('john.doe@example.com');
// 	});
// });
