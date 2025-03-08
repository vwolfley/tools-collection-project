/*******************************************
 * @desc: This file contains the controller
  functions for the routes in toolSets.js
 ******************************************/
const mongoose = require("mongoose");
const ToolSet = require("../models/toolSet-model");

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
    const toolSets = await ToolSet.find({});
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(toolSets);
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
    const { id } = req.params;

    // Validate the ObjectId before querying
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid toolSet ID format." });
    }

    const toolSet = await ToolSet.findById(id);

    if (!toolSet) {
      return res.status(404).json({ message: "ToolSet not found." });
    }
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(toolSet);
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
    const toolSetData = {
      name: req.body.name,
      brand: req.body.brand,
      category: req.body.category,
      image_url: req.body.image_url,
      description: req.body.description,
      tools: Array.isArray(req.body.tools)
        ? req.body.tools.map((tool) => ({
            toolID: tool.id,
          }))
        : [],
    };

    // Use Mongoose to create a new document
    const newToolSet = new ToolSet.create(toolSetData);

    res.setHeader("Content-Type", "application/json");
    res.status(201).json({
      message: "ToolSet created successfully.",
      toolSetId: savedToolSet._id,
    });
  } catch (error) {
    console.error("Error creating toolSet:", error);
    res.status(500).json({
      message: "An unexpected error occurred.",
      error: error.message,
    });
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
    const { id } = req.params;

    // Validate before converting to avoid errors
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid ObjectId format" });
    }
    // Convert to ObjectId safely
    const toolSetId = new mongoose.Types.ObjectId(id);

    const toolSetData = {
      name: req.body.name,
      brand: req.body.brand,
      category: req.body.category,
      image_url: req.body.image_url,
      description: req.body.description,
      tools: Array.isArray(req.body.tools)
        ? req.body.tools.map((tool) => ({
            toolID: tool.id,
          }))
        : [],
    };
    // Find toolset by ID and update
    const response = await ToolSet.findByIdAndUpdate(toolSetId, toolSetData);

    if (response) {
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
    const toolSetId = new mongoose.Types.ObjectId(req.params.id);
    // Find and delete the toolset by ID
    const response = await ToolSet.findByIdAndDelete(toolSetId);

    if (response) {
      res.status(204).send(); // 204 No Content (successful deletion)
    } else {
      res.status(404).json({ message: "ToolSet not found." });
    }
  } catch (error) {
    console.error("Error deleting toolSet:", error);
    res.status(500).json({ message: "An unexpected error occurred.", error: error.message });
  }
};

module.exports = toolSetsController;
