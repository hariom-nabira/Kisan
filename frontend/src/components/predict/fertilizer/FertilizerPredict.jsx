import React, { useState } from "react";

const FertilizerPredict = () => {
  const [inputData, setInputData] = useState({
    Temparature: 30,
    Humidity: 50,
    Moisture: 46,
    "Soil Type": "Loamy",
    "Crop Type": "Jute",
    Nitrogen: 35,
    Potassium: 5,
    Phosphorous: 15,
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult(null);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/fertilizer_predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputData),
      });

      const data = await response.json();
      if (response.ok) {
        setResult(data.fertilizer);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("An error occurred while predicting the fertilizer.");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Fertilizer Prediction
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.keys(inputData).map((key) => (
          <div key={key}>
            <label className="block text-sm font-medium text-gray-700">
              {key}
            </label>
            <input
              type="text"
              name={key}
              value={inputData[key]}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700"
        >
          Predict Fertilizer
        </button>
      </form>

      {result && (
        <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-lg">
          Predicted Fertilizer: <strong>{result}</strong>
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
          Error: {error}
        </div>
      )}
    </div>
  );
};

export default FertilizerPredict;
