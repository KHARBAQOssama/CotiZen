const express = require("express");
const router = express.Router();
const {paymentsService} = require("../services");

router.get("/", paymentsService.getAllPayments);
router.get("/:paymentId", paymentsService.getPaymentById);
router.get("/invoice/:invoiceId", paymentsService.getInvoicePayments);
router.post("/", paymentsService.createPayment);
router.patch("/:paymentId", paymentsService.updatePayment);

module.exports = router;
