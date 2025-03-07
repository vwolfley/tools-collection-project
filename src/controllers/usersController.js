/*******************************************
 * @desc: This file contains the controller
  functions for the routes in users.js
 ******************************************/
const bcrypt = require("bcryptjs");
const User = require("../models/user-model");

const usersController = {};

/* **************************
 * Get all users
 ****************************/
usersController.getAll = async (req, res, next) => {
  /*
    #swagger.summary = 'Get all users'
    #swagger.description = 'Returns all users'
    #swagger.tags = ['Users']
    #swagger.security = [{
        "OAuth2": ["read"]
    }]
  */
  try {
    const users = await User.find({});
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
usersController.getUser = async (req, res, next) => {
  /*
    #swagger.summary = 'Get user by username'
    #swagger.description = 'Returns a user with specified username'
    #swagger.tags = ['Users']
  */
  try {
    const username = req.params.username;

    const result = await User.findOne({ username: username }).exec();

    if (!result) {
      return res.status(404).json({ message: "User not found." });
    }
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  } catch (error) {
    console.error(`Error fetching user "${req.params.username}":`, error);
    return res.status(500).json({ message: "An unexpected error occurred.", error: error.message });
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
    const existingUser = await User.findOne({ username: username }).exec();
    if (existingUser) {
      return res.status(400).json({ message: "Username is already taken." });
    }

    // Check if the email is already taken
    const existingEmail = await User.findOne({ email: email }).exec();
    if (existingEmail) {
      return res.status(400).json({ message: "Email address is already taken." });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save new user document
    const newUser = await User.create({
      username: username,
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
      password: hashedPassword,
    });

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
    const { username: userNameBody, email: emailBody, password, ...updateData } = req.body; // Extract username, password, and other fields

    // Check if the user exists
    const existingUser = await User.findOne({ username: userNameParam });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found." });
    }

    // If updating username, check if the new username is already taken
    if (userNameBody && userNameBody !== userNameParam) {
      const usernameExists = await User.findOne({ username: userNameBody });
      if (usernameExists) {
        return res.status(400).json({ message: "Username is already taken." });
      }
      updateData.username = userNameBody; // Set new username if valid
    }

    // Hash the password before saving (if updating password)
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    // If updating email, check if the new email is already taken
    if (emailBody && emailBody !== existingUser.email) {
      const emailExists = await User.findOne({ email: emailBody });
      if (emailExists) {
        return res.status(400).json({ message: "Email is already in use." });
      }
      updateData.email = emailBody; // Set new email if valid
    }

    // Update the user
    const updatedUser = await User.findOneAndUpdate(
      { username: userNameParam }, // Find user by current username
      { $set: updateData }, // Update only provided fields
      { new: true, runValidators: true }, // Return updated document & enforce schema validation
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
    const deletedUser = await User.findOneAndDelete({ username });

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    // Return success and the deleted user (optional, for logging purposes)
    res.status(200).json({ message: "User deleted successfully.", user: deletedUser });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "An unexpected error occurred.", error: error.message });
  }
};

module.exports = usersController;
