const DueReceived = require("../models/DueReceived");
const InvoiceHistory = require("../models/InvoiceHistory");
const User = require("../models/User");

/**
 * * find the user
 * * if find then
 * * check his total due
 * ! else not find then
 * * return not found
 */
const findAndCheckDueController = async (req, res, next) => {
  const { userId } = req.body; // Assuming userId is provided in the request body

  try {
    // Find the user by user ID
    const user = await User.findById(userId);

    if (user) {
      // If user found, find all InvoiceHistory records for this user
      const invoiceHistories = await InvoiceHistory.find({ userId });

      // Find all DueReceived records for this user
      const dueReceived = await DueReceived.find({ userId });

      return res.status(200).json({
        message: "User found successfully",
        user,
        invoiceHistories,
        dueReceived,
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
    user_name,
    user_phone,
    inId,
    details,
    subTotal,
    discount,
    total,
    accountReceived,
    due,
  } = req.body;

  try {
    // Find or create the user by phone number
    let user = await User.findOne({ user_phone });

    if (!user) {
      // If user not found, create a new user
      user = new User({ user_phone, user_name });
    }

    // Save the previous due_amount as due_history
    const previousDueHistory = user.due_amount || 0;

    // Calculate new due amount
    const newDueAmount = previousDueHistory + due;

    // Create the due for the user
    const dueData = {
      userId: user._id,
      inId,
      details,
      subTotal,
      discount,
      total,
      accountReceived,
      due,
      user_name,
      due_history: previousDueHistory, // Save the previous due_amount as due_history
    };

    const InvoiceHis = new InvoiceHistory(dueData);
    await InvoiceHis.save();

    // Update user's due_amount
    user.due_amount = newDueAmount;
    await user.save();

    return res.status(201).json({
      message: "User and due created successfully",
      user,
      Invoice: InvoiceHis,
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
    let { firstDigits } = req.body; // Assuming you pass firstDigits in the request body
    // Ensure at least 4 characters are provided
    if (firstDigits.length < 4) {
      return res.status(400).json({ error: "Provide at least 4 characters." });
    }

    // Construct regex pattern based on the provided digits
    const regexPattern = `^${firstDigits.substring(0, 4)}`;

    // Find users whose phone numbers match the provided first four or five digits
    const users = await User.find({
      user_phone: { $regex: regexPattern },
    });

    res.json(users);
  } catch (error) {
    next(error);
  }
};

const findAllPhoneWithDueController = async (req, res, next) => {
  try {
    // const { firstFourDigits } = req.params; // Assuming you pass firstFourDigits in the request parameters
    // const firstFourDigits = req.body.firstFourDigits; // Assuming you pass firstFourDigits in the request parameters

    // Find users whose phone numbers match the provided first four digits
    const users = await User.find();

    res.json(users);
  } catch (error) {
    next(error);
  }
};

const createDueController = async (req, res, next) => {
  // Extract data from the request body
  const {
    receive_id,
    userId,
    date,
    received_amount,
    previous_due,
    due_history,
  } = req.body;

  console.log(req.body);

  try {
    // Create a new due record
    const newDue = new DueReceived({
      receive_id,
      userId,
      date,
      received_amount,
      previous_due,
      due_history,
    });

    // Save the new due record
    await newDue.save();

    let user = await User.findById(userId);

    // Update user's due_amount
    user.due_amount = previous_due;

    console.log(user, userId);

    await user.save();

    // After saving the new due, call the findAndCheckDueController
    await findAndCheckDueController(req, res, next);
  } catch (error) {
    // Handle errors
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  findAndCheckDueController,
  createUserAndDueController,
  findBy1stNumberController,
  findAllPhoneWithDueController,
  createDueController,
};
