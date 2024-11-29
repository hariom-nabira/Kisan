import React, { useState } from "react";
import { Search, Thermometer, Droplets, Cloud, TrendingUp } from "lucide-react";

const CropRecommendation = () => {
  const [cropName, setCropName] = useState("");
  const [cropInfo, setCropInfo] = useState(null);
  const [error, setError] = useState("");

  const fetchCropInfo = async () => {
    try {
      const response = await fetch(
        `https://mini-project-grp9-ml.onrender.com/api/crop-info/${cropName}`
      );
      const data = await response.json();

      if (response.ok) {
        setCropInfo(data);
        setError("");
      } else {
        setError(data.error);
        setCropInfo(null);
      }
    } catch (err) {
      setError("Failed to fetch crop information");
      setCropInfo(null);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 h-screen flex flex-col justify-center">
      <div className="bg-white rounded-lg shadow-xl border-2 border-gray-200 p-6">
        <h1 className="text-2xl font-bold mb-6">Crop Growth Conditions</h1>

        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <input
              type="text"
              value={cropName}
              onChange={(e) => setCropName(e.target.value)}
              placeholder="Enter crop name"
              className="w-full px-4 py-2 border rounded-md"
            />
            <Search
              className="absolute right-3 top-2.5 text-gray-400"
              size={20}
            />
          </div>
          <button
            onClick={fetchCropInfo}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Get Info
          </button>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {cropInfo && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Ideal Growing Conditions
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <TrendingUp size={20} className="text-blue-500" />
                  <span>Nitrogen (N): {cropInfo.parameters.N.toFixed(2)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp size={20} className="text-purple-500" />
                  <span>
                    Phosphorus (P): {cropInfo.parameters.P.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp size={20} className="text-orange-500" />
                  <span>Potassium (K): {cropInfo.parameters.K.toFixed(2)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Thermometer size={20} className="text-red-500" />
                  <span>
                    Temperature: {cropInfo.parameters.temperature.toFixed(2)}°C
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Cloud size={20} className="text-gray-500" />
                  <span>
                    Humidity: {cropInfo.parameters.humidity.toFixed(2)}%
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp size={20} className="text-yellow-500" />
                  <span>pH: {cropInfo.parameters.ph.toFixed(2)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Droplets size={20} className="text-blue-500" />
                  <span>
                    Rainfall: {cropInfo.parameters.rainfall.toFixed(2)} mm
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Suitable Locations</h3>
              <div className="flex flex-wrap gap-2">
                {cropInfo.suitable_locations.map((location) => (
                  <span
                    key={location}
                    className="px-3 py-1 bg-green-100 text-green-800 rounded"
                  >
                    {location}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CropRecommendation;
