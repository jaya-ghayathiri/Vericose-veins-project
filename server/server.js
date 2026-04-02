const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const tf = require("@tensorflow/tfjs");

const authRoutes = require("./routes/authRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// ====== MongoDB Routes ======
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);

// ====== Multer Setup ======
const upload = multer({ dest: "uploads/" });

// ====== TensorFlow.js Model ======
let model;
(async () => {
  try {
    model = await tf.loadLayersModel(
      "file://model/varicose_model_js/model.json"
    );
    console.log("✅ Model loaded successfully");
  } catch (err) {
    console.error("❌ Model loading failed:", err);
  }
})();

// ====== Upload + Prediction Route ======
app.post("/api/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    const imageBuffer = fs.readFileSync(req.file.path);

    let tensor = tf.node
      .decodeImage(imageBuffer)
      .resizeNearestNeighbor([224, 224]) // adjust to your training input size
      .toFloat()
      .div(tf.scalar(255.0))
      .expandDims();

    const prediction = model.predict(tensor);
    const score = prediction.dataSync()[0];

    res.json({
      filePath: `/uploads/${req.file.filename}`,
      prediction: score > 0.5 ? "Varicose Veins" : "Normal",
      confidence: score,
    });
  } catch (err) {
    console.error("Prediction error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Serve uploaded images
app.use("/uploads", express.static("uploads"));

// ====== Connect MongoDB & Start Server ======
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(process.env.PORT || 5000, () =>
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`)
    );
  })
  .catch((err) => console.error("❌ MongoDB Error:", err));
