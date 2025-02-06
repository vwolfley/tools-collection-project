/********************
 * @desc: This file is the entry point
 * for all routes in the application.
 *******************/

// Import the express module
const express = require("express");
const router = express.Router();
const toolsController = require("../controllers/toolsController");

// Get all tools
router.get("/", toolsController.getAll);
// Get tools by id
router.get("/:id", toolsController.getTool);
// Insert one tools into the database
router.post("/", toolsController.createTool);
// Update tools by id
router.put("/:id", toolsController.updateTool);
// Delete tools by id
router.delete("/:id", toolsController.deleteTool);

module.exports = router;
