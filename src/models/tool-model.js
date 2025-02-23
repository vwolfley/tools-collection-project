const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
  tool: String,
  brand: String,
  model_number: String,
  category: String,
  size: String,
  set_id: ObjectId,
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

module.exports = Tool;
