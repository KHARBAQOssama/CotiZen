const { authenticated } = require("../../../middlewares");
const { InvoiceService } = require("../services");
const router = require("express").Router();

router.get("/", InvoiceService.getAllInvoices);

module.exports = router;