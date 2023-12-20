const { authenticated } = require("../../../middlewares");
const { InvoiceService } = require("../services");
const router = require("express").Router();

router.get("/",authenticated, InvoiceService.getAllInvoices);
router.get("/:invoiceId",authenticated, InvoiceService.getInvoiceById);

module.exports = router;