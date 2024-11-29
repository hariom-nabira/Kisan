import React, { useState } from "react";
import { predictCrops } from "./Api";
import { FaLeaf as Plant } from "react-icons/fa";
import { BiCoinStack as Coins } from "react-icons/bi";

const CropPredictor = () => {
  const [inputs, setInputs] = useState({
    N: 89,
    P: 47,
    K: 38,
    temperature: 25.57,
    humidity: 72.0,
    ph: 6.0,
    rainfall: 151.9,
  });
  const [predictions, setPredictions] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setError("");
      setPredictions([]);

      // Validate and process inputs
      const processedInputs = Object.entries(inputs).reduce(
        (acc, [key, value]) => {
          const floatValue = parseFloat(value);
          if (isNaN(floatValue)) {
            throw new Error(`Invalid value for ${key}`);
          }
          acc[key] = floatValue;
          return acc;
        },
        {}
      );

      const result = await predictCrops(processedInputs);

      if (!result || !result.predictions) {
        throw new Error("Invalid response from server.");
      }
      setPredictions(result.predictions);
    } catch (err) {
      setError(err.message || "An error occurred during prediction.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-20 bg-green-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-green-800 mb-12">
          Crop Prediction
        </h2>
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-4">
              {error}
            </div>
          )}
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
          >
            {Object.keys(inputs).map((key) => (
              <div key={key}>
                <label
                  htmlFor={key}
                  className="block text-sm font-medium text-green-700 mb-1"
                >
                  {key.toUpperCase()}
                </label>
                <input
                  type="number"
                  id={key}
                  name={key}
                  value={inputs[key]}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            ))}
            <div className="md:col-span-2">
              <button
                type="submit"
                className={`w-full ${
                  isLoading ? "bg-green-300" : "bg-green-600 hover:bg-green-500"
                } text-white px-6 py-3 rounded-full text-lg font-semibold transition duration-300 transform ${
                  !isLoading && "hover:scale-105"
                }`}
                disabled={isLoading}
              >
                {isLoading ? "Predicting..." : "Predict Crops"}
              </button>
            </div>
          </form>

          {predictions.length > 0 && (
            <div>
              <h3 className="text-2xl font-semibold text-green-800 mb-4">
                Top 3 Predicted Crops
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {predictions.map((crop, index) => (
                  <div
                    key={index}
                    className="bg-green-100 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                  >
                    <div className="flex items-center mb-4">
                      <Plant className="w-8 h-8 text-green-600 mr-2" />
                      <h4 className="text-xl font-semibold text-green-800">
                        {crop.crop}
                      </h4>
                    </div>
                    <div className="flex items-center mb-2">
                      <Coins className="w-5 h-5 text-green-600 mr-2" />
                      <p className="text-green-700">
                        {crop.msp !== "MSP not available"
                          ? `₹${crop.msp}/quintal`
                          : crop.msp}
                      </p>
                    </div>
                    <div className="mt-4">
                      <h5 className="text-lg font-semibold text-green-800 mb-2">
                        Related Schemes:
                      </h5>
                      <ul className="list-disc list-inside text-green-700">
                        {crop.schemes.length > 0 ? (
                          crop.schemes.map((scheme, idx) => (
                            <li key={idx}>{scheme}</li>
                          ))
                        ) : (
                          <li>No schemes available</li>
                        )}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CropPredictor;
