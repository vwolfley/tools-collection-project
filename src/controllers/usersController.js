/*******************************************
 * @desc: This file contains the controller
  functions for the routes in users.js
 ******************************************/

const mongodb = require("../database/mongo-connect");
const ObjectId = require("mongodb").ObjectId;

const usersController = {};

/* **************************
 * Get all users
 ****************************/
usersController.getAll = async (req, res, next) => {
  /*
    #swagger.summary = 'Get all users'
    #swagger.description = 'Returns all users'
    #swagger.tags = ['Users']
  */
  try {
    const result = await mongodb.getDb().db().collection("users").find();
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists);
    });
  } catch (error) {
    console.error("Error getting users:", error);
    res.status(500).json({ message: "An unexpected error occurred.", error: error.message });
  }
};

/* **************************
 * Get user by id
 ****************************/
usersController.getUser = async (req, res, next) => {
  /*
    #swagger.summary = 'Get user by id'
    #swagger.description = 'Returns a user with specified id'
    #swagger.tags = ['Users']
  */
  try {
    const userId = ObjectId.createFromHexString(req.params.id);
    const result = await mongodb.getDb().db().collection("users").findOne({ _id: userId });

    if (!result) {
      return res.status(404).json({ message: "Users not found." });
    }
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  } catch (error) {
    console.error("Error getting user:", error);
    res.status(500).json({ message: "An unexpected error occurred.", error: error.message });
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
  */
  try {
    const user = {
      username: req.body.username,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
    };

    const response = await mongodb.getDb().db().collection("users").insertOne(user);
    if (response.acknowledged) {
      res.setHeader("Content-Type", "application/json");
      res.status(201).json({ message: "User created successfully.", userId: response.insertedId });
    } else {
      res.status(500).json({ message: "Failed to create user. No changes made." });
    }
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "An unexpected error occurred.", error: error.message });
  }
};

/* ********************************************
 * PUT - Update user in the database by id
 **********************************************/
usersController.updateUser = async (req, res, next) => {
  /*
    #swagger.summary = 'Update a existing user by id'
    #swagger.description = 'Update a existing user in the database by id'
    #swagger.tags = ['Users']
  */
  try {
    const userId = ObjectId.createFromHexString(req.params.id);
    const user = {
      username: req.body.username,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
    };

    const response = await mongodb
      .getDb()
      .db()
      .collection("users")
      .replaceOne({ _id: userId }, user);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Failed to update user. No changes made." });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "An unexpected error occurred.", error: error.message });
  }
};

/* *************************************************
 * DELETE - delete user from the database by id
 ***************************************************/
usersController.deleteUser = async (req, res, next) => {
  /*
    #swagger.summary = "Delete a user by id"
    #swagger.description = "Delete a user in the database by id"
    #swagger.tags = ['Users']
  */
  try {
    const userId = ObjectId.createFromHexString(req.params.id);
    const response = await mongodb.getDb().db().collection("users").deleteOne({ _id: userId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "User not found." });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "An unexpected error occurred.", error: error.message });
  }
};

module.exports = usersController;
