const express = require('express'); // Importing Express.js to create the server
const db = require('./config/connection'); // Importing the database connection
const routes = require('./routes'); // Importing the routes for handling requests

const PORT = process.env.PORT || 3001; // Setting the port number, using an environment variable if available, otherwise defaulting to 3001
const app = express(); // Creating an instance of an Express app

app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded data
app.use(express.json()); // Middleware to parse JSON data
app.use(routes); // Using the routes defined in the routes folder

// Once the database is connected, start the server
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`); // Log a message to the console that the server is running
  });
});
