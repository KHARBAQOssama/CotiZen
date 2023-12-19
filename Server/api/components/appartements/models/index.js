  const mongoose = require("mongoose");

  const Schema = mongoose.Schema;

  const ResidentSchema = new Schema({
    name: String,
    email: String,
    nationalId: String,
    phoneNumber: String,
    startDate: { type: Date, required: true },
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

  module.exports = mongoose.model("Apartment", ApartmentSchema);
