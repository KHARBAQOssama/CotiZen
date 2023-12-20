const Invoice = require("../models");

const getAllInvoices = async (req,res) =>{
  const invoices = await Invoice.find()
    .populate({
      path: "apartment",
    })
    .populate({ path: "payments" });
  res.status(200).json({invoices})
}

const getInvoiceById = async (req, res) => {
  const { invoiceId } = req.params;
  try {
    const invoice = await Invoice.findById(invoiceId)
      .populate({
        path: "apartment",
      })
      .populate({ path: "payments" });
    if (!invoice) {
      return res.status(401).json({ message: "invoice not found" });
    }
    return res.status(200).json({ invoice });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

module.exports = {
  getAllInvoices,
  getInvoiceById
};
