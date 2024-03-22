const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the User schema
const userSchema = new Schema({
  user_name: {
    type: String,
    required: false, // Optional field
  },
  user_phone: {
    type: Number,
    required: true, // Mandatory field
  },
  user_address: {
    type: String,
    required: false, // Optional field
  },
  createdTime: {
    type: Date,
    default: Date.now, // Default value will be current date/time
  },
});

// Create and export the User model
const User = mongoose.model("User", userSchema);
module.exports = User;
