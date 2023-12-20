const express = require("express");
const router = express.Router();
const {paymentsService} = require("../services");
const { authenticated } = require("../../../middlewares");

router.get("/",authenticated, paymentsService.getAllPayments);
router.get("/:paymentId",authenticated, paymentsService.getPaymentById);
router.get("/invoice/:invoiceId",authenticated, paymentsService.getInvoicePayments);
router.post("/",authenticated, paymentsService.createPayment);
router.patch("/:paymentId",authenticated, paymentsService.updatePayment);

module.exports = router;
