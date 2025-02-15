// Import the express module
const express = require("express");
const router = express.Router();
const userToolsController = require("../controllers/userToolsController");
const utilities = require("../utilities/");
const validate = require("../utilities/userTools-validation");

// Get all userTools
router.get("/", userToolsController.getAll);
// Get userTools by id
router.get("/:id", userToolsController.getUserTools);
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
  userToolsController.updateUserTools,
),
  // Delete userTools by id
  router.delete("/:id", userToolsController.deleteUserTool);

module.exports = router;
