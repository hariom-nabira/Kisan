import React, { useState, useEffect } from "react";
import { predictCrops } from "./Api";
import { FaLeaf as Plant } from "react-icons/fa";
import { BiCoinStack as Coins } from "react-icons/bi";
import { WiThermometer as Thermometer } from "react-icons/wi";

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
  const [locationError, setLocationError] = useState("");
  const [weatherLoading, setWeatherLoading] = useState(false);

  const fetchWeatherData = async (latitude, longitude) => {
    const url = `https://open-weather13.p.rapidapi.com/city/latlon/${latitude}/${longitude}`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "6b491523f1mshb9783c4d5fa0ec8p1f4b3fjsn4f334d6c7ff5",
        "x-rapidapi-host": "open-weather13.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();

      // Update the relevant input fields with weather data
      setInputs((prev) => ({
        ...prev,
        temperature: parseFloat((result.main.temp - 273.15).toFixed(2)), // Convert Kelvin to Celsius
        humidity: result.main.humidity,
      }));

      setWeatherLoading(false);
    } catch (error) {
      setLocationError(
        "Failed to fetch weather data. Please enter values manually."
      );
      setWeatherLoading(false);
    }
  };

  const getLocation = () => {
    setWeatherLoading(true);
    setLocationError("");

    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      setWeatherLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchWeatherData(position.coords.latitude, position.coords.longitude);
      },
      () => {
        setLocationError(
          "Unable to retrieve your location. Please enter values manually."
        );
        setWeatherLoading(false);
      }
    );
  };

  useEffect(() => {
    getLocation();
  }, []);

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setError("");
      setPredictions([]);

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
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl p-8">
          {locationError && (
            <div className="bg-yellow-50 text-yellow-700 p-3 rounded-lg mb-4">
              {locationError}
            </div>
          )}
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <div className="mb-6 flex items-center justify-between">
            <button
              type="button"
              onClick={getLocation}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors flex items-center"
              disabled={weatherLoading}
            >
              <Thermometer className="w-5 h-5 mr-2" />
              {weatherLoading ? "Fetching Weather..." : "Update Weather Data"}
            </button>
          </div>

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
