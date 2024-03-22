const {
  findAndCheckDueController,
  createUserAndDueController,
} = require("../controller/User.Controller");

const router = require("express").Router();

router.post("/findAndCheckDue", findAndCheckDueController);

router.post("/createUserAndDue", createUserAndDueController);

module.exports = router;
