// Import the express module
const express = require("express");
const router = express.Router();
const toolSetsController = require("../controllers/toolSetsController");
const utilities = require("../utilities/");
const validate = require("../utilities/account-validation");

// Get all toolSets
router.get("/", utilities.handleErrors(toolSetsController.getAll));
// Get toolSets by id
router.get("/:id", utilities.handleErrors(toolSetsController.getToolSet));
// Insert one toolSets into the database
router.post(
  "/",
  validate.toolSetsRules(),
  validate.checkToolSetsData,
  utilities.handleErrors(toolSetsController.createToolSet),
);
// Update toolSets by id
router.put(
  "/:id",
  validate.toolSetsRules(),
  validate.checkToolSetsData,
  utilities.handleErrors(toolSetsController.updateToolSet),
);
// Delete toolSets by id
router.delete("/:id", utilities.handleErrors(toolSetsController.deleteToolSet));

module.exports = router;
