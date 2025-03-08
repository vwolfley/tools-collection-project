/*******************************************
 * @desc: This file contains the controller
  functions for the routes in tools.js
 ******************************************/
const mongoose = require("mongoose");
const Tool = require("../models/tool-model");

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
    const tools = await Tool.find({});
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
toolsController.getTool = async (req, res, next) => {
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

    const tool = await Tool.findById(id);

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
    const toolData = {
      tool: req.body.tool,
      brand: req.body.brand,
      model_number: req.body.model_number,
      category: req.body.category,
      size: req.body.size,
      set_id: mongoose.Types.ObjectId(req.body.set_id),
      power_source: req.body.power_source,
      specifications: [
        { name: "Voltage", value: req.body.voltage },
        { name: "RPM", value: req.body.rpm },
      ],
      description: req.body.description,
      image_url: req.body.image_url,
    };
    // Use Mongoose to create a new document
    const newTool = new Tool.create(toolData);

    res.setHeader("Content-Type", "application/json");
    res.status(201).json({ message: "Tool created successfully.", toolId: savedTool._id });
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
    const { id } = req.params;

    // Validate before converting to avoid errors
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid ObjectId format" });
    }
    // Convert to ObjectId safely
    const toolId = new mongoose.Types.ObjectId(id);

    // Convert specifications object to array format
    const specificationsArray = req.body.specifications
      ? Object.entries(req.body.specifications).map(([key, value]) => ({
          name: key,
          value: value,
        }))
      : [];

    // Prepare the update object
    const updatedTool = {
      tool: req.body.tool,
      brand: req.body.brand,
      model_number: req.body.model_number,
      category: req.body.category,
      size: req.body.size,
      set_id: req.body.set_id,
      power_source: req.body.power_source,
      specifications: [
        { name: "Voltage", value: req.body.voltage },
        { name: "RPM", value: req.body.rpm },
      ],
      description: req.body.description,
      image_url: req.body.image_url,
    };

    // Find tool by ID and update
    const response = await Tool.findByIdAndUpdate(toolId, updatedTool, {
      new: true, // Returns updated document
      runValidators: true, // Ensures validation rules apply
    });

    if (response) {
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
    const toolId = new mongoose.Types.ObjectId(req.params.id);

    // Find and delete the tool
    const deletedTool = await Tool.findByIdAndDelete(toolId);

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
