const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    doctor: { type: String, required: true },
    doctorEmail: { type: String, required: true },
    patient: { type: String, required: true },
    patientEmail: { type: String, required: true },
    phonenumber: { type: String, required: true },
    age: { type: Number, required: true, min: 1 },
    appointmentTime: { type: Date, required: true },
    roomName: { type: String, required: true },
    status: { type: String, enum: ["Scheduled", "Completed", "Cancelled"], default: "Scheduled" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // link to logged-in user
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
