/*******************************************
 * @desc: This file contains the controller
  functions for the routes in users.js
 ******************************************/
const bcrypt = require("bcryptjs");
const userModel = require("../models/user-model");

const usersController = {};

/* **************************
 * Get all users
 ****************************/
usersController.getAllUsers = async (req, res, next) => {
  /*
    #swagger.summary = 'Get all users'
    #swagger.description = 'Returns all users'
    #swagger.tags = ['Users']
    #swagger.security = [{
        "OAuth2": ["read"]
    }]
  */
  try {
    const users = await userModel.getAllUsers();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(users);
  } catch (error) {
    console.error("Error getting users:", error);
    res.status(500).json({ message: "An unexpected error occurred.", error: error.message });
  }
};

/* **************************
 * Get user by User Name
 ****************************/
usersController.getByUserName = async (req, res, next) => {
  /*
    #swagger.summary = 'Get user by username'
    #swagger.description = 'Returns a user with specified username'
    #swagger.tags = ['Users']
  */
  try {
    // const username = req.params.username;
    const username = req.params.username;
    const result = await userModel.getUser({ username: username });

    if (!result) {
      return res.status(404).json({ message: "User not found." });
    }
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  } catch (error) {
    console.error(`Error fetching user "${username}":`, error);
    return res.status(500).json({ message: "An unexpected error occurred.", error: error.message });
  }
};

/* **************************
 * Get user by User email
 ****************************/
usersController.getByUserEmail = async (req, res, next) => {
  /*
    #swagger.summary = 'Get user by user email'
    #swagger.description = 'Returns a user with specified user email'
    #swagger.tags = ['Users']
  */
  try {
    // const email = req.params.email;
    const email = req.params.username;
    const result = await userModel.getUser({ email: email });

    if (!result) {
      return res.status(404).json({ message: "User not found." });
    }
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  } catch (error) {
    console.error(`Error fetching user "${email}":`, error);
    return res.status(500).json({ message: "An unexpected error occurred.", error: error.message });
  }
};

usersController.getByQuery = async (req, res) => {
  /*
    #swagger.summary = 'Get user by username or email'
    #swagger.description = 'Returns a user with specified username or email'
    #swagger.tags = ['Users']
  */
  const { username, email } = req.query;

  if (username) {
    return usersController.getByUserName(req, res);
  } else if (email) {
    return usersController.getByUserEmail(req, res);
  } else {
    return res.status(400).json({ message: "Please provide a username or email" });
  }
};

/* *****************************************
 * POST - Add a user into the database
 *******************************************/
usersController.createUser = async (req, res, next) => {
  /*
    #swagger.summary = 'Add a user'
    #swagger.description = 'Add a user to the database'
    #swagger.tags = ['Users']
    #swagger.security = [{
        "OAuth2": [ "write"]
    }]
  */
  try {
    const { username, password, firstName, lastName, email, phoneNumber } = req.body;

    // Check if the username is already taken
    // Check if the email is already taken
    const existingUser = await userModel.getUser({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return res.status(400).json({
        message:
          existingUser.username === username
            ? "Username is already taken."
            : "Email address is already taken.",
      });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save new user document
    const newUser = await userModel.createUser(
      username,
      firstName,
      lastName,
      email,
      phoneNumber,
      hashedPassword,
    );

    res.status(201).json({ message: "User created successfully.", userId: newUser._id });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "An unexpected error occurred.", error: error.message });
  }
};

/* ********************************************
 * PUT - Update user in the database by username
 **********************************************/
usersController.updateUser = async (req, res, next) => {
  /*
    #swagger.summary = 'Update an existing user by username'
    #swagger.description = 'Update an existing user in the database by username'
    #swagger.tags = ['Users']
    #swagger.security = [{
        "OAuth2": ["write"]
    }]
  */
  try {
    const { username: userNameParam } = req.params; // Username from URL
    const { firstName, lastName, email, phoneNumber } = req.body; // Extract username, password, and other fields

    // Check if the user exists
    const existingUser = await userModel.getUser({ username: userNameParam });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found." });
    }

    // If updating email, check if the new email is already taken
    if (email !== existingUser.email) {
      const emailExists = await userModel.getUser({ email: email });
      if (emailExists) {
        return res.status(400).json({ message: "Email is already in use." });
      }
    }

    // Update the user
    const updatedUser = await userModel.updateUser(
      userNameParam,
      firstName,
      lastName,
      email,
      phoneNumber,
    );

    if (!updatedUser) {
      return res.status(400).json({ message: "Failed to update user. No changes made." });
    }

    res.status(200).json(updatedUser); // Return the updated user object
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "An unexpected error occurred.", error: error.message });
  }
};

/* *************************************************
 * DELETE - delete user from the database by username
 ***************************************************/
usersController.deleteUser = async (req, res, next) => {
  /*
    #swagger.summary = "Delete a user by username"
    #swagger.description = "Delete a user in the database by username"
    #swagger.tags = ['Users']
    #swagger.security = [{
        "OAuth2": ["admin"]
    }]
  */
  try {
    const username = req.params.username;

    // Find and delete the user
    const deletedUser = await userModel.deleteUser(username);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    // Return success and the deleted user (optional, for logging purposes)
    res.status(200).json({ message: "User deleted successfully.", user: deletedUser.username });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "An unexpected error occurred.", error: error.message });
  }
};

module.exports = usersController;
