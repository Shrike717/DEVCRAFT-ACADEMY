// Hier liegen die einzelnen Request Handler für die Ressource User.
// Normalerweise wird hier in einer Mischung von HTTP und Prisma Datenbankaktionen, die CRUD Funktionalität für den User implementiert.
// Um das zu simulieren, führe ich von hier aus die Fetch Requests mit Axios zu unserem externen Express Backend durch.

import axios from 'axios';
import { NextResponse } from 'next/server';

// Diese Funktion sendet eine POST-Anfrage an den Express Backend Server, um einen neuen Benutzer zu erstellen.
export async function POST(req: Request, res: Response) {
	try {
		// Der Request-Body wird in ein JSON-Objekt umgewandelt
		const body = await req.json();
		// Die benötigten Daten werden aus dem Body extrahiert
		const { name, email, password } = body;

		// // Eine POST-Anfrage wird an den Express Server gesendet
		// const response = await axios.post('http://localhost:5000/auth/signup', {
		// 	name: name,
		// 	email: email,
		// 	password: password,
		// });

		// // Wenn der Statuscode der Antwort nicht 201 ist, wird ein Fehler angenommen
		// // und eine Antwort mit dem Statuscode und der Nachricht der Serverantwort wird zurückgegeben
		// if (!response.data.status === 201) {
		// 	return NextResponse.json({
		// 		user: null,
		// 		message: response.data.message,
		// 		status: response.data.status,
		// 	});
		// }

		// // Wenn der Statuscode der Antwort 201 ist, wird angenommen, dass die Anfrage erfolgreich war
		// // und eine Antwort mit den Benutzerdaten, der Nachricht und dem Statuscode der Serverantwort wird zurückgegeben
		// return NextResponse.json({
		// 	user: response.data.newUser,
		// 	message: response.data.message,
		// 	status: response.status,
		// });

		// **+**+++ Dieser Code kann einen Cookie aus der Antwort des Express Servers erhalten und in die Antwort des Next Servers einfügen  **+**+++

		// Eine POST-Anfrage wird an den Express Server gesendet
		const response = await axios.post(
			'http://localhost:5000/auth/signup',
			{
				name: name,
				email: email,
				password: password,
			},
			{
				withCredentials: true, // Stellen Sie sicher, dass Cookies in der Antwort enthalten sind
			}
		);

		console.log(
			'[User Post Handler] response.data.newUser: ',
			response.data.newUser
		);

		// Extrahieren Sie den Set-Cookie-Header aus der Antwort
		const setCookieHeader = response.headers['set-cookie'];
		console.log('[User Post Handler] setCookieHeader: ', setCookieHeader);

		// Wenn der Statuscode der Antwort 201 ist, wird angenommen, dass die Anfrage erfolgreich war
		// und eine Antwort mit den Benutzerdaten, der Nachricht und dem Statuscode der Serverantwort wird zurückgegeben
		if (response.status === 201) {
			const nextResponse = NextResponse.json({
				// message: 'Hello from POST Signup',
				user: response.data.newUser,
				message: response.data.message,
				status: response.status,
			});

			// Setzen Sie den Set-Cookie-Header in der Antwort
			if (setCookieHeader) {
				nextResponse.headers.set('Set-Cookie', setCookieHeader);
			}

			console.log('[User Post Handler] Ende nextResponse ', nextResponse);

			return nextResponse;
		}
	} catch (error) {
		// Wenn bei der Anfrage ein Fehler auftritt, wird dieser Fehler abgefangen
		console.log(error);
		if (error.response) {
			// Wenn der Fehler eine Antwort vom Server enthält, wird angenommen, dass der Server mit einem Fehlerstatuscode geantwortet hat
			// und eine Antwort mit dem Statuscode und der Nachricht der Serverantwort wird zurückgegeben
			return NextApiResponse.json({
				user: null,
				message: error.response.data.message,
				status: error.response.status,
			});
		} else {
			// Wenn der Fehler keine Antwort vom Server enthält, wird angenommen, dass beim Einrichten der Anfrage ein Fehler aufgetreten ist
			// und eine allgemeine Fehlerantwort wird zurückgegeben
			return NextApiResponse.json({
				user: null,
				message: 'Etwas ist schief gelaufen',
				status: 500,
			});
		}
	}
}

// ********** NOT WWORKING **********
// Diese Funktion sendet eine POST-Anfrage an den Express Backend Server, um einen Benutzer einzuloggen.
// export async function LOGIN(req: Request, res: Response) {
// 	try {
// 		// Der Request-Body wird in ein JSON-Objekt umgewandelt
// 		const body = await req.json();
// 		// Die benötigten Daten werden aus dem Body extrahiert
// 		const { email, password } = body;
// 		console.log('[Login Handler] email: ', email);

// 		// Eine POST-Anfrage wird an den Express Server gesendet
// 		const response = await axios.post(
// 			'http://localhost:5000/auth/login',
// 			{
// 				email: email,
// 				password: password,
// 			},
// 			{
// 				withCredentials: true, // Stellen Sie sicher, dass Cookies in der Antwort enthalten sind
// 			}
// 		);

// 		console.log('[Login Handler LOGIN] response.data: ', response.data);

// 		// Extrahieren Sie den Set-Cookie-Header aus der Antwort
// 		const setCookieHeader = response.headers['set-cookie'];

// 		console.log(
// 			'[Login Handler LOGIN] Set-Cookie header:',
// 			setCookieHeader
// 		);

// 		// Wenn der Statuscode der Antwort 200 ist, wird angenommen, dass die Anfrage erfolgreich war
// 		// und eine Antwort mit den Benutzerdaten, der Nachricht und dem Statuscode der Serverantwort wird zurückgegeben

// 		console.log('[Login Handler LOGIN] User data:', response.data.user);

// 		if (response.status === 200) {
// 			const nextResponse = NextResponse.json({
// 				user: response.data.user,
// 				message: response.data.message,
// 				status: response.status,
// 			});
// 			// Setzen Sie den Set-Cookie-Header in der Antwort
// 			if (setCookieHeader) {
// 				nextResponse.headers.set('Set-Cookie', setCookieHeader);
// 			}

// 			console.log(
// 				'[Login Handler LOGIN] Ende nextResponse ',
// 				nextResponse
// 			);

// 			return nextResponse;
// 		}

// 		// if (response.status === 200) {
// 		// 	res.setHeader('Set-Cookie', setCookieHeader);

// 		// 	res.status(200).json({
// 		// 		user: response.data.user,
// 		// 		message: response.data.message,
// 		// 		status: response.status,
// 		// 	});

// 		// 	console.log('[Login Handler LOGIN] Ende res: ', res);

// 		// 	return res;
// 		// }
// 	} catch (error) {
// 		// Wenn bei der Anfrage ein Fehler auftritt, wird dieser Fehler abgefangen
// 		if (error.response) {
// 			// Wenn der Fehler eine Antwort vom Server enthält, wird angenommen, dass der Server mit einem Fehlerstatuscode geantwortet hat
// 			// und eine Antwort mit dem Statuscode und der Nachricht der Serverantwort wird zurückgegeben
// 			return NextResponse.json({
// 				user: null,
// 				message: error.response.data.message,
// 				status: error.response.status,
// 			});
// 		} else {
// 			// Wenn der Fehler keine Antwort vom Server enthält, wird angenommen, dass beim Einrichten der Anfrage ein Fehler aufgetreten ist
// 			// und eine allgemeine Fehlerantwort wird zurückgegeben
// 			return NextResponse.json({
// 				user: null,
// 				message: 'Etwas ist schief gelaufen',
// 				status: 500,
// 			});
// 		}
// 	}
// }
