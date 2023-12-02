const express = require('express');
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
const userRoutes = require('./src/routes/userRoutes');

const app = express();
let port = process.env.NODE_ENV !== 'testserver' ? 3000 : 3001;

app.use(express.json());

app.use('/users', userRoutes);

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
