const express = require("express");
const app = express();
const router = express.Router();

const signup = require("./controllers/Signup");
const login = require("./controllers/Login");
const countryData = require("./controllers/CountryDetails");

router.post("/signup", signup);
router.post("/login", login);
router.get("/CountryDetails", countryData);

module.exports = router;
