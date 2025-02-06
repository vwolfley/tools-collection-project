/*******************************************
 * @desc: This file contains the controller
  functions for the routes in userTools.js
 ******************************************/

const mongodb = require("../database/mongo-connect");
const ObjectId = require("mongodb").ObjectId;

const userToolsController = {};

/* **************************
 * Get all userTools
 ****************************/
userToolsController.getAll = async (req, res, next) => {
  /*
    #swagger.summary = 'Get all userTools'
    #swagger.description = 'Returns all userTools'
    #swagger.tags = ['UserTools']
  */
  try {
    const result = await mongodb.getDb().db().collection("userTools").find();
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists);
    });
  } catch (error) {
    console.error("Error getting userTools:", error);
    res.status(500).json({ message: "An unexpected error occurred.", error: error.message });
  }
};

/* **************************
 * Get userTools by id
 ****************************/
userToolsController.getUserTools = async (req, res, next) => {
  /*
    #swagger.summary = 'Get userTool by id'
    #swagger.description = 'Returns a userTool with specified id'
    #swagger.tags = ['UserTools']
  */
  try {
    const userToolId = ObjectId.createFromHexString(req.params.id);
    const result = await mongodb.getDb().db().collection("userTools").findOne({ _id: userToolId });

    if (!result) {
      return res.status(404).json({ message: "userTool not found." });
    }
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  } catch (error) {
    console.error("Error getting userTool:", error);
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
    const userTool = {
      tool_id: req.body.tool_id,
      set_id: req.body.set_id,
      serial_number: req.body.serial_number,
      condition: req.body.condition,
      purchase_date: req.body.purchase_date,
      price: req.body.price,
      location: req.body.location,
      notes: req.body.notes,
      loanedTo: req.body.loanedTo,
    };

    const response = await mongodb.getDb().db().collection("userTools").insertOne(userTool);
    if (response.acknowledged) {
      res.setHeader("Content-Type", "application/json");
      res
        .status(201)
        .json({ message: "userTool created successfully.", userId: response.insertedId });
    } else {
      res.status(500).json({ message: "Failed to create userTool. No changes made." });
    }
  } catch (error) {
    console.error("Error creating userTool:", error);
    res.status(500).json({ message: "An unexpected error occurred.", error: error.message });
  }
};

/* ********************************************
 * PUT - Update userTool in the database by id
 **********************************************/
userToolsController.updateUserTools = async (req, res, next) => {
  /*
    #swagger.summary = 'Update a existing userTool by id'
    #swagger.description = 'Update a existing userTool in the database by id'
    #swagger.tags = ['UserTools']
  */
  try {
    const userToolId = ObjectId.createFromHexString(req.params.id);
    const userTool = {
      tool_id: req.body.tool_id,
      set_id: req.body.set_id,
      serial_number: req.body.serial_number,
      condition: req.body.condition,
      purchase_date: req.body.purchase_date,
      price: req.body.price,
      location: req.body.location,
      notes: req.body.notes,
      loanedTo: req.body.loanedTo,
    };

    const response = await mongodb
      .getDb()
      .db()
      .collection("userTools")
      .replaceOne({ _id: userToolId }, userTool);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Failed to update userTool. No changes made." });
    }
  } catch (error) {
    console.error("Error updating userTool:", error);
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
  */
  try {
    const userToolId = ObjectId.createFromHexString(req.params.id);
    const response = await mongodb
      .getDb()
      .db()
      .collection("userTools")
      .deleteOne({ _id: userToolId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "userTool not found." });
    }
  } catch (error) {
    console.error("Error deleting userTool:", error);
    res.status(500).json({ message: "An unexpected error occurred.", error: error.message });
  }
};

module.exports = userToolsController;
