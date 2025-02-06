/*******************************************
 * @desc: This app.js file is the primary file of the
 application. It is used to control the project.
 *******************************************/
// 3rd party modules
const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;

// Swagger
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

// Local modules
const mongodb = require("./src/database/mongo-connect");

// Server Initialization
const app = express();

// Middlewares
app.use(bodyParser.json());
// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res, next) => {
  const allowedOrigin =
    process.env.NODE_ENV === "production" ? "https://cse341-web-services-vw.onrender.com" : "http://localhost:8080";
  res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  next();
});

// Import the routes from the routes folder
app.use("/", require("./src/routes"));

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
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`app connected to DB and listening on ${host}:${port}`);
    });
  }
});
