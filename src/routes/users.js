// Import the express module
const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const utilities = require("../utilities/");
const validate = require("../utilities/users-validation");

// Get all users
router.get("/", usersController.getAll);
// Get users by username
router.get("/:username", usersController.getUser);
// Insert one users into the database
router.post("/", validate.usersRules(), validate.checkUsersData, usersController.createUser);

// Update users by username
router.put("/:username", validate.usersRules(), validate.checkUsersData, usersController.updateUser);

// Delete users by username
router.delete("/:username", usersController.deleteUser);

module.exports = router;
