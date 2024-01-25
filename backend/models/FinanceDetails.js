const { Schema, model } = require("mongoose");
const ObjectId = Schema.ObjectId;

const financeSchema = new Schema(
  {
    userId: {
      type: ObjectId,
    },
    income: {
      type: Number,
      default: 0,
    },
    expenses: {
      type: Number,
      default: 0,
    },
    savings: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const FinanceDetails = model("financedetails", financeSchema);
module.exports = FinanceDetails;
