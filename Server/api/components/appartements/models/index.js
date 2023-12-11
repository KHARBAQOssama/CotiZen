const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const InvoiceSchema = new Schema({
  month: {
    type: String,
    required: true,
    match: /^\d{4}-\d{2}$/,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["paid", "partially_paid", "unpaid"],
  },
});

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
  invoices: [InvoiceSchema],
});

module.exports = mongoose.model("Apartment", ApartmentSchema);
