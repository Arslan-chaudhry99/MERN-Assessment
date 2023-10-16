let mongoose = require("mongoose");
let DB = process.env.DB;

mongoose.connect(DB, () => {
  console.log("Data base connect successfuly");
});
