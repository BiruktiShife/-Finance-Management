const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./backend/routes/auth");
const crypto = require("crypto");

dotenv.config();
connectDB();

const app = express();

const generateSecretKey = () => {
  if (!process.env.JWT_SECRET) {
    const secret = crypto.randomBytes(32).toString("hex");
    console.log("Generated JWT Secret:", secret);
    return secret;
  }
  return process.env.JWT_SECRET;
};

const JWT_SECRET = generateSecretKey();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
