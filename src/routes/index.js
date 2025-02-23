/********************
 * @desc: This file is the entry point
 * for all routes in the application.
 *******************/

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  // #swagger.ignore = true
  res.send("<h2>Welcome to the Tools Project API!</h2><p>Sign in with Google</p>");
});


router.use("/users", require("./users"));
router.use("/userTools", require("./userTools"));
router.use("/tools", require("./tools"));
router.use("/toolSets", require("./toolSets"));
router.use("/oauth", require("./oauth"));

module.exports = router;
