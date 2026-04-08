const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    amount: Number,
    status: String,
    paymentId: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);