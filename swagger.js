// const swaggerAutogen = require("swagger-autogen")(); // openapi: 2.0
const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });

const doc = {
  info: {
    version: "1.2.0",
    title: "Tools Collection Project API",
    description: "Create an API that will allow users to interact with a collection of tools.",
    contact: {
      name: "API Support - Vern Wolfley",
      email: "wol21023@byui.edu",
    },
    license: {
      name: "MIT",
      url: "https://opensource.org/license/mit",
    },
  },
  servers: [
    {
      url: "https://tools-collection-project.onrender.com",
      description: "Production server",
    },
    {
      url: "http://localhost:8080",
      description: "Local development server",
    },
  ],
  tags: [
    {
      name: "Users",
      description: "Operations about users",
    },
    {
      name: "UserTools",
      description: "Operations about userTools",
    },
    {
      name: "Tools",
      description: "Operations about tools",
    },
    {
      name: "ToolSets",
      description: "Operations about toolSets",
    },
  ],
  components: {
    securitySchemes: {
      OAuth2: {
        type: "oauth2",
        description: "This API uses OAuth 2 with the authorizationCode grant flow.",
        flows: {
          authorizationCode: {
            authorizationUrl: "https://dev-27e8hpwlly70ztgu.us.auth0.com/authorize",
            tokenUrl: "https://dev-27e8hpwlly70ztgu.us.auth0.com/oauth/token",
            scopes: {
              read: "Grants read access",
              write: "Grants write access",
              admin: "Grants access to admin operations",
            },
          },
        },
      },
    },
  },
};

// Output file
const outputFile = "./swagger.json";

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the
root file where the route starts, such as index.js, app.js, routes.js, etc ... */
const routes = ["./src/routes/index.js"];

// generate swagger.json
swaggerAutogen(outputFile, routes, doc);
