const Booking = require("../models/Booking");

// Create a new booking
const createBooking = async (req, res) => {
  try {
    const { doctor, doctorEmail, patient, patientEmail, phonenumber, age, appointmentTime } = req.body;

    if (!doctor || !doctorEmail || !patient || !patientEmail || !phonenumber || !age || !appointmentTime) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const roomName = `VaricoseConsultation_${Date.now()}`;

    const booking = new Booking({
      doctor,
      doctorEmail,
      patient,
      patientEmail,
      phonenumber,
      age,
      appointmentTime,
      roomName,
      user: req.user._id, // from protect middleware
    });

    await booking.save();
    res.status(201).json({ message: "Booking created successfully", booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all bookings for logged-in user
const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).sort({ appointmentTime: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cancel booking
const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id, user: req.user._id });
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    booking.status = "Cancelled";
    await booking.save();

    res.json({ message: "Booking cancelled", booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createBooking, getBookings, cancelBooking };
