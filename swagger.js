// const swaggerAutogen = require("swagger-autogen")(); // openapi: 2.0
const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });

const doc = {
  info: {
    version: "1.0.0",
    title: "Tools Collection Project API",
    description: "Create an API that will allow users to interact with a collection of tools.",
    contact: {
      name: "API Support - Vern Wolfley",
      email: "wol21023@byui.edu",
    },
    license: {
      name: "MIT",
      url: "https://opensource.org/license/mit"
    },
  },
  servers: [
    // {
    //   url: "https://cse341-web-services-vw.onrender.com",
    //   description: "Production server",
    // },
    {
      url: "http://localhost:8080",
      description: "Local development server",
    }
  ],
};

// Output file
const outputFile = "./swagger.json";

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the
root file where the route starts, such as index.js, app.js, routes.js, etc ... */
const routes = ["./src/routes/index.js"];

// generate swagger.json
swaggerAutogen(outputFile, routes, doc);
