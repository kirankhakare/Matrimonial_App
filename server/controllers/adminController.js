const User = require("../models/User");
const Biodata = require("../models/Biodata");
const Payment = require("../models/Payment");

// 📊 Dashboard Stats
exports.getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalBiodata = await Biodata.countDocuments();

    // ✅ Premium count from Biodata model
    const premiumUsers = await Biodata.countDocuments({ isPremium: true });

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalBiodata,
        premiumUsers,
      },
    });
  } catch (error) {
    console.log("Dashboard Stats Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// 👤 Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.log("Get All Users Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ❌ Delete user
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    await User.findByIdAndDelete(userId);

    // ✅ linked biodata delete
    await Biodata.deleteMany({ user: userId });

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.log("Delete User Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// 📄 Get all biodata
exports.getAllBiodata = async (req, res) => {
  try {
    const biodata = await Biodata.find().populate("user", "name email");

    res.status(200).json({
      success: true,
      biodata,
    });
  } catch (error) {
    console.log("Get All Biodata Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ❌ Delete biodata
exports.deleteBiodata = async (req, res) => {
  try {
    const biodataId = req.params.id;

    await Biodata.findByIdAndDelete(biodataId);

    res.status(200).json({
      success: true,
      message: "Biodata deleted successfully",
    });
  } catch (error) {
    console.log("Delete Biodata Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// 💳 Get all payments
exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate("userId", "name email");

    res.status(200).json({
      success: true,
      payments,
    });
  } catch (error) {
    console.log("Get All Payments Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};