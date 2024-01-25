const express = require("express");
const router = express.Router();

const { validateToken } = require("../middleware/auth");

const { financeDetails, formSubmission } = require("../controllers/financeController");

router.post("/financial-details", validateToken, financeDetails);
router.post("/submit", validateToken, formSubmission);

module.exports = router;
