const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const toolModel = {};

// Define a schema
const SPECIFICATION_TYPES = [
  "Voltage",
  "RPM",
  "Battery Type",
  "Torque",
  "Amperage",
  "Weight",
  "Dimensions",
];

const toolSchema = new Schema({
  tool: { type: String, required: true },
  brand: String,
  model_number: String,
  category: String,
  size: String,
  set_id: mongoose.ObjectId,
  power_source: { type: String, enum: ["battery", "corded", "manual"] },
  specifications: [
    {
      name: { type: String, enum: SPECIFICATION_TYPES },
      value: String,
    },
  ],
  description: String,
  image_url: String,
});

const Tool = mongoose.model("Tool", toolSchema);

/* *****************************
 *   Get All Tools
 * *************************** */
toolModel.getAllTools = async function () {
  try {
    const tools = await Tool.find({});
    return tools;
  } catch (error) {
    console.error("Error getting tools:", error);
    throw error; // Let the controller handle the error
  }
};

/* **************************
 * Get tool by parameter
 ****************************/
toolModel.getTool = async function (parameter) {
  try {
    const result = await Tool.findOne(parameter).exec();
    return result;
  } catch (error) {
    console.error(`Error fetching tool "${parameter}":`, error);
    throw error; // Let the controller handle the error
  }
};

/* *****************************
 *   Creating a new tool
 * *************************** */
toolModel.createTool = async function (
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
) {
  try {
    // Create and save new user document
    const newTool = await Tool.create({
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
    });
    return newTool;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error; // Let the controller handle the error
  }
};

/* *****************************
 *   Update tool
 * *************************** */
const mongoose = require("mongoose");
const Tool = require("./toolModel"); // Assuming this is your Mongoose model

toolModel.updateTool = async function (
  id,
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
) {
  try {
    // Ensure the ID is a valid ObjectId
    if (!mongoose.isValidObjectId(id)) {
      throw new Error("Invalid ObjectId format");
    }

    const updateFields = {};

    if (tool) updateFields.tool = tool;
    if (brand) updateFields.brand = brand;
    if (model_number) updateFields.model_number = model_number;
    if (category) updateFields.category = category;
    if (size) updateFields.size = size;
    if (set_id && mongoose.isValidObjectId(set_id)) {
      updateFields.set_id = new mongoose.Types.ObjectId(set_id);
    }
    if (power_source) updateFields.power_source = power_source;
    if (specifications) updateFields.specifications = specifications;
    if (description) updateFields.description = description;
    if (image_url) updateFields.image_url = image_url;

    // Update tool document
    const result = await Tool.findOneAndUpdate(
      { _id: id }, // Find by MongoDB _id
      { $set: updateFields }, // Update only provided fields
      { new: true, runValidators: true }, // Return updated document & enforce schema validation
    );

    return result;
  } catch (error) {
    console.error(`Error updating tool "${tool || id}":`, error);
    throw error; // Let the controller handle the error
  }
};

/* *****************************
 *   Delete a tool
 * *************************** */
toolModel.deleteTool = async function (toolId) {
  try {
    // Ensure the ID is a valid ObjectId
    if (!mongoose.isValidObjectId(toolId)) {
      throw new Error("Invalid ObjectId format");
    }

    // Delete tool document
    const result = await Tool.findByIdAndDelete(toolId);
    return result;
  } catch (error) {
    console.error(`Error deleting tool "${toolId}":`, error);
    throw error; // Let the controller handle the error
  }
};

module.exports = toolModel;
