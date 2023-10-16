const mongoose = require("mongoose");
const signupSchema = new mongoose.Schema({
  name: {
    type: "string",
    required: true,
  },
  password: {
    type: "string",
    required: true,
  },
  token: {
    type: "string",
  },
});
const UserDoc = new mongoose.model("User", signupSchema);
module.exports = UserDoc;
