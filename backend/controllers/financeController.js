const FinanceDetails = require("../models/FinanceDetails");

module.exports.financeDetails = async (req, res) => {
  try {
    const { income, expenses, savings } = req.body;
    if (income === undefined || income === null) {
      throw new Error("Invalid income.");
    }
    if (expenses === undefined || expenses === null) {
      throw new Error("Invalid expenses.");
    }
    if (savings === undefined || savings === null) {
      throw new Error("Invalid savings.");
    }

    const detils = new FinanceDetails({
      userId: req.user.id,
      income,
      expenses,
      savings,
    });

    detils.save().then((result) => {
      if (result) {
        res.status(200).json({ message: "Finacial details saved successfully", data: detils, success: true });
      } else {
        throw new Error("Finance details saving failed.");
      }
    });
  } catch (err) {
    res.status(400).json({ message: err.message, success: false });
  }
};

module.exports.formSubmission = async (req, res) => {
  try {
    const financialData = await FinanceDetails.findOne({ userId: req.user.id });
    if (!financialData) {
      throw new Error("No such data exists.");
    }

    res.status(200).json({ message: "Data submitted successfully.", data: financialData, success: true });
  } catch (err) {
    res.status(400).json({ message: err.message, success: false });
  }
};
