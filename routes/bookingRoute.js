const express = require("express");
const router = express.Router();

const {
  createBooking,
  getAllBookings,
  updateBookingStatus,
  getUserBookings
} = require("../controllers/bookingController");

router.post("/create", createBooking);
router.get("/list", getAllBookings);
router.post("/status", updateBookingStatus);
router.get("/user/:userId", getUserBookings);

module.exports = router;
