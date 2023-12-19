const Joi = require("joi");
const Payment = require("../models");
const Invoice = require("../../invoices/models");

const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    return res.status(200).json({ payments });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const getPaymentById = async (req, res) => {
  const { paymentId } = req.params;
  try {
    const payment = await Payment.findById(paymentId);
    if (!payment) {
      return res.status(401).json({ message: "payment not found" });
    }
    return res.status(200).json({ payment });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const getPaymentsForInvoice = async (invoiceId) => {
  try {
    const payments = await Payment.find({ invoice: invoiceId });
    return payments;
  } catch (error) {
    throw error;
  }
};

const getInvoicePayments = async (req, res) => {
  const { invoiceId } = req.params;
  try {
    const payments = await getPaymentsForInvoice(invoiceId);
    return res.status(200).json({ payments });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const createPayment = async (req, res) => {
  const { invoiceId, amount } = req.body;
  const validationSchema = Joi.object({
    invoiceId: Joi.string().required(),
    amount: Joi.number().required(),
  });

  const validation = validationSchema.validate({ invoiceId, amount });

  if (validation.error) {
    throw new Error(validation.error.details[0].message);
  }

  try {
    const invoice = await Invoice.findById(invoiceId);
    if (!invoice) {
      return res.status(404).json({ message: "invoice not found" });
    }

    const payments = await getPaymentsForInvoice(invoiceId);
    let paymentMuch = "partially_paid";
    let totalAmount = invoice.amount_paid;
    if (payments.length) {
      //  totalAmount = payments.reduce(
      //   (sum, payment) => sum + payment.amount,
      //   0
      // );
      if (invoice.status == "paid") {
        return res
          .status(400)
          .json({ message: "the invoice is already totally paid" });
      } else if (totalAmount + amount > invoice.amount) {
        return res.status(400).json({
          message: "The amount paid is too high than the invoice's amount ",
          rest_unpaid: invoice.amount - totalAmount,
        });
      } else if (totalAmount + amount == invoice.amount) paymentMuch = "paid";
    }
    const payment = new Payment({
      amount,
      invoice: invoiceId,
    });

    const createdPayment = await payment.save();
    if (createdPayment && invoice.status != "paid") {
      invoice.status = paymentMuch;
      invoice.amount_paid = totalAmount + amount;
      await invoice.save();
    }
    return res.status(200).json({
      message: "added successfully",
      payment: createdPayment,
      invoice,
      paid: invoice.amount_paid,
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const updatePayment = async (req, res) => {
  const { paymentId } = req.params;
  const { amount } = req.body;
  try {
    const payment = await Payment.findById(paymentId);
    if (!payment) {
      return res.status(404).json({ message: "payment not found" });
    }
    const invoice = await Invoice.findById(payment.invoice);
    if (!invoice) {
      return res.status(404).json({ message: "invoice not found" });
    }
    if (amount > 0) {
      const newAmountPaid = invoice.amount_paid - payment.amount + amount;

      if (amount < payment.amount) {
        invoice.status = "partially_paid";
      } else if (invoice.amount < newAmountPaid) {
        return res.status(400).json({
          message: "The amount paid is too high than the invoice's amount",
          rest_unpaid: invoice.amount - (invoice.amount_paid - payment.amount),
        });
      } else if (invoice.amount > newAmountPaid) {
        invoice.status = "partially_paid";
      } else {
        invoice.status = "paid";
      }

      invoice.amount_paid = newAmountPaid;
      payment.amount = amount;
    }

    try {
      await payment.save();
      await invoice.save();
    } catch (error) {
      return res.status(500).json({ error });
    }
    return res.status(200).json({ payment });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

module.exports = {
  getAllPayments,
  getPaymentById,
  getInvoicePayments,
  createPayment,
  updatePayment,
};
