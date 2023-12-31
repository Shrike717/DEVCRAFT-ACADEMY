const { signupUserModel, loginUserModel } = require('../models/userModel');
const jwt = require('jsonwebtoken');

exports.signupUser = async (req, res) => {
	// console.log('[authController.js] signupUser: ', req.body);
	try {
		const { name, email, password } = req.body;

		// Überprüfe, ob alle Felder ausgefüllt sind
		if (!name || !email || !password) {
			return res
				.status(400)
				.json({ message: 'Bitte alle Felder ausfüllen!' });
		}

		// Erstelle einen neuen Benutzer
		const newUser = await signupUserModel(name, email, password);

		// Wenn der Benutzer nicht erstellt wurde (weil die E-Mail bereits existiert)
		if (!newUser) {
			return res.status(409).json({
				message: 'Es existiert bereits ein User mit dieser E-Mail!',
			});
		}

		// Erstelle einen neuen JWT
		const token = jwt.sign(
			{ id: newUser.id, name: newUser.name, email: newUser.email },
			'your_jwt_secret',
			{ expiresIn: '1h' }
		);

		// Sende den JWT und die Benutzerdaten zurück
		res.status(201).json({
			message: 'User wurde erfolgreich erstellt!',
			token: token,
			newUser: {
				id: newUser.id,
				name: newUser.name,
				email: newUser.email,
			},
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Internal Server Error!' });
	}
};

exports.loginUser = async (req, res) => {
	console.log('[authController.js] loginUser: ', req.body);
	try {
		const { email, password } = req.body;

		// Überprüfe, ob alle Felder ausgefüllt sind
		if (!email || !password) {
			return res
				.status(400)
				.json({ message: 'Bitte alle Felder ausfüllen!' });
		}

		// Versuche den Benutzer einzuloggen
		const response = await loginUserModel(email, password);
		console.log('[authController.js] response: ', response);

		// Wenn der Login fehlschlägt (weil die E-Mail oder das Passwort falsch ist)
		if (!response) {
			return res.status(401).json({
				message: 'E-Mail oder Passwort ist falsch!',
			});
		}
		const user = response.user;
		console.log('[authController.js] back from model: ', user);

		// Erstelle einen neuen JWT
		const token = jwt.sign(
			{ id: user.id, name: user.name, email: user.email },
			'your_jwt_secret',
			{ expiresIn: '1h' }
		);

		// Sende den JWT und die Benutzerdaten zurück
		res.status(200).json({
			message: 'User wurde erfolgreich eingeloggt!',
			token: token,
			user: { id: user.id, name: user.name, email: user.email },
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Internal Server Error!' });
	}
};
