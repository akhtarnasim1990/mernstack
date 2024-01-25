const express = require("express");
const router = express.Router();

const { signup, checkEmail } = require("../controllers/userController");

router.post("/user/signup", signup);
router.post("/user/check-email", checkEmail);

module.exports = router;
