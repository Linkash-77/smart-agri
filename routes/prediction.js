const express = require("express");
const router = express.Router();
const findBestCrop = require("../utils/cropPredictor");

router.post("/predict", (req, res) => {
  const { temperature, humidity, ph, waterAvailability, season } = req.body;
  const predictedCrop = findBestCrop(parseFloat(temperature), parseFloat(humidity), parseFloat(ph), parseFloat(waterAvailability), season);

  if (predictedCrop) {
    res.json({ crop: predictedCrop.label, yield: "N/A" });
  } else {
    res.status(404).json({ error: "No suitable crop found." });
  }
});

module.exports = router;
