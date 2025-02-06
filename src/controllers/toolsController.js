/*******************************************
 * @desc: This file contains the controller
  functions for the routes in tools.js
 ******************************************/

const mongodb = require("../database/mongo-connect");
const ObjectId = require("mongodb").ObjectId;

const toolsController = {};

/* **************************
 * Get all tools
 ****************************/
toolsController.getAll = async (req, res, next) => {
  /*
    #swagger.summary = 'Get all tools'
    #swagger.description = 'Returns all tools'
    #swagger.tags = ['Tools']
  */
  try {
    const result = await mongodb.getDb().db().collection("tools").find();
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists);
    });
  } catch (error) {
    console.error("Error getting tools:", error);
    res.status(500).json({ message: "An unexpected error occurred.", error: error.message });
  }
};

/* **************************
 * Get tool by id
 ****************************/
toolsController.getTool = async (req, res, next) => {
  /*
    #swagger.summary = 'Get tool by id'
    #swagger.description = 'Returns a tool with specified id'
    #swagger.tags = ['Tools']
  */
  try {
    const toolId = ObjectId.createFromHexString(req.params.id);
    const result = await mongodb.getDb().db().collection("tools").findOne({ _id: toolId });

    if (!result) {
      return res.status(404).json({ message: "Tool not found." });
    }
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  } catch (error) {
    console.error("Error getting tool:", error);
    res.status(500).json({ message: "An unexpected error occurred.", error: error.message });
  }
};

/* *****************************************
 * POST - Add a tool into the database
 *******************************************/
toolsController.createTool = async (req, res, next) => {
  /*
    #swagger.summary = 'Add a tol'
    #swagger.description = 'Add a tool to the database'
    #swagger.tags = ['Tools']
  */
  try {
    const tool = {
      name: req.body.name,
      brand: req.body.brand,
      model_number: req.body.model_number,
      category: req.body.category,
      size: req.body.size,
      set_id: req.body.set_id,
      power_source: req.body.power_source,
      specifications: {
        voltage: req.body.specifications?.voltage,
        rpm: req.body.specifications?.rpm,
        battery_type: req.body.specifications?.battery_type
      },
      image_url: req.body.image_url,
    };

    const response = await mongodb.getDb().db().collection("tools").insertOne(tool);
    if (response.acknowledged) {
      res.setHeader("Content-Type", "application/json");
      res
        .status(201)
        .json({ message: "Tool created successfully.", userId: response.insertedId });
    } else {
      res.status(500).json({ message: "Failed to create tool. No changes made." });
    }
  } catch (error) {
    console.error("Error creating tool:", error);
    res.status(500).json({ message: "An unexpected error occurred.", error: error.message });
  }
};

/* ********************************************
 * PUT - Update tool in the database by id
 **********************************************/
toolsController.updateTool = async (req, res, next) => {
  /*
    #swagger.summary = 'Update a existing tool by id'
    #swagger.description = 'Update a existing tool in the database by id'
    #swagger.tags = ['Tools']
  */
  try {
    const toolId = ObjectId.createFromHexString(req.params.id);
    const tool = {
      name: req.body.name,
      brand: req.body.brand,
      model_number: req.body.model_number,
      category: req.body.category,
      size: req.body.size,
      set_id: req.body.set_id,
      power_source: req.body.power_source,
      specifications: {
        voltage: req.body.specifications?.voltage,
        rpm: req.body.specifications?.rpm,
        battery_type: req.body.specifications?.battery_type
      },
      image_url: req.body.image_url,
    };

    const response = await mongodb
      .getDb()
      .db()
      .collection("tools")
      .replaceOne({ _id: toolId }, tool);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Failed to update tool. No changes made." });
    }
  } catch (error) {
    console.error("Error updating tool:", error);
    res.status(500).json({ message: "An unexpected error occurred.", error: error.message });
  }
};

/* *************************************************
 * DELETE - delete tool from the database by id
 ***************************************************/
toolsController.deleteTool = async (req, res, next) => {
  /*
    #swagger.summary = "Delete a tool by id"
    #swagger.description = "Delete a tool in the database by id"
    #swagger.tags = ['Tools']
  */
  try {
    const toolId = ObjectId.createFromHexString(req.params.id);
    const response = await mongodb.getDb().db().collection("tools").deleteOne({ _id: toolId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Tool not found." });
    }
  } catch (error) {
    console.error("Error deleting tool:", error);
    res.status(500).json({ message: "An unexpected error occurred.", error: error.message });
  }
};

module.exports = toolsController;
