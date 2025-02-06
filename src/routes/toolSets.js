/********************
 * @desc: This file is the entry point
 * for all routes in the application.
 *******************/

// Import the express module
const express = require("express");
const router = express.Router();
const toolSetsController = require("../controllers/toolSetsController");

// Get all toolSets
router.get("/", toolSetsController.getAll);
// Get toolSets by id
router.get("/:id", toolSetsController.getToolSet);
// Insert one toolSets into the database
router.post("/", toolSetsController.createToolSet);
// Update toolSets by id
router.put("/:id", toolSetsController.updateToolSet);
// Delete toolSets by id
router.delete("/:id", toolSetsController.deleteToolSet);

module.exports = router;
