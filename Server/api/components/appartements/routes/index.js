const { authenticated } = require("../../../middlewares");
const { AppartmentService } = require("../services");
const router = require("express").Router();

router.get("/", authenticated, AppartmentService.getAll);
router.post("/", authenticated, AppartmentService.create);
router.patch("/:appartement", authenticated, AppartmentService.update);
router.delete("/:appartement", authenticated, AppartmentService.deleteA);
router.get("/:appartement", authenticated, AppartmentService.show);
router.patch("/status/:appartement", authenticated, AppartmentService.updateApartmentStatus);

module.exports = router;