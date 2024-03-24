const {
  findAndCheckDueController,
  createUserAndDueController,
  findBy1stNumberController,
  findAllPhoneWithDueController,
} = require("../controller/User.Controller");

const router = require("express").Router();

router.post("/findAndCheckDue", findAndCheckDueController);

router.post("/findAllPhoneWithDue", findAllPhoneWithDueController);

router.post("/createUserAndDue", createUserAndDueController);

router.post("/findBy1stNumber", findBy1stNumberController);

module.exports = router;
