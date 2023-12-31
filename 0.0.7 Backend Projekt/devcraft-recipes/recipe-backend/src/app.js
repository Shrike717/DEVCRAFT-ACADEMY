// Import cors
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const recipeRoutes = require('./routes/recipeRoutes');

const express = require('express');
require('dotenv').config({path: `.env.${process.env.NODE_ENV}`});

const app = express();
let port = process.env.NODE_ENV !== 'testserver' ? 5000 : 5001;

// Use cors
app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/recipes', recipeRoutes);

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

module.exports = {app, start};
