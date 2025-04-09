/*******************************************
 * @desc: This file contains the controller
  functions for the routes in userTools.js
 ******************************************/
const mongoose = require("mongoose");
const userToolModel = require("../models/userTool-model");

const userToolsController = {};

/* **************************
 * Get all userTools
 ****************************/
userToolsController.getAllUserTools = async (req, res, next) => {
  /*
    #swagger.summary = 'Get all userTools'
    #swagger.description = 'Returns all userTools'
    #swagger.tags = ['UserTools']
    #swagger.security = [{
        "OAuth2": ["read"]
    }]
  */
  try {
    const result = await userToolModel.getAllUserTools();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  } catch (error) {
    console.error("Error getting userTools:", error);
    res.status(500).json({ message: "An unexpected error occurred.", error: error.message });
  }
};

/* **************************
 * Get userTool by id
 ****************************/
userToolsController.getUserToolByID = async (req, res, next) => {
  /*
    #swagger.summary = 'Get userTool by id'
    #swagger.description = 'Returns a userTool with specified id'
    #swagger.tags = ['UserTools']
  */
  try {
    const { id } = req.params;

    // Validate the ObjectId before querying
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user tool ID format." });
    }

    const tool = await userToolModel.getUserTool({ _id: id });

    if (!tool) {
      return res.status(404).json({ message: "User Tool not found." });
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(tool);
  } catch (error) {
    console.error("Error getting user tool:", error);
    res.status(500).json({ message: "An unexpected error occurred.", error: error.message });
  }
};

/* *****************************************
 * POST - Add a userTool into the database
 *******************************************/
userToolsController.createUserTool = async (req, res, next) => {
  /*
    #swagger.summary = 'Add a userTool'
    #swagger.description = 'Add a userTool to the database'
    #swagger.tags = ['UserTools']
  */
  try {
    const {
      tool_id,
      set_id,
      serial_number,
      condition,
      purchase_date,
      price,
      location,
      notes,
      loanedTo,
    } = req.body;

    // Create and save new userTool document
    const newUserTool = await userToolModel.createUserTool(
      tool_id,
      set_id,
      serial_number,
      condition,
      purchase_date,
      price,
      location,
      notes,
      loanedTo,
    );

    res.setHeader("Content-Type", "application/json");
    res.status(201).json({ message: "User Tool created successfully.", toolId: newUserTool._id });
  } catch (error) {
    console.error("Error creating tool:", error);
    res.status(500).json({ message: "An unexpected error occurred.", error: error.message });
  }
};

/* ********************************************
 * PUT - Update userTool in the database by id
 **********************************************/
userToolsController.updateUserTool = async (req, res, next) => {
  /*
    #swagger.summary = 'Update a existing userTool by id'
    #swagger.description = 'Update a existing userTool in the database by id'
    #swagger.tags = ['UserTools']
    #swagger.security = [{
        "OAuth2": ["write"]
    }]
  */
  try {
    const { id } = req.params; // ID should come from params
    const {
      tool_id,
      set_id,
      serial_number,
      condition,
      purchase_date,
      price,
      location,
      notes,
      loanedTo,
    } = req.body; // Tool data should come from the body

    // Validate ObjectId before using it
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid ObjectId format" });
    }
    // Update tool in the database
    const updatedUserTool = await userToolModel.updateUserTool(
      tool_id,
      set_id,
      serial_number,
      condition,
      purchase_date,
      price,
      location,
      notes,
      loanedTo,
    );

    if (updatedUserTool) {
      res.status(200).json(updatedTool);
    } else {
      res.status(404).json({ message: "Failed to update user tool. No changes made." });
    }
  } catch (error) {
    console.error("Error updating user tool:", error);
    res.status(500).json({ message: "An unexpected error occurred.", error: error.message });
  }
};

/* *************************************************
 * DELETE - delete userTool from the database by id
 ***************************************************/
userToolsController.deleteUserTool = async (req, res, next) => {
  /*
    #swagger.summary = "Delete a userTool by id"
    #swagger.description = "Delete a userTool in the database by id"
    #swagger.tags = ['UserTools']
    #swagger.security = [{
        "OAuth2": ["admin"]
    }]
  */
  try {
    const userToolId = ObjectId.createFromHexString(req.params.id);
    const response = await mongodb
      .getDb()
      .db()
      .collection("userTools")
      .deleteOne({ _id: userToolId });
    if (response.deletedCount > 0) {
      res.status(200).send();
    } else {
      res.status(404).json({ message: "userTool not found." });
    }
  } catch (error) {
    console.error("Error deleting userTool:", error);
    res.status(500).json({ message: "An unexpected error occurred.", error: error.message });
  }
};

module.exports = userToolsController;
