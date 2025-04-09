const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userToolModel = {};

const locations = [
  "Garage",
  "Tool Box",
  "Truck",
  "Shed",
  "Basement",
  "Work Bench",
  "Trailer",
  null,
];

const userToolSchema = new Schema({
  user_id: { type: ObjectId, ref: "user" },
  tool_id: { type: ObjectId, ref: "tool" },
  set_id: { type: ObjectId, ref: "toolSet" },
  serial_number: String,
  condition: {
    type: String,
    enum: ["New", "Good", "Fair", "Poor", "Used", "Like New"],
    default: "Used",
  },
  status: {
    type: String,
    enum: ["Owned", "Borrowed", "In Repair", "Lost", "Stolen", "Sold", "Discarded"],
    default: "Owned",
  },
  purchase_price: Number,
  purchase_date: Date,
  location: String,
  notes: String,
  loanedTo: String,
  last_updated: { type: Date, default: Date.now },
});

// Create a model from the schema
userToolModel.userTool = mongoose.model("UserTool", userToolSchema, "userTools");

/* *****************************
 *   Get All userTools
 * *************************** */
userToolModel.getAllUserTools = async function () {
  try {
    const tools = await userToolModel.userTool.find({});
    return tools;
  } catch (error) {
    console.error("Error getting tools:", error);
    throw error; // Let the controller handle the error
  }
};

/* **************************
 * Get userTool by parameter
 ****************************/
userToolModel.getUserTool = async function (parameter) {
  try {
    const result = await userToolModel.userTool.findOne(parameter).exec();
    return result;
  } catch (error) {
    console.error(`Error fetching tool "${parameter}":`, error);
    throw error; // Let the controller handle the error
  }
};

/* *****************************
 *   Creating a new userTool
 * *************************** */
userToolModel.createUserTool = async function (
  user_id,
  tool_id,
  set_id,
  serial_number,
  condition,
  status,
  purchase_price,
  purchase_date,
  location,
  notes,
  loanedTo,
  last_updated,
) {
  try {
    // Convert set_id to ObjectId if provided as a string
    const validUserId = user_id ? new mongoose.Types.ObjectId(user_id) : null;
    // Convert set_id to ObjectId if provided as a string
    const validToolId = tool_id ? new mongoose.Types.ObjectId(tool_id) : null;
    // Convert set_id to ObjectId if provided as a string
    const validSetId = set_id ? new mongoose.Types.ObjectId(set_id) : null;

    // Create and save new user document
    const newUserTool = await userToolModel.userTool.create({
      user_id: validUserId,
      tool_id: validToolId,
      set_id: validSetId,
      serial_number,
      condition,
      status,
      purchase_price,
      purchase_date,
      location,
      notes,
      loanedTo,
      last_updated,
    });
    return newUserTool;
  } catch (error) {
    console.error("Error creating tool:", error);
    throw error; // Let the controller handle the error
  }
};

/* *****************************
 *   Update userTool
 * *************************** */
userToolModel.updateUserTool = async function (
  id,
  user_id,
  tool_id,
  set_id,
  serial_number,
  condition,
  status,
  purchase_price,
  purchase_date,
  location,
  notes,
  loanedTo,
  last_updated,
) {
  try {
    // Ensure the ID is a valid ObjectId
    if (!mongoose.isValidObjectId(id)) {
      throw new Error("Invalid ObjectId format");
    }

    const updateFields = {};
    if (set_id && mongoose.isValidObjectId(set_id)) {
      updateFields.set_id = new mongoose.Types.ObjectId(set_id);
    }
    if (serial_number) updateFields.serial_number = serial_number;
    if (condition) updateFields.condition = condition;
    if (status) updateFields.status = status;
    if (purchase_price) updateFields.purchase_price = purchase_price;
    if (purchase_date) updateFields.purchase_date = purchase_date;
    if (location) updateFields.location = location;
    if (notes) updateFields.notes = notes;
    if (loanedTo) updateFields.loanedTo = loanedTo;
    if (last_updated) updateFields.last_updated = last_updated;

    // Update tool document
    const result = await userToolModel.userTool.findOneAndUpdate(
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
 *   Delete a userTool
 * *************************** */
userToolModel.deleteUserTool = async function (toolId) {
  try {
    // Ensure the ID is a valid ObjectId
    if (!mongoose.isValidObjectId(toolId)) {
      throw new Error("Invalid ObjectId format");
    }

    // Delete tool document
    const result = await userToolModel.userTool.findByIdAndDelete(toolId);
    return result;
  } catch (error) {
    console.error(`Error deleting tool "${toolId}":`, error);
    throw error; // Let the controller handle the error
  }
};

module.exports = userToolModel;
