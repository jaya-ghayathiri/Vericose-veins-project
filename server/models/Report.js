const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    image: {
      type: String, // image path
      required: true,
    },
    result: String,
    probability: Number,
    stage: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Report", reportSchema);