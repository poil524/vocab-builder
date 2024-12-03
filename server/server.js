// Importing required libraries and modules
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
global.Vocab = require('./api/models/vocabModel'); 
const routes = require('./api/models/vocabRoutes');

// Set up mongoose
mongoose.Promise = global.Promise;

// Connect to MongoDB database, set the port
mongoose.connect('mongodb://localhost/vocab-builder', { useNewUrlParser: true });
const port = process.env.PORT || 3000;

// Create an Express app instance
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
routes(app);

// Start the server and listen for requests
app.listen(port);

// Handle undefined routes
app.use((req, res) => {
    res.status(404).send({ url: `${req.originalUrl} not found` });
});

console.log(`Server started on port ${port}`);
