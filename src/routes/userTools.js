// Import the express module
const express = require("express");
const router = express.Router();
const userToolsController = require("../controllers/userToolsController");
const utilities = require("../utilities/");
const validate = require("../utilities/userTools-validation");

// Get all userTools
router.get("/", utilities.handleErrors(userToolsController.getAll));
// Get userTools by id
router.get("/:id", utilities.handleErrors(userToolsController.getUserTools));
// Insert one userTools into the database
router.post(
  "/",
  validate.userToolsRules(),
  validate.checkUserToolsData,
  utilities.handleErrors(userToolsController.createUserTool),
);
// Update userTools by id
router.put(
  "/:id",
  validate.userToolsRules(),
  validate.checkUserToolsData,
  utilities.handleErrors(userToolsController.updateUserTools),
);
// Delete userTools by id
router.delete("/:id", utilities.handleErrors(userToolsController.deleteUserTool));

module.exports = router;
