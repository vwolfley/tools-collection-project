/*******************************************
 * @desc: This app.js file is the primary file of the
 application. It is used to control the project.
 *******************************************/
// 3rd party modules
const favicon = require("serve-favicon");
const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;

// Local modules
require("./src/auth/passport-google");
require("./src/auth/passport-github");


// Swagger
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

// Local modules
const mongodb = require("./src/database/mongo-connect");

// Server Initialization
const app = express();

// Middlewares
app.use(bodyParser.json());
// Error handling for invalid JSON body
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError) {
    return res.status(400).json({ message: "Invalid JSON" });
  }
  next();
});

// Returns a middleware to serve favicon
app.use(favicon(__dirname + "/src/public/favicon.ico"));
// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// CORS Middleware
app.use((req, res, next) => {
  const allowedOrigin =
    process.env.NODE_ENV === "production"
      ? "https://cse341-web-services-vw.onrender.com"
      : "http://localhost:8080";
  res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  next();
});

// Import the routes from the routes folder
app.use("/", require("./src/routes"));

/* ***********************
 * 404 Middleware for undefined routes
 *************************/
app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});

/* ***********************
 * Global Error Handling Middleware
 *************************/
app.use((err, req, res, next) => {
  console.error("Error: ", err.stack);
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
  });
});

/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT || 8080;
const host = process.env.HOST || "localhost";

/* ***********************
 * Log statement to confirm server operation
 *************************/
mongodb.initDb((err, mongodb) => {
  if (err) {
    console.error("❌ Database Connection Error:", err);
    process.exit(1); // Exit process if DB connection fails
  } else {
    app.listen(port, () => {
      console.log(`✅ App connected to DB and listening on ${host}:${port}`);
    });
  }
});
