const express = require('express');
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
const userRoutes = require('./src/routes/userRoutes');
const authRoutes = require('./src/routes/authRoutes');

const app = express();
let port = process.env.NODE_ENV !== 'testserver' ? 3000 : 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRoutes);
app.use('/users', userRoutes);

// Error Handler. Das ist gut, um eventuelle Fehler auslesen zu können die während der Request-Verarbeitung auftreten.
app.use((error, req, res, next) => {
	console.error(error.stack);
	res.status(500).send('Something broke!');
});

function start(port) {
	const server = app.listen(port, () => {
		console.log(`Server is running on port ${port}---------`);
	});
	return server;
}

if (require.main === module) {
	// Startet den Server nur, wenn index.js direkt ausgeführt wird.
	start(port);
}

module.exports = { app, start };
