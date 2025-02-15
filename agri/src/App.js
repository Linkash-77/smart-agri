import { useState } from "react";
import CropPredictionForm from "./components/croppredictionform";
import PredictionResult from "./components/predictionresult";
import "./styles.css";

function App() {
  const [prediction, setPrediction] = useState(null);

  return (
    <div className="container">
      <h1>🌾 Crop Prediction System 🌾</h1>
      <CropPredictionForm setPrediction={setPrediction} />
      {prediction && <PredictionResult prediction={prediction} />}
    </div>
  );
}

export default App;
