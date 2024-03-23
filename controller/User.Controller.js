const Due = require("../models/Due");
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
      // If user found, find all due records for this user
      const dues = await Due.find({ userId: user._id });

      return res.status(200).json({
        message: "User found successfully",
        user,
        dues: dues, // Return all due records for the user
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

/**
 *
 *  * find the user
 *  * if find then create his due
 *  * else if create a new user and create his due
 */
const createUserAndDueController = async (req, res, next) => {
  const {
    user_phone,
    details,
    subTotal,
    discount,
    total,
    accountReceived,
    due,
  } = req.body;

  console.log("this is log ", req.body);

  try {
    // Find the user by phone number
    let user = await User.findOne({ user_phone });

    if (!user) {
      // If user not found, create a new user
      user = new User({ user_phone });
      await user.save();
    }

    // Create due for the user
    const dueData = {
      userId: user._id, // Use the user's ID
      details,
      subTotal,
      discount,
      total,
      accountReceived,
      due,
    };
    const newDue = new Due(dueData);
    await newDue.save();

    return res.status(201).json({
      message: "User and due created successfully",
      user,
      due: newDue,
    });
  } catch (error) {
    // Handle errors
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 *
 * * find the user by first 3 number
 */

const findBy1stNumberController = async (req, res, next) => {
  try {
    // const { firstFourDigits } = req.params; // Assuming you pass firstFourDigits in the request parameters
    const firstFourDigits = req.body.firstFourDigits; // Assuming you pass firstFourDigits in the request parameters

    // Find users whose phone numbers match the provided first four digits
    const users = await User.find({
      user_phone: { $regex: `^${firstFourDigits}` },
    });

    // Find dues associated with the found users
    const dueList = await Due.find({
      userId: { $in: users.map((user) => user._id) },
    });

    // Combine user and due information
    const result = users.map((user) => {
      const userDues = dueList.filter(
        (due) => due.userId.toString() === user._id.toString()
      );
      return { user, dues: userDues };
    });

    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  findAndCheckDueController,
  createUserAndDueController,
  findBy1stNumberController,
};
