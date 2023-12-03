const { signup, login } = require('../models/userModel');

exports.signup = async (req, res) => {
	try {
		const { name, email, password } = req.body;
		if (!name || !email || !password) {
			return res
				.status(400)
				.json({ message: 'Bitte alle Felder ausfüllen' });
		}
		const newUser = await signup(name, email, password);
		if (!newUser) {
			return res.status(409).json({
				message:
					'Es existiert bereits ein Benutzer mit dieser E-Mail oder diesem Benutzernamen',
			});
		}
		res.status(201).json({
			message: 'Benutzer wurde erfolgreich erstellt',
			newUser: newUser.user,
			token: newUser.token,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
};

exports.login = async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res
				.status(400)
				.json({ message: 'Bitte alle Felder ausfüllen' });
		}
		const user = await login(email, password);
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
