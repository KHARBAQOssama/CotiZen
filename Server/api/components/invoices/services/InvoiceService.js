const Invoice = require("../models");

const getAllInvoices = async (req,res) =>{
  const invoices = await Invoice.find()
    .populate({
      path: "apartment",
    })
    .populate({ path: "payments" });
  res.status(200).json({invoices})
}
module.exports = {
  getAllInvoices,
};
