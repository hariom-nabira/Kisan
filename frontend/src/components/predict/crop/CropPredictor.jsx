import React, { useState } from "react";
import { predictCrops } from "./Api";

const CropPredictor = () => {
  const [inputs, setInputs] = useState({
    Nitrogen: 89,
    Phosporous: 47,
    Potassium: 38,
    temperature: 25.57974371,
    humidity: 72.00274423,
    ph: 6.002985292000001,
    rainfall: 151.9355362,
  });
  const [predictions, setPredictions] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      setError("");
      setPredictions([]);

      // Validate inputs
      const isEmptyField = Object.values(inputs).some(
        (value) => value === "" || value === null
      );
      if (isEmptyField) {
        setError("All fields are required. Please fill in all values.");
        return;
      }

      // Convert inputs to float and validate
      const processedInputs = {};
      for (const [key, value] of Object.entries(inputs)) {
        const floatValue = parseFloat(value);
        if (isNaN(floatValue)) {
          setError(`Invalid value for ${key}. Please enter a valid number.`);
          return;
        }
        processedInputs[key] = floatValue;
      }

      console.log("Sending data:", processedInputs); // Debug log

      const result = await predictCrops(processedInputs);

      console.log("Received result:", result); // Debug log

      if (!result || !result.predictions) {
        throw new Error("Invalid response format from server");
      }

      setPredictions(result.predictions);
    } catch (error) {
      console.error("Error during prediction:", error);
      setError(
        error.message || "Error predicting crops. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Crop Predictor
        </h1>

        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          {Object.keys(inputs).map((key) => (
            <div key={key}>
              <label className="block text-gray-700 font-medium mb-1">
                {key.toUpperCase()}
              </label>
              <input
                type="number"
                name={key}
                value={inputs[key]}
                onChange={handleChange}
                placeholder={`Enter ${key}`}
                className="w-full border rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
          ))}
        </form>

        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className={`w-full ${
            isLoading ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-600"
          } text-white font-semibold py-2 mt-4 rounded-lg transform transition duration-200 ${
            !isLoading && "hover:scale-105"
          }`}
        >
          {isLoading ? "Predicting..." : "Predict"}
        </button>

        {predictions.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Predicted Crops
            </h2>
            <ul className="space-y-2">
              {predictions.map((prediction, idx) => (
                <li key={idx} className="bg-gray-50 p-3 rounded-lg">
                  <div className="font-semibold">{prediction.crop}</div>
                  <div className="text-sm text-gray-600">
                    MSP:{" "}
                    {typeof prediction.msp === "number"
                      ? `₹${prediction.msp.toLocaleString()}/quintal`
                      : prediction.msp}
                  </div>
                  <div className="text-sm text-gray-600">
                    Schemes:{" "}
                    {prediction.schemes.length > 0
                      ? prediction.schemes.join(", ")
                      : "No schemes available"}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default CropPredictor;
