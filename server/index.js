const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors({ origin: "*" }));
require("dotenv").config();
require("./DB/db");
const router = require("./routes");
app.use(express.json());
app.use(router);
let port = process.env.portNumber;

app.listen(port, () => {
  console.log(`server running on ${port}`);
});
