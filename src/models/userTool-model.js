const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const locations = ['Garage', 'Tool Box', 'Truck', 'Shed', 'Basement', 'Work Bench','Trailer', null];

const userToolSchema = new Schema({
  user_id: { type: ObjectId, ref: "User" },
  tool_id: { type: ObjectId, ref: "Tool" },
  set_id: { type: ObjectId, ref: "ToolSet" },
  serial_number: String,
  condition: {
    type: String,
    enum: ["New", "Good", "Fair", "Poor", "Used", "Like New"],
    default: "Used",
  },
  status: {
    type: String,
    enum: ['Owned', 'Borrowed', 'In Repair', 'Lost', 'Stolen', 'Sold', 'Discarded'],
    default: 'Owned'
  },
  purchase_price: Number,
  purchase_date: Date,
  location: String,
  notes: String,
  loanedTo: String,
  last_updated: { type: Date, default: Date.now }
});

const UserTool = mongoose.model("UserTool", userToolSchema);

module.exports = UserTool;
