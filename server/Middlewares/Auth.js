require("../DB/db");
const jwt = require("jsonwebtoken");

Authtication = async (req, res, next) => {
  const token = req.headers.authorization.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Token is missing" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    if (decoded) {
      next();
    }
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
module.exports = Authtication;
