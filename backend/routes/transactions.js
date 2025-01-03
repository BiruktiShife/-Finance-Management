const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");
const authenticate = require("../middleware/auth");

router.post("/", authenticate, async (req, res) => {
  const { description, amount, date } = req.body;
  const userId = req.user.id;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required." });
  }

  try {
    const newTransaction = new Transaction({
      description,
      amount,
      date,
      userId,
    });

    await newTransaction.save();
    console.log("Transaction saved:", newTransaction);
    res.status(201).json(newTransaction);
  } catch (err) {
    console.error("Error adding transaction:", err);
    res.status(500).json({ message: "Error adding transaction", error: err });
  }
});

router.get("/transactions", authenticate, async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.id })
      .sort({ date: -1 })
      .limit(5);

    res.status(200).json(transactions);
  } catch (err) {
    console.error("Error fetching transactions:", err);
    res
      .status(500)
      .json({ message: "Error fetching transactions", error: err });
  }
});

router.get("/transactions/total", authenticate, async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.id });
    const balance = transactions.reduce(
      (acc, transaction) => acc + transaction.amount,
      0
    );
    res.status(200).json({ balance });
  } catch (err) {
    res.status(500).json({ message: "Error fetching balance", error: err });
  }
});

module.exports = router;
