const { authenticated } = require("../../../middlewares");
const { InvoiceService } = require("../services");
const router = require("express").Router();

router.get("/:invoice/resident", InvoiceService.getInvoiceWithResident);

module.exports = router;