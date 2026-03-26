import Payment from "../models/Payment.js";

// SIMULATE PAYMENT SUCCESS
export const makePayment = async (req, res) => {
  const { biodataId, amount } = req.body;

  const payment = await Payment.create({
    userId: req.user.id,
    biodataId,
    amount,
    status: "SUCCESS"
  });

  res.json(payment);
};