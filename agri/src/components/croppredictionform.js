import { useState } from "react";
import axios from "axios";
import "../styles.css";

const CropPredictionForm = ({ setPrediction }) => {
  const [inputs, setInputs] = useState({
    temperature: "",
    humidity: "",
    ph: "",
    waterAvailability: "",
    season: ""
  });

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/predict", inputs);
      setPrediction(response.data);
    } catch (error) {
      console.error("Error fetching prediction:", error);
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>Crop Prediction Form</h2>
      
      <label>Temperature:</label>
      <input type="number" name="temperature" onChange={handleChange} required />
      
      <label>Humidity:</label>
      <input type="number" name="humidity" onChange={handleChange} required />
      
      <label>pH Level:</label>
      <input type="number" name="ph" step="0.1" onChange={handleChange} required />
      
      <label>Water Availability (mm):</label>
      <input type="number" name="waterAvailability" onChange={handleChange} required />
      
      <label>Season:</label>
      <select name="season" onChange={handleChange} required>
        <option value="">Select Season</option>
        <option value="rainy">Rainy</option>
        <option value="summer">Summer</option>
        <option value="winter">Winter</option>
      </select>
      
      <button type="submit">Predict Crop</button>
    </form>
  );
};

export default CropPredictionForm;