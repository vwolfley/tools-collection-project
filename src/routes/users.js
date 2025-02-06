/********************
 * @desc: This file is the entry point
 * for all routes in the application.
 *******************/

// Import the express module
const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

// Get all users
router.get("/", usersController.getAll);
// Get users by id
router.get("/:id", usersController.getUser);
// Insert one users into the database
router.post("/", usersController.createUser);
// Update users by id
router.put("/:id", usersController.updateUser);
// Delete users by id
router.delete("/:id", usersController.deleteUser);

module.exports = router;
