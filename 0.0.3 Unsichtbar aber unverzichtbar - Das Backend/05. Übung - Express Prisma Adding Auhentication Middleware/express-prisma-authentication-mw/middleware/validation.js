// Importieren der benötigten Funktionen aus dem express-validator Paket
const { body, validationResult } = require('express-validator');

// Definieren der Validierungsregeln für einen Benutzer bei der Registrierung
const validateUserSignup = [
	// Der Name muss mindestens 3 Zeichen lang sein
	body('name')
		.isLength({ min: 3 }) // Überprüfung, ob die Länge des Namens mindestens 3 Zeichen beträgt
		.withMessage('Der Name muss mindestens 3 Zeichen lang sein'), // Wenn nicht, wird diese Fehlermeldung ausgegeben

	// Die E-Mail muss ein gültiges Format haben
	body('email')
		.isEmail() // Überprüfung, ob die E-Mail ein gültiges Format hat
		.withMessage('Die E-Mail muss ein gültiges Format haben'), // Wenn nicht, wird diese Fehlermeldung ausgegeben

	// Diese Funktion wird ausgeführt, nachdem die obigen Validierungsregeln ausgeführt wurden
	(req, res, next) => {
		// Überprüfung, ob Fehler aufgetreten sind
		const errors = validationResult(req);
		// Wenn es Fehler gibt
		if (!errors.isEmpty()) {
			// Senden einer Antwort mit dem Statuscode 400 und den Fehlerdetails
			return res.status(400).json({ errors: errors.array() });
		}
		// Wenn es keine Fehler gibt, wird mit der nächsten Middleware oder Route fortgefahren
		next();
	},
];

// Definieren der Validierungsregeln für einen Benutzer beim Login
const validateUserLogin = [
	// Die E-Mail muss ein gültiges Format haben
	body('email')
		.isEmail() // Überprüfung, ob die E-Mail ein gültiges Format hat
		.withMessage('Die E-Mail muss ein gültiges Format haben'), // Wenn nicht, wird diese Fehlermeldung ausgegeben

	// Das Passwort muss mindestens 5 Zeichen lang sein
	body('password')
		.isLength({ min: 5 }) // Überprüfung, ob die Länge des Passworts mindestens 6 Zeichen beträgt
		.withMessage('Das Passwort muss mindestens 6 Zeichen lang sein'), // Wenn nicht, wird diese Fehlermeldung ausgegeben

	// Diese Funktion wird ausgeführt, nachdem die obigen Validierungsregeln ausgeführt wurden
	(req, res, next) => {
		// Überprüfung, ob Fehler aufgetreten sind
		const errors = validationResult(req);
		// Wenn es Fehler gibt
		if (!errors.isEmpty()) {
			// Senden einer Antwort mit dem Statuscode 400 und den Fehlerdetails
			return res.status(400).json({ errors: errors.array() });
		}
		// Wenn es keine Fehler gibt, wird mit der nächsten Middleware oder Route fortgefahren
		next();
	},
];

// Exportieren der Validierungsfunktion, damit sie in anderen Dateien verwendet werden kann
module.exports = {
	validateUserSignup,
	validateUserLogin,
};
