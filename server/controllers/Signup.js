const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const UserDoc = require("../Models/Signup");
require("../DB/db");

router.post("/signup", async (req, res) => {
  let { username, Password } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(Password, salt);
    const addAdmin = new UserDoc({ name: username, password: hashedPass });
    const response = await addAdmin.save();
    if (response) {
      return res.status(201).json({ message: "Successful" });
    }
    return res.status(400).json({ message: "Bad Request" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while registering the user" });
  }
});

module.exports = router;
