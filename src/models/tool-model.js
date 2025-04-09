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
  tool: {
    type: String,
    required: true,
    set: (tool) => tool.charAt(0).toUpperCase() + tool.slice(1).toLowerCase(),
  },
  brand: { type: String, set: (b) => b.charAt(0).toUpperCase() + b.slice(1).toLowerCase() },
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

// Create a model from the schema
toolModel.tool = mongoose.model("Tool", toolSchema);

/* *****************************
 *   Get All Tools
 * *************************** */
toolModel.getAllTools = async function () {
  try {
    const tools = await toolModel.tool.find({});
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
    const result = await toolModel.tool.findOne(parameter).exec();
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
    // Convert set_id to ObjectId if provided as a string
    const validSetId = set_id ? new mongoose.Types.ObjectId(set_id) : null;

    // Validate specifications array to match schema requirements
    const validSpecifications = specifications
      ? specifications
          .filter((spec) => SPECIFICATION_TYPES.includes(spec.name)) // Ensure valid names
          .map((spec) => ({ name: spec.name, value: spec.value })) // Ensure correct format
      : [];

    // Create and save new tools document
    const newTool = await toolModel.tool.create({
      tool,
      brand,
      model_number,
      category,
      size,
      set_id: validSetId,
      power_source,
      specifications: validSpecifications,
      description,
      image_url,
    });
    return newTool;
  } catch (error) {
    console.error("Error creating tool:", error);
    throw error; // Let the controller handle the error
  }
};

/* *****************************
 *   Update tool
 * *************************** */
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
    const result = await toolModel.tool.findOneAndUpdate(
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
    const result = await toolModel.tool.findByIdAndDelete(toolId);
    return result;
  } catch (error) {
    console.error(`Error deleting tool "${toolId}":`, error);
    throw error; // Let the controller handle the error
  }
};

module.exports = toolModel;
