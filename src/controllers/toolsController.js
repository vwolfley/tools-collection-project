/*******************************************
 * @desc: This file contains the controller
  functions for the routes in tools.js
 ******************************************/
// const mongoose = require("mongoose");
const toolModel = require("../models/tool-model");

const toolsController = {};

/* **************************
 * Get all tools
 ****************************/
toolsController.getAllTools = async (req, res, next) => {
  /*
    #swagger.summary = 'Get all tools'
    #swagger.description = 'Returns all tools'
    #swagger.tags = ['Tools']
  */
  try {
    const tools = await toolModel.getAllTools();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(tools);
  } catch (error) {
    console.error("Error getting tools:", error);
    res.status(500).json({ message: "An unexpected error occurred.", error: error.message });
  }
};

/* **************************
 * Get tool by id
 ****************************/
toolsController.getToolByID = async (req, res, next) => {
  /*
    #swagger.summary = 'Get tool by id'
    #swagger.description = 'Returns a tool with specified id'
    #swagger.tags = ['Tools']
  */
  try {
    const { id } = req.params;

    // Validate the ObjectId before querying
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid tool ID format." });
    }

    const tool = await toolModel.getTool({ _id: id });

    if (!tool) {
      return res.status(404).json({ message: "Tool not found." });
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(tool);
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
    #swagger.summary = 'Add a tool'
    #swagger.description = 'Add a tool to the database'
    #swagger.tags = ['Tools']
  */
  try {
    const {
      tool,
      brand,
      model_number,
      category,
      size,
      set_id,
      power_source,
      specifications,
      description,
      image_url,
    } = req.body;

    // Create and save new user document
    const newTool = await toolModel.createTool(
      tool,
      brand,
      model_number,
      category,
      size,
      set_id,
      power_source,
      specifications,
      description,
      image_url,
    );

    res.setHeader("Content-Type", "application/json");
    res.status(201).json({ message: "Tool created successfully.", toolId: newTool._id });
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
    #swagger.summary = 'Update an existing tool by id'
    #swagger.description = 'Update an existing tool in the database by id'
    #swagger.tags = ['Tools']
  */
  try {
    const { id } = req.params; // ID should come from params
    const {
      tool,
      brand,
      model_number,
      category,
      size,
      set_id,
      power_source,
      specifications,
      description,
      image_url,
    } = req.body; // Tool data should come from the body

    // Validate ObjectId before using it
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid ObjectId format" });
    }

    // Convert specifications object to array format if needed
    const specificationsArray = specifications
      ? Object.entries(specifications).map(([key, value]) => ({
          name: key,
          value: value,
        }))
      : [];

    // Update tool in the database
    const updatedTool = await toolModel.updateTool(
      id,
      tool,
      brand,
      model_number,
      category,
      size,
      set_id,
      power_source,
      specificationsArray,
      description,
      image_url,
    );

    if (updatedTool) {
      res.status(200).json(updatedTool);
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
    const { id } = req.params;

    // Validate ObjectId before using it
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid ObjectId format" });
    }

    // Find and delete the tool
    const deletedTool = await toolModel.deleteTool(id);
    // Check if the tool was found and deleted

    if (deletedTool) {
      res.status(204).send(); // 204 No Content (successful deletion)
    } else {
      res.status(404).json({ message: "Tool not found." });
    }
  } catch (error) {
    console.error("Error deleting tool:", error);
    res.status(500).json({ message: "An unexpected error occurred.", error: error.message });
  }
};

module.exports = toolsController;
