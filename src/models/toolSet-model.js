const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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

const ToolSet = mongoose.model("ToolSet", toolSetSchema, "toolSets");

module.exports = ToolSet;

