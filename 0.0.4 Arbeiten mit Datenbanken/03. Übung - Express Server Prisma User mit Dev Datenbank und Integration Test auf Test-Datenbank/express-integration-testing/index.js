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
	// This module was run directly from the command line as in node xxx.js
	start(port);
}

module.exports = { app, start };
