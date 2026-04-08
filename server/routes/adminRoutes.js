const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");

// 🔐 Admin only middleware
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "ADMIN") {
    return next();
  }
  return res.status(403).json({ message: "Admin access only" });
};

// 📊 Dashboard
router.get(
  "/dashboard/stats",
  authMiddleware,
  adminOnly,
  adminController.getDashboardStats
);

// 👤 Users
router.get("/users", authMiddleware, adminOnly, adminController.getAllUsers);
router.delete(
  "/users/:id",
  authMiddleware,
  adminOnly,
  adminController.deleteUser
);

// 📄 Biodata
router.get(
  "/biodata",
  authMiddleware,
  adminOnly,
  adminController.getAllBiodata
);
router.delete(
  "/biodata/:id",
  authMiddleware,
  adminOnly,
  adminController.deleteBiodata
);

// 💳 Payments
router.get(
  "/payments",
  authMiddleware,
  adminOnly,
  adminController.getAllPayments
);

module.exports = router;