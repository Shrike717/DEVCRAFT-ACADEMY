// Import cors
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const recipeRoutes = require('./routes/recipeRoutes');

const express = require('express');
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

const app = express();
let port = process.env.NODE_ENV !== 'testserver' ? 5000 : 5001;

// Use cors
app.use(
	cors({
		origin: 'http://localhost:3000', // oder die URL Ihrer Frontend-Anwendung
		credentials: true, // Muss eingestellt sein, um Cookies über CORS senden zu können
	})
);
app.use(cookieParser()); // wenn ich Cookies in einem Controller in den Cookie Store schreiben möchte, muss ich den Cookie Parser verwenden.
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/recipes', recipeRoutes);

// ******* Setzen eines Cookie mit dem Cookie-Parser: ********
app.get('/set-cookie', (req, res) => {
	res.cookie('user', 'PrincessLeia', {
		httpOnly: true,
		maxAge: 36000,
	}); // 15 Minuten
	res.send('Cookie wurde gesetzt');
});

app.use((error, req, res, next) => {
	console.error(error.stack);
	res.status(500).send('Something broke!');
});

function start(port) {
	return app.listen(port, () => {
		return console.log(`Express is listening at http://localhost:${port}`);
	});
}

if (require.main === module) {
	// Startet den Server nur, wenn app.js direkt ausgeführt wird.
	start(port);
}

module.exports = { app, start };
