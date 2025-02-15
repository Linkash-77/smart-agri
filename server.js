const express = require("express");
const cors = require("cors");
const fs = require("fs");
const csv = require("csv-parser");

const app = express();
app.use(cors());
app.use(express.json());

// Load dataset
let cropData = [];
fs.createReadStream("./data/Crop_recommendation.csv")
  .pipe(csv())
  .on("data", (row) => {
    cropData.push(row);
  })
  .on("end", () => {
    console.log("Crop dataset loaded.");
  });

// Helper function to find the best matching crop
const findBestCrop = (temperature, humidity, ph, waterAvailability, season) => {
  let bestMatch = null;
  let minDifference = Infinity;

  cropData.forEach((crop) => {
    let tempDiff = Math.abs(parseFloat(crop.temperature) - temperature);
    let humidityDiff = Math.abs(parseFloat(crop.humidity) - humidity);
    let phDiff = Math.abs(parseFloat(crop.ph) - ph);
    let waterDiff = Math.abs(parseFloat(crop["water availability"]) - waterAvailability);
    let seasonMatch = crop.season.toLowerCase() === season.toLowerCase();
    let totalDifference = tempDiff + humidityDiff + phDiff + waterDiff;

    if (seasonMatch && totalDifference < minDifference) {
      minDifference = totalDifference;
      bestMatch = crop;
    }
  });

  return bestMatch;
};

// API Endpoint
app.post("/api/predict", (req, res) => {
  const { temperature, humidity, ph, waterAvailability, season } = req.body;
  const predictedCrop = findBestCrop(parseFloat(temperature), parseFloat(humidity), parseFloat(ph), parseFloat(waterAvailability), season);

  if (predictedCrop) {
    res.json({ crop: predictedCrop.label, yield: "N/A" });
  } else {
    res.status(404).json({ error: "No suitable crop found." });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
