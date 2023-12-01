const express = require('express');
const userRoutes = require('./routes/userRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const ingredientRoutes = require('./routes/ingredientRoutes');

const app = express();
let port = process.env.NODE_ENV !== 'test' ? 3000 : 3001;

app.use(express.json());

app.use('/users', userRoutes);
app.use('/recipes', recipeRoutes);
app.use('/ingredients', ingredientRoutes);

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
