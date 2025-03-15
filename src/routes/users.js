// Import the express module
const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const utilities = require("../utilities/");
const validate = require("../utilities/users-validation");
const { auth, requiresAuth } = require("express-openid-connect");

// Get all users
router.get("/", requiresAuth(), usersController.getAllUsers);

// Get users by username
router.get("/:username", usersController.getByUserName);

// Insert one users into the database
router.post("/", validate.usersRules(), validate.checkUsersData, usersController.createUser);

// Update users by username
router.put(
  "/:username",
  validate.usersRules(),
  validate.checkUsersData,
  usersController.updateUser,
);

// Delete users by username
router.delete("/:username", requiresAuth(), usersController.deleteUser);

module.exports = router;
