const {
	getAllUsers,
	getUserById,
	createUser,
	updateUser,
	deleteUser,
} = require('../models/userModel');

exports.getAllUsers = async (req, res) => {
	try {
		const users = await getAllUsers(); // Hier wird die Funktion aus dem Model aufgerufen
		res.json(users);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
};

exports.getUserById = async (req, res) => {
	try {
		const { userId } = req.params;
		const user = await getUserById(parseInt(userId));

		if (!user) {
			return res.status(404).json({ message: 'Benutzer nicht gefunden' });
		}

		res.json(user);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
};

exports.createUser = async (req, res) => {
	try {
		const { name, email } = req.body;
		if (!name || !email) {
			return res
				.status(400)
				.json({ message: 'Bitte alle Felder ausfüllen' });
		}
		const newUser = await createUser(name, email);
		if (!newUser) {
			return res.status(409).json({
				message:
					'Es existiert bereits ein Benutzer mit dieser E-Mail oder diesem Benutzernamen',
			});
		}
		res.status(201).json({
			message: 'Benutzer wurde erfolgreich erstellt',
			newUser,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
};

exports.updateUser = async (req, res) => {
	try {
		const { userId } = req.params;
		const newData = req.body;
		const updatedUser = await updateUser(parseInt(userId), newData);

		if (!updatedUser) {
			return res.status(404).json({ message: 'Benutzer nicht gefunden' });
		}

		res.json({
			message: 'Benutzer wurde erfolgreich aktualisiert',
			updatedUser,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
};

exports.deleteUser = async (req, res) => {
	try {
		const { userId } = req.params;
		const deletedUser = await deleteUser(parseInt(userId));

		if (!deletedUser) {
			return res.status(404).json({ message: 'Benutzer nicht gefunden' });
		}

		res.json({
			message: 'Benutzer wurde erfolgreich gelöscht',
			deletedUser,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
};
