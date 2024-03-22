const { findAndCheckDueController } = require("../controller/User.Controller");

const router = require("express").Router();

router.post("/findAndCheckDue", findAndCheckDueController);

module.exports = router;
