const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { createBooking, getBookings, cancelBooking } = require("../controllers/bookingController");

const router = express.Router();

router.post("/", protect, createBooking);  // Book an appointment
router.get("/", protect, getBookings);     // Get all bookings for logged-in user
router.put("/:id/cancel", protect, cancelBooking); // Cancel booking

module.exports = router;
