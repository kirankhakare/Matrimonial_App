import mongoose from "mongoose";

const biodataSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    profileFor: {
      type: String, // Self / Son / Daughter / Brother / Sister
      default: "Self",
    },

    gender: {
      type: String,
      enum: ["Male", "Female"],
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    age: {
      type: Number,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    profession: {
      type: String,
      required: true,
    },

    education: {
      type: String,
      default: "",
    },

    religion: {
      type: String,
      default: "",
    },

    caste: {
      type: String,
      default: "",
    },

    height: {
      type: String,
      default: "",
    },

    income: {
      type: String,
      default: "",
    },

    phone: {
      type: String,
      default: "",
    },

    address: {
      type: String,
      default: "",
    },

    about: {
      type: String,
      default: "",
    },

    image: {
      type: String,
      default: "",
    },

    isApproved: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Biodata", biodataSchema);