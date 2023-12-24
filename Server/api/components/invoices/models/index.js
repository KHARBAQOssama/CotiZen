const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const invoiceSchema = new Schema({
  month: { type: String, required: true },
  amount: { type: Number, required: true },
  amount_paid: { type: Number, default: 0 },
  status: {
    type: String,
    enum: ["paid", "partially_paid", "unpaid"],
    default: "unpaid",
  },
  payments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Payment",
    },
  ],
  apartment: {
    type: Schema.Types.ObjectId,
    ref: "Apartment",
    required: true,
  },
});

invoiceSchema.pre("remove", async function (next) {
  await mongoose.model("Payment").deleteMany({ _id: { $in: this.payments } });

  next();
});

const Invoice = mongoose.model("Invoice", invoiceSchema);

module.exports = Invoice;