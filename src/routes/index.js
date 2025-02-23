/********************
 * @desc: This file is the entry point
 * for all routes in the application.
 *******************/

const express = require("express");
const router = express.Router();

// Home page info
const homeInfo = `
<h2>Welcome to the Tools Project API!</h2>
<p>Sign in to the Tools Project API:</p>
<menu>
  <li><button id="logout">logout</button></li>
  <li><button id="google">Log in with Google</button></li>
  <li><button id="github">Log in with GitHub</button></li>
</menu>
`;

// Home route
router.get("/", (req, res) => {
  // #swagger.ignore = true
  res.send(homeInfo);
});

router.use("/users", require("./users"));
router.use("/userTools", require("./userTools"));
router.use("/tools", require("./tools"));
router.use("/toolSets", require("./toolSets"));
router.use("/oauth", require("./oauth"));

module.exports = router;
