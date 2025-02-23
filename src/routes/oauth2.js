const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/logout", async (req, res) => {
  // Handle with passport
  res.send("Logout Url!");
});

// router.get("/google", async (req, res) => {
//   // Handle with passport
//   res.send("Google OAuth Callback Url!");
// });

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

// router.get("/github", async (req, res) => {
//   // Handle with passport
//   res.send("Github OAuth Callback Url!");
// });

router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));

module.exports = router;
