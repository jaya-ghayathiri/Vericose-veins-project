const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// Example protected route
router.get("/profile", protect, (req, res) => {
  res.json({ message: "Welcome to your profile!", userId: req.user });
});

module.exports = router;
