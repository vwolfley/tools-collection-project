// Import the express module
const express = require("express");
const router = express.Router();
const toolsController = require("../controllers/toolsController");
const utilities = require("../utilities/");
const validate = require("../utilities/tools-validation");

// Get all tools
router.get("/", toolsController.getAllTools);
// Get tools by id
router.get("/:id", toolsController.getToolByID);
// Insert one tools into the database
router.post("/", validate.toolsRules(), validate.checkToolsData, toolsController.createTool);
// Update tools by id
router.put("/:id", validate.toolsRules(), validate.checkToolsData, toolsController.updateTool);
// Delete tools by id
router.delete("/:id", toolsController.deleteTool);

module.exports = router;
