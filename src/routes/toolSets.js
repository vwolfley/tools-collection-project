// Import the express module
const express = require("express");
const router = express.Router();
const toolSetsController = require("../controllers/toolSetsController");
const utilities = require("../utilities/");
const validate = require("../utilities/toolSets-validation");

// Get all toolSets
router.get("/", toolSetsController.getAllToolSets);
// Get toolSets by id
router.get("/:id", toolSetsController.getToolSetByID);
// Insert one toolSets into the database
router.post(
  "/",
  validate.toolSetsRules(),
  validate.checkToolSetsData,
  toolSetsController.createToolSet,
);
// Update toolSets by id
router.put(
  "/:id",
  validate.toolSetsRules(),
  validate.checkToolSetsData,
  toolSetsController.updateToolSet,
);
// Delete toolSets by id
router.delete("/:id", toolSetsController.deleteToolSet);

module.exports = router;
