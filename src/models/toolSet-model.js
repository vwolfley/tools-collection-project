const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const toolSetSchema = new Schema({
  name: { type: String, required: true},
  brand: String,
  category: {
    type: String,
    enum: ["Hand Tools", "Power Tools", "Mechanic Tools", "Woodworking", "Plumbing", "Other"],
  },
  image_url: String,
  description: String,
  tools: [{ type: Schema.Types.ObjectId, ref: "Tool" }],
});

const ToolSet = mongoose.model("ToolSet", toolSetSchema);

module.exports = ToolSet;
