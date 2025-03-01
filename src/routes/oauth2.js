const express = require("express");
const router = express.Router();
const passport = require("passport");
const { auth, requiresAuth } = require('express-openid-connect');


router.get('/', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});



// Passport middleware

// router.get("/logout", async (req, res) => {
//   // Handle with passport
//   res.send("Logout Url!");
// });

// router.get("/google", async (req, res) => {
//   // Handle with passport
//   res.send("Google OAuth Callback Url!");
// });

// router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

// router.get("/github", async (req, res) => {
//   // Handle with passport
//   res.send("Github OAuth Callback Url!");
// });

// router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));

module.exports = router;
