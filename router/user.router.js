const {
  findAndCheckDueController,
  createUserAndDueController,
  findBy1stNumberController,
} = require("../controller/User.Controller");

const router = require("express").Router();

router.post("/findAndCheckDue", findAndCheckDueController);

router.post("/createUserAndDue", createUserAndDueController);

router.post("/findBy1stNumber", findBy1stNumberController);

module.exports = router;
