// backend/server.js
const express = require('express');
const cors = require('cors');
const db = require('./database.js'); // Import the database connection

const app = express();
const PORT = 8080;

// Middleware
app.use(cors());
app.use(express.json()); // This allows the server to accept and parse JSON in request bodies

// A simple root route to check if the server is up
app.get("/", (req, res) => {
    res.json({ message: "Welcome to the User Management API!" });
});
const userRoutes = require('./routes/users.js');
app.use('/api/users', userRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
