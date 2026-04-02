const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    age: { type: Number, required: true, min: 1 },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
