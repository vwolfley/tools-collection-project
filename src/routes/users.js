// Import the express module
const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const utilities = require("../utilities/");
const validate = require("../utilities/account-validation");

// Get all users
router.get("/", utilities.handleErrors(usersController.getAll));
// Get users by id
router.get("/:id", utilities.handleErrors(usersController.getUser));
// Insert one users into the database
router.post(
  "/",
  validate.usersRules(),
  validate.checkUsersData,
  utilities.handleErrors(usersController.createUser),
);
// Update users by id
router.put(
  "/:id",
  validate.usersRules(),
  validate.checkUsersData,
  utilities.handleErrors(usersController.updateUser),
);
// Delete users by id
router.delete("/:id", utilities.handleErrors(usersController.deleteUser));

module.exports = router;
