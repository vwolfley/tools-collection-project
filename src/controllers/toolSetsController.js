/*******************************************
 * @desc: This file contains the controller
  functions for the routes in toolSets.js
 ******************************************/

const mongodb = require("../database/mongo-connect");
const ObjectId = require("mongodb").ObjectId;

const toolSetsController = {};

/* **************************
 * Get all toolSets
 ****************************/
toolSetsController.getAll = async (req, res, next) => {
  /*
    #swagger.summary = 'Get all toolSets'
    #swagger.description = 'Returns all toolSets'
    #swagger.tags = ['ToolSets']
  */
  try {
    const result = await mongodb.getDb().db().collection("toolSets").find();
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists);
    });
  } catch (error) {
    console.error("Error getting toolSets:", error);
    res.status(500).json({ message: "An unexpected error occurred.", error: error.message });
  }
};

/* **************************
 * Get tool by id
 ****************************/
toolSetsController.getToolSet = async (req, res, next) => {
  /*
    #swagger.summary = 'Get toolSet by id'
    #swagger.description = 'Returns a toolSet with specified id'
    #swagger.tags = ['ToolSets']
  */
  try {
    const toolSetId = ObjectId.createFromHexString(req.params.id);
    const result = await mongodb.getDb().db().collection("toolSets").findOne({ _id: toolSetId });

    if (!result) {
      return res.status(404).json({ message: "ToolSet not found." });
    }
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  } catch (error) {
    console.error("Error getting toolSet:", error);
    res.status(500).json({ message: "An unexpected error occurred.", error: error.message });
  }
};

/* *****************************************
 * POST - Add a toolSet into the database
 *******************************************/
toolSetsController.createToolSet = async (req, res, next) => {
  /*
    #swagger.summary = 'Add a toolSet'
    #swagger.description = 'Add a toolSet to the database'
    #swagger.tags = ['ToolSets']
  */
  try {
    const toolSet = {
      name: req.body.name,
      brand: req.body.brand,
      category: req.body.category,
      image_url: req.body.image_url,
      tools: Array.isArray(req.body.tools)
        ? req.body.tools.map((tool) => ({
            toolID: tool.id,
          }))
        : [],
    };

    const response = await mongodb.getDb().db().collection("toolSets").insertOne(toolSet);
    if (response.acknowledged) {
      res.setHeader("Content-Type", "application/json");
      res.status(201).json({ message: "ToolSet created successfully.", toolSetId: response.insertedId });
    } else {
      res.status(500).json({ message: "Failed to create toolSet. No changes made." });
    }
  } catch (error) {
    console.error("Error creating toolSet:", error);
    res.status(500).json({ message: "An unexpected error occurred.", error: error.message });
  }
};

/* ********************************************
 * PUT - Update toolSet in the database by id
 **********************************************/
toolSetsController.updateToolSet = async (req, res, next) => {
  /*
    #swagger.summary = 'Update a existing toolSet by id'
    #swagger.description = 'Update a existing toolSet in the database by id'
    #swagger.tags = ['ToolSets']
  */
  try {
    const toolSetId = ObjectId.createFromHexString(req.params.id);
    const toolSet = {
      name: req.body.name,
      brand: req.body.brand,
      category: req.body.category,
      image_url: req.body.image_url,
      tools: Array.isArray(req.body.tools)
        ? req.body.tools.map((tool) => ({
            toolID: tool.id,
          }))
        : [],
    };

    const response = await mongodb
      .getDb()
      .db()
      .collection("toolSets")
      .replaceOne({ _id: toolSetId }, toolSet);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Failed to update toolSet. No changes made." });
    }
  } catch (error) {
    console.error("Error updating toolSet:", error);
    res.status(500).json({ message: "An unexpected error occurred.", error: error.message });
  }
};

/* *************************************************
 * DELETE - delete toolSet from the database by id
 ***************************************************/
toolSetsController.deleteToolSet = async (req, res, next) => {
  /*
    #swagger.summary = "Delete a toolSet by id"
    #swagger.description = "Delete a toolSet in the database by id"
    #swagger.tags = ['ToolSets']
  */
  try {
    const toolSetId = ObjectId.createFromHexString(req.params.id);
    const response = await mongodb
      .getDb()
      .db()
      .collection("toolSets")
      .deleteOne({ _id: toolSetId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "ToolSet not found." });
    }
  } catch (error) {
    console.error("Error deleting toolSet:", error);
    res.status(500).json({ message: "An unexpected error occurred.", error: error.message });
  }
};

module.exports = toolSetsController;
