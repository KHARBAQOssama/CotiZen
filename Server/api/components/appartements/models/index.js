const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const detailsSchema = new Schema({
  rooms: Number,
  surface: Number,
  floorNumber: Number,
  yearBuilt: Number,
});

const invoiceSchema = new Schema({
  date: Date,
  amount: Number,
  paymentStatus: {
    type: String,
    enum: ["paid", "unpaid", "pending"],
  },
});

const appartementSchema = new Schema({
  ownerInfo: {
    email: String,
    phoneNumber: String,
    name: String,
  },
  address: String,
  details: detailsSchema,
  status: {
    type: String,
    enum: ["occupied", "in_maintenance", "available"],
  },
  utilities: [String],
  description: String,
  monthlyInvoices: [invoiceSchema],
});

module.exports = mongoose.model("Appartement", appartementSchema);
