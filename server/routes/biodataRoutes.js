import express from "express";
import {
  createBiodata,
  getAllBiodata,
  getBiodataById,
  updateBiodata,
  deleteBiodata
} from "../controllers/biodataController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAllBiodata);
router.get("/:id", authMiddleware, getBiodataById);

router.post("/", authMiddleware, createBiodata);
router.put("/:id", authMiddleware, updateBiodata);
router.delete("/:id", authMiddleware, deleteBiodata);

export default router;