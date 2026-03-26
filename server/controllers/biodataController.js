import Biodata from "../models/Biodata.js";
import Payment from "../models/Payment.js";

// CREATE
export const createBiodata = async (req, res) => {
  const data = await Biodata.create({
    ...req.body,
    userId: req.user.id
  });

  res.json(data);
};

// GET ALL (PUBLIC)
export const getAllBiodata = async (req, res) => {
  const data = await Biodata.find().sort({ createdAt: -1 });
  res.json(data);
};

// GET SINGLE (LOCK LOGIC)
export const getBiodataById = async (req, res) => {
  const biodata = await Biodata.findById(req.params.id);

  const hasPaid = await Payment.findOne({
    userId: req.user?.id,
    biodataId: req.params.id,
    status: "SUCCESS"
  });

  if (!hasPaid) {
    biodata.phone = "********";
    biodata.address = "********";
  }

  res.json({
    ...biodata._doc,
    isUnlocked: !!hasPaid
  });
};

// UPDATE
export const updateBiodata = async (req, res) => {
  const data = await Biodata.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(data);
};

// DELETE
export const deleteBiodata = async (req, res) => {
  await Biodata.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};