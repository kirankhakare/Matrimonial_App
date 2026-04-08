const Biodata = require("../models/Biodata");

// CREATE BIODATA
const createBiodata = async (req, res) => {
  try {
    const biodata = new Biodata({
      ...req.body,
      user: req.user.id,
    });

    await biodata.save();

    res.status(201).json({
      message: "Biodata created successfully",
      biodata,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET MY BIODATA
const getMyBiodata = async (req, res) => {
  try {
    const biodata = await Biodata.findOne({ user: req.user.id });

    if (!biodata) {
      return res.status(404).json({ message: "Biodata not found" });
    }

    res.status(200).json(biodata);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE MY BIODATA
const updateMyBiodata = async (req, res) => {
  try {
    const biodata = await Biodata.findOneAndUpdate(
      { user: req.user.id },
      req.body,
      { new: true }
    );

    if (!biodata) {
      return res.status(404).json({ message: "Biodata not found" });
    }

    res.status(200).json({
      message: "Biodata updated successfully",
      biodata,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL BIODATA
const getAllBiodata = async (req, res) => {
  try {
    const biodata = await Biodata.find().sort({ createdAt: -1 });
    res.status(200).json(biodata);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE BIODATA
const getBiodataById = async (req, res) => {
  try {
    const biodata = await Biodata.findById(req.params.id);

    if (!biodata) {
      return res.status(404).json({ message: "Biodata not found" });
    }

    res.status(200).json(biodata);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBiodata,
  getMyBiodata,
  updateMyBiodata,
  getAllBiodata,
  getBiodataById,
};