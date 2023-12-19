// const getPaymentsForInvoice = async (invoiceId) => {
//   try {
//     const payments = await Payment.find({ invoice: invoiceId });
//     return payments;
//   } catch (error) {
//     throw error;
//   }
// };
const Invoice = require("../models");
const Apartment = require("../../appartements/models");
const getInvoiceWithResident = async (req,res) => {
  const {invoice : invoiceId} = req.params
  try {
    const invoice = await Invoice.findById(invoiceId).exec();
    if (!invoice) {
      throw new Error("Invoice not found");
    }

    const apartment = await Apartment.findOne({
      invoices: invoiceId,
      "residentsHistory.startDate": { $lte: invoice.month },
      $or: [
        { "residentsHistory.endDate": null },
        { "residentsHistory.endDate": { $gte: invoice.month } },
      ],
    }).exec();

    if (!apartment) {
      throw new Error("Apartment not found for the given invoice");
    }

    const resident = apartment.residentsHistory.find((resident) => {
      const startDate = new Date(resident.startDate + "-01"); // Append the day "01" to the start date
      const endDate = resident.endDate
        ? new Date(resident.endDate + "-01")
        : null; // Append the day "01" to the end date
      const invoiceMonth = new Date(invoice.month + "-01"); // Append the day "01" to the invoice month

      return startDate <= invoiceMonth && (!endDate || endDate >= invoiceMonth);
    });

    if (!resident) {
      throw new Error("Resident not found for the given invoice");
    }

    return {
      invoice: {
        _id: invoice._id,
        month: invoice.month,
        amount: invoice.amount,
        amount_paid: invoice.amount_paid,
        status: invoice.status,
      },
      resident: {
        _id: resident._id,
        name: resident.name,
        email: resident.email,
        nationalId: resident.nationalId,
        phoneNumber: resident.phoneNumber,
        startDate: resident.startDate,
        endDate: resident.endDate,
      },
    };
  } catch (error) {
    return res.status(404).json({error:error.message})
  }
};

module.exports = {
  getInvoiceWithResident,
};
