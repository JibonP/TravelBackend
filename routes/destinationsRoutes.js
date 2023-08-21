const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const destinationsController = require("../controllers/destinationsController");

router.get("/", auth, destinationsController.getAllDestinations);
router.post("/", auth, destinationsController.addDestination);
router.put(
  "/:destinationId/edit",
  auth,
  destinationsController.editDestination
);
router.delete(
  "/:destinationId/delete",
  auth,
  destinationsController.deleteDestination
);

router.get("/added-destinations", destinationsController.getAddedDestinations);

module.exports = router;
