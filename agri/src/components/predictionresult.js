import "../styles.css";

const PredictionResult = ({ prediction }) => {
  return (
    <div className="result-container">
      <h2>Recommended Crop: {prediction.crop}</h2>
      <p>Expected Yield: {prediction.yield}</p>
    </div>
  );
};

export default PredictionResult;