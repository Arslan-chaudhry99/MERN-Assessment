const express = require("express");
const router = express.Router();
const axios = require("axios");
require("../DB/db");
const Authtication = require("../Middlewares/Auth");

router.get("/CountryDetails", Authtication, async (req, res) => {
  const query = req.query.Query;

  try {
    const genralData = await axios.get(
      `https://restcountries.com/v3.1/name/${query}`
    );
    const currencyExchage = await axios.get(
      `http://data.fixer.io/api/latest?access_key=${process.env.API_KEY}`
    );
    const { population, currencies, name } = genralData.data[0];

    let currency = null;
    let exchageRate = null;

    for (const key in currencies) {
      currency = currencies[key];
      exchageRate = currencyExchage.data.rates[key];
    }

    return res.status(200).json({
      data: {
        population,
        currency: currency.name,
        currencySymbol: currency.symbol,
        commonName: name.common,
        nameOfficial: name.official,
        exchageRate: exchageRate,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
