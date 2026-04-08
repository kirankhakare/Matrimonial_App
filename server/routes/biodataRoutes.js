const express = require("express");
const router = express.Router();

const {
  createBiodata,
  getMyBiodata,
  updateMyBiodata,
  getAllBiodata,
  getBiodataById,
} = require("../controllers/biodataController");

const authMiddleware = require("../middleware/authMiddleware");

// Protected routes
router.post("/create", authMiddleware, createBiodata);
router.get("/my", authMiddleware, getMyBiodata);
router.put("/update", authMiddleware, updateMyBiodata);

// Public routes
router.get("/", getAllBiodata);
router.get("/:id", getBiodataById);

module.exports = router;