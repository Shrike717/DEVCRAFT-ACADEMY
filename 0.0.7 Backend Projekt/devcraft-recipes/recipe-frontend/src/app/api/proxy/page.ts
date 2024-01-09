// pages/api/proxy.js
import axios from 'axios';

export default async function handler(req: Request, res: Response) {
	if (req.method === 'POST') {
		console.log('[Proxy] req.body: ', req.body);

		const response = await axios.post(
			'http://localhost:5000/auth/login',
			req.body,
			{ withCredentials: true }
		);
		res.setHeader('Set-Cookie', response.headers['set-cookie']); // Setzen Sie das Cookie aus der Antwort
		res.json(response.data);
	} else {
		// Handle any other HTTP method
		res.status(405).send({ message: 'Only POST requests are allowed' });
	}
}
