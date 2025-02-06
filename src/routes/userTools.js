/********************
 * @desc: This file is the entry point
 * for all routes in the application.
 *******************/

// Import the express module
const express = require("express");
const router = express.Router();
const userToolsController = require("../controllers/userToolsController");

// Get all userTools
router.get("/", userToolsController.getAll);
// Get userTools by id
router.get("/:id", userToolsController.getUserTools);
// Insert one userTools into the database
router.post("/", userToolsController.createUserTool);
// Update userTools by id
router.put("/:id", userToolsController.updateUserTools);
// Delete userTools by id
router.delete("/:id", userToolsController.deleteUserTool);

module.exports = router;
