const express = require("express");
const userRouter = require("./user");
const bankRouter = require("./accounts");

const router = express.Router();

router.use("/user", userRouter)

router.use("/account", bankRouter)

module.exports = router;