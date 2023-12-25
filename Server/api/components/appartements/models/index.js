const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ResidentSchema = new Schema({
  name: String,
  email: String,
  nationalId: String,
  phoneNumber: String,
  startDate: { type: Date, required: true, default: Date.now() },
  endDate: { type: Date, default: null },
});

const ApartmentSchema = new Schema({
  number: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["available", "occupied", "in_maintenance"],
  },
  residentsHistory: [ResidentSchema],
  monthlyPayment: {
    type: Number,
    required: true,
  },
  invoices: [
    {
      type: Schema.Types.ObjectId,
      ref: "Invoice",
    },
  ],
});

ApartmentSchema.pre("remove", async function (next) {
  const invoices = await mongoose
    .model("Invoice")
    .find({ apartment: this._id });

  const paymentIds = invoices.flatMap((invoice) => invoice.payments);
  await mongoose.model("Payment").deleteMany({ _id: { $in: paymentIds } });

  await mongoose.model("Invoice").deleteMany({ apartment: this._id });

  next();
});

module.exports = mongoose.model("Apartment", ApartmentSchema);