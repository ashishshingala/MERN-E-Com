const express = require("express");
const User = require("../controller/userController");

const router = express.Router();

router.post("/register", User.signupUser);

router.post("/login", User.loginUser);

module.exports = router;
