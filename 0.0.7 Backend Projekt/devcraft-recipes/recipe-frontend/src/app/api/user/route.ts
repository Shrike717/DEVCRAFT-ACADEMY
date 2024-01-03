// Hier liegen die einzelnen Request Handler für die Ressource User.
// Normalerweise wird hier in einer Mischung von HTTP und Prisma Datenbankaktionen, die CRUD Funktionalität für den User implementiert.
// Um das zu simulieren, führe ich von hier aus die Fetch Requests mit Axios zu unserem externen Express Backend durch.

import axios from 'axios';
import { NextResponse } from 'next/server';

// Diese Funktion sendet eine POST-Anfrage an den Authentifizierungsserver
export async function POST(req: Request) {
	try {
		// Der Request-Body wird in ein JSON-Objekt umgewandelt
		const body = await req.json();
		// Die benötigten Daten werden aus dem Body extrahiert
		const { name, email, password } = body;

		// Eine POST-Anfrage wird an den Authentifizierungsserver gesendet
		const response = await axios.post('http://localhost:5000/auth/signup', {
			name: name,
			email: email,
			password: password,
		});

		// Wenn der Statuscode der Antwort nicht 201 ist, wird ein Fehler angenommen
		// und eine Antwort mit dem Statuscode und der Nachricht der Serverantwort wird zurückgegeben
		if (!response.data.status === 201) {
			return NextResponse.json({
				user: null,
				message: response.data.message,
				status: response.data.status,
			});
		}

		// Wenn der Statuscode der Antwort 201 ist, wird angenommen, dass die Anfrage erfolgreich war
		// und eine Antwort mit den Benutzerdaten, der Nachricht und dem Statuscode der Serverantwort wird zurückgegeben
		return NextResponse.json({
			user: response.data.newUser,
			message: response.data.message,
			status: response.status,
		});
	} catch (error) {
		// Wenn bei der Anfrage ein Fehler auftritt, wird dieser Fehler abgefangen
		console.log(error);
		if (error.response) {
			// Wenn der Fehler eine Antwort vom Server enthält, wird angenommen, dass der Server mit einem Fehlerstatuscode geantwortet hat
			// und eine Antwort mit dem Statuscode und der Nachricht der Serverantwort wird zurückgegeben
			return NextResponse.json({
				user: null,
				message: error.response.data.message,
				status: error.response.status,
			});
		} else {
			// Wenn der Fehler keine Antwort vom Server enthält, wird angenommen, dass beim Einrichten der Anfrage ein Fehler aufgetreten ist
			// und eine allgemeine Fehlerantwort wird zurückgegeben
			return NextResponse.json({
				user: null,
				message: 'Etwas ist schief gelaufen',
				status: 500,
			});
		}
	}
}
