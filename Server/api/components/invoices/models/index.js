const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const invoiceSchema = new Schema({
  month: { type: String, required: true },
  amount: { type: Number, required: true },
  amount_paid: { type: Number, default : 0 },
  status: {
    type: String,
    enum: ["paid", "partially_paid", "unpaid"],
    default: "unpaid",
  },
});

const Invoice = mongoose.model("Invoice", invoiceSchema);

module.exports = Invoice;
