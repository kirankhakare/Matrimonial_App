const mongoose = require("mongoose");

const biodataSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: { type: String, required: true },
    dob: { type: String, required: true },
    placeOfBirth: { type: String, required: true },
    birthTime: { type: String },
    height: { type: String },
    caste: { type: String },
    education: { type: String },
    bloodGroup: { type: String },
    hobby: { type: String },
    ras: { type: String },
    language: { type: String },
    job: { type: String },
    salary: { type: String },

    fatherName: { type: String },
    fatherIncome: { type: String },
    motherName: { type: String },
    siblings: { type: String },

    contactName: { type: String },
    address: { type: String },
    phone: { type: String },
    email: { type: String },

    image: { type: String },
    isPremium: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Biodata", biodataSchema);