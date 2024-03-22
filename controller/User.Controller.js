const User = require("../models/User");

/**
 * * find the user
 * * if find then
 * * check his total due
 * ! else not find then
 * * return not found
 */
const findAndCheckDueController = async (req, res, next) => {
  const { user_phone } = req.body;

  console.log("user phone -> ", user_phone);

  try {
    // Find the user by phone number
    const user = await User.findOne({ user_phone });

    if (user) {
      // If user found, return user info
      return res.status(200).json({
        message: "User found successfully",
        user,
      });
    } else {
      // If user not found, return "not found" message
      return res.status(404).json({
        message: "User not found",
      });
    }
  } catch (error) {
    // Handle errors
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  findAndCheckDueController,
};
