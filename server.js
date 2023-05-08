const express = require("express");
const cors = require("cors");

// Load .env file configs
require("dotenv").config();

// Connect to MongoDB
require("./db");

const PORT = process.env.PORT;

// Init Express app
const app = express();

// Set up Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));

// Middleware for Router module
app.use(require('./router/register'));

// Start the server
app.listen(PORT, () => {
  console.log(`[+] Server is running on port ${PORT}`);
});
