const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
export const addTransaction = async (data) => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("No token found");
    return;
  }
  try {
    await axios.post(`${API_URL}/transactions`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error("Error adding transaction", error.response?.data?.message);
  }
};

module.exports = authenticate;
