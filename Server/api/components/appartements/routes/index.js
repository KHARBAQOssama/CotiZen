const { authenticated } = require("../../../middlewares");
const { ApartmentService } = require("../services");
const router = require("express").Router();

router.get("/", authenticated, ApartmentService.getAll);
router.get("/all", authenticated, ApartmentService.getApartments);
router.post("/", authenticated, ApartmentService.create);
router.patch("/:apartment", authenticated, ApartmentService.update);
router.delete("/:apartment", authenticated, ApartmentService.deleteA);
router.get("/:apartment", authenticated, ApartmentService.show);
router.patch(
  "/status/:apartment",
  authenticated,
  ApartmentService.updateApartmentStatus
);

module.exports = router;
