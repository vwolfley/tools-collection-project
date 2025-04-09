// Import the express module
const express = require("express");
const router = express.Router();
const userToolsController = require("../controllers/userToolsController");
const utilities = require("../utilities/");
const validate = require("../utilities/userTools-validation");
const { auth, requiresAuth } = require('express-openid-connect');

// Get all userTools
router.get("/", requiresAuth(), userToolsController.getAllUserTools);
// Get userTools by id
router.get("/:id", userToolsController.getUserTool);
// Insert one userTools into the database
router.post(
  "/",
  validate.userToolsRules(),
  validate.checkUserToolsData,
  userToolsController.createUserTool,
);
// Update userTools by id
router.put(
  "/:id",
  validate.userToolsRules(),
  validate.checkUserToolsData,
  userToolsController.updateUserTool,
),
  // Delete userTools by id
  router.delete("/:id", requiresAuth(), userToolsController.deleteUserTool);

module.exports = router;
