import { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';
import { LOGIN } from '../app/api/user/route'; // Pfad zur LOGIN Funktion

export const authOptions: NextAuthOptions = {
	session: {
		strategy: 'jwt',
	},
	pages: {
		signIn: '/login',
	},
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID ?? '',
			clientSecret: process.env.GITHUB_SECRET ?? '',
		}),
		CredentialsProvider({
			// The name to display on the sign in form (e.g. "Sign in with...")
			name: 'Credentials',

			credentials: {
				email: {
					label: 'Email',
					type: 'email',
					placeholder: 'Your email',
				},
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials, req) {
				if (!credentials.email || !credentials.password) {
					return null;
				}

				// Making axios request to backend
				const response = await axios.post(
					'http://localhost:5000/auth/login',
					{
						email: credentials.email,
						password: credentials.password,
					},
					{
						withCredentials: true, // Weil ich hier kein Cookie mitgebe, muss ich das hier explizit setzen. Sonst wird später der Token nicht als Cookie gesetzt.
					}
				);

				// console.log(
				// 	'[CredentialsProvider] response.data: ',
				// 	response.data
				// );

				// Extract user data from response
				const userData = response.data.user;

				// Prepare user object
				const user = {
					id: userData.id + '', // Sets id to string
					email: userData.email,
					name: userData.name,
					// tokenExpress: response.data.token, // Extract token from response.data
				};

				// console.log('[Authorize] user:', user);

				// Return user object
				return user;
			},
		}),

		// CredentialsProvider({
		// 	name: 'Credentials',
		// 	credentials: {
		// 		email: {
		// 			label: 'Email',
		// 			type: 'email',
		// 			placeholder: 'Your email',
		// 		},
		// 		password: { label: 'Password', type: 'password' },
		// 	},
		// 	async authorize(credentials, req) {
		// 		if (!credentials.email || !credentials.password) {
		// 			return null;
		// 		}

		// 		// Erstellen eines neues Request-Objekt mit den Anmeldedaten im Body
		// 		const loginRequest = new Request(
		// 			'http://localhost:5000/auth/login',
		// 			{
		// 				method: 'POST',
		// 				body: JSON.stringify(credentials),
		// 				headers: {
		// 					'Content-Type': 'application/json',
		// 				},
		// 			}
		// 		);

		// 		// Rufen Sie die LOGIN Funktion auf und übergeben Sie die Anfrage
		// 		const response = await LOGIN(loginRequest, null);

		// 		console.log('[CredentialsProvider] response: ', response);

		// 		// Überprüfen Sie, ob eine Antwort erhalten wurde
		// 		if (!response) {
		// 			// Wenn keine Antwort erhalten wurde, geben Sie null zurück
		// 			return null;
		// 		}

		// 		// Überprüfen Sie, ob die Anmeldung erfolgreich war
		// 		if (response.status === 200) {
		// 			// Extrahieren Sie die Benutzerdaten aus der Antwort
		// 			const userData = response.data.user;

		// 			// Bereiten Sie das Benutzerobjekt vor
		// 			const user = {
		// 				id: userData.id + '', // Setzt id zu String
		// 				email: userData.email,
		// 				name: userData.name,
		// 			};

		// 			// Geben Sie das Benutzerobjekt zurück
		// 			return user;
		// 		} else {
		// 			// Wenn die Anmeldung fehlgeschlagen ist, geben Sie null zurück
		// 			return null;
		// 		}
		// 	},
		// }),
	],
	callbacks: {
		async jwt({ token, user }) {
			// console.log('[Anfang Callback jwt] token:', token);

			// Hier geben wir Name und E-Mail aus dem User weiter nach unten zur Session Callback. Im Token.
			if (user) {
				return {
					...token,
					id: user.id,
					name: user.name,
					email: user.email,
					// tokenExpress: user.tokenExpress,
				};
			}
			// console.log('[Ende Callback jwt] token after processing:', token);
			return token;
		},
		async session({ session, token }) {
			// console.log('[Anfang Callback session] token: ', token);

			// Hier setzen wir Name und E-Mail aus dem Token in die Session.
			return {
				...session,
				user: {
					...session.user,
					id: token.id,
					name: token.name,
					email: token.email,
					// tokenExpress: token.tokenExpress,
				},
			};
		},
	},
};
