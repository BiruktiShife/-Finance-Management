const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authMiddleware = require("./middleware/auth");

const User = require("./models/Users");

app.get("/api/balance", async (req, res) => {
  try {
    const balance = await BalanceModel.getTotalBalance();
    res.json(balance);
  } catch (error) {
    console.error("Error fetching balance:", error);
    res.status(500).send("Internal Server Error");
  }
});
