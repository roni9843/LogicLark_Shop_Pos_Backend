const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the Due schema
const dueSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User", // Reference to the User schema
    required: true,
  },
  buyDate: {
    type: Date,
    default: Date.now, // Default value will be current date/time
  },
  details: {
    type: [String], // Array of strings for details
    required: true,
  },
  subTotal: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    default: 0, // Default value of 0 if not provided
  },
  total: {
    type: Number,
    required: true,
  },
  accountReceived: {
    type: Number,
    required: true,
  },
  due: {
    type: Number,
    required: true,
  },
});

// Create and export the Due model
const Due = mongoose.model("Due", dueSchema);
module.exports = Due;
