import axios from 'axios';
import { NextResponse } from 'next/server';

// GET Request um alle Rezepte aus dem Express back and zu holen. Diese werden dann in den Context geladen.
export async function GET(req: Request) {
	try {
		// Eine GET-Anfrage wird an den Express Backend Server gesendet
		const response = await axios.get('http://localhost:5000/recipes');

		// Wenn der Statuscode der Antwort nicht 200 ist, wird ein Fehler angenommen
		// und eine Antwort mit dem Statuscode und der Nachricht der Serverantwort wird zurückgegeben
		if (!response.data.status === 200) {
			return NextResponse.json({
				recipes: null,
				message: response.data.message,
				status: response.data.status,
			});
		}

		// Wenn der Statuscode der Antwort 200 ist, wird angenommen, dass die Anfrage erfolgreich war
		// und eine Antwort mit den Rezeptdaten, der Nachricht und dem Statuscode der Serverantwort wird zurückgegeben
		return NextResponse.json({
			recipes: response.data.recipes,
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
				recipes: null,
				message: error.response.data.message,
				status: error.response.status,
			});
		} else {
			// Wenn der Fehler keine Antwort vom Server enthält, wird angenommen, dass beim Einrichten der Anfrage ein Fehler aufgetreten ist
			// und eine allgemeine Fehlerantwort wird zurückgegeben
			return NextResponse.json({
				recipes: null,
				message: 'Etwas ist schief gelaufen',
				status: 500,
			});
		}
	}
}
