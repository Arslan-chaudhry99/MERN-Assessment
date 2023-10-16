const express = require("express");
const router = express.Router();
const UserDoc = require("../Models/Signup");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("../DB/db");

router.post("/login", async (req, res) => {
  const { username, Password } = req.body;

  try {
    const user = await UserDoc.findOne({ name: username });
    if (!user) {
      return res.status(404).json({ message: "Incorrect Name or Password" });
    }
    const passwordMatch = await bcrypt.compare(Password, user.password);
    if (!passwordMatch) {
      return res.status(404).json({ message: "Incorrect Name or Password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    user.token = token;
    await user.save();

    return res
      .status(200)
      .json({ message: "Login Success", token, name: user.name });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
