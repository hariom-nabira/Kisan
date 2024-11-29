import React, { useState } from "react";
import { FlaskConical, Leaf, Droplet } from "lucide-react"; // Import icons from Lucide

const FertilizerPrediction = () => {
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

  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPrediction(null);
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
        setPrediction({
          name: data.fertilizer,
          description:
            "Balanced fertilizer suitable for a wide range of crops.",
          application: "Apply 250-300 kg/ha before sowing or planting.",
        });
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("An error occurred while predicting the fertilizer.");
    }
  };

  return (
    <section className="py-20 bg-green-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-green-800 mb-12">
          Fertilizer Prediction
        </h2>
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
          >
            <div>
              <label
                htmlFor="Soil Type"
                className="block text-sm font-medium text-green-700 mb-1"
              >
                Soil Type
              </label>
              <select
                id="Soil Type"
                name="Soil Type"
                value={inputData["Soil Type"]}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select soil type</option>
                <option value="Sandy">Sandy</option>
                <option value="Loamy">Loamy</option>
                <option value="Clayey">Clayey</option>
                <option value="Black">Black</option>
                <option value="Red">Red</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="Crop Type"
                className="block text-sm font-medium text-green-700 mb-1"
              >
                Crop Type
              </label>
              <select
                id="Crop Type"
                name="Crop Type"
                value={inputData["Crop Type"]}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select crop type</option>
                <option value="Rice">Rice</option>
                <option value="Wheat">Wheat</option>
                <option value="Maize">Maize</option>
                <option value="Cotton">Cotton</option>
                <option value="Sugarcane">Sugarcane</option>
              </select>
            </div>
            {[
              "Nitrogen",
              "Phosphorous",
              "Potassium",
              "Temparature",
              "Humidity",
              "Moisture",
            ].map((field) => (
              <div key={field}>
                <label
                  htmlFor={field}
                  className="block text-sm font-medium text-green-700 mb-1"
                >
                  {field}
                </label>
                <input
                  type="number"
                  id={field}
                  name={field}
                  value={inputData[field]}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            ))}
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full bg-green-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-green-500 transition duration-300 transform hover:scale-105"
              >
                Predict Fertilizer
              </button>
            </div>
          </form>

          {prediction && (
            <div className="bg-green-50 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex items-center mb-4">
                <FlaskConical className="w-8 h-8 text-green-600 mr-2" />
                <h3 className="text-2xl font-semibold text-green-800">
                  {prediction.name}
                </h3>
              </div>
              <div className="mb-4">
                <h4 className="text-lg font-semibold text-green-700 mb-2">
                  Description:
                </h4>
                <p className="text-green-700">{prediction.description}</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-green-700 mb-2">
                  Application:
                </h4>
                <p className="text-green-700">{prediction.application}</p>
              </div>
              <div className="mt-6 flex justify-between items-center">
                <div className="flex items-center">
                  <Leaf className="w-5 h-5 text-green-600 mr-2" />
                  <span className="text-green-700">Eco-friendly</span>
                </div>
                <div className="flex items-center">
                  <Droplet className="w-5 h-5 text-green-600 mr-2" />
                  <span className="text-green-700">Water-soluble</span>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
              Error: {error}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FertilizerPrediction;
