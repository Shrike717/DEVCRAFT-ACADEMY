const { signupUser, loginUser } = require('../models/userModel');

exports.signupUser = async (req, res) => {
	try {
		const { name, email, password } = req.body;
		if (!name || !email || !password) {
			return res
				.status(400)
				.json({ message: 'Bitte alle Felder ausfüllen' });
		}
		const newUser = await signupUser(name, email, password);
		if (!newUser) {
			return res.status(409).json({
				message:
					'Es existiert bereits ein Benutzer mit dieser E-Mail oder diesem Benutzernamen',
			});
		}
		console.log('Kommt vom Model zurück zu Controller', newUser);
		res.status(201).json({
			message: 'Benutzer wurde erfolgreich erstellt',
			newUser: {
				id: newUser.user.id,
				name: newUser.user.name,
				email: newUser.user.email,
			},
			token: newUser.token,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
};

exports.loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res
				.status(400)
				.json({ message: 'Bitte alle Felder ausfüllen' });
		}
		const user = await loginUser(email, password);
		if (!user) {
			return res.status(401).json({
				message: 'Ungültige Anmeldeinformationen',
			});
		}
		res.json({
			message: 'Erfolgreich angemeldet',
			user: user.user,
			token: user.token,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
};
