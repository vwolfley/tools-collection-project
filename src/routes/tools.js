// Import the express module
const express = require("express");
const router = express.Router();
const toolsController = require("../controllers/toolsController");
const utilities = require("../utilities/");
const validate = require("../utilities/account-validation");

// Get all tools
router.get("/", utilities.handleErrors(toolsController.getAll));
// Get tools by id
router.get("/:id", utilities.handleErrors(toolsController.getTool));
// Insert one tools into the database
router.post(
  "/",
  validate.toolsRules(),
  validate.checkToolsData,
  utilities.handleErrors(toolsController.createTool),
);
// Update tools by id
router.put(
  "/:id",
  validate.toolsRules(),
  validate.checkToolsData,
  utilities.handleErrors(toolsController.updateTool),
);
// Delete tools by id
router.delete("/:id", utilities.handleErrors(toolsController.deleteTool));

module.exports = router;
