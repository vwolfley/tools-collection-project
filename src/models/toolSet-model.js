const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const toolSetModel = {};

const toolSetSchema = new Schema({
  name: { type: String, required: true },
  brand: { type: String },
  category: {
    type: String,
    enum: ["Hand Tools", "Power Tools", "Mechanic Tools", "Woodworking", "Plumbing", "Other", null],
  },
  image_url: { type: String },
  description: { type: String },
  tools: [{ toolID: { type: mongoose.Schema.Types.ObjectId, ref: "Tool" } }],
});

// Create a model from the schema
toolSetModel.toolSet = mongoose.model("ToolSet", toolSetSchema, "toolSets");

/* *****************************
 *   Get All ToolSets
 * *************************** */
toolSetModel.getAllToolSets = async function () {
  try {
    const tools = await toolSetModel.toolSet.find({});
    return tools;
  } catch (error) {
    console.error("Error getting tool sets:", error);
    throw error; // Let the controller handle the error
  }
};

/* **************************
 * Get tool set by parameter
 ****************************/
toolSetModel.getToolSet = async function (parameter) {
  try {
    const result = await toolSetModel.toolSet.findOne(parameter).exec();
    return result;
  } catch (error) {
    console.error(`Error fetching tool set "${parameter}":`, error);
    throw error; // Let the controller handle the error
  }
};

/* *****************************
 *   Creating a new tool set
 * *************************** */
toolSetModel.createToolSet = async function (name, brand, category, image_url, description, tools) {
  try {
    // Create and save new toolSet document
    const newToolSet = await toolSetModel.toolSet.create({
      name,
      brand,
      category,
      image_url,
      description,
      tools,
    });
    return newToolSet;
  } catch (error) {
    console.error("Error creating tool:", error);
    throw error; // Let the controller handle the error
  }
};

/* *****************************
 *   Update tool Set
 * *************************** */
toolSetModel.updateToolSet = async function (
  id,
  name,
  brand,
  category,
  image_url,
  description,
  tools,
) {
  try {
    // Ensure the ID is a valid ObjectId
    if (!mongoose.isValidObjectId(id)) {
      throw new Error("Invalid ObjectId format");
    }

    const updateFields = {};

    if (name) updateFields.name = name;
    if (brand) updateFields.brand = brand;
    if (category) updateFields.category = category;
    if (description) updateFields.description = description;
    if (image_url) updateFields.image_url = image_url;
    if (Array.isArray(tools)) {
      updateFields.tools = tools.map((tool) => ({
        toolID: mongoose.Types.ObjectId(tool.toolID),
      }));
    }

    // Update tool document
    const result = await toolSetModel.toolSet.findOneAndUpdate(
      { _id: id }, // Find by MongoDB _id
      { $set: updateFields }, // Update only provided fields
      { new: true, runValidators: true }, // Return updated document & enforce schema validation
    );

    return result;
  } catch (error) {
    console.error(`Error updating tool set "${name || id}":`, error);
    throw error; // Let the controller handle the error
  }
};

/* *****************************
 *   Delete a tool
 * *************************** */
toolSetModel.deleteToolSet = async function (toolId) {
  try {
    // Ensure the ID is a valid ObjectId
    if (!mongoose.isValidObjectId(toolId)) {
      throw new Error("Invalid ObjectId format");
    }

    // Delete tool document
    const result = await toolSetModel.toolSet.findByIdAndDelete(toolId);
    return result;
  } catch (error) {
    console.error(`Error deleting tool "${toolId}":`, error);
    throw error; // Let the controller handle the error
  }
};

module.exports = toolSetModel;
