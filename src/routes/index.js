/********************
 * @desc: This file is the entry point
 * for all routes in the application.
 *******************/

const express = require("express");
const router = express.Router();

// Home page info
// const homeInfo = `
// <h2>Welcome to the Tools Project API!</h2>
// <p>Sign in to the Tools Project API:</p>
// <menu>
//   <li><a id="logout" href="/oauth2/logout"><button>Logout</button></a></li>
//   <li><a id="google" href="/oauth2/google"><button>Log in with Google</button></a></li>
//   <li><a id="github" href="/oauth2/github"><button>Log in with GitHub</button></a></li>
// </menu>
// `;

const logout = `
<h2>Welcome to the Tools Project API!</h2>
<h3>You are Logged Out</h3>
<p>Sign in to the Tools Project API:</p>
<menu>
  <li><a id="logout" href="/login"><button>Login</button></a></li>
</menu>
`;
const login = `
<h2>Welcome to the Tools Project API!</h2>
<h3>You are Logged In</h3>
<menu>
  <li><a id="logout" href="/logout"><button>Logout</button></a></li>
</menu>
`;

// Home route
router.get("/", (req, res) => {
  console.log("req.oidc.isAuthenticated():", req.oidc.isAuthenticated());
  // #swagger.ignore = true
  // res.send("<h2>Welcome to the Tools Project API!</h2>");
  res.send(req.oidc.isAuthenticated() ? login : logout);
  // res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
});



router.use("/users", require("./users"));
router.use("/userTools", require("./userTools"));
router.use("/tools", require("./tools"));
router.use("/toolSets", require("./toolSets"));
router.use("/profile", require("./oauth2"));

module.exports = router;
